// Downloads every asset used by https://cobfoods.com/ into the namespaced public folders.
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PAGE = path.join(ROOT, "public/sites/cobfoods-com-3b75ee17/root-8a5edab2");
const SHARED = path.join(ROOT, "public/sites/cobfoods-com-3b75ee17/shared");
const F = "https://cobfoods.com/cdn/shop/files/";
const A = "https://cobfoods.com/cdn/shop/articles/";
const T = "https://cobfoods.com/cdn/shop/t/12/assets/";
const V = "https://cobfoods.com/cdn/shop/videos/c/vp/";

const images = [
  "COB_R2_coloring-16_1800x.jpg",
  "20260324_COB_ABatz_Capture_0372_v2_7_1800x.jpg",
  "20260324_COB_ABatz_Capture_0372_v2_7_1800x.png",
  "20260324_COB_ABatz_Capture_0907_v1_3_1800x.jpg",
  "3_26_1800x.png",
  "3_d5212864-0c89-4d72-b446-d2ca7b317c95_1800x.png",
  "4_6eda2655-59b5-44c4-9e30-ecf4e78477b9_1800x.png",
  "Cob_Popped-1oz_Renderings_OOPS-Front-1-1_1800x.png",
  "Cob_Popped-1oz_Renderings_OOPS-Front-2-1_1800x.png",
  "Cob_Popped-1oz_Renderings_OOPS-Front-3-1_1800x.png",
  "Cob_Popped-1oz_Renderings_OOPS-Front-4-1_1800x.png",
  "OOPS_Rollover_1800x.png",
  "COB_R2_coloring-18-SeriouslyCheesy_1800x.jpg",
  "CEP_Rollover_1800x.png",
  "MedHerb_Rollover_1800x.png",
  "sorghum-icon-1_576x.png",
  "sorghum-icon-2_576x.png",
  "sorghum-icon-3_576x.png",
  "sorghum-icon-4_576x.png",
  "COB-R2-coloring-21-2_c_1800x.jpg",
  "bon-appetit_576x.png",
  "food-wine_576x.png",
  "fast-company_576x.png",
  "BusinessInsider_Logo-CobBrown_1_1800x.png",
  "forbes_576x.png",
  "https___substack-post-media.s3.amazonaws.com_public_images_1920x1080_6de8463f-ccab-4fff-9061-5f38e155569f_576x.png",
  "eating-well_576x.png",
  "COB_Site_Chart_1_1800x.png",
  "COB-R2-coloring-03-2_c_1800x.jpg",
  "COB-R2-coloring-24_c_1800x.jpg",
].map((n) => ({ url: F + n, out: path.join(PAGE, "images", n) }));

const ugc = [
  ["ugc-aaron.jpg", "ugc-aaron.jpg?width=800"],
  ["ugc-taylor.jpg", "ugc-taylor.jpg?width=800"],
  ["Screenshot_2026-07-02_125659.png", "Screenshot_2026-07-02_125659.png?width=800"],
].map(([n, q]) => ({ url: F + q, out: path.join(PAGE, "images", n) }));

const articles = [
  "IMG_7827_f136faee-0761-4a7a-bc62-2c50f405995a_1800x.jpg",
  "IMG_7202_1800x.jpg",
  "COB-7848_520x500_b8cc295a-07b9-42cd-a2c8-883538b14c12_576x.jpg",
  "COB_BLOGUE01_1800x.jpg",
  "food-photographer-jennifer-pallian-XI_EJ7mtqZ8-unsplash_1800x.jpg",
  "frank-van-hulst-e8EKuVR8pt4-unsplash_1800x.jpg",
].map((n) => ({ url: A + n, out: path.join(PAGE, "images", n) }));

