document.addEventListener("DOMContentLoaded", () => {
  const skillsCarousel = document.getElementById('skills-carousel');
  const skillsCategories = document.getElementById('skills-categories');
  const carouselWrapper = document.querySelector('.carousel-skill-card-wrapper');
  const leftArrow = document.getElementById('carousel-left');
  const rightArrow = document.getElementById('carousel-right');
  const filterBar = document.getElementById('skills-filter');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

  let allSkillCards = Array.from(document.querySelectorAll('.skill-card')).map(card => card.cloneNode(true));
  let carouselIndex = 0;

  function showCarouselSkill(idx) {
    carouselWrapper.innerHTML = '';
    const card = allSkillCards[idx];
    if (card) {
      carouselWrapper.appendChild(card);
      const progressBar = card.querySelector('.progress-bar');
      const progress = card.dataset.level;
      progressBar.style.setProperty('--progress-width', `${progress}%`);
      card.classList.add('animate');
      setTimeout(() => {
        progressBar.style.width = `${progress}%`;
      }, 100);
    }
    leftArrow.disabled = idx === 0;
    rightArrow.disabled = idx === allSkillCards.length - 1;
  }

  function activateCarousel() {
    allSkillCards = Array.from(document.querySelectorAll('.skill-card')).map(card => card.cloneNode(true));
    skillsCarousel.style.display = '';
    skillsCategories.classList.add('hide');
    carouselIndex = 0;
    showCarouselSkill(carouselIndex);
  }

  function deactivateCarousel() {
    skillsCarousel.style.display = 'none';
    skillsCategories.classList.remove('hide');
  }

  leftArrow.addEventListener('click', () => {
    if (carouselIndex > 0) {
      carouselIndex--;
      showCarouselSkill(carouselIndex);
    }
  });

  rightArrow.addEventListener('click', () => {
    if (carouselIndex < allSkillCards.length - 1) {
      carouselIndex++;
      showCarouselSkill(carouselIndex);
    }
  });

  // Swipe for skills carousel
  let skillsStartX = 0;
  let skillsSwiping = false;

  carouselWrapper.addEventListener('touchstart', (e) => {
    skillsStartX = e.touches[0].clientX;
    skillsSwiping = true;
  });

  carouselWrapper.addEventListener('touchmove', (e) => {
    if (!skillsSwiping) return;
    const diffX = e.touches[0].clientX - skillsStartX;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0 && carouselIndex < allSkillCards.length - 1) {
        carouselIndex++;
        showCarouselSkill(carouselIndex);
      } else if (diffX > 0 && carouselIndex > 0) {
        carouselIndex--;
        showCarouselSkill(carouselIndex);
      }
      skillsSwiping = false;
    }
  });

  carouselWrapper.addEventListener('touchend', () => {
    skillsSwiping = false;
  });

  // Filter button logic
  filterBar.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    const selected = e.target;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    selected.classList.add('active');

    const filter = selected.dataset.filter;
    if (filter === 'all') {
      activateCarousel();
    } else {
      deactivateCarousel();
      document.querySelectorAll('.skill-category').forEach(cat => {
        cat.style.display = cat.dataset.category === filter ? '' : 'none';
      });
      // Animate progress bars for visible skill cards
      document.querySelectorAll('.skill-category').forEach(cat => {
        if (cat.style.display !== 'none') {
          cat.querySelectorAll('.skill-card').forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            const progress = card.dataset.level;
            progressBar.style.width = '0%'; // Reset
            progressBar.style.setProperty('--progress-width', `${progress}%`);
            card.classList.remove('animate'); // Reset animation
            // Force reflow to restart animation
            void progressBar.offsetWidth;
            card.classList.add('animate');
            setTimeout(() => {
              progressBar.style.width = `${progress}%`;
            }, 100);
          });
        }
      });
    }
  });

  // Automatically apply the Programming filter on page load
  const programmingBtn = filterButtons.find(btn => btn.dataset.filter === 'programming');
  if (programmingBtn) {
    setTimeout(() => programmingBtn.click(), 0);
  }

  // Highlight Projects Carousel
  const track = document.querySelector(".carousel-track");
  const nodes = document.querySelectorAll(".highlight-node");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  let currentIndex = 0;

  function updateCarousel() {
    const offset = currentIndex * -100;
    track.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < nodes.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  let projectStartX = 0;
  let projectSwiping = false;

  track.addEventListener("touchstart", (e) => {
    projectStartX = e.touches[0].clientX;
    projectSwiping = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!projectSwiping) return;
    const diffX = e.touches[0].clientX - projectStartX;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0 && currentIndex < nodes.length - 1) {
        currentIndex++;
      } else if (diffX > 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
      projectSwiping = false;
    }
  });

  track.addEventListener("touchend", () => {
    projectSwiping = false;
  });

  // Init
  activateCarousel();
  updateCarousel();
});


