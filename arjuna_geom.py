"""Map the geometry of body-arjuna.png and its cropped limb pieces.

Prints an alpha silhouette of the body plus per-row opaque spans for the limb
crops, so the rig's pivot coordinates (shoulder / elbow / wrist / grip) and the
gapit (body stick) can be derived from real pixels instead of guesses.
"""
import sys
sys.path.insert(0, 'C:/Users/hp ssd/Downloads/wayang')
from png_info import decode, alpha_of, rgb_of


def load(path):
    info = decode(path)
    rows = info['rows']
    w, h = info['w'], info['h']
    px = []
    for y in range(h):
        r = rows[y]
        px.append([(rgb_of(info, r, x) + (alpha_of(info, r, x),)) for x in range(w)])
    return info, px


def silhouette(path, cols=66, rows_out=52):
    info, px = load(path)
    w, h = info['w'], info['h']
    sx = w / cols
    sy = h / rows_out
    lines = []
    for ry in range(rows_out):
        y0, y1 = int(ry * sy), max(int(ry * sy) + 1, int((ry + 1) * sy))
        line = ''
        for rx in range(cols):
            x0, x1 = int(rx * sx), max(int(rx * sx) + 1, int((rx + 1) * sx))
            best = 0
            for y in range(y0, min(y1, h)):
                for x in range(x0, min(x1, w)):
                    a = px[y][x][3]
                    if a > best:
                        best = a
            if best > 200: line += '#'
            elif best > 40: line += '+'
            elif best > 8: line += '.'
            else: line += ' '
        lines.append('%3d|%s' % (int(ry * sy), line))
    print('=== silhouette of %s (%dx%d) ===' % (path.split('/')[-1], w, h))
    print('     ' + ''.join(str((int(c * sx) // 10) % 10) for c in range(cols)))
    print('\n'.join(lines))


def spans(path):
    info, px = load(path)
    w, h = info['w'], info['h']
    print('=== opaque spans for %s (%dx%d) ===' % (path.split('/')[-1], w, h))
    prev = None
    for y in range(h):
        xs = [x for x in range(w) if px[y][x][3] > 128]
        if not xs:
            span = None
        else:
            span = (min(xs), max(xs))
        if span != prev:
            print('  y=%3d  %s' % (y, ('x %d..%d  (w=%d)' % (span[0], span[1], span[1]-span[0]+1)) if span else 'empty'))
            prev = span


if __name__ == '__main__':
    base = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
    what = sys.argv[1] if len(sys.argv) > 1 else 'body'
    if what == 'body':
        silhouette('C:/Users/hp ssd/Downloads/wayang/assets/body-arjuna.png')
    else:
        spans(base + what)
