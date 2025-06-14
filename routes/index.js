router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.github.com/users/AspireVenom/repos?per_page=100",
    );
    const repos = response.data;

    let projects = repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "No description provided.",
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));

    projects.push({
      name: "SwipeToAdopt",
      description:
        "Tinder-style pet adoption app using Rust + React. Cached Petfinder API with infinite swipe UX.",
      url: "https://www.swipetoadopt.org",
      language: "Rust + React",
      stars: 503,
      forks: 2,
    });

    projects.sort((a, b) => b.stars - a.stars);

    res.render("index", { projects });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.render("index", { projects: [] });
  }
});
