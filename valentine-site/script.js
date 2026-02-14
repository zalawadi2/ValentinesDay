function showStep(n) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  const el = document.getElementById(`step-${n}`);
  if (el) el.classList.add("active");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-next]");
  if (!btn) return;
  const next = btn.getAttribute("data-next");
  showStep(next);
});

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function moveNoButton() {
  const card = noBtn.closest(".card");
  const rect = card.getBoundingClientRect();
  const pad = 16;

  const maxX = rect.width - noBtn.offsetWidth - pad;
  const maxY = 120;

  const x = Math.max(pad, Math.floor(Math.random() * maxX));
  const y = Math.max(0, Math.floor(Math.random() * maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

if (noBtn) {
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
  });

  window.addEventListener("load", moveNoButton);
}

function burstHearts() {
  const card = document.querySelector(".card.active");
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("span");
    s.textContent = "💗";
    s.style.position = "absolute";
    s.style.left = Math.random() * 90 + "%";
    s.style.top = Math.random() * 30 + "%";
    s.style.fontSize = (16 + Math.random() * 22) + "px";
    s.style.transform = "translate(-50%, -50%)";
    s.style.opacity = "1";
    s.style.transition = "transform 900ms ease, opacity 900ms ease";
    card.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translate(-50%, -50%) translate(${(Math.random()*240-120)}px, ${(-220 - Math.random()*160)}px) rotate(${Math.random()*120-60}deg)`;
      s.style.opacity = "0";
    });

    setTimeout(() => s.remove(), 950);
  }
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    showStep(5);
    setTimeout(burstHearts, 120);
  });
}

const confettiBtn = document.getElementById("confettiBtn");
const loveLetter = document.getElementById("loveLetter");

if (confettiBtn) {
  confettiBtn.addEventListener("click", () => {
    burstHearts();
    if (loveLetter) loveLetter.hidden = false;
    confettiBtn.textContent = "Okay okay that’s enough 😭💗";
    confettiBtn.disabled = true;
  });
}

const restartLink = document.getElementById("restartLink");
if (restartLink) {
  restartLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (loveLetter) loveLetter.hidden = true;
    if (confettiBtn) {
      confettiBtn.disabled = false;
      confettiBtn.textContent = "One more surprise ✨";
    }
    showStep(0);
  });
}

