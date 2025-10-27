export default function HighlightedProjects() {
  return (
    <section id="highlight-projects" className="highlighted-fade-in">
      <h2 className="section-title">Highlighted Projects</h2>
      <div className="highlight-carousel">
        <div className="carousel-track">
          <div className="highlight-node">
            <h3>SwipeToAdopt</h3>
            <p>A Rust + React pet adoption app with Tinder-style UI used by 50+ users during pilot.</p>
            <ul className="flow-tools">
              <li>Rust</li>
              <li>React</li>
              <li>Axum</li>
              <li>Petfinder API</li>
              <li>Infinite Scrolling</li>
            </ul>
            <a href="https://swipetoadopt.org" target="_blank" className="highlight-btn" rel="noreferrer">Visit Site</a>
          </div>

          <div className="highlight-node">
            <h3>AI Trainer</h3>
            <p>Gamified fitness dashboard that boosted retention 30% with task leveling.</p>
            <ul className="flow-tools">
              <li>React</li>
              <li>Firebase</li>
              <li>Auth</li>
              <li>Gamification</li>
              <li>Leveling UX</li>
            </ul>
            <a href="https://github.com/AspireVenom/AI_Trainer" target="_blank" className="highlight-btn" rel="noreferrer">View GitHub</a>
          </div>

          <div className="highlight-node">
            <h3>EloSystem</h3>
            <p>ML-powered Elo ratings with 72% prediction accuracy across 1,500+ MLB games.</p>
            <ul className="flow-tools">
              <li>Python</li>
              <li>PyTorch</li>
              <li>Matplotlib</li>
              <li>Elo Algorithms</li>
              <li>ML Model Tuning</li>
            </ul>
            <a href="https://github.com/AspireVenom/EloSystem" target="_blank" className="highlight-btn" rel="noreferrer">View GitHub</a>
          </div>

          <div className="highlight-node">
            <h3>SMS Automator</h3>
            <p>Automated 500+ reminders using Python scripts, saving 20+ hours/month.</p>
            <ul className="flow-tools">
              <li>Python</li>
              <li>Twilio API</li>
              <li>CRON Jobs</li>
              <li>Text Templates</li>
              <li>Async Scheduling</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="carousel-controls">
        <button id="carousel-prev" className="carousel-button">← Prev</button>
        <button id="carousel-next" className="carousel-button">Next →</button>
      </div>
    </section>
  );
}


