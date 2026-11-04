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
