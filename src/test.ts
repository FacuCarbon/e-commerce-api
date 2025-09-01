import "dotenv/config";
import admin from "./firebase/admin";

console.log("Firebase apps:", admin.apps.length);
