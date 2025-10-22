import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

type Project = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
};

async function getProjects(): Promise<Project[]> {
  const GITHUB_USERNAME = "AspireVenom";
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
    // Force dynamic to avoid caching of sensitive data
    cache: "no-store",
    headers: { "Accept": "application/vnd.github+json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return [] as Project[];
  const repos: Array<{
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
  }> = await res.json();
  const projects: Project[] = repos
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
    description: "Tinder-style pet adoption app using Rust + React.",
    url: "https://www.swipetoadopt.org",
    language: "Rust + React",
    stars: 532,
    forks: 2,
  });
  return projects.sort((a, b) => b.stars - a.stars);
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <header id="landing" className="landing">
        <div className="intro">
          <div className="terminal-line" id="line1-container">
            <span className="prompt">&gt; </span><span id="line1"></span>
          </div>
          <div className="terminal-line" id="line2-container" style={{opacity: 0}}>
            <span className="prompt">&gt; </span><span id="line2"></span>
          </div>
          <span className="cursor" id="cursor">_</span>
        </div>
        <div className="scroll-cue" id="scroll-cue">↓</div>
        <a href={process.env.NODE_ENV === "production" ? (process.env.NEXT_PUBLIC_BLOG_ORIGIN ?? "https://blog.dalvarino.net") : "/blog"} className="blog-cue" aria-label="Blog">
          <i className="fas fa-blog icon" aria-hidden="true"></i><span className="label"> Blog</span>
        </a>
      </header>
      <Header />
      <main>
        <section id="about" data-aos="fade-up">
          <div className="about-card">
            <div className="about-grid">
              <div className="about-left">
              <h2>About Me</h2>
              <p className="about-summary">
                Full-Stack AI Engineer with nearly 4 years building and scaling distributed systems and AI-driven products. Proven leader in startup founding, team management, and delivering enterprise-grade solutions with 99.9% uptime. I integrate Generative AI into real-world applications, optimize developer velocity, and have scaled platforms to 50,000+ users.
              </p>
              <div className="stat-badges">
                <span className="badge">~4 yrs</span>
                <span className="badge">99.9% uptime</span>
                <span className="badge">50k+ users</span>
                <span className="badge">GenAI + RAG</span>
                <span className="badge">Next.js + TS</span>
              </div>

              
              </div>

              <aside className="about-right">
              <div className="about-edu">
                <h3>Education</h3>
                <p className="edu-school">University of South Florida • Tampa, FL</p>
                <p className="edu-degree">B.S. in Cybersecurity, Minor in Mathematics</p>
                <p className="edu-time">Aug 2023 – Present</p>
                <p className="edu-courses">Relevant Coursework</p>
                <ul className="edu-list">
                  <li>Discrete Mathematics</li>
                  <li>Data Structures</li>
                  <li>Computer Systems</li>
                  <li>Linear Algebra</li>
                  <li>Cryptography</li>
                </ul>
              </div>
              </aside>
            </div>
            
            <h3 className="section-subtitle">Experience Highlights</h3>
            <div className="about-experience">
              <article className="about-exp-card">
                  <header className="about-exp-header">
                    <div>
                      <h4>Founder & Full-Stack Engineer</h4>
                      <span className="about-exp-meta">JamJuice Inc. — Music Tech Startup • Remote</span>
                    </div>
                    <span className="about-exp-time">Jan 2023 – Present</span>
                  </header>
                  <ul className="about-exp-list">
                    <li>Built MVP from 0→1 and scaled releases 1→5 using Next.js + TypeScript + MongoDB (99% uptime).</li>
                    <li>Shipped admin dashboards with Linear + Datadog, cutting bug resolution time by 40%.</li>
                    <li>Launched features with Inngest background jobs, reducing MTTR by 30%.</li>
                    <li>Lead development and product roadmap execution.</li>
                  </ul>
              </article>

              <article className="about-exp-card">
                  <header className="about-exp-header">
                    <div>
                      <h4>Advisory Full-Stack Engineer</h4>
                      <span className="about-exp-meta">OnlyFollowers — Creator Platform • Remote</span>
                    </div>
                    <span className="about-exp-time">Sept 2025 – Present</span>
                  </header>
                  <ul className="about-exp-list">
                    <li>Contributed to secure, server-first platform with subscriptions and live streaming.</li>
                    <li>Implemented LiveKit (WebRTC), JWT APIs, and role-based auth.</li>
                    <li>Advised on Prisma + Neon Postgres, strict TS, and CI/CD pipelines.</li>
                  </ul>
              </article>

              <article className="about-exp-card">
                  <header className="about-exp-header">
                    <div>
                      <h4>CTO & Full-Stack Engineer</h4>
                      <span className="about-exp-meta">Styloop — Property Styling (Closed) • Remote</span>
                    </div>
                    <span className="about-exp-time">Jul 2024 – Sept 2025</span>
                  </header>
                  <ul className="about-exp-list">
                    <li>Led a scalable platform with React (TS + MUI), FastAPI, and PostgreSQL.</li>
                    <li>Integrated Azure Cognitive Services + GenAI for tagging and recommendations.</li>
                    <li>Set up CI/CD (GitHub Actions, Vercel Pipelines) and Docker builds to AWS ECR.</li>
                    <li>Maintained 99.9% uptime with Vercel Analytics, App Insights, and CloudWatch.</li>
                  </ul>
              </article>

              <article className="about-exp-card">
                  <header className="about-exp-header">
                    <div>
                      <h4>Founder & Full-Stack Engineer</h4>
                      <span className="about-exp-meta">SwipeToAdopt.org — Pet Adoption • Remote</span>
                    </div>
                    <span className="about-exp-time">Jan 2024 – Jun 2024</span>
                  </header>
                  <ul className="about-exp-list">
                    <li>Built Tinder-style app with React + TypeScript frontend and Rust/Python backend on Azure.</li>
                    <li>Integrated Azure OpenAI + RAG for natural-language pet matching; scaled to 1,300+ users.</li>
                    <li>Implemented CI/CD with Azure DevOps, Key Vault, and ACR deployments.</li>
                  </ul>
              </article>

              <article className="about-exp-card">
                  <header className="about-exp-header">
                    <div>
                      <h4>Junior Software Engineer</h4>
                      <span className="about-exp-meta">EOS Fitness • Tampa, FL</span>
                    </div>
                    <span className="about-exp-time">Jan 2022 – Jan 2023</span>
                  </header>
                  <ul className="about-exp-list">
                    <li>Built internal CRM and scheduling tools with Node.js + TypeScript and Java microservices on Azure Functions.</li>
                    <li>Reduced scheduling friction by 40% via Graph API + Logic Apps automations.</li>
                    <li>Delivered Power BI dashboards improving visibility for 3 business units; supported 80+ new signups in Q1 2022.</li>
                  </ul>
              </article>
            </div>
          </div>
        </section>

        
        

        <div className="resume-right" id="skills">
          <h2 className="skills-headline">Skills</h2>
          <div className="recruiter-skills">
            <div className="recruiter-summary" data-aos="fade-up">
              <span className="recruiter-badge">4+ yrs</span>
              <span className="recruiter-badge">AI/ML + RAG</span>
              <span className="recruiter-badge">Cloud: Azure</span>
              <span className="recruiter-badge">CI/CD</span>
            </div>
            <div className="recruiter-pills" data-aos="fade-up" data-aos-delay="50">
              <span className="recruiter-pill">Python</span>
              <span className="recruiter-pill">TypeScript</span>
              <span className="recruiter-pill">React</span>
              <span className="recruiter-pill">Next.js</span>
              <span className="recruiter-pill">Rust</span>
              <span className="recruiter-pill">FastAPI</span>
              <span className="recruiter-pill">PyTorch</span>
              <span className="recruiter-pill">Docker</span>
              <span className="recruiter-pill">Azure</span>
              <span className="recruiter-pill">Datadog</span>
            </div>
            <div className="recruiter-grid" data-aos="fade-up" data-aos-delay="100">
              <div className="recruiter-tile">
                <div className="tile-head"><span>Python</span><span>90%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'90%'}}></div></div>
                <div className="tile-note">EloSystem, SMS Automator</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>TypeScript</span><span>85%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'85%'}}></div></div>
                <div className="tile-note">Next.js, React</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>React</span><span>85%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'85%'}}></div></div>
                <div className="tile-note">SwipeToAdopt, AI Trainer</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>Rust</span><span>80%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'80%'}}></div></div>
                <div className="tile-note">Backends, tooling</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>PyTorch</span><span>75%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'75%'}}></div></div>
                <div className="tile-note">ML + inference</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>Azure</span><span>75%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'75%'}}></div></div>
                <div className="tile-note">OpenAI, DevOps, Functions</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>Git</span><span>90%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'90%'}}></div></div>
                <div className="tile-note">All projects</div>
              </div>
              <div className="recruiter-tile">
                <div className="tile-head"><span>CI/CD</span><span>80%</span></div>
                <div className="recruiter-meter"><div className="recruiter-fill" style={{width:'80%'}}></div></div>
                <div className="tile-note">GitHub Actions, Vercel</div>
              </div>
            </div>
          </div>
        </div>

        <section id="highlight-projects" className="highlighted-fade-in">
          <h2 className="section-title">Featured Projects</h2>
          <div className="showcase-grid">
            <article className="showcase-card" data-aos="fade-up">
              <div className="showcase-accent"></div>
              <h3>SwipeToAdopt</h3>
              <p>A Rust + React pet adoption app with Tinder-style UI used by 50+ users during pilot.</p>
              <ul className="showcase-tags">
                <li>Rust</li>
                <li>React</li>
                <li>Axum</li>
                <li>Petfinder API</li>
              </ul>
              <div className="showcase-actions">
                <a href="https://swipetoadopt.org" target="_blank" rel="noreferrer" className="btn btn-primary">Visit Site</a>
              </div>
            </article>

            <article className="showcase-card" data-aos="fade-up" data-aos-delay="50">
              <div className="showcase-accent"></div>
              <h3>AI Trainer</h3>
              <p>Gamified fitness dashboard that boosted retention 30% with task leveling.</p>
              <ul className="showcase-tags">
                <li>React</li>
                <li>Firebase</li>
                <li>Auth</li>
              </ul>
              <div className="showcase-actions">
                <a href="https://github.com/AspireVenom/AI_Trainer" target="_blank" rel="noreferrer" className="btn btn-outline">View GitHub</a>
              </div>
            </article>

            <article className="showcase-card" data-aos="fade-up" data-aos-delay="100">
              <div className="showcase-accent"></div>
              <h3>EloSystem</h3>
              <p>ML-powered Elo ratings with 72% prediction accuracy across 1,500+ MLB games.</p>
              <ul className="showcase-tags">
                <li>Python</li>
                <li>PyTorch</li>
                <li>Matplotlib</li>
              </ul>
              <div className="showcase-actions">
                <a href="https://github.com/AspireVenom/EloSystem" target="_blank" rel="noreferrer" className="btn btn-outline">View GitHub</a>
              </div>
            </article>

            <article className="showcase-card" data-aos="fade-up" data-aos-delay="150">
              <div className="showcase-accent"></div>
              <h3>SMS Automator</h3>
              <p>Automated 500+ reminders using Python scripts, saving 20+ hours/month.</p>
              <ul className="showcase-tags">
                <li>Python</li>
                <li>Twilio API</li>
                <li>CRON</li>
              </ul>
              <div className="showcase-actions">
                <span className="btn btn-disabled">Private</span>
              </div>
            </article>
          </div>
        </section>

        <section id="projects">
          <h2 data-aos="fade-up">Projects</h2>
          <div className="project-scroll-wrapper">
            <div className="project-grid">
              {projects.map((project: Project) => (
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

        <div id="snake-modal" style={{display: 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(10,20,20,0.97)', zIndex: 9999, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <button id="snake-close" style={{position: 'absolute', top: '2rem', right: '2rem', fontSize: '2rem', background: 'none', border: 'none', color: '#00ff00', cursor: 'pointer'}}>×</button>
          <h2 style={{color: '#00ff00', marginBottom: '1rem'}}>🐍 Snake Game</h2>
          <canvas id="snake-canvas" width={400} height={400} style={{background: '#111', border: '2px solid #00ff00', borderRadius: '12px', maxWidth: '90vw', height: 'auto'}}></canvas>
          <div id="snake-dpad" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.2rem', gap: '0.3rem'}}>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1.2rem'}}>
              <button className="snake-dpad-btn" data-direction="up" aria-label="Up">▲</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1.2rem'}}>
              <button className="snake-dpad-btn" data-direction="left" aria-label="Left">◀</button>
              <button className="snake-dpad-btn" data-direction="down" aria-label="Down">▼</button>
              <button className="snake-dpad-btn" data-direction="right" aria-label="Right">▶</button>
            </div>
          </div>
          <p style={{color: '#b6fcd5', marginTop: '1rem'}}>Use arrow keys, WASD, swipe, or tap the arrows. Press Esc or × to close.</p>
        </div>
      </main>
      <Footer />
      <Script src="/js/terminal-intro.js" strategy="afterInteractive" />
      <Script src="/js/skills-and-carousel.js" strategy="afterInteractive" />
      <Script src="/js/navbar-and-snake.js" strategy="afterInteractive" />
    </>
  );
}
