import os
import io
import urllib.request
from PIL import Image, ImageFilter
import numpy as np
import rembg

DEST_DIR = r'f:\projects\virat kohli\public\images\products'
STAGING_DIR = r'f:\projects\virat kohli\public\images\products\staging_white'
os.makedirs(STAGING_DIR, exist_ok=True)

# Prepare rembg session
session = rembg.new_session('silueta')

def isolate_and_frame(img, max_dim=760, shadow_blur=16, shadow_opacity=0.22, shadow_y_offset=14):
    """
    Takes a PIL Image, removes background, cleans alpha channel,
    crops tight bounding box, scales to max_dim, centers on 1024x1024 pure white canvas,
    and applies a soft commercial contact shadow underneath.
    """
    # 1. Remove background
    cutout = rembg.remove(img, session=session)
    alpha = np.array(cutout.split()[-1])
    
    # 2. Clean alpha noise
    clean_alpha = np.where(alpha < 40, 0, alpha)
    # Ensure solid core
    clean_alpha = np.where(clean_alpha > 210, 255, clean_alpha)
    clean_alpha_img = Image.fromarray(clean_alpha.astype(np.uint8), mode='L')
    cutout.putalpha(clean_alpha_img)
    
    # 3. Crop tight bounding box
    bbox = cutout.getbbox()
    if not bbox:
        # Fallback if no bbox detected
        return cutout.convert('RGB')
    
    cropped = cutout.crop(bbox)
    w, h = cropped.size
    
    # 4. Scale to target maximum dimension
    scale = min(float(max_dim) / w, float(max_dim) / h)
    new_w, new_h = int(round(w * scale)), int(round(h * scale))
    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # 5. Position centered on 1024x1024 canvas
    canvas = Image.new('RGBA', (1024, 1024), (255, 255, 255, 255))
    x = (1024 - new_w) // 2
    # Place slightly below center (+10px) to give natural visual weight/grounding
    y = (1024 - new_h) // 2 + 10
    
    # 6. Synthesize studio contact shadow
    resized_alpha = resized.split()[-1]
    shadow_mask = resized_alpha.filter(ImageFilter.GaussianBlur(shadow_blur))
    shadow_layer = Image.new('RGBA', (1024, 1024), (25, 25, 25, 0))
    offset_shadow = Image.new('L', (1024, 1024), 0)
    offset_shadow.paste(shadow_mask, (x, y + shadow_y_offset))
    shadow_layer.putalpha(offset_shadow.point(lambda p: int(p * shadow_opacity)))
    
    # 7. Composite layers: White Background -> Contact Shadow -> Object Cutout
    comp = Image.alpha_composite(canvas, shadow_layer)
    comp.paste(resized, (x, y), resized)
    
    return comp.convert('RGB')

items_to_process = [
    ('luxury_yacht.jpg', 'source_yacht'),
    ('world_tour_luxury.jpg', 'world_tour_luxury.jpg'),
    ('cricket_ground.jpg', 'cricket_ground.jpg'),
    ('cricket_academy.jpg', 'cricket_academy.jpg'),
    ('cricket_franchise.jpg', 'cricket_franchise.jpg'),
    ('cricket_stadium.jpg', 'cricket_stadium.jpg'),
    ('music_festival.jpg', 'concert_tickets.jpg'),
    ('movie_theatre.jpg', 'movie_theatre.jpg'),
    ('bollywood_movie.jpg', 'bollywood_movie.jpg'),
    ('tv_channel.jpg', 'tv_channel.jpg'),
    ('streaming_platform.jpg', 'streaming_platform.jpg'),
]

print("Starting professional commercial product photography processing...")

for target_name, src_name in items_to_process:
    target_path = os.path.join(DEST_DIR, target_name)
    staging_path = os.path.join(STAGING_DIR, target_name)
    
    if src_name == 'source_yacht':
        # Download 2448x2448 high-res superyacht
        yacht_url = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Luxury_yacht.jpg'
        req = urllib.request.Request(yacht_url, headers={'User-Agent': 'ProductPhotoBot/1.0'})
        with urllib.request.urlopen(req) as resp:
            raw_img = Image.open(io.BytesIO(resp.read())).resize((1024, 1024), Image.Resampling.LANCZOS)
    else:
        src_path = os.path.join(DEST_DIR, src_name)
        raw_img = Image.open(src_path).convert('RGB')
    
    # Process
    framed_img = isolate_and_frame(raw_img, max_dim=780)
    
    # Save to staging and final destination
    framed_img.save(staging_path, quality=95)
    framed_img.save(target_path, quality=95)
    
    # Verify corners and subject box
    arr = np.array(framed_img)
    corners = arr[0, 0].tolist()
    is_non_white = np.any(arr < 250, axis=2)
    rows = np.where(is_non_white.any(axis=1))[0]
    cols = np.where(is_non_white.any(axis=0))[0]
    xmin, xmax = cols[0], cols[-1]
    ymin, ymax = rows[0], rows[-1]
    print(f"[OK] {target_name:22}: corner={corners}, size=({xmax-xmin}x{ymax-ymin}) at ({xmin},{ymin})")

print("\nAll 11 items processed and deployed successfully!")
