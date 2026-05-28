const mod = require("png-to-ico");
const pngToIco = mod.default || mod;
const fs = require("node:fs/promises");

(async () => {
  const ico = await pngToIco([
    "public/favicons/favicon-16x16.png",
    "public/favicons/favicon-32x32.png",
    "public/favicons/favicon-48x48.png",
  ]);
  await fs.writeFile("public/favicon.ico", ico);
  console.log("favicon.ico OK:", ico.length, "bytes");
})();
