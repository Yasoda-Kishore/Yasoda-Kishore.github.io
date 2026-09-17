const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

document.querySelectorAll("#navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
      `Portfolio Contact from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
      `mailto:alluyasodakishore7143@gmail.com?subject=${subject}&body=${body}`;

  });
}


/* ================= MATRIX BACKGROUND ================= */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width;
let height;
let columns;
let drops;

const characters =
  "01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ$#<>[]{}";

function resizeMatrix() {

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  columns = Math.floor(width / 18);

  drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -80;
  }
}

function drawMatrix() {

  ctx.fillStyle = "rgba(9,9,9,0.075)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = "12px JetBrains Mono, monospace";

  for (let i = 0; i < columns; i++) {

    const character =
      characters[Math.floor(Math.random() * characters.length)];

    const x = i * 18;
    const y = drops[i] * 18;

    ctx.fillStyle =
      i % 6 === 0
        ? "rgba(245,200,66,.65)"
        : "rgba(160,145,70,.28)";

    ctx.fillText(character, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += 0.55;
  }

  requestAnimationFrame(drawMatrix);
}

window.addEventListener("resize", resizeMatrix);

resizeMatrix();
drawMatrix();


/* ================= SCROLL REVEAL ANIMATIONS ================= */

const revealItems = document.querySelectorAll(
  ".reveal, .section-title, .about-grid, .timeline article, .publication-card, .contact-layout, .about-main p, .project-body p, .experience-card, .achievement-grid article"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  revealItems.forEach((item) => {

    if (!item.classList.contains("reveal")) {
      item.classList.add("reveal");
    }

    revealObserver.observe(item);

  });

} else {

  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });

}


/* ================= GAMEPAD VISITOR CURSOR ================= */

const customCursor = document.getElementById("customCursor");

if (customCursor && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  document.addEventListener("mousemove", (event) => {
    const dx = event.clientX - mouseX;
    const dy = event.clientY - mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;
    targetTiltY = Math.max(-16, Math.min(16, dx * 0.7));
    targetTiltX = Math.max(-12, Math.min(12, -dy * 0.55));
    customCursor.classList.add("active");
  });

  document.addEventListener("mouseleave", () => {
    customCursor.classList.remove("active");
  });

  document.addEventListener("mouseenter", () => {
    customCursor.classList.add("active");
  });

  document.querySelectorAll(
    "a, button, input, textarea, select, .project-card, .skill-group"
  ).forEach((element) => {
    element.addEventListener("mouseenter", () => {
      customCursor.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-hover");
    });
  });

  window.addEventListener("mousedown", () => {
    customCursor.classList.add("cursor-click");
  });

  window.addEventListener("mouseup", () => {
    customCursor.classList.remove("cursor-click");
  });

  function animateCustomCursor() {
    cursorX += (mouseX - cursorX) * 0.20;
    cursorY += (mouseY - cursorY) * 0.20;
    tiltX += (targetTiltX - tiltX) * 0.14;
    tiltY += (targetTiltY - tiltY) * 0.14;
    targetTiltX *= 0.90;
    targetTiltY *= 0.90;

    customCursor.style.transform =
      `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    const cursorImage = customCursor.querySelector("img");
    if (cursorImage) {
      cursorImage.style.transform =
        `translate(-50%, -50%) translateZ(0) rotateX(${8 + tiltX}deg) rotateY(${-10 + tiltY}deg) rotateZ(-7deg)`;
    }

    requestAnimationFrame(animateCustomCursor);
  }

  animateCustomCursor();
}


/* ================= HERO SUBTITLE CYCLING ================= */
(function initHeroSubtitleRotator() {
  const subtitle = document.getElementById("heroSubtitle");
  if (!subtitle) return;

  const subtitles = [
    "Machine Learning Engineer",
    "AI Engineer",
    "AI Systems",
    "Data Engineering",
    "Full-Stack Development"
  ];

  let index = 0;
  let fromLeft = true;

  function swapSubtitle() {
    subtitle.classList.remove(
      "subtitle-enter-left",
      "subtitle-enter-right",
      "subtitle-exit-left",
      "subtitle-exit-right"
    );

    const exitClass = fromLeft
      ? "subtitle-exit-left"
      : "subtitle-exit-right";

    subtitle.classList.add(exitClass);

    setTimeout(() => {
      index = (index + 1) % subtitles.length;
      subtitle.textContent = subtitles[index];

      subtitle.classList.remove(exitClass);

      const enterClass = fromLeft
        ? "subtitle-enter-right"
        : "subtitle-enter-left";

      subtitle.classList.add(enterClass);
      fromLeft = !fromLeft;
    }, 620);
  }

  // Start with Machine Learning Engineer, then continuously cycle.
  setTimeout(() => {
    swapSubtitle();
    setInterval(swapSubtitle, 3200);
  }, 2600);
})();
