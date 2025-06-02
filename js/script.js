document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Animation on scroll
const packs = document.querySelectorAll(".pack");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

packs.forEach((pack) => observer.observe(pack));

// Dynamiser l’année
document.getElementById("year").textContent = new Date().getFullYear();

const toggleButtons = document.querySelectorAll(".toggle-details");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const details = btn.nextElementSibling;
    if (!details) return;

    const isHidden = details.classList.toggle("hidden");

    if (!details.classList.contains("transitioning")) {
      details.classList.add("transitioning");
      details.style.maxHeight = isHidden ? "0px" : details.scrollHeight + "px";
      setTimeout(() => {
        if (isHidden) {
          details.style.maxHeight = null;
        }
        details.classList.remove("transitioning");
      }, 300);
    }

    btn.textContent = isHidden ? "Voir +" : "Voir -";
  });
});

// Animation de texte
// Nouveau code JavaScript
const titles = [
  "Créons votre site sur-mesure",
  "Sites modernes et adaptés",
  "Optimisés pour votre activité",
  "Votre expérience démarre ici",
];

const animatedText = document.querySelector(".animated-text");
let index = 0;

function showTitle() {
  // Ajout classe de transition
  animatedText.classList.remove("active");

  setTimeout(() => {
    animatedText.textContent = titles[index];
    void animatedText.offsetWidth; // Trigger reflow
    animatedText.classList.add("active");

    index = (index + 1) % titles.length;
  }, 500); // Synchronisation avec la transition
}

// Initialisation
animatedText.textContent = titles[0];
animatedText.classList.add("active");
setInterval(showTitle, 3000);

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const bg = document.querySelector(".hero-bg");
  if (bg) {
    bg.style.transform = `scale(${1 + scrolled * 0.00008}) translateY(${
      scrolled * 0.2
    }px)`;
  }
});

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var form = this;
  var submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoi en cours...';
  submitBtn.style.backgroundColor = ""; 

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé';
        submitBtn.style.backgroundColor = "#4CAF50"; 
        form.reset();

        setTimeout(function () {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
          submitBtn.style.backgroundColor = ""; 
          submitBtn.disabled = false;
        }, 2000);
      } else {
        throw new Error("Erreur lors de l’envoi");
      }
    })
    .catch((error) => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
      submitBtn.disabled = false;
      
    });
});
