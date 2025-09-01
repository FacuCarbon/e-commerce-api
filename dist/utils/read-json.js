"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJson = readJson;
exports.writeJson = writeJson;
const fs_1 = require("fs");
const path = "./products.json";
async function readJson() {
    const fileContent = await fs_1.promises.readFile(path, "utf-8");
    return JSON.parse(fileContent);
}
async function writeJson(data) {
    await fs_1.promises.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}
