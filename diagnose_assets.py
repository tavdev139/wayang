"""Render each Arjuna asset three ways so the background can be diagnosed:
  rgb_only  - artwork ignoring the alpha channel (is the art still there?)
  mask      - the alpha channel alone (what is actually visible)
  on_magenta- artwork composited over magenta (what a viewer really shows)
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba, encode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
DST = 'C:/Users/hp ssd/Downloads/wayang/assets/'
OUT = 'C:/Users/hp ssd/Downloads/wayang/_probe/'

ASSETS = [
    ('body', DST + 'body-arjuna.png'),
    ('upperL', SRC + 'upper-arm-l arjuna.png'),
    ('upperR', SRC + 'upper arm arjuna.png'),
    ('foreL', SRC + 'forearm-l arjuna.png'),
    ('foreR', SRC + 'forearm-r arjuna.png'),
    ('handL', SRC + 'hand-l arjuna.png'),
    ('handR', SRC + 'hand-r.png'),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    for label, path in ASSETS:
        w, h, px = decode_rgba(path)
        rgb_only = [[(p[0], p[1], p[2], 255) for p in row] for row in px]
        mask = [[(p[3], p[3], p[3], 255) for p in row] for row in px]
        on_mag = [[(p[0], p[1], p[2], p[3]) if p[3] > 127 else (255, 0, 255, 255) for p in row] for row in px]
        for suffix, img in (('rgb', rgb_only), ('mask', mask), ('mag', on_mag)):
            encode_rgba('%sv_%s_%s.png' % (OUT, label, suffix), w, h, img)
        # stats
        opaque = sum(1 for row in px for p in row if p[3] > 10)
        # how much "artwork" (non-white RGB) sits under alpha==0 ?
        hidden = sum(1 for row in px for p in row if p[3] <= 10 and not (p[0] > 246 and p[1] > 246 and p[2] > 246))
        print('%-8s %3dx%-3d  visible=%5.1f%%  hiddenArtUnderAlpha0=%5d'
              % (label, w, h, 100.0 * opaque / (w * h), hidden))


if __name__ == '__main__':
    main()
