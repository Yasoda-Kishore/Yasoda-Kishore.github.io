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


/* ================= YASHWANth-STYLE CUSTOM CURSOR ================= */

const customCursor = document.getElementById("customCursor");

if (customCursor && window.matchMedia("(pointer: fine)").matches) {

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    customCursor.classList.add("active");
  });

  document.addEventListener("mouseleave", () => {
    customCursor.classList.remove("active");
  });

  document.addEventListener("mouseenter", () => {
    customCursor.classList.add("active");
  });

  document.querySelectorAll("a, button, input, textarea").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      customCursor.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-hover");
    });
  });

  function animateCustomCursor() {
    cursorX += (mouseX - cursorX) * 0.20;
    cursorY += (mouseY - cursorY) * 0.20;

    customCursor.style.transform =
      `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    requestAnimationFrame(animateCustomCursor);
  }

  animateCustomCursor();
}

/* ================= CUSTOM VISITOR CURSOR ================= */

const cursorRing = document.getElementById("cursorRing");

if (cursorRing && window.matchMedia("(pointer: fine)").matches) {

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorRing.classList.remove("cursor-hidden");
  });

  window.addEventListener("mouseleave", () => {
    cursorRing.classList.add("cursor-hidden");
  });

  window.addEventListener("mouseenter", () => {
    cursorRing.classList.remove("cursor-hidden");
  });

  window.addEventListener("mousedown", () => {
    cursorRing.classList.add("cursor-click");
  });

  window.addEventListener("mouseup", () => {
    cursorRing.classList.remove("cursor-click");
  });

  document.querySelectorAll("a, button, input, textarea, .project-card, .skill-group").forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursorRing.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("cursor-hover");
    });

  });

  function animateCursor() {

    ringX += (mouseX - ringX) * 0.17;
    ringY += (mouseY - ringY) * 0.17;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}
