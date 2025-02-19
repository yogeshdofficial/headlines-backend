"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const rss_parser_1 = __importDefault(require("rss-parser"));
const promises_1 = require("fs/promises");
const feedLinks = [
    { filename: "news_bbc", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
];
const parser = new rss_parser_1.default();
function writeObjToFile(filename, jsonFeed) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, promises_1.writeFile)(filename, JSON.stringify(jsonFeed));
        }
        catch (error) {
            console.error("CUSTOM ERROR>>>", error);
        }
    });
}
function urlToJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonFeed = yield parser.parseURL(url);
        // console.log(feed.title);
        return jsonFeed;
    });
}
function checkIfFolderExists(folderName) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileExists;
        try {
            yield (0, promises_1.access)("feeds");
            fileExists = true;
        }
        catch (error) {
            console.log(error);
            fileExists = false;
        }
        return fileExists;
    });
}
function createFolder(folderName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("creating folder", folderName);
        try {
            yield (0, promises_1.mkdir)(folderName);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const ifFeedsFolderExist = yield checkIfFolderExists("feeds");
        console.log("🚀 ~ main ~ ifFeedsFolderExist:", ifFeedsFolderExist);
        if (!ifFeedsFolderExist) {
            yield createFolder("feeds");
        }
        // console.log(ifFeedsFolderExist);
        // for (const feedLink of feedLinks) {
        //   writeToFile(feedLink.filename, jsonFeed);
        // }
        const writeOperations = feedLinks.map((feedLink) => {
            const jsonFeed = urlToJson(feedLink.url);
            writeObjToFile("feeds/" + feedLink.filename, jsonFeed);
        });
        try {
            yield Promise.all(writeOperations);
            console.log("All files written");
        }
        catch (error) {
            console.error("Error writing multiple files:", error);
        }
    });
}
main();
// urlToJson("http://feeds.bbci.co.uk/news/world/rss.xml");
