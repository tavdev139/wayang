"""Derive the Arjuna rig's pivot coordinates from the real pixels.

Ground truth established so far:
  * every limb file in arjuna_potongan/ is a PIXEL-EXACT crop of body-arjuna.png
    (match 100%, worst delta 0), so the limb art is already oriented the same way
    as the body;
  * body-arjuna.png's ALPHA channel already hides the two vertical arm rods
    (alpha == 0 there, RGB still holds the art), i.e. the body is prepared for
    the rig to draw the arms separately.

This script measures, for each limb piece, the opaque column range (the rod's
width) and turns the known crop offsets into body-image pivot coordinates:
    shoulder = top of the upper arm
    elbow    = upper/fore seam
    wrist    = fore/hand seam
    grip     = where the dalang's arm rod is held on the hand
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'

# crop origin inside body-arjuna.png, verified pixel-exact
ORIGIN = {
    'upperL': ('upper-arm-l arjuna.png', (72, 167)),
    'upperR': ('upper arm arjuna.png', (241, 167)),
    'foreL':  ('forearm-l arjuna.png', (73, 282)),
    'foreR':  ('forearm-r arjuna.png', (241, 282)),
    'handL':  ('hand-l arjuna.png', (37, 394)),
    'handR':  ('hand-r.png', (204, 399)),
}


def opaque_cols(px, w, h, lo=0, hi=None):
    hi = h if hi is None else hi
    cols = []
    for x in range(w):
        n = sum(1 for y in range(lo, hi) if px[y][x][3] > 128)
        cols.append(n)
    return cols


def main():
    print('%-8s %-24s %-11s %s' % ('part', 'file', 'size', 'opaque columns (x: count)'))
    for key, (name, (ox, oy)) in ORIGIN.items():
        w, h, px = decode_rgba(SRC + name)
        cols = opaque_cols(px, w, h)
        solid = [x for x, c in enumerate(cols) if c > h * 0.75]
        full = [x for x, c in enumerate(cols) if c > 0]
        print('%-8s %-24s %-11s full=%s solid=%s centre=%.1f'
              % (key, name, '%dx%d' % (w, h),
                 '%d..%d' % (full[0], full[-1]) if full else '-',
                 '%d..%d' % (solid[0], solid[-1]) if solid else '-',
                 (solid[0] + solid[-1]) / 2 if solid else -1))
        # alpha-weighted centre of mass per row, to see the rod's slight slant
        print('         row centres (every 12 rows):', end=' ')
        for y in range(0, h, 12):
            xs = [x for x in range(w) if px[y][x][3] > 128]
            if xs:
                print('%d:%d' % (y, (min(xs) + max(xs)) // 2), end=' ')
        print()


if __name__ == '__main__':
    main()
