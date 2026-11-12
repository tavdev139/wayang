"""Measure the Arjuna rig geometry from real pixels.

For each vertical arm rod in body-arjuna.png this reports:
  * the alpha runs along the rod column (so the top/bottom of the rod, and the
    seam between the yoke, upper arm, forearm and hand, are exact),
  * the rod's horizontal centre per section,
and verifies that the six limb files in arjuna_potongan/ really are crops of the
body at the offsets we will use.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'

OFFSETS = {
    'upperL': ('upper-arm-l arjuna.png', (72, 167)),
    'upperR': ('upper arm arjuna.png', (241, 167)),
    'foreL':  ('forearm-l arjuna.png', (73, 282)),
    'foreR':  ('forearm-r arjuna.png', (241, 282)),
    'handL':  ('hand-l arjuna.png', (37, 394)),
    'handR':  ('hand-r.png', (204, 399)),
}


def runs(flags):
    out = []
    start = None
    for i, f in enumerate(flags + [False]):
        if f and start is None:
            start = i
        elif not f and start is not None:
            out.append((start, i - 1))
            start = None
    return out


def verify():
    bw, bh, body = decode_rgba(DST + 'body-arjuna.png')
    print('body-arjuna.png %dx%d' % (bw, bh))
    for key, (name, (ox, oy)) in OFFSETS.items():
        sw, sh, src = decode_rgba(SRC + name)
        same = 0
        diff = 0
        worst = 0
        for y in range(min(sh, bh - oy)):
            for x in range(min(sw, bw - ox)):
                br, bg, bb, ba = body[oy+y][ox+x]
                sr, sg, sb, sa = src[y][x]
                d = abs(br-sr) + abs(bg-sg) + abs(bb-sb)
                if d < 60:
                    same += 1
                else:
                    diff += 1
                worst = max(worst, d)
        total = same + diff
        print('  %-7s %-24s %2dx%-3d @(%3d,%3d)  match=%5.1f%%  worstDelta=%d'
              % (key, name, sw, sh, ox, oy, 100.0*same/total, worst))


def rod_scan():
    bw, bh, body = decode_rgba(DST + 'body-arjuna.png')
    for label, x in (('LEFT rod', 80), ('RIGHT rod', 250)):
        col = [body[y][x][3] > 128 for y in range(bh)]
        print('\n%s  column x=%d  opaque runs:' % (label, x))
        for a, b in runs(col):
            print('    y %3d .. %3d   (h=%d)' % (a, b, b - a + 1))

    # horizontal extent of the yoke bar and the rods at key rows
    print('\nrow spans (x0..x1) for selected rows:')
    for y in (129, 135, 140, 145, 148, 152, 157, 162, 166, 170, 200, 250, 278,
              282, 286, 300, 350, 388, 392, 396, 400, 420, 440, 470):
        xs = [x for x in range(bw) if body[y][x][3] > 128]
        if not xs:
            print('    y=%3d  empty' % y)
            continue
        # report contiguous runs
        rr = runs([x in xs for x in range(bw)])
        print('    y=%3d  %s' % (y, ' | '.join('x %d..%d' % r for r in rr)))


if __name__ == '__main__':
    verify()
    rod_scan()
