import struct, sys, zlib

def png_flip(src, dst):
    with open(src, 'rb') as f:
        data = f.read()
    pos = 8
    chunks = []
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8].decode('latin1')
        cdata = data[pos+8:pos+8+length]
        pos += 12 + length
        chunks.append((ctype, cdata))
    idat = b''.join(c[1] for c in chunks if c[0] == 'IDAT')
    ihdr = next(c for c in chunks if c[0] == 'IHDR')
    width, height = struct.unpack('>II', ihdr[1][:8])
    bit_depth, color_type = struct.unpack('>BB', ihdr[1][8:10])
    if bit_depth != 8:
        raise ValueError('only 8-bit PNG supported')
    if color_type == 6:
        bpp = 4
    elif color_type == 2:
        bpp = 3
    elif color_type == 0:
        bpp = 1
    elif color_type == 4:
        bpp = 2
    else:
        raise ValueError('unsupported color type %d' % color_type)
    raw = zlib.decompress(idat)
    row_bytes = width * bpp
    out_rows = []
    prev = bytearray(row_bytes)
    idx = 0
    for y in range(height):
        ftype = raw[idx]; idx += 1
        row = bytearray(raw[idx:idx+row_bytes]); idx += row_bytes
        if ftype == 0:
            pass
        elif ftype == 1:
            for i in range(bpp, row_bytes):
                row[i] = (row[i] + row[i-bpp]) & 0xFF
        elif ftype == 2:
            for i in range(row_bytes):
                row[i] = (row[i] + prev[i]) & 0xFF
        elif ftype == 3:
            for i in range(row_bytes):
                a = row[i-bpp] if i >= bpp else 0
                row[i] = (row[i] + (a >> 1)) & 0xFF
        elif ftype == 4:
            for i in range(row_bytes):
                a = row[i-bpp] if i >= bpp else 0
                b = prev[i]
                c = prev[i-bpp] if i >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p-a), abs(p-b), abs(p-c)
                if pa <= pb and pa <= pc: pr = a
                elif pb <= pc: pr = b
                else: pr = c
                row[i] = (row[i] + pr) & 0xFF
        out_rows.append(row)
        prev = row
    flipped = [row[::-1] for row in out_rows]
    new_idat = zlib.compress(bytes([0]) + b''.join(flipped), 6)
    def chunk(t, d):
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xFFFFFFFF)
    out = b'\x89PNG\r\n\x1a\n'
    out += chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, bit_depth, color_type, 0, 0, 0))
    out += chunk(b'IDAT', new_idat)
    out += chunk(b'IEND', b'')
    with open(dst, 'wb') as f:
        f.write(out)
    print('wrote', dst, width, 'x', height, 'flip-h')

if __name__ == '__main__':
    png_flip(sys.argv[1], sys.argv[2])
