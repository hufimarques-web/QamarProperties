// generate-images.js — Kie AI image generation for Capital Atlântico
// Run: node generate-images.js

const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = "8dd0d18d613c0070657b26256283ed8b";

const IMAGES = [
  {
    filename: "hero-bg.jpg",
    aspectRatio: "16:9",
    prompt:
      "Aerial drone photography of Lisbon Portugal cityscape at golden hour, Alfama district terracotta rooftops, Tagus river shimmering in background, warm sunset cinematic light, ultra-wide angle, premium architectural real estate photography, high dynamic range, breathtaking view",
  },
  {
    filename: "hero-facade.jpg",
    aspectRatio: "16:9",
    prompt:
      "Traditional Portuguese building facade in Lisbon street, ornate azulejo blue tile panels, decorative wrought iron balconies, warm afternoon sunlight, street-level upward perspective, premium architectural photography, real estate investment portfolio",
  },
  {
    filename: "protection.jpg",
    aspectRatio: "4:3",
    prompt:
      "Luxury notary office Portugal, elegant fountain pen resting on premium legal contract documents, mahogany desk, selective depth of field, warm ambient office lighting, professional real estate investment legal documentation, editorial photography",
  },
  {
    filename: "cta-bg.jpg",
    aspectRatio: "16:9",
    prompt:
      "Modern renovated luxury apartment interior Lisbon Portugal, panoramic floor-to-ceiling windows with city view, warm golden hour sunlight flooding the room, premium real estate fix and flip after renovation, minimalist contemporary design, professional interior photography",
  },
  {
    filename: "opportunity-1.jpg",
    aspectRatio: "4:3",
    prompt:
      "Charming Lisbon apartment building exterior before renovation, traditional Portuguese architecture, cobblestone street, investment opportunity real estate photography, warm morning light, editorial style",
  },
  {
    filename: "opportunity-2.jpg",
    aspectRatio: "4:3",
    prompt:
      "Beautiful renovated apartment interior Porto Portugal, exposed brick wall, modern kitchen, bright natural light, premium fix and flip real estate result photography, lifestyle editorial",
  },
  {
    filename: "opportunity-3.jpg",
    aspectRatio: "4:3",
    prompt:
      "Stunning Cascais coastal property exterior, whitewashed walls, blue tile accents, luxury real estate Portugal, golden hour photography, palm trees, premium investment portfolio",
  },
];

// ── Kie AI API helpers ──────────────────────────────────────────────────────

function post(endpoint, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const options = {
      hostname: "api.kie.ai",
      path: endpoint,
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Bad JSON: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function get(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.kie.ai",
      path: endpoint,
      method: "GET",
      headers: { Authorization: `Bearer ${API_KEY}` },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Bad JSON: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function createTask(prompt, aspectRatio) {
  const res = await post("/api/v1/jobs/createTask", {
    model: "nano-banana-2",
    input: {
      prompt,
      aspect_ratio: aspectRatio,
      resolution: "2K",
    },
  });
  if (res.code !== 200) throw new Error(`Create task failed: ${JSON.stringify(res)}`);
  return res.data.taskId;
}

async function pollTask(taskId, label) {
  for (let attempt = 0; attempt < 40; attempt++) {
    await sleep(4000);
    const res = await get(`/api/v1/jobs/recordInfo?taskId=${taskId}`);
    const state = res?.data?.state;
    process.stdout.write(`\r  ${label}: ${state}${" ".repeat(10)}`);
    if (state === "success") {
      console.log();
      const result = JSON.parse(res.data.resultJson);
      return result.resultUrls[0];
    }
    if (state === "fail") throw new Error(`Task failed: ${taskId}`);
  }
  throw new Error(`Timed out: ${taskId}`);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // handle redirects
    function fetch(url) {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetch(res.headers.location);
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
        file.on("error", reject);
      }).on("error", reject);
    }
    fetch(url);
  });
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const imagesDir = path.join(__dirname, "public", "images");
  fs.mkdirSync(imagesDir, { recursive: true });

  console.log(`\nKie AI — generating ${IMAGES.length} images (nano-banana-2 · 2K)\n`);

  for (const img of IMAGES) {
    const dest = path.join(imagesDir, img.filename);
    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${img.filename} already exists, skipping`);
      continue;
    }

    console.log(`\n→ ${img.filename}  [${img.aspectRatio}]`);
    console.log(`  "${img.prompt.slice(0, 90)}..."`);

    const taskId = await createTask(img.prompt, img.aspectRatio);
    console.log(`  task: ${taskId}`);

    const imageUrl = await pollTask(taskId, img.filename);
    console.log(`  url: ${imageUrl.slice(0, 70)}...`);

    await downloadFile(imageUrl, dest);
    console.log(`  saved → public/images/${img.filename}`);
  }

  console.log("\n✓ All images done!\n");
  console.log("Update your components to use paths like: /images/hero-bg.jpg\n");
}

main().catch((err) => {
  console.error("\n✗ Error:", err.message);
  process.exit(1);
});
