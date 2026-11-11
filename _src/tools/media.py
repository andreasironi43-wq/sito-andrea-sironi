"""Crea le versioni WebP delle immagini in /img (stessa dimensione, nessun ingrandimento).
Uso: python3 _src/tools/media.py"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
for jpg in sorted((root / 'img').glob('*.jpg')):
    webp = jpg.with_suffix('.webp')
    if webp.exists() and webp.stat().st_mtime >= jpg.stat().st_mtime:
        continue
    with Image.open(jpg) as im:
        rgb = im.convert('RGB')
        # il WebP deve pesare meno del JPG: se non succede, si scende di qualità
        for q in (80, 74, 68, 62):
            rgb.save(webp, 'WEBP', quality=q, method=6)
            if webp.stat().st_size < jpg.stat().st_size:
                break
    print(f'{jpg.name}: {jpg.stat().st_size//1024} KB -> {webp.stat().st_size//1024} KB')


# Versioni ridotte per i telefoni (480 px di larghezza) delle immagini più grandi di 640 px.
for jpg in sorted((root / 'img').glob('*.jpg')):
    with Image.open(jpg) as im:
        if im.width < 640:
            continue
        small = jpg.with_name(jpg.stem + '-480.webp')
        if small.exists() and small.stat().st_mtime >= jpg.stat().st_mtime:
            continue
        h = round(im.height * 480 / im.width)
        im.convert('RGB').resize((480, h), Image.LANCZOS).save(small, 'WEBP', quality=72, method=6)
        print(f'{small.name}: {small.stat().st_size//1024} KB')
