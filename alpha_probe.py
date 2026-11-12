"""Print raw alpha profiles so the Arjuna assets' transparency can be judged."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'
SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'


def hist(pixels, w, h, label):
    counts = {}
    for row in pixels:
        for p in row:
            a = p[3]
            bucket = (a // 32) * 32
            counts[bucket] = counts.get(bucket, 0) + 1
    total = w * h
    print('%s  %dx%d  alpha histogram:' % (label, w, h))
    for k in sorted(counts):
        print('    a %3d..%3d : %6d (%5.1f%%)' % (k, k+31, counts[k], 100.0*counts[k]/total))


def col_profile(path, x, label):
    w, h, px = decode_rgba(path)
    print('\n%s  column x=%d alpha profile:' % (label, x))
    for y in range(h):
        r, g, b, a = px[y][x]
        if y % 4 == 0 or a > 0:
            print('    y=%3d  a=%3d  rgb=(%3d,%3d,%3d)' % (y, a, r, g, b))


def region(path, x0, y0, x1, y1, label):
    w, h, px = decode_rgba(path)
    print('\n%s  region x%d..%d y%d..%d:' % (label, x0, x1, y0, y1))
    for y in range(y0, y1):
        line = ''
        for x in range(x0, x1):
            a = px[y][x][3]
            line += ' ' if a == 0 else ('.' if a < 64 else ('-' if a < 160 else ('+' if a < 250 else '#')))
        print('    y=%3d |%s|' % (y, line))


if __name__ == '__main__':
    w, h, px = decode_rgba(DST + 'body-arjuna.png')
    hist(px, w, h, 'body-arjuna.png')
    region(DST + 'body-arjuna.png', 66, 160, 100, 300, 'body-arjuna LEFT ROD')
    region(DST + 'body-arjuna.png', 236, 160, 262, 300, 'body-arjuna RIGHT ROD')
    region(SRC + 'upper-arm-l arjuna.png', 0, 0, 18, 115, 'source upper-arm-l')
