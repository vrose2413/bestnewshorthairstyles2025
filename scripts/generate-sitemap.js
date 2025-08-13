const fs = require("fs");
const path = require("path");
const glob = require("glob");

const baseUrl = "https://bestnewshorthairstyles2025.pages.dev"; // ✅ Replace with your real URL
const pagesDir = path.join(__dirname, "../pages");
const postsDir = path.join(__dirname, "../posts"); // ✅ Markdown posts folder

function generateSitemap() {
  // 1. Static Pages (excluding dynamic)
  const pagePaths = glob.sync("**/*.js", {
    cwd: pagesDir,
    ignore: [
      "_*.js",         // Ignore _app.js, _document.js
      "**/[[]*[]].js", // Ignore dynamic routes like [slug].js
      "api/**"         // Ignore API routes
    ]
  });

  const pageUrls = pagePaths.map((file) => {
    const route = file
      .replace(/\.js$/, "")
      .replace(/index$/, "")
      .replace(/\\/g, "/");

    return `${baseUrl}/${route}`;
  });

  // 2. Blog Posts (Markdown in /posts)
  let postUrls = [];
  if (fs.existsSync(postsDir)) {
    const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith(".md"));
    postUrls = postFiles.map(file => {
      const slug = file.replace(/\.md$/, "");
      return `${baseUrl}/blog/${slug}`;
    });
  }

  // 3. Combine all URLs
  const allUrls = [...pageUrls, ...postUrls];

  // 4. Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    )
    .join("\n")}
</urlset>`;

  // 5. Save to /out
  const outDir = path.join(__dirname, "../out");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
  console.log("✅ sitemap.xml generated with", allUrls.length, "URLs!");
}

generateSitemap();
