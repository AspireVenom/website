import Link from "next/link";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-accent" aria-hidden="true"></div>
      <div className="footer-inner">
        <div className="footer-grid" role="navigation" aria-label="Footer">
          <section className="footer-brand">
            <h2 id="footer-heading" className="footer-title">Douglas Alvarino</h2>
            <p className="footer-tagline">Engineer · Developer · Explorer</p>
            <div className="footer-social" aria-label="Social links">
              <a href="mailto:douglitandres@gmail.com?subject=Let%27s%20connect" className="footer-social-link" aria-label="Email">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </a>
              <a href="https://github.com/AspireVenom" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a href="https://www.linkedin.com/in/dalvarino" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>
          </section>

          <section className="footer-links">
            <h3 className="footer-section">Navigate</h3>
            <ul className="footer-list">
              <li><a href="#about">About</a></li>
              <li><Link href={{ pathname: '/blog' }}>Blog</Link></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#highlight-projects">Featured</a></li>
            </ul>
          </section>

          <section className="footer-connect">
            <h3 className="footer-section">Connect</h3>
            <ul className="footer-list">
              <li><a href="mailto:douglitandres@gmail.com?subject=Let%27s%20connect">Email</a></li>
              <li><a href="https://www.linkedin.com/in/dalvarino" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/AspireVenom" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal">&copy; {year} Douglas Alvarino. All rights reserved.</p>
          <a href="#landing" className="back-to-top" aria-label="Back to top">
            <i className="fas fa-arrow-up" aria-hidden="true"></i>
            <span> Back to top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}


