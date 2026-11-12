"""Build clean Arjuna character assets from the source art.

Ground truth (verified by pixel analysis, not guessed):
  * every limb file in Downloads/arjuna_potongan/ is a PIXEL-EXACT crop of
    body arjuna.png, so the limb art is already oriented like the body;
  * the six crop rectangles tile the two vertical arm rods and the two claws:
        upperL (72,167)  upperR (241,167)
        foreL  (73,282)  foreR  (241,282)
        handL  (37,394)  handR  (204,399)
  * the limb files still carry the flat artwork's background: a milky white
    halo plus JPEG colour speckles around the rod (this is the background that
    had not been removed yet).

This script:
  1. rebuilds each limb's alpha from its own pixels - flood-fill the
     near-white halo away from the borders, then drop the isolated colour
     speckles that are not connected to the piece;
  2. erases the arm-rod artwork out of the body PNG so the rig can draw the
     arms as separate moving pieces (the body keeps the head/torso/legs);
  3. writes assets/<name>-arjuna-{l,r}.png and assets/body-arjuna.png;
  4. prints the measured pivot coordinates used by rig.js.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba, encode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'

# limb file -> (body-image crop origin, output name)
LIMBS = {
    'upper-arm-l arjuna.png': ((72, 167), 'upper-arm-arjuna-l.png'),
    'upper arm arjuna.png':   ((241, 167), 'upper-arm-arjuna-r.png'),
    'forearm-l arjuna.png':   ((73, 282), 'forearm-arjuna-l.png'),
    'forearm-r arjuna.png':   ((241, 282), 'forearm-arjuna-r.png'),
    'hand-l arjuna.png':      ((37, 394), 'hand-arjuna-l.png'),
    'hand-r.png':             ((204, 399), 'hand-arjuna-r.png'),
}


def is_flat_background(r, g, b):
    """Milky white halo / paper of the flat artwork."""
    return r >= 222 and g >= 222 and b >= 218


def flood_background(px, w, h):
    """True where a pixel is background reachable from the image border."""
    bg = [[False] * w for _ in range(h)]
    stack = []
    for x in range(w):
        for y in (0, h - 1):
            r, g, b, a = px[y][x]
            if not bg[y][x] and is_flat_background(r, g, b):
                bg[y][x] = True; stack.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            r, g, b, a = px[y][x]
            if not bg[y][x] and is_flat_background(r, g, b):
                bg[y][x] = True; stack.append((x, y))
    while stack:
        x, y = stack.pop()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not bg[ny][nx]:
                r, g, b, a = px[ny][nx]
                if is_flat_background(r, g, b):
                    bg[ny][nx] = True; stack.append((nx, ny))
    return bg


def components(px, w, h, keep):
    """Connected components of `keep` pixels; returns a label map and groups."""
    label = [[-1] * w for _ in range(h)]
    groups = []
    for y0 in range(h):
        for x0 in range(w):
            if label[y0][x0] != -1 or not keep[y0][x0]:
                continue
            idx = len(groups)
            members = []
            stack = [(x0, y0)]
            label[y0][x0] = idx
            while stack:
                x, y = stack.pop()
                members.append((x, y))
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and label[ny][nx] == -1 and keep[ny][nx]:
                        label[ny][nx] = idx
                        stack.append((nx, ny))
            groups.append(members)
    return label, groups


def clean_limb(px, w, h):
    """Return a copy with the flat background and colour speckles removed."""
    bg = flood_background(px, w, h)
    solid = [[px[y][x][3] > 96 and not bg[y][x] for x in range(w)] for y in range(h)]
    label, groups = components(px, w, h, solid)
    if not groups:
        return [[(0, 0, 0, 0)] * w for _ in range(h)], 0
    biggest = max(range(len(groups)), key=lambda i: len(groups[i]))
    speckle = set()
    for i, g in enumerate(groups):
        if i == biggest:
            continue
        speckle.update(g)   # any island that is not the main piece is JPEG noise
    out = []
    for y in range(h):
        row = []
        for x in range(w):
            r, g, b, a = px[y][x]
            if bg[y][x] or (x, y) in speckle:
                row.append((0, 0, 0, 0))
            else:
                row.append((r, g, b, a))
        out.append(row)
    return out, len(speckle)


def opaque_stats(px, w, h):
    n = sum(1 for row in px for p in row if p[3] > 10)
    minx, maxx, miny, maxy = w, -1, h, -1
    for y, row in enumerate(px):
        for x, p in enumerate(row):
            if p[3] > 10:
                minx = min(minx, x); maxx = max(maxx, x)
                miny = min(miny, y); maxy = max(maxy, y)
    return n, (minx, miny, maxx, maxy)


def main():
    # ---- 1. clean the six limb pieces -------------------------------------
    cleaned = {}
    for src_name, ((ox, oy), out_name) in LIMBS.items():
        w, h, px = decode_rgba(SRC + src_name)
        before, _ = opaque_stats(px, w, h)
        clean, speckles = clean_limb(px, w, h)
        after, bbox = opaque_stats(clean, w, h)
        encode_rgba(DST + out_name, w, h, clean)
        cleaned[out_name] = (w, h, clean, bbox)
        print('%-24s %2dx%-3d  opaque %5.1f%% -> %5.1f%%  speckles=%-4d bbox=%s'
              % (out_name, w, h, 100.0 * before / (w * h), 100.0 * after / (w * h), speckles, bbox))

    # ---- 2. erase the arm artwork from the body ----------------------------
    bw, bh, body = decode_rgba(SRC + 'body arjuna.png')
    new_body = [row[:] for row in body]
    erased = 0
    for src_name, ((ox, oy), out_name) in LIMBS.items():
        w, h, clean, _ = cleaned[out_name]
        for y in range(h):
            by = oy + y
            if not (0 <= by < bh):
                continue
            for x in range(w):
                bx = ox + x
                if not (0 <= bx < bw):
                    continue
                if clean[y][x][3] > 10:
                    new_body[by][bx] = (0, 0, 0, 0)
                    erased += 1
    encode_rgba(DST + 'body-arjuna.png', bw, bh, new_body)
    print('\nbody-arjuna.png: %d arm pixels erased -> %dx%d' % (erased, bw, bh))

    # ---- 3. report the pivots the rig needs -------------------------------
    print('\nmeasured joints (body-image pixels):')
    for side, (u, f, hnd) in {
        'L': (('upper-arm-arjuna-l.png', (72, 167)), ('forearm-arjuna-l.png', (73, 282)), ('hand-arjuna-l.png', (37, 394))),
        'R': (('upper-arm-arjuna-r.png', (241, 167)), ('forearm-arjuna-r.png', (241, 282)), ('hand-arjuna-r.png', (204, 399))),
    }.items():
        def axis(name, origin, at_top):
            w, h, clean, _ = cleaned[name]
            ox, oy = origin
            row = 0 if at_top else h - 1
            xs = [x for x in range(w) if clean[row][x][3] > 128]
            cx = (min(xs) + max(xs)) // 2 if xs else w // 2
            return (ox + cx, oy + row)
        print('  %s: shoulder=%s  elbow=%s  wrist=%s'
              % (side, axis(u[0], u[1], True), axis(f[0], f[1], True), axis(hnd[0], hnd[1], True)))


if __name__ == '__main__':
    main()
