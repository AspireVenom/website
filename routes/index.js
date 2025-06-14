const projects = repos
  .filter(repo => !repo.fork)
  .map(repo => ({
    name: repo.name,
    description: repo.description || 'No description provided.',
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count
  }));

// Manually add SwipeToAdopt to top visibility
projects.push({
  name: 'SwipeToAdopt',
  description: 'Tinder-style pet adoption app using Rust + React.',
  url: 'https://www.swipetoadopt.org',
  language: 'Rust + React',
  stars: 532,
  forks: 2
});

// Sort by stars descending to highlight popular work
projects.sort((a, b) => b.stars - a.stars);

// Render view with enriched projects list
res.render('index', { projects });

