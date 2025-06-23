document.addEventListener("DOMContentLoaded", function () {
  // 1. Dropdown menu
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    const btn = dropdown.querySelector(".dropdown-btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("open");
      });

      document.addEventListener("click", function () {
        dropdown.classList.remove("open");
      });

      const content = dropdown.querySelector(".dropdown-content");
      if (content) {
        content.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        // 👉 Fermer le dropdown quand on clique sur un lien du menu
        const links = content.querySelectorAll("a");
        links.forEach((link) => {
          link.addEventListener("click", function () {
            dropdown.classList.remove("open");
          });
        });
      }
    }
  }

  // 2. Smooth scroll only for anchors present on the page
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // 3. Animation on scroll
  const packs = document.querySelectorAll(".pack");
  if ("IntersectionObserver" in window) {
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
  }

  // 4. Dynamiser l’année
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Toggle details
  document.querySelectorAll(".toggle-details").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = btn.nextElementSibling;
      if (!details) return;

      const isHidden = details.classList.toggle("hidden");

      if (!details.classList.contains("transitioning")) {
        details.classList.add("transitioning");
        details.style.maxHeight = isHidden
          ? "0px"
          : details.scrollHeight + "px";
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

  // 6. Animation de texte (seulement si présent sur la page)
  const titles = [
    "Créons votre site sur-mesure",
    "Sites modernes et adaptés",
    "Optimisés pour votre activité",
    "Votre expérience démarre ici",
  ];
  const animatedText = document.querySelector(".animated-text");
  if (animatedText) {
    let index = 0;
    function showTitle() {
      animatedText.classList.remove("active");
      setTimeout(() => {
        animatedText.textContent = titles[index];
        void animatedText.offsetWidth; // Trigger reflow
        animatedText.classList.add("active");
        index = (index + 1) % titles.length;
      }, 500);
    }
    animatedText.textContent = titles[0];
    animatedText.classList.add("active");
    setInterval(showTitle, 3000);
  }

  // 7. Parallax effet sur la hero-bg (si présent)
  window.addEventListener("scroll", () => {
    const bg = document.querySelector(".hero-bg");
    if (bg) {
      const scrolled = window.scrollY;
      bg.style.transform = `scale(${1 + scrolled * 0.00008}) translateY(${
        scrolled * 0.2
      }px)`;
    }
  });

  // 8. Formulaire (si présent)
  const myForm = document.getElementById("myForm");
  if (myForm) {
    myForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var form = this;
      var submitBtn = document.getElementById("submitBtn");
      if (!submitBtn) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Envoi en cours...';
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
              submitBtn.innerHTML =
                '<i class="fas fa-paper-plane"></i> Envoyer';
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
  }
});
