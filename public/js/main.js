let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add("navbar-hidden");
  } else {
    // Scrolling up
    navbar.classList.remove("navbar-hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
