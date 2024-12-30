const crypto = require("crypto");
const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");

const originalFilePath = path.join(__dirname, "files/wallpaperDup.jpg");
const encodedFilePath = path.join(
  __dirname,
  "encodedFiles/encoded_document.txt"
);
const decodedFilePath = path.join(
  __dirname,
  "decodedFiles/decoded_document.jpg"
);
const url =
  "https://web3unplugged.io/wp-content/uploads/2024/01/Web3-Fundamentals.pdf";
const urlEncodedFilePath = path.join(
  __dirname,
  "encodedFiles/url_encoded_document.txt"
);
const urlDecodedFilePath = path.join(
  __dirname,
  "decodedFiles/url_encoded_document"
);

async function encodeFile(inputFilePath, outputFilePath) {
  try {
    const fileBuffer = await fs.readFile(inputFilePath);
    const base64File = fileBuffer.toString("base64");
    const sha256Hash = crypto
      .createHash("sha256")
      .update(base64File)
      .digest("hex");
    console.log(`Local Fie SHA-256 Hash of Base64: ${sha256Hash}`);
    const outputDir = path.dirname(outputFilePath);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputFilePath, base64File);
  } catch (error) {
    console.error("Error encoding the file:", error);
  }
}

async function decodeFile(encodedFilePath, outputFilePath) {
  try {
    const base64File = await fs.readFile(encodedFilePath, "utf-8");
    const fileBuffer = Buffer.from(base64File, "base64");
    const outputDir = path.dirname(outputFilePath);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputFilePath, fileBuffer);
  } catch (error) {
    console.error("Error decoding the file:", error);
  }
}

async function fetchAndEncode(url, outputFilePath) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64File = Buffer.from(response.data).toString("base64");
    const sha256Hash = crypto
      .createHash("sha256")
      .update(base64File)
      .digest("hex");
    console.log(`URL File SHA-256 Hash of Base64: ${sha256Hash}`);
    const outputDir = path.dirname(outputFilePath);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputFilePath, base64File);
    const contentType = response.headers["content-type"];
    const extension = getExtensionFromContentType(contentType);
    return { base64File, decodedFilePath: `${outputFilePath}.${extension}` };
  } catch (error) {
    console.error("Error fetching or encoding the file:", error);
  }
}

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

(async () => {
  await encodeFile(originalFilePath, encodedFilePath);
  await decodeFile(encodedFilePath, decodedFilePath);
  const { base64File, decodedFilePath: urlDecodedFilePath } =
    await fetchAndEncode(url, urlEncodedFilePath);
  if (base64File) {
    await decodeFile(urlEncodedFilePath, urlDecodedFilePath);
  }
})();
