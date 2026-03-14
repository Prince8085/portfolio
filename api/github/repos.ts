import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App"
    };

    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const url = token 
      ? "https://api.github.com/user/repos?visibility=all&sort=updated&per_page=100&affiliation=owner,collaborator"
      : "https://api.github.com/users/prince8085/repos?sort=updated&per_page=100";

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
}
