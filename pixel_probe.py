"""Probe specific pixels: does the body's alpha really hide the arm rods?"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'
SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'

PROBES = [
    ('body', DST + 'body-arjuna.png', [
        (80, 200, 'LEFT rod mid'),
        (80, 240, 'LEFT rod lower'),
        (80, 300, 'LEFT rod lower2'),
        (250, 200, 'RIGHT rod mid'),
        (250, 250, 'RIGHT rod lower'),
        (250, 320, 'RIGHT rod lower2'),
        (131, 200, 'torso centre'),
        (131, 300, 'saddle'),
        (60, 30, 'headdress'),
        (131, 450, 'feet'),
    ]),
    ('upperL', SRC + 'upper-arm-l arjuna.png', [
        (7, 5, 'rod top'), (7, 60, 'rod mid'), (7, 110, 'rod bottom'),
        (0, 60, 'edge left'), (17, 60, 'edge right'),
    ]),
    ('handL', SRC + 'hand-l arjuna.png', [
        (10, 20, 'claw tip'), (45, 5, 'wrist end'), (28, 17, 'centre'),
        (55, 17, 'far right'),
    ]),
    ('handR', SRC + 'hand-r.png', [
        (10, 25, 'claw tip'), (50, 5, 'wrist end'), (30, 20, 'centre'),
    ]),
]


def main():
    for label, path, pts in PROBES:
        w, h, px = decode_rgba(path)
        print('=== %s (%dx%d) %s' % (label, w, h, os.path.basename(path)))
        for (x, y, note) in pts:
            if 0 <= x < w and 0 <= y < h:
                r, g, b, a = px[y][x]
                print('    (%3d,%3d) %-14s rgba=(%3d,%3d,%3d,%3d)' % (x, y, note, r, g, b, a))


if __name__ == '__main__':
    main()
