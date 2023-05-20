const puppeteer = require("puppeteer");

const STUDENT = [
  "645162010001",
  "645162010002",
  "645162010003",
  "645162010004",
];

async function generateImage() {
  const selector = "body";
  try {
    STUDENT.forEach(async (id) => {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      //check 3000 or 3001!!!!!!
      await page.goto(`http://localhost:3001/student/${id}`, {
        waitUntil: "domcontentloaded",
      });
      await page.waitForNavigation({ waitUntil: "networkidle0" });
      // await page.waitForFunction(`document.querySelector("${selector}") != 0`, {
      //   timeout: 10_000,
      // });
      await page.waitForSelector(selector);
      await page.setViewport({ width: 600, height: 400 });
      await page.screenshot({ path: `./certificate/images/${id}.png` });
      await browser.close();
    });
  } catch (e) {
    console.log(e);
  }
}

generateImage();
