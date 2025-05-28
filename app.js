const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.github.com/users/AspireVenom/repos?per_page=100",
    );

    const repos = response.data;

    const projects = repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "No description provided.",
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }))
      .sort((a, b) => b.stars - a.stars);

    res.render("index", { projects }); // ✅ This must be here
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.render("index", { projects: [] }); // fallback if fetch fails
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
