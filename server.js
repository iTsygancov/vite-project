import dotenv from "dotenv";
import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ViteExpress from "vite-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const env = dotenv.config();
const isProduction = env.parsed.NODE_ENV === "production";

if (isProduction) {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));
} else {
  app.use(express.static(__filename));
}
app.use(express.json());

const jsonFilePath = path.join(__dirname, "mock", "data.json");
const jsonData = await readFile(jsonFilePath, "utf8");
const data = JSON.parse(jsonData) || { items: [] };

app.get("/api/items", async (_, res) => {
  try {
    res.json(data);
  } catch (error) {
    console.error("Error reading data from JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getItem/:id", async (req, res) => {
  const itemId = req.params.id;
  const item = data.items.find((item) => item.id === itemId);
  res.json(item);
});

app.post("/api/addItem", (req, res) => {
  const newItem = req.body;
  newItem.id = (data.items.length + 1).toString();
  data.items.push(newItem);
  res.json({ message: "Item added successfully" });
});

app.delete("/api/deleteItem/:id", (req, res) => {
  const itemId = req.params.id;
  data.items = data.items.filter((item) => item.id !== itemId);
  res.json({ message: "Item deleted successfully" });
});

app.put("/api/editItem/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  data.items = data.items.map((item) => {
    if (item.id === itemId) {
      return { ...item, ...updatedItem };
    }
    return item;
  });
  res.json({ message: "Item edited successfully" });
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
