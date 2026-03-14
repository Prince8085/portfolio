import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/github/repos", async (req, res) => {
    try {
      const token = process.env.GITHUB_TOKEN;
      const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App"
      };

      if (token) {
        headers["Authorization"] = `token ${token}`;
      }

      // Fetch repos for the authenticated user if token is present, otherwise fetch public repos for prince8085
      const url = token 
        ? "https://api.github.com/user/repos?visibility=all&sort=updated&per_page=100&affiliation=owner,collaborator"
        : "https://api.github.com/users/prince8085/repos?sort=updated&per_page=100";

      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ error: "Failed to fetch repositories" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
