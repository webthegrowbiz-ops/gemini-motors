from PIL import Image
from pathlib import Path

src = Path('public/brand/gemini-motors-logo.png')
dst = Path('public/brand/gemini-motors-logo-transparent.png')

img = Image.open(src).convert('RGBA')
pixels = []
for r, g, b, a in img.getdata():
    if r > 240 and g > 240 and b > 240:
        pixels.append((r, g, b, 0))
    else:
        pixels.append((r, g, b, a))
img.putdata(pixels)
img.save(dst)
print(f'Created {dst}')
