const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.github.com/users/AspireVenom/repos?per_page=100'
    );
    const repos = response.data;

    const projects = repos
      .filter(repo => !repo.fork)
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description provided.',
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.render('index', { projects });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.render('index', { projects: [] });
  }
});

module.exports = router;
