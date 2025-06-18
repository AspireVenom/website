const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // npm install node-fetch@2

const GITHUB_USERNAME = 'AspireVenom'; // your GitHub username

router.get('/', async (req, res) => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await response.json();

    let projects = repos
      .filter(repo => !repo.fork)
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description provided.',
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count
      }));

    // Manually include SwipeToAdopt
    projects.push({
      name: 'SwipeToAdopt',
      description: 'Tinder-style pet adoption app using Rust + React.',
      url: 'https://www.swipetoadopt.org',
      language: 'Rust + React',
      stars: 532,
      forks: 2
    });

    projects.sort((a, b) => b.stars - a.stars);

    res.render('index', { projects });
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err);
    res.status(500).send('Error loading portfolio.');
  }
});

module.exports = router;

