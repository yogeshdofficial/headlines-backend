import "dotenv/config";
import Parser from "rss-parser";
import { access, mkdir, writeFile } from "fs/promises";
import { info, logError } from "./utils/loggers";
import { feedLinks } from "./constants/feedLinks";

const parser = new Parser();

async function writeObjToFile(filename: string, jsonFeed: any) {
  try {
    await writeFile(filename, JSON.stringify(jsonFeed));
  } catch (error) {
    console.error("CUSTOM ERROR>>>", error);
  }
}

async function rssToObj(url: string) {
  try {
    const jsonFeed = await parser.parseURL(url);
    info(`${url} ✅`);
    return jsonFeed;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    reportError({ message });
    logError(`${url} ❌`);
    return {};
  }
}

async function checkIfFolderExists(folderName: string) {
  let fileExists: boolean;
  try {
    await access(folderName);
    fileExists = true;
  } catch {
    // logError(error);
    fileExists = false;
  }
  return fileExists;
}

async function createFolder(folderName: string) {
  info("creating folder", folderName);

  await mkdir(folderName);
}

async function main() {
  const ifFeedsFolderExist = await checkIfFolderExists("feeds");
  if (!ifFeedsFolderExist) {
    await createFolder("feeds");
  }
  const writeOperations = [];
  for (const category of Object.values(feedLinks)) {
    for (const feed of category) {
      const jsonFeed = await rssToObj(feed.url);
      writeOperations.push(writeObjToFile("feeds/" + feed.fileName, jsonFeed));
    }
  }
  try {
    await Promise.all(writeOperations);
    console.log("All files written");
  } catch (error) {
    console.error("Error writing multiple files:", error);
  }
}

main();
