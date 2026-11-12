"""Minimal pure-stdlib PNG read/write helpers (RGBA8 only for writing)."""
import struct, zlib


def chunks_of(data):
    pos = 8
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8].decode('latin1')
        cdata = data[pos+8:pos+8+length]
        pos += 12 + length
        yield ctype, cdata


def _chunk(t, d):
    return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xFFFFFFFF)


def decode_rgba(path):
    """Return (width, height, pixels) where pixels is a list of rows of (r,g,b,a)."""
    with open(path, 'rb') as f:
        data = f.read()
    ihdr = None
    idat = b''
    palette = b''
    trns = b''
    for ctype, cdata in chunks_of(data):
        if ctype == 'IHDR':
            ihdr = cdata
        elif ctype == 'IDAT':
            idat += cdata
        elif ctype == 'PLTE':
            palette = cdata
        elif ctype == 'tRNS':
            trns = cdata
    w, h = struct.unpack('>II', ihdr[:8])
    depth, ctype = struct.unpack('>BB', ihdr[8:10])
    interlace = ihdr[12]
    if depth != 8 or interlace != 0:
        raise ValueError('unsupported PNG (depth=%d interlace=%d)' % (depth, interlace))
    samples = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[ctype]
    bpp = samples
    row_bytes = w * bpp
    raw = zlib.decompress(idat)
    rows = []
    prev = bytearray(row_bytes)
    idx = 0
    for _ in range(h):
        ft = raw[idx]; idx += 1
        row = bytearray(raw[idx:idx+row_bytes]); idx += row_bytes
        if ft == 1:
            for i in range(bpp, row_bytes): row[i] = (row[i] + row[i-bpp]) & 0xFF
        elif ft == 2:
            for i in range(row_bytes): row[i] = (row[i] + prev[i]) & 0xFF
        elif ft == 3:
            for i in range(row_bytes):
                a = row[i-bpp] if i >= bpp else 0
                row[i] = (row[i] + (a >> 1)) & 0xFF
        elif ft == 4:
            for i in range(row_bytes):
                a = row[i-bpp] if i >= bpp else 0
                b = prev[i]
                c = prev[i-bpp] if i >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p-a), abs(p-b), abs(p-c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                row[i] = (row[i] + pr) & 0xFF
        rows.append(row); prev = row

    out = []
    for row in rows:
        px = []
        for x in range(w):
            off = x * bpp
            if ctype == 6:
                px.append((row[off], row[off+1], row[off+2], row[off+3]))
            elif ctype == 2:
                px.append((row[off], row[off+1], row[off+2], 255))
            elif ctype == 0:
                v = row[off]; px.append((v, v, v, 255))
            elif ctype == 4:
                v = row[off]; px.append((v, v, v, row[off+1]))
            elif ctype == 3:
                i = row[off]
                a = trns[i] if i < len(trns) else 255
                p = palette
                px.append((p[i*3], p[i*3+1], p[i*3+2], a))
        out.append(px)
    return w, h, out


def encode_rgba(path, width, height, pixels):
    """pixels: list of rows of (r,g,b,a)."""
    raw = bytearray()
    for row in pixels:
        raw.append(0)
        for (r, g, b, a) in row:
            raw += bytes((r & 255, g & 255, b & 255, a & 255))
    out = b'\x89PNG\r\n\x1a\n'
    out += _chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    out += _chunk(b'IDAT', zlib.compress(bytes(raw), 6))
    out += _chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(out)


def crop(pixels, x0, y0, w, h):
    return [row[x0:x0+w] for row in pixels[y0:y0+h]]
