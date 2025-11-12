import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const mockupsDir = path.join(root, "public", "assets", "portfolio", "mockups");

async function optimizeMockups() {
  const entries = await fs.readdir(mockupsDir);
  const pngFiles = entries.filter((file) => file.toLowerCase().endsWith(".png"));

  if (pngFiles.length === 0) {
    console.log("Nenhum PNG encontrado para otimizar.");
    return;
  }

  for (const file of pngFiles) {
    const sourcePath = path.join(mockupsDir, file);
    const baseName = path.basename(file, path.extname(file));
    const targetPath = path.join(mockupsDir, `${baseName}.webp`);

    console.log(`Convertendo ${file} → ${baseName}.webp...`);
    await sharp(sourcePath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(targetPath);

    await fs.unlink(sourcePath);
  }

  console.log("Conversão concluída.");
}

optimizeMockups().catch((error) => {
  console.error("Erro ao otimizar mockups:", error);
  process.exitCode = 1;
});
