"""Print the alpha map of each source limb file so the cleanup rule is exact."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pnglib import decode_rgba

SRC = 'C:/Users/hp ssd/Downloads/arjuna_potongan/'
FILES = ['upper-arm-l arjuna.png', 'forearm-l arjuna.png', 'hand-l arjuna.png',
         'upper arm arjuna.png', 'forearm-r arjuna.png', 'hand-r.png']

CH = ' .:-=+*#%@'   # transparent -> opaque


def main():
    for name in FILES:
        w, h, px = decode_rgba(SRC + name)
        print('=== %s  %dx%d' % (name, w, h))
        for y in range(h):
            line = ''
            for x in range(w):
                r, g, b, a = px[y][x]
                if a == 0:
                    line += ' '
                else:
                    line += CH[min(9, a * 10 // 256)]
            print('   %3d|%s|' % (y, line))
        print()


if __name__ == '__main__':
    main()
