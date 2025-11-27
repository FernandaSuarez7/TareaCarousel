function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slideEl = carouselEl.querySelector(".tarjeta-persona");
  let slideWidth = slideEl.offsetWidth;

  document
    .querySelector("#back-button")
    .addEventListener("click", () => navigate("backward"));

  document
    .querySelector("#forward-button")
    .addEventListener("click", () => navigate("forward"));

  document.querySelectorAll(".indicador").forEach((dot, index) => {
    dot.addEventListener("click", () => navigate(index));
    dot.addEventListener("mouseenter", () => clearInterval(autoplay));
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      clearInterval(autoplay);
      navigate("backward");
    } else if (e.code === "ArrowRight") {
      clearInterval(autoplay);
      navigate("forward");
    }
  });

  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });

  const autoplay = setInterval(() => navigate("forward"), 3000);
  slideContainerEl.addEventListener("mouseenter", () =>
    clearInterval(autoplay)
  );

  const getNewScrollPosition = (arg) => {
    const gap = 20;
    const maxScrollLeft =
      slideContainerEl.scrollWidth - slideContainerEl.clientWidth;

    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x > maxScrollLeft - 5 ? 0 : x;
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x < 0 ? maxScrollLeft : x;
    } else if (typeof arg === "number") {
      const x = arg * (slideWidth + gap);
      return x;
    }
  };

  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };

  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = entry.target.dataset.slideindex;
          const activo = carouselEl.querySelector(".indicador.activo");
          if (activo) {
            activo.classList.remove("activo");
          }
          carouselEl
            .querySelectorAll(".indicador")
            [slideIndex].classList.add("activo");
        }
      });
    },
    { root: slideContainerEl, threshold: 0.1 }
  );

  document.querySelectorAll(".tarjeta-persona").forEach((slide) => {
    slideObserver.observe(slide);
  });
}

autoplayCarousel();
