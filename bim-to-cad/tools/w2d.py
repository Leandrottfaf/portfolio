"""Minimal decoder for W2D, the 2D vector stream inside an AutoCAD-published DWF.

Covers what AutoCAD 2027 writes for a plotted model space: lines, polylines,
filled triangle strips, arcs, ellipses, text, colours, line weights and layers.
Coordinates are integers relative to the previous point, as in the format.
"""

import struct

# Default W2D palette, used by indexed colours: 16 base colours, a 6×6×6 colour
# cube, then a grey ramp. Index 0 is the drawing's foreground (white on a dark
# CAD background).
_BASE16 = [
    (255, 255, 255), (128, 0, 0), (0, 128, 0), (128, 128, 0), (0, 0, 128), (128, 0, 128), (0, 128, 128), (192, 192, 192),
    (128, 128, 128), (255, 0, 0), (0, 255, 0), (255, 255, 0), (0, 0, 255), (255, 0, 255), (0, 255, 255), (255, 255, 255),
]
PALETTE = _BASE16 + [(r * 51, g * 51, b * 51) for r in range(6) for g in range(6) for b in range(6)]
PALETTE += [(8 + 10 * i,) * 3 for i in range(256 - len(PALETTE))]


class Primitive:
    __slots__ = ("kind", "layer", "color", "fill", "weight", "points", "data")

    def __init__(self, kind, layer, color, fill, weight, points, data=None):
        self.kind, self.layer, self.color, self.fill = kind, layer, color, fill
        self.weight, self.points, self.data = weight, points, data


class W2D:
    def __init__(self, data):
        self.d = data
        self.i = 0
        self.x = self.y = 0
        self.color = PALETTE[0]
        self.layer = None
        self.fill = False
        self.visible = True
        self.weight = 0
        self.font_height = 10
        self.font_rotation = 0
        self.layers = {}
        self.prims = []

    # --- readers -----------------------------------------------------------
    def u8(self):
        v = self.d[self.i]
        self.i += 1
        return v

    def u16(self):
        v = struct.unpack_from("<H", self.d, self.i)[0]
        self.i += 2
        return v

    def i16(self):
        v = struct.unpack_from("<h", self.d, self.i)[0]
        self.i += 2
        return v

    def i32(self):
        v = struct.unpack_from("<i", self.d, self.i)[0]
        self.i += 4
        return v

    def count(self):
        n = self.u8()
        return self.u16() + 256 if n == 0 else n

    def points(self, n, wide):
        out = []
        for _ in range(n):
            dx, dy = (self.i32(), self.i32()) if wide else (self.i16(), self.i16())
            self.x += dx
            self.y += dy
            out.append((self.x, self.y))
        return out

    def string(self):
        q = self.d[self.i]
        if q in (0x27, 0x22):  # quoted, backslash escapes
            out = bytearray()
            j = self.i + 1
            while self.d[j] != q:
                if self.d[j] == 0x5C:
                    j += 1
                out.append(self.d[j])
                j += 1
            self.i = j + 1
            return out.decode("latin1")
        n = self.count()
        s = self.d[self.i:self.i + 2 * n].decode("utf-16-le", "replace")
        self.i += 2 * n
        return s

    def extended_ascii(self):
        """'(Name ...)' with nesting and quoted strings. Only Layer matters here."""
        d, i, depth = self.d, self.i, 0
        while True:
            c = d[i]
            if c == 0x27:
                i += 1
                while d[i] != 0x27:
                    i += 2 if d[i] == 0x5C else 1
            elif c == 0x28:
                depth += 1
            elif c == 0x29:
                depth -= 1
                if depth == 0:
                    break
            i += 1
        body = d[self.i + 1:i]
        self.i = i + 1
        if body.startswith(b"Layer "):
            parts = body.split(b" ", 2)
            self.layer = int(parts[1])
            if len(parts) > 2:
                self.layers[self.layer] = parts[2].decode("latin1").strip("'")

    def add(self, kind, points, data=None):
        if self.visible:
            self.prims.append(Primitive(kind, self.layers.get(self.layer), self.color, self.fill, self.weight, points, data))

    # --- main loop -----------------------------------------------------------
    def run(self):
        d, n = self.d, len(self.d)
        while self.i < n:
            c = d[self.i]
            if c == 0x28:
                self.extended_ascii()
                continue
            if c == 0x7B:  # extended binary (embedded images etc.): skip
                self.i += 5 + struct.unpack_from("<I", d, self.i + 1)[0]
                continue
            self.i += 1
            if c in b" \n\r\t\x00":
                continue
            if c == 0x03:  # RGBA colour
                self.color = tuple(d[self.i:self.i + 3])
                self.i += 4
            elif c == 0x63:  # indexed colour
                self.color = PALETTE[self.u8()]
            elif c == 0x17:
                self.weight = self.i32()
            elif c in (0x46, 0x66):
                self.fill = c == 0x46
            elif c in (0x56, 0x76):
                self.visible = c == 0x56
            elif c == 0xAC:
                self.layer = self.count()
            elif c == 0x4F:  # origin: absolute position
                self.x, self.y = self.i32(), self.i32()
            elif c in (0x0C, 0x6C):  # line, 16/32-bit
                self.add("line", self.points(2, c == 0x6C))
            elif c in (0x10, 0x70):  # polyline / polygon
                self.add("poly", self.points(self.count(), c == 0x70))
            elif c in (0x14, 0x74):  # triangle strip (solid fill)
                self.add("tri", self.points(self.count(), c == 0x74))
            elif c in (0x0B, 0x6B):  # contour set
                counts = [self.count() for _ in range(self.count())]
                for m in counts:
                    self.add("poly", self.points(m, c == 0x6B))
            elif c in (0x12, 0x72):  # circle
                p = self.points(1, c == 0x72)[0]
                r = self.u16() if c == 0x12 else self.i32()
                self.add("arc", [p], (r, 0, 0))
            elif c == 0x92:  # circular arc: centre, radius, start/end (65536 = full turn)
                p = self.points(1, True)[0]
                self.add("arc", [p], (self.i32(), self.u16(), self.u16()))
            elif c == 0x65:  # ellipse: centre, major, minor, start, end, tilt
                p = self.points(1, True)[0]
                self.add("ellipse", [p], (self.i32(), self.i32(), self.u16(), self.u16(), self.u16()))
            elif c == 0x06:  # font: field mask, then the fields present
                mask = self.u16()
                if mask & 0x01:
                    raise ValueError(f"font name field not supported at {self.i}")
                for bit, size in ((0x02, 1), (0x04, 1), (0x08, 1), (0x10, 1), (0x20, 4), (0x40, 2),
                                  (0x80, 2), (0x100, 2), (0x200, 2), (0x400, 4)):
                    if mask & bit:
                        v = int.from_bytes(d[self.i:self.i + size], "little")
                        self.i += size
                        if bit == 0x20:
                            self.font_height = v
                        elif bit == 0x40:
                            self.font_rotation = v
            elif c in (0x78, 0x18):  # text: position, string (complex text adds bounds)
                p = self.points(1, True)[0]
                text = self.string()
                if c == 0x18:
                    self.i += 2 + 32 + 1
                self.add("text", [p], (self.font_height, self.font_rotation, text))
            else:
                raise ValueError(f"unknown W2D opcode {c:#x} at {self.i - 1}")
        return self
