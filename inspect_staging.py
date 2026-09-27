import os
from PIL import Image
import numpy as np

staging_dir = r'f:\projects\virat kohli\public\images\products\staging_white'
items = [
    'luxury_yacht.jpg', 'world_tour_luxury.jpg', 'cricket_ground.jpg',
    'cricket_academy.jpg', 'cricket_franchise.jpg', 'cricket_stadium.jpg',
    'music_festival.jpg', 'movie_theatre.jpg', 'bollywood_movie.jpg',
    'tv_channel.jpg', 'streaming_platform.jpg'
]

print("Summary of Staging Images:")
for item in items:
    p = os.path.join(staging_dir, item)
    im = Image.open(p).convert('RGB')
    arr = np.array(im)
    corners = [arr[0,0].tolist(), arr[0,-1].tolist(), arr[-1,0].tolist(), arr[-1,-1].tolist()]
    is_non_white = np.any(arr < 250, axis=2)
    rows = np.where(is_non_white.any(axis=1))[0]
    cols = np.where(is_non_white.any(axis=0))[0]
    if len(rows) > 0 and len(cols) > 0:
        ymin, ymax = rows[0], rows[-1]
        xmin, xmax = cols[0], cols[-1]
        w, h = xmax - xmin, ymax - ymin
        coverage = is_non_white.mean() * 100
        print(f"{item:22}: bbox=({xmin:3},{ymin:3})-({xmax:4},{ymax:4}) size={w:3}x{h:3} ({coverage:4.1f}%) corners={corners[0]}")
    else:
        print(f"{item:22}: EMPTY")
