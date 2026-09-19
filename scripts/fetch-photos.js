import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Load .env file
function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...vals] = trimmed.split('=');
        if (key && vals.length > 0) {
          process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    });
  }
}

loadEnv();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
if (!apiKey) {
  console.error("Error: GOOGLE_MAPS_API_KEY is missing from .env or environment.");
  process.exit(1);
}

// 2. Import THINGS_TO_DO dataset
const dataTodoPath = path.join(rootDir, 'js', 'data-todo.js');
const { THINGS_TO_DO } = await import(`file://${dataTodoPath}`);

const assetsTodoDir = path.join(rootDir, 'assets', 'todo');
if (!fs.existsSync(assetsTodoDir)) {
  fs.mkdirSync(assetsTodoDir, { recursive: true });
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

function getPlaceId(mapsUrl) {
  if (!mapsUrl) return null;
  try {
    const url = new URL(mapsUrl);
    return url.searchParams.get('query_place_id');
  } catch (e) {
    const match = mapsUrl.match(/query_place_id=([^&]+)/);
    return match ? match[1] : null;
  }
}

async function fetchPlacePhotos(placeId) {
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=photos`;
  try {
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey
      }
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error(`  [API Error] placeId ${placeId}: ${res.status} ${errText}`);
      return [];
    }
    const data = await res.json();
    return data.photos || [];
  } catch (err) {
    console.error(`  [Fetch Error] placeId ${placeId}:`, err.message);
    return [];
  }
}

async function downloadPhoto(photoName, outputPath) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=900&skipHttpRedirect=false`;
  try {
    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey
      }
    });
    if (!res.ok) {
      console.error(`  [Media Error] ${photoName}: ${res.status}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(outputPath, buffer);
    return true;
  } catch (err) {
    console.error(`  [Download Error] ${photoName}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`Starting photo download for ${THINGS_TO_DO.length} places...\n`);

  const shortList = [];

  for (const entry of THINGS_TO_DO) {
    const { id, name, mapsUrl } = entry;

    const p1 = path.join(assetsTodoDir, `${id}-1.jpg`);
    const p2 = path.join(assetsTodoDir, `${id}-2.jpg`);
    const p3 = path.join(assetsTodoDir, `${id}-3.jpg`);

    const exists1 = fs.existsSync(p1);
    const exists2 = fs.existsSync(p2);
    const exists3 = fs.existsSync(p3);

    if (exists1 && exists2 && exists3) {
      console.log(`${id}: 3 photos saved (skipped existing)`);
      continue;
    }

    const placeId = getPlaceId(mapsUrl);
    if (!placeId) {
      console.log(`${id}: 0 photos saved (no query_place_id)`);
      shortList.push({ id, name, count: 0, reason: 'No query_place_id' });
      continue;
    }

    // Rate limit ~5 req/s (200ms sleep)
    await sleep(200);

    const photos = await fetchPlacePhotos(placeId);
    let savedCount = 0;
    const paths = [p1, p2, p3];

    for (let i = 0; i < 3; i++) {
      const targetPath = paths[i];
      if (fs.existsSync(targetPath)) {
        savedCount++;
        continue;
      }
      if (i < photos.length) {
        const photoObj = photos[i];
        await sleep(200);
        const success = await downloadPhoto(photoObj.name, targetPath);
        if (success) {
          savedCount++;
        }
      }
    }

    console.log(`${id}: ${savedCount} photos saved`);

    if (savedCount < 3) {
      shortList.push({ id, name, count: savedCount });
    }
  }

  console.log("\n========================================");
  console.log("SUMMARY: PLACES WITH FEWER THAN 3 PHOTOS");
  console.log("========================================");
  // Update manifest.json
  const availableMap = {};
  let totalSaved = 0;
  for (const entry of THINGS_TO_DO) {
    let cnt = 0;
    for (let k = 1; k <= 3; k++) {
      if (fs.existsSync(path.join(assetsTodoDir, `${entry.id}-${k}.jpg`))) cnt++;
    }
    if (cnt > 0) availableMap[entry.id] = cnt;
    totalSaved += cnt;
  }
  const manifestData = {
    hasPhotos: totalSaved > 0,
    available: availableMap
  };
  fs.writeFileSync(path.join(assetsTodoDir, 'manifest.json'), JSON.stringify(manifestData, null, 2));

  console.log("========================================\n");
}

main();
