const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const generatePdf = async (htmlContent, filename) => {
  const filePath = path.join(__dirname, '../output', filename);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Ensure output directory exists
  const outputDir = path.dirname(filePath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await page.pdf({
    path: filePath,
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  return filePath;
};

module.exports = { generatePdf };
