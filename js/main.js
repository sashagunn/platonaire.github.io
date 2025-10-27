// === Language Toggle (RU/EN) ===
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem("platonaireLang") || "ru";
  applyLanguage(currentLang);

  document.querySelectorAll(".lang-switch a").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = a.dataset.lang;
      localStorage.setItem("platonaireLang", lang);
      applyLanguage(lang);
    });
  });

  // Placeholder i18n
  document.querySelectorAll("input[data-ru-placeholder]").forEach(inp => {
    setInputPlaceholder(inp, currentLang);
  });

  // Accordion
  initAccordion();

  // Lead form → Formspree + redirect to thanks.html (если есть)
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      try {
        const resp = await fetch(form.action, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" }
        });
        if (resp.ok) {
          window.location.href = "thanks.html";
        } else {
          alert("Error sending form. Please try again.");
        }
      } catch {
        alert("Network error. Try again.");
      }
    });
  }
});

function applyLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);
  document.body.setAttribute("data-lang", lang);

  // Текстовые узлы с data-ru / data-en
  document.querySelectorAll("[data-ru]").forEach(el => {
    const ru = el.getAttribute("data-ru");
    const en = el.getAttribute("data-en");
    el.innerHTML = (lang === "ru" ? ru : (en || ru || el.innerHTML));
  });

  // Плейсхолдеры инпутов
  document.querySelectorAll("input[data-ru-placeholder]").forEach(inp => {
    setInputPlaceholder(inp, lang);
  });

  // Активная кнопка переключателя
  document.querySelectorAll(".lang-switch a").forEach(a => {
    a.classList.toggle("active", a.dataset.lang === lang);
  });
}

function setInputPlaceholder(inp, lang) {
  const ru = inp.getAttribute("data-ru-placeholder");
  const en = inp.getAttribute("data-en-placeholder");
  inp.placeholder = (lang === "ru" ? ru : (en || ru || inp.placeholder));
}

// === Accordion ===
function initAccordion() {
  document.querySelectorAll(".accordion-header").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const content = btn.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("open");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
      }
    });
  });
}
