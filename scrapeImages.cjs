const fs = require('fs');
const https = require('https');
const http = require('http');

const urls = {
  cricket_coaching: 'http://kkalpavrikshacricketclinic.com/elite-cricket-coaching-program',
  lifetime_maggi: 'https://www.tribuneindia.com/news/archive/bathinda/despite-ban-maggi-s-taste-lingers-91171',
  ipad: 'https://www.aptronixindia.com/products/13-inch-ipad-pro-with-standard-glass-apple-m5-chip',
  concert_tickets: 'https://www.magnific.com/free-photos-vectors/music-concert-ticket'
};

async function fetchHtml(urlStr) {
  return new Promise((resolve, reject) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
         return resolve(fetchHtml(res.headers.location));
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const imageMap = {};
  for (const [id, url] of Object.entries(urls)) {
    try {
      const html = await fetchHtml(url);
      const ogMatch = html.match(/<meta\\s+(?:property|name)="og:image"\\s+content="([^"]+)"/i);
      if (ogMatch && ogMatch[1]) {
        imageMap[id] = ogMatch[1];
        console.log("Found " + id + ": " + ogMatch[1]);
      } else {
        const imgMatch = html.match(/<img[^>]+src="([^">]+)"/i);
        if (imgMatch && imgMatch[1]) {
           let src = imgMatch[1];
           if (src.startsWith('/')) {
              const urlObj = new URL(url);
              src = urlObj.origin + src;
           }
           imageMap[id] = src;
           console.log("Found img " + id + ": " + src);
        } else {
           console.log("Failed to find image for " + id);
        }
      }
    } catch (e) {
      console.log("Error fetching " + id + ": " + e.message);
    }
  }

  // Also include the local uploaded ones
  const localOverrides = {
    cricket_stadium: '/images/products/cricket_stadium.jpg',
    tv_channel: '/images/products/tv_channel.png',
    diamond_necklace: '/images/products/diamond_necklace.jpg',
    luxury_wardrobe: '/images/products/luxury_wardrobe.webp',
    streaming_setup: '/images/products/streaming_setup.webp'
  };

  const finalOverrides = Object.assign({}, imageMap, localOverrides);

  let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

  for (const [id, imgUrl] of Object.entries(finalOverrides)) {
    const regex = new RegExp("  " + id + ":\\s*'[^']+',");
    content = content.replace(regex, "  " + id + ": '" + imgUrl + "',");
  }

  fs.writeFileSync('src/data/productImages.ts', content);
  console.log('Finished updating URLs!');
}

run();
