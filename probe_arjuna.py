"""Draw the candidate limb-crop boxes onto body-arjuna.png so the regions can be
inspected directly, and write side-by-side comparison sheets."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba, encode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'
OUT = 'C:/Users/hp ssd/Downloads/wayang/_probe/'

BOXES = [
    ('upper-arm-l arjuna.png', (72, 167), (255, 0, 0)),
    ('upper arm arjuna.png',   (241, 167), (0, 160, 255)),
    ('forearm-l arjuna.png',   (73, 282), (255, 0, 0)),
    ('forearm-r arjuna.png',   (241, 282), (0, 160, 255)),
    ('hand-l arjuna.png',      (37, 394), (255, 0, 0)),
    ('hand-r.png',             (204, 399), (0, 160, 255)),
]


def scale(pix, f):
    out = []
    for row in pix:
        nr = []
        for p in row:
            nr.extend([p] * f)
        for _ in range(f):
            out.append(list(nr))
    return out


def compose(tiles, gap=8, bg=(30, 30, 34)):
    w = sum(len(t[0]) for t in tiles) + gap * (len(tiles) + 1)
    h = max(len(t) for t in tiles) + gap * 2
    canvas = [[bg + (255,)] * w for _ in range(h)]
    x = gap
    for tile in tiles:
        th = len(tile); tw = len(tile[0])
        for y in range(th):
            for xx in range(tw):
                canvas[y + gap][x + xx] = tile[y][xx]
        x += tw + gap
    return w, h, canvas


def main():
    os.makedirs(OUT, exist_ok=True)
    bw, bh, body = decode_rgba(DST + 'body-arjuna.png')

    # 1) annotated body with boxes
    ann = [row[:] for row in body]
    for name, (ox, oy), col in BOXES:
        sw, sh, _ = decode_rgba(SRC + name)
        for x in range(ox, min(ox + sw, bw)):
            for y in (oy, oy + sh - 1):
                if 0 <= y < bh: ann[y][x] = col + (255,)
        for y in range(oy, min(oy + sh, bh)):
            for x in (ox, ox + sw - 1):
                if 0 <= x < bw: ann[y][x] = col + (255,)
    encode_rgba(OUT + 'annotated_body.png', bw, bh, ann)
    print('wrote', OUT + 'annotated_body.png', bw, bh)

    # 2) side-by-side: body crop | source limb file, both blown up 4x
    for name, (ox, oy), col in BOXES:
        sw, sh, src = decode_rgba(SRC + name)
        crop = [row[ox:ox+sw] for row in body[oy:oy+sh]]
        tiles = [scale(crop, 4), scale(src, 4)]
        w, h, canvas = compose(tiles)
        out = 'cmp_%s.png' % name.replace(' ', '_').replace('.png', '')
        encode_rgba(OUT + out, w, h, canvas)
        print('wrote', out, w, h)


if __name__ == '__main__':
    main()
