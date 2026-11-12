import struct, zlib, sys, os

def chunks_of(data):
    pos = 8
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8].decode('latin1')
        cdata = data[pos+8:pos+8+length]
        pos += 12 + length
        yield ctype, cdata

def decode(path):
    with open(path, 'rb') as f:
        data = f.read()
    ihdr = None
    idat = b''
    palette = b''
    trns = b''
    for ctype, cdata in chunks_of(data):
        if ctype == 'IHDR': ihdr = cdata
        elif ctype == 'IDAT': idat += cdata
        elif ctype == 'PLTE': palette = cdata
        elif ctype == 'tRNS': trns = cdata
    w, h = struct.unpack('>II', ihdr[:8])
    depth, ctype = struct.unpack('>BB', ihdr[8:10])
    interlace = ihdr[12]
    raw = zlib.decompress(idat)
    if depth != 8 or interlace != 0:
        return dict(path=os.path.basename(path), w=w, h=h, depth=depth,
                    color_type=ctype, note='skipped(depth/interlace)')
    samples = {0:1, 2:3, 3:1, 4:2, 6:4}[ctype]
    bpp = samples
    row_bytes = w * bpp
    rows = []
    prev = bytearray(row_bytes)
    idx = 0
    for y in range(h):
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
    return dict(path=os.path.basename(path), w=w, h=h, depth=depth,
                color_type=ctype, rows=rows, bpp=bpp, palette=palette, trns=trns)

def alpha_of(info, row, x):
    ctype = info['color_type']; bpp = info['bpp']
    off = x * bpp
    if ctype == 6: return row[off+3]
    if ctype == 4: return row[off+1]
    if ctype == 3:
        idx = row[off]
        return info['trns'][idx] if idx < len(info['trns']) else 255
    return 255

def rgb_of(info, row, x):
    ctype = info['color_type']; bpp = info['bpp']
    off = x * bpp
    if ctype == 6: return row[off], row[off+1], row[off+2]
    if ctype == 2: return row[off], row[off+1], row[off+2]
    if ctype == 0: v = row[off]; return v, v, v
    if ctype == 4: v = row[off]; return v, v, v
    if ctype == 3:
        p = info['palette']; i = row[off]*3
        return p[i], p[i+1], p[i+2]
    return 0,0,0

def report(path):
    info = decode(path)
    if 'note' in info:
        print(info['path'], info['w'], 'x', info['h'], 'ct=', info['color_type'], 'depth=', info['depth'], info['note'])
        return
    rows = info['rows']; w = info['w']; h = info['h']
    opaque = 0; total = w*h
    minx, maxx, miny, maxy = w, -1, h, -1
    # corner colours
    corners = [rgb_of(info, rows[0], 0), rgb_of(info, rows[0], w-1),
               rgb_of(info, rows[h-1], 0), rgb_of(info, rows[h-1], w-1)]
    for y, row in enumerate(rows):
        for x in range(w):
            a = alpha_of(info, row, x)
            if a > 10:
                opaque += 1
                minx = min(minx, x); maxx = max(maxx, x)
                miny = min(miny, y); maxy = max(maxy, y)
    print('%-26s %4dx%-4d ct=%d alpha_opaque=%.1f%% bbox=(%d,%d)-(%d,%d) corners=%s' % (
        info['path'], w, h, info['color_type'], 100*opaque/total,
        minx, miny, maxx, maxy, corners))


if __name__ == '__main__':
    for path in sys.argv[1:]:
        report(path)
