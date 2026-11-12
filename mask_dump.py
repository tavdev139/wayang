"""Dump the alpha mask of the Arjuna body so the real shape can be seen."""
import os, sys, hashlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba, encode_rgba

DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'

FILES = ['body-arjuna.png', 'body-arjuna.orig.png']


def md5(path):
    with open(path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()


def ascii_map(px, w, h, cols=72, rows=44):
    sx = w / cols
    sy = h / rows
    lines = []
    for r in range(rows):
        y0, y1 = int(r * sy), max(int(r * sy) + 1, int((r + 1) * sy))
        line = ''
        for c in range(cols):
            x0, x1 = int(c * sx), max(int(c * sx) + 1, int((c + 1) * sx))
            best = 0
            for y in range(y0, min(y1, h)):
                for x in range(x0, min(x1, w)):
                    a = px[y][x][3]
                    if a > best:
                        best = a
            line += '#' if best > 200 else ('+' if best > 40 else ('.' if best > 5 else ' '))
        lines.append('%3d|%s' % (int(r * sy), line))
    return lines


if __name__ == '__main__':
    for name in FILES:
        path = DST + name
        if not os.path.exists(path):
            print(name, 'MISSING')
            continue
        w, h, px = decode_rgba(path)
        print('=== %s  %dx%d  md5=%s' % (name, w, h, md5(path)))
        print('\n'.join(ascii_map(px, w, h)))
        # write a pure alpha mask for visual inspection
        mask = [[(p[3], p[3], p[3], 255) for p in row] for row in px]
        out = 'C:/Users/hp ssd/Downloads/wayang/_probe/mask_%s.png' % name.replace('.png', '')
        encode_rgba(out, w, h, mask)
        print('wrote', out)
        print()