const themeAssets = [
  "icon-tennis.png", "popcorn-item.png", "popcorn-group-1.png", "popcorn-group-2.png",
  // url() references inside style.css (resolved against /cdn/shop/t/12/assets/)
  "a09a5f052e27b0b3ab76.svg", "f92d51c9a716a7a52bf4.svg", "9b4d45d789ab92ec863e.svg", "52114803d7af17908785.svg",
  "da5d0433449abcef59d8.png", "c9a7663b126147f16ef7.svg", "adc2988ceefec5089b36.svg", "988f59c0a2927dc9af8f.png",
  "8e20f6ff09ca22262655.svg", "7e3f2a10c6a2a5c6bd4c.svg", "692cf8ff08ae55ab8ebb.svg", "5f5c4e6a50f75814cd17.svg",
  "2bdbc3030231739fdc0e.svg", "2a74cea26bb474ee2749.svg", "128bb09d07dfb2053e18.png", "097e8e00d262cadaf71f.svg",
].map((n) => ({ url: T + n, out: path.join(SHARED, "theme", n) }));

const cssFiles = ["Group_145.svg", "Group_145_1.svg", "Group_145_3.svg", "Group_145_4.svg"].map((n) => ({
  url: F + n, out: path.join(SHARED, "theme", n),
}));

const fonts = [
  "font-ea9181547d67e56abd65.woff2", "font-facb02260a6c06cda6a4.woff",
  "font-69130470425c85950313.woff2", "font-59e6d72494ea2c749847.woff",
].map((n) => ({ url: T + n, out: path.join(SHARED, "fonts", n) }));

const videos = [
  ["https://cdn.shopify.com/videos/c/o/v/66a90b0f5d2e44f3bb218fbbd22e1364.mp4", "hero-novak.mp4"],
  [V + "e9f86bf0ad0648c286df00222bf61c50/e9f86bf0ad0648c286df00222bf61c50.HD-1080p-2.5Mbps-85723951.mp4", "ugc-aaron.mp4"],
  [V + "48390f95e2314d4890f93abb79d5eee4/48390f95e2314d4890f93abb79d5eee4.HD-1080p-7.2Mbps-87981957.mp4", "ugc-tss.mp4"],
  [V + "5c1648ce89eb463dbaf742da9d663c9f/5c1648ce89eb463dbaf742da9d663c9f.HD-1080p-2.5Mbps-85723949.mp4", "ugc-taylor.mp4"],
  [V + "107dbbb25a8a4ecf9c9b3398617fc84a/107dbbb25a8a4ecf9c9b3398617fc84a.HD-720p-2.1Mbps-85800372.mp4", "ugc-preview-107dbbb2.mp4"],
  [V + "94f6268e771d47f2bf18390eb86c810b/94f6268e771d47f2bf18390eb86c810b.HD-720p-3.0Mbps-85800143.mp4", "ugc-preview-94f6268e.mp4"],
].map(([url, n]) => ({ url, out: path.join(PAGE, "videos", n) }));

const seo = [
  ["https://cobfoods.com/cdn/shop/files/FAVICON_COB.png?crop=center&height=32&width=32", "favicon-32.png"],
  ["https://cobfoods.com/cdn/shop/files/FAVICON_COB.png?crop=center&height=180&width=180", "apple-touch-icon.png"],
  ["https://cobfoods.com/cdn/shop/files/Cob_Google-Search-Graphic.png?width=1200", "og-image.png"],
].map(([url, n]) => ({ url, out: path.join(SHARED, "seo", n) }));

const all = [...images, ...ugc, ...articles, ...themeAssets, ...cssFiles, ...fonts, ...videos, ...seo];

const exists = (p) => access(p).then(() => true, () => false);
async function get({ url, out }) {
  if (await exists(out)) return "skip";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await mkdir(path.dirname(out), { recursive: true });
      await writeFile(out, Buffer.from(await res.arrayBuffer()));
      return "ok";
    } catch (err) {
      if (attempt === 3) throw new Error(`${url}: ${err.message}`);
    }
  }
}

let ok = 0, skip = 0;
const failed = [];
for (let i = 0; i < all.length; i += 4) {
  const results = await Promise.allSettled(all.slice(i, i + 4).map(get));
  results.forEach((r) => {
    if (r.status === "rejected") failed.push(r.reason.message);
    else if (r.value === "skip") skip++;
    else ok++;
  });
}
console.log(`downloaded ${ok}, skipped ${skip}, failed ${failed.length}`);
failed.forEach((f) => console.log("FAILED", f));
