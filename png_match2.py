"""Locate each Arjuna limb crop inside body-arjuna.png using ARTWORK pixels only.

The limb files in arjuna_potongan/ still have an opaque flat background, so a
naive pixel match scores white-vs-white everywhere and lands anywhere. This only
counts pixels that are actually artwork in the limb (not near-white), and
requires the body pixel at the same offset to be opaque and colour-close.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'

LIMBS = [
    ('upper-arm-l arjuna.png', 'upper-arm-arjuna-l.png'),
    ('upper arm arjuna.png',   'upper-arm-arjuna-r.png'),
    ('forearm-l arjuna.png',   'forearm-arjuna-l.png'),
    ('forearm-r arjuna.png',   'forearm-arjuna-r.png'),
    ('hand-l arjuna.png',      'hand-arjuna-l.png'),
    ('hand-r.png',             'hand-arjuna-r.png'),
]


def is_artwork(p):
    r, g, b, a = p
    if a < 200:
        return False
    return not (r >= 232 and g >= 232 and b >= 232)


def main():
    bw, bh, body = decode_rgba(DST + 'body-arjuna.png')
    for src_name, out_name in LIMBS:
        sw, sh, src = decode_rgba(SRC + src_name)
        pts = [(x, y) for y in range(sh) for x in range(sw) if is_artwork(src[y][x])]
        if not pts:
            print('%-24s no artwork pixels' % src_name)
            continue
        best = None
        for oy in range(0, bh - sh + 1):
            for ox in range(0, bw - sw + 1):
                hit = 0
                for (x, y) in pts:
                    br, bg, bb, ba = body[oy+y][ox+x]
                    if ba < 200:
                        continue
                    sr, sg, sb, sa = src[y][x]
                    if abs(br-sr) + abs(bg-sg) + abs(bb-sb) < 90:
                        hit += 1
                score = hit / len(pts)
                if best is None or score > best[0]:
                    best = (score, ox, oy, hit)
        print('%-24s %2dx%-3d artwork=%4d  best=%.3f at (%d,%d) hits=%d'
              % (src_name, sw, sh, len(pts), best[0], best[1], best[2], best[3]))


if __name__ == '__main__':
    main()
