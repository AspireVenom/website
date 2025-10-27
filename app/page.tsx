import HighlightedProjects from '../components/HighlightedProjects';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo" id="navbar-logo">Douglas Alvarino</div>
      <button className="hamburger" id="hamburger" aria-label="Toggle Menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className="nav-links" id="nav-links">
        <li><a href="#landing">Back to top</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="mailto:douglitandres@gmail.com">Contact</a></li>
      </ul>
    </nav>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-aos="fade-up">
      <p>© {year} Douglas Alvarino</p>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/douglas-alvarino-881b94237" target="_blank" aria-label="LinkedIn" rel="noreferrer">
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="https://www.instagram.com/douglas.alvarino/" target="_blank" aria-label="Instagram" rel="noreferrer">
          <i className="fab fa-instagram"></i> Instagram
        </a>
      </div>
    </footer>
  );
}

type Project = {
  name: string;
  description: string;
  url: string;
  language?: string | null;
  stars: number;
  forks: number;
};

async function getProjects(): Promise<Project[]> {
  const username = 'AspireVenom';
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    // Enable static generation at build time
    next: { revalidate: 3600 },
    // GitHub API allows unauthenticated reads for public repos; keep it simple
  });
  const repos = await res.json();
  let projects: Project[] = Array.isArray(repos)
    ? repos
        .filter((repo: any) => !repo.fork)
        .map((repo: any) => ({
          name: repo.name,
          description: repo.description || 'No description provided.',
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        }))
    : [];

  projects.push({
    name: 'SwipeToAdopt',
    description: 'Tinder-style pet adoption app using Rust + React.',
    url: 'https://www.swipetoadopt.org',
    language: 'Rust + React',
    stars: 532,
    forks: 2,
  });

  projects.sort((a, b) => b.stars - a.stars);
  return projects;
}

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      {/* Highlighted projects component imported above usage */}
      <header id="landing" className="landing">
        <div className="intro">
          <div className="terminal-line" id="line1-container">
            <span className="prompt">&gt; </span><span id="line1"></span>
          </div>
          <div className="terminal-line" id="line2-container" style={{ opacity: 0 }}>
            <span className="prompt">&gt; </span><span id="line2"></span>
          </div>
          <span className="cursor" id="cursor">_</span>
        </div>
        <div className="scroll-cue" id="scroll-cue">↓</div>
      </header>

      <Navbar />

      <main>
        <section id="about" data-aos="fade-up">
          <div className="about-card">
            <h2>About Me</h2>
            <p>
              I&apos;m Douglas Alvarino — a product developer and cybersecurity student with over three years of hands-on
              experience in software engineering, specializing in Python, JavaScript, and AI training systems. My background
              combines technical support, agile development, and real-world application of data analysis to
              drive both product quality and user engagement. From building Elo-based sports analytics tools to contributing
              to open-source machine learning projects, I&apos;m passionate about delivering innovative solutions that bridge data
              and usability. With a strong foundation in troubleshooting, project management, and secure
              systems, I&apos;m committed to evolving as a developer who builds resilient, intelligent, and user-focused technology.
            </p>
          </div>
        </section>

        <section id="strengths" data-aos="fade-up">
          <div className="strengths-wrapper">
            <div className="strength-card">
              <h3>Rust Systems</h3>
              <p>I develop high-throughput backend systems in Rust using Axum, implementing features such as API response caching, asynchronous task orchestration, and multithreaded data pipelines.</p>
            </div>
            <div className="strength-card">
              <h3>AI & Tooling</h3>
              <p> Engineered machine learning–powered developer tools, including an AI-driven Neovim plugin leveraging LLMs for contextual code understanding and inline diff visualization.</p>
            </div>
          </div>

          <div className="strengths-pathline">
            <div className="dot"></div>
            <div className="line"></div>
            <div className="arrow">↓</div>
          </div>
        </section>

        <h2 className="experience-headline" data-aos="fade-down" data-aos-duration="1000">Experience</h2>
        <div className="experience-roadmap" data-aos="fade-up">
          <div className="exp-card">
            <div className="exp-header">
              <div className="exp-dot"></div>
              <div>
                <h3>Junior Software Engineer</h3>
                <span className="exp-company">EOS Fitness, Tampa, FL</span>
              </div>
            </div>
            <div className="exp-timeline">
              <div className="exp-item">
                <div className="exp-dot"></div>
                <div className="exp-desc">Implemented automated SMS/email reminders that increased client return rates by <span className="exp-highlight">25%</span></div>
              </div>
              <div className="exp-item">
                <div className="exp-dot"></div>
                <div className="exp-desc">Drove <span className="exp-highlight">15%</span> boost in event attendance through multi-channel outreach strategies</div>
              </div>
              <div className="exp-item">
                <div className="exp-dot"></div>
                <div className="exp-desc">Reduced scheduling complaints by <span className="exp-highlight">40%</span> by optimizing calendar software usage</div>
              </div>
              <div className="exp-item">
                <div className="exp-dot"></div>
                <div className="exp-desc">Created goal-specific programs that led to <span className="exp-highlight">80+</span> client sign-ups in Q1 2025</div>
              </div>
            </div>
            <div className="exp-to-skills">
              <div className="exp-line"></div>
              <div className="exp-arrow">↓</div>
            </div>
          </div>
        </div>

        <div className="resume-right">
          <h2 className="skills-headline">Skills</h2>
          <div className="skills-filter" id="skills-filter">
            <button className="filter-btn" data-filter="all">All Skills</button>
            <button className="filter-btn active" data-filter="programming">Programming</button>
            <button className="filter-btn" data-filter="tools">Tools & Frameworks</button>
            <button className="filter-btn" data-filter="soft">Soft Skills</button>
          </div>
          <div className="skills-visualization">
            <div className="skills-carousel" id="skills-carousel" style={{ display: 'none' }}>
              <button className="carousel-arrow left" id="carousel-left">←</button>
              <div className="carousel-skill-card-wrapper"></div>
              <button className="carousel-arrow right" id="carousel-right">→</button>
            </div>
            <div className="skills-categories" id="skills-categories">
              <div className="skill-category" data-category="programming">
                <h3><i className="fas fa-code"></i> Programming</h3>
                <div className="skill-grid">
                  <div className="skill-card" data-skill="Python" data-level="90" data-projects="EloSystem, SMS Automator">
                    <div className="skill-header">
                      <span className="skill-name">Python</span>
                      <span className="skill-level">90%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="90"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: EloSystem, SMS Automator</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="JavaScript" data-level="85" data-projects="AI Trainer, Portfolio">
                    <div className="skill-header">
                      <span className="skill-name">JavaScript</span>
                      <span className="skill-level">85%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="85"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: AI Trainer, Portfolio</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="TypeScript" data-level="75" data-projects="SwipeToAdopt">
                    <div className="skill-header">
                      <span className="skill-name">TypeScript</span>
                      <span className="skill-level">75%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="75"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: SwipeToAdopt</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="Rust" data-level="80" data-projects="SwipeToAdopt">
                    <div className="skill-header">
                      <span className="skill-name">Rust</span>
                      <span className="skill-level">80%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="80"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: SwipeToAdopt</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="C" data-level="70" data-projects="Systems Programming">
                    <div className="skill-header">
                      <span className="skill-name">C</span>
                      <span className="skill-level">70%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="70"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: Systems Programming</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skill-category" data-category="tools">
                <h3><i className="fas fa-tools"></i> Tools & Frameworks</h3>
                <div className="skill-grid">
                  <div className="skill-card" data-skill="React" data-level="85" data-projects="SwipeToAdopt, AI Trainer">
                    <div className="skill-header">
                      <span className="skill-name">React</span>
                      <span className="skill-level">85%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="85"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: SwipeToAdopt, AI Trainer</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="Firebase" data-level="80" data-projects="AI Trainer">
                    <div className="skill-header">
                      <span className="skill-name">Firebase</span>
                      <span className="skill-level">80%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="80"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: AI Trainer</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="PyTorch" data-level="75" data-projects="EloSystem">
                    <div className="skill-header">
                      <span className="skill-name">PyTorch</span>
                      <span className="skill-level">75%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="75"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: EloSystem</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="Git" data-level="90" data-projects="All Projects">
                    <div className="skill-header">
                      <span className="skill-name">Git</span>
                      <span className="skill-level">90%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="90"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Used in: All Projects</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skill-category" data-category="soft">
                <h3><i className="fas fa-users"></i> Soft Skills</h3>
                <div className="skill-grid">
                  <div className="skill-card" data-skill="Agile Methodologies" data-level="85" data-projects="Team Projects">
                    <div className="skill-header">
                      <span className="skill-name">Agile</span>
                      <span className="skill-level">85%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="85"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Applied in: Team Projects</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="Project Management" data-level="80" data-projects="All Projects">
                    <div className="skill-header">
                      <span className="skill-name">Project Management</span>
                      <span className="skill-level">80%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="80"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Applied in: All Projects</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="Problem Solving" data-level="90" data-projects="All Projects">
                    <div className="skill-header">
                      <span className="skill-name">Problem Solving</span>
                      <span className="skill-level">90%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="90"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Applied in: All Projects</small>
                    </div>
                  </div>
                  <div className="skill-card" data-skill="AI Training" data-level="75" data-projects="EloSystem">
                    <div className="skill-header">
                      <span className="skill-name">AI Training</span>
                      <span className="skill-level">75%</span>
                    </div>
                    <div className="skill-progress">
                      <div className="progress-bar" data-progress="75"></div>
                    </div>
                    <div className="skill-projects">
                      <small>Applied in: EloSystem</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HighlightedProjects />

        <section id="projects">
          <h2 data-aos="fade-up">Projects</h2>
          <div className="project-scroll-wrapper">
            <div className="project-grid">
              {projects.map((project) => (
                <div className="project-card" key={project.name}>
                  <h3><a href={project.url} target="_blank" rel="noreferrer">{project.name}</a></h3>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    {project.language ? (
                      <span><i className="fas fa-code"></i> {project.language}</span>
                    ) : null}
                    <span><i className="fas fa-star"></i> {project.stars}</span>
                    <span><i className="fas fa-code-branch"></i> {project.forks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="snake-modal" style={{display:'none', position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(10,20,20,0.97)', zIndex:9999, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <button id="snake-close" style={{position:'absolute', top:'2rem', right:'2rem', fontSize:'2rem', background:'none', border:'none', color:'#00ff00', cursor:'pointer'}}>&times;</button>
          <h2 style={{color:'#00ff00', marginBottom:'1rem'}}>🐍 Snake Game</h2>
          <canvas id="snake-canvas" width="400" height="400" style={{background:'#111', border:'2px solid #00ff00', borderRadius:'12px', maxWidth:'90vw', height:'auto'}}></canvas>
          <div id="snake-dpad" style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'1.2rem', gap:'0.3rem'}}>
            <div style={{display:'flex', justifyContent:'center', gap:'1.2rem'}}>
              <button className="snake-dpad-btn" data-direction="up" aria-label="Up">▲</button>
            </div>
            <div style={{display:'flex', justifyContent:'center', gap:'1.2rem'}}>
              <button className="snake-dpad-btn" data-direction="left" aria-label="Left">◀</button>
              <button className="snake-dpad-btn" data-direction="down" aria-label="Down">▼</button>
              <button className="snake-dpad-btn" data-direction="right" aria-label="Right">▶</button>
            </div>
          </div>
          <p style={{color:'#b6fcd5', marginTop:'1rem'}}>Use arrow keys, WASD, swipe, or tap the arrows. Press Esc or × to close.</p>
        </div>

        <Footer />
      </main>
    </>
  );
}


