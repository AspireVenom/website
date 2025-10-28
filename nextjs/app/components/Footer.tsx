export default function Footer() {
  return (
    <footer data-aos="fade-up">
      <p>&copy; {new Date().getFullYear()} Douglas Alvarino</p>
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


