export default function Header() {
  return (
    <nav className="navbar">
      <div className="logo" id="navbar-logo">Douglas Alvarino</div>
      <button className="hamburger" id="hamburger" aria-label="Toggle Menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className="nav-links" id="nav-links">
        <li><a href="#">Back to top</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="mailto:douglitandres@gmail.com">Contact</a></li>
      </ul>
    </nav>
  );
}


