"""Rebuild media derivatives from authentic local sources. Requires Pillow.

Fonts are checked-in WOFF2 files; see docs/provenance.md for their sources.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / 'public' / 'media'
MEDIA.mkdir(parents=True, exist_ok=True)

portrait = Image.open(ROOT / 'photo.jpg').convert('RGB')
for width in [320, 480, 720]:
    image = portrait.copy()
    image.thumbnail((width, 2000))
    image.save(MEDIA / f'portrait-{width}.webp', quality=86, method=6)

for name in ['nimonspedia-discovery', 'nimonspedia-product', 'nimonspedia-store', 'little-alchemy']:
    source = ROOT / '.local-backup' / 'media' / f'{name}.png'
    if not source.exists():
        continue
    original = Image.open(source).convert('RGB')
    for width in [640, 800, 1280, 1920]:
        image = original.copy()
        image.thumbnail((width, 10000))
        image.save(MEDIA / f'{name}-{width}.webp', quality=88, method=6)

# Purpose-built 1200×630 social card, using real portrait and plain typography.
card = Image.new('RGB', (1200, 630), '#FAF9F6')
draw = ImageDraw.Draw(card)
font_path = 'C:/Windows/Fonts/arial.ttf'
bold_path = 'C:/Windows/Fonts/arialbd.ttf'
small = ImageFont.truetype(font_path, 22)
large = ImageFont.truetype(bold_path, 66)
body = ImageFont.truetype(font_path, 26)
draw.text((64, 55), 'T.K  /  SOFTWARE ENGINEER', font=small, fill='#24776A')
draw.text((60, 185), 'Timur\nKanigara.', font=large, spacing=4, fill='#202522')
draw.text((64, 390), 'Web systems. Practical AI.\nFourth-year Informatics Engineering, ITB.', font=body, spacing=12, fill='#626B65')
draw.line((64, 552, 1136, 552), fill='#DADFD8', width=1)
draw.text((64, 573), 'timurkanigara.my.id', font=small, fill='#202522')
photo = portrait.copy()
photo.thumbnail((310, 465))
card.paste(photo, (826, 55))
card.save(MEDIA / 'social-card.png', optimize=True)
print('Media and fonts prepared.')
