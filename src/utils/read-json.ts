import fs from "fs";

export default function readJson(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
