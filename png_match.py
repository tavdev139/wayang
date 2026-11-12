"""Find where a small PNG patch occurs inside a bigger PNG (pure stdlib).

Used to work out whether the Arjuna arm/forearm/hand pieces are crops of
body-arjuna.png and, if so, exactly where they sit (pixel coordinates).
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
        row = []
        r = rows[y]
        for x in range(w):
            a = alpha_of(info, r, x)
            rr, gg, bb = rgb_of(info, r, x)
            row.append((rr, gg, bb, a))
        px.append(row)
    return info, px


def match(big, small, label):
    bw, bh = big[0]['w'], big[0]['h']
    sw, sh = small[0]['w'], small[0]['h']
    # sample points spread across the small patch
    samples = []
    step = max(1, min(sw, sh) // 6)
    for y in range(0, sh, step):
        for x in range(0, sw, step):
            samples.append((x, y))
    bpx = big[1]
    spx = small[1]
    best = None
    for oy in range(0, bh - sh + 1):
        for ox in range(0, bw - sw + 1):
            score = 0
            n = 0
            for (x, y) in samples:
                br, bg, bb, ba = bpx[oy + y][ox + x]
                sr, sg, sb, sa = spx[y][x]
                if sa < 30 and ba < 30:
                    continue
                n += 1
                d = abs(br - sr) + abs(bg - sg) + abs(bb - sb)
                if d < 90:
                    score += 1
            if n >= 6:
                ratio = score / n
                if best is None or ratio > best[0]:
                    best = (ratio, ox, oy, n)
    print('%-28s -> best match ratio=%.2f at offset (%d,%d)  [samples=%d]' %
          (label, best[0], best[1], best[2], best[3]) if best else
          '%-28s -> no candidate' % label)
    return best


if __name__ == '__main__':
    body_path = 'C:/Users/hp ssd/Downloads/wayang/assets/body-arjuna.png'
    src = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
    body = load(body_path)
    for name in ['upper-arm-l arjuna.png', 'upper arm arjuna.png',
                 'forearm-l arjuna.png', 'forearm-r arjuna.png',
                 'hand-l arjuna.png', 'hand-r.png']:
        try:
            sm = load(src + name)
        except Exception as e:
            print('skip', name, e)
            continue
        match(body, sm, name)
