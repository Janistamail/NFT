import { ThirdwebStorage } from "@thirdweb-dev/storage";
import fs from "fs";
import puppeteer from "puppeteer";
const storage = new ThirdwebStorage({
  secretKey:
    "5Mz2brz6QzoFv54eFPxnxSd3nPmY9FZWUlzC0GO-_q0XpQlLj5PqV-jWkUOrgcx1HwWKLUrLkpmQCVkr4UbCnA",
});

export default async function handler(req, res) {
  //sendrequest in hooks = tell detail, in api = real call BN
  const imagesDir = "./utils/imageGenerator/certificates";

  function createMetadata(name, imgUrl) {
    return {
      name: name,
      description: name,
      image: imgUrl,
    };
  }
  try {
    if (req.method === "POST") {
      const { student_id } = req.body;
      const selector = "body";
      try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        //check 3000 or 3001!!!!!!
        await page.goto(`http://localhost:3001/student/${student_id}`, {
          waitUntil: "domcontentloaded",
        });
        await page.waitForNavigation({ waitUntil: "networkidle0" });
        // await page.waitForFunction(`document.querySelector("${selector}") != 0`, {
        //   timeout: 10_000,
        // });
        await page.waitForSelector(selector);
        await page.setViewport({ width: 600, height: 400 });
        await page.screenshot({
          path: `${imagesDir}/${student_id}.png`,
        });
        await browser.close();

        //-----------------------------
        const file = `${student_id}.png`;
        const data = {};

        // (1) upload image to IPFS
        const uploadImg = await storage.upload(
          fs.readFileSync(`${imagesDir}/${file}`)
        );
        const imgUrl = storage.resolveScheme(uploadImg);

        // (2) create metadata and save as JSON file
        const jsonDir = "./utils/imageGenerator/json";
        const fileName = file.split(".")[0];
        const metadata = createMetadata(fileName, imgUrl);
        fs.writeFileSync(
          `${jsonDir}/${fileName}.json`,
          JSON.stringify(metadata, null, 2)
        );
        // (3) Upload metadata to IPFS
        const uploadMetadata = await storage.upload(
          fs.readFileSync(`${jsonDir}/${fileName}.json`)
        );
        const metadataUrl = storage.resolveScheme(uploadMetadata);
        data[fileName] = metadataUrl;
        res.status(200).send(data);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    res.status(400).send(e);
  }
}
