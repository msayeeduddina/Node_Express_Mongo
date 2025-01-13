const crypto = require("crypto");
const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const mime = require("mime-types");

const paths = {
  originalFile: path.join(__dirname, "files/wallpaperOrg.jpg"),
  encodedFile: path.join(__dirname, "encodedFiles/encoded_document.txt"),
  remoteFileUrl:
    "https://web3unplugged.io/wp-content/uploads/2024/01/Web3-Fundamentals.pdf",
  remoteEncodedFile: path.join(
    __dirname,
    "encodedFiles/url_encoded_document.txt"
  ),
  decodedDir: path.join(__dirname, "TencentCloudFiles"),
};

function getExtensionFromContentType(contentType) {
  const mimeTypes = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf",
    "audio/mpeg": "mp3",
    "application/zip": "zip",
    // Add more MIME types as needed
  };
  return mimeTypes[contentType] || "bin"; // Default to 'bin' if unknown
}

async function generateSha256Hash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

async function encodeToFile(inputPath, outputPath) {
  try {
    const data = await fs.readFile(inputPath);
    const base64Data = data.toString("base64");
    const sha256Hash = await generateSha256Hash(base64Data);
    const mimeType = mime.lookup(inputPath) || "application/octet-stream";
    const extension = getExtensionFromContentType(mimeType);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, base64Data);
    console.log(`SHA-256 Hash: ${sha256Hash}`);
    return { sha256Hash, extension };
  } catch (error) {
    console.error(`Error encoding file from ${inputPath}:`, error);
  }
}

async function decodeFromFile(encodedPath, outputDir, fileName) {
  try {
    const base64Data = await fs.readFile(encodedPath, "utf-8");
    const buffer = Buffer.from(base64Data, "base64");
    const outputPath = path.join(outputDir, fileName);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, buffer);
    console.log(`Decoded file saved as: ${outputPath}`);
  } catch (error) {
    console.error(`Error decoding file from ${encodedPath}:`, error);
  }
}

async function fetchAndEncodeFile(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"];
    const extension = getExtensionFromContentType(contentType);
    const base64Data = Buffer.from(response.data).toString("base64");
    const sha256Hash = await generateSha256Hash(base64Data);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, base64Data);
    console.log(`Fetched file SHA-256 Hash: ${sha256Hash}`);
    return { sha256Hash, extension };
  } catch (error) {
    console.error(`Error fetching and encoding file from ${url}:`, error);
  }
}

(async () => {
  const localData = await encodeToFile(paths.originalFile, paths.encodedFile);
  if (localData) {
    const { sha256Hash, extension } = localData;
    await decodeFromFile(
      paths.encodedFile,
      paths.decodedDir,
      `${sha256Hash}.${extension}`
    );
  }

  const remoteData = await fetchAndEncodeFile(
    paths.remoteFileUrl,
    paths.remoteEncodedFile
  );
  if (remoteData) {
    const { sha256Hash, extension } = remoteData;
    await decodeFromFile(
      paths.remoteEncodedFile,
      paths.decodedDir,
      `${sha256Hash}.${extension}`
    );
  }
})();
