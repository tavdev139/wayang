"""Print rivet (pivot) candidates for cut-out arm pieces, as a snippet to paste into characters.js.

Plain Python, no extra packages (it uses pnglib.py from this folder).

    python measure_pieces.py assets/upper-arm-arjuna-l.png assets/forearm-arjuna-l.png assets/hand-arjuna-l.png

For arms drawn hanging straight down, the way Arjuna's are:
  * upper arm / forearm   prox = middle of the opaque pixels on the first row (toward the shoulder / elbow)
                          dist = middle of the opaque pixels on the last row (toward the elbow / wrist)
  * hand (file name contains "hand")
                          prox = middle of the first row (the wrist)
                          grip = the fingertip: the opaque pixel farthest from the wrist, where the rod holds the hand
These are starting points. Pieces drawn in another pose (like the original's T-pose arms) have their rivets
elsewhere; read those off the image instead. Then check by eye in the browser: index.html?left=<id>&right=<id>
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

OPAQUE = 128


def fmt(v):
    return ('%.1f' % v).rstrip('0').rstrip('.')


def row_centre(px, y, w):
    xs = [x for x in range(w) if px[y][x][3] > OPAQUE]
    return (min(xs) + max(xs) + 1) / 2 if xs else None


def measure(path):
    w, h, px = decode_rgba(path)
    rows = [y for y in range(h) if any(px[y][x][3] > OPAQUE for x in range(w))]
    if not rows:
        print('%s: nothing opaque (alpha > %d)' % (path, OPAQUE))
        return
    top, bottom = rows[0], rows[-1]
    cx_top = row_centre(px, top, w)
    src = path.replace('\\', '/')
    if 'hand' in os.path.basename(path).lower():
        wrist = (cx_top, top)
        far = max(((x, y) for y in range(h) for x in range(w) if px[y][x][3] > OPAQUE),
                  key=lambda p: (p[0] + .5 - wrist[0]) ** 2 + (p[1] - wrist[1]) ** 2)
        near = [(x, y) for y in range(h) for x in range(w) if px[y][x][3] > OPAQUE and abs(x - far[0]) <= 3 and abs(y - far[1]) <= 3]
        grip = (sum(p[0] for p in near) / len(near) + .5, sum(p[1] for p in near) / len(near))
        print("hand: { src: '%s', size: [%d, %d], prox: [%s, %s], grip: [%s, %s] },"
              % (src, w, h, fmt(wrist[0]), fmt(wrist[1]), fmt(grip[0]), fmt(grip[1])))
    else:
        cx_bot = row_centre(px, bottom, w)
        print("limb: { src: '%s', size: [%d, %d], prox: [%s, %s], dist: [%s, %s] },"
              % (src, w, h, fmt(cx_top), fmt(top), fmt(cx_bot), fmt(bottom)))
    if top > 0 or bottom < h - 1:
        print('      note: opaque rows are %d..%d of %d; crop transparent margins first, or the pivots include them' % (top, bottom, h))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    for p in sys.argv[1:]:
        measure(p)
