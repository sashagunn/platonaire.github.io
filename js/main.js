// --- Language Toggle System ---

document.addEventListener("DOMContentLoaded", () => {
    let currentLang = localStorage.getItem("platonaireLang") || "en";
    applyLanguage(currentLang);

    document.querySelectorAll(".lang-switch a").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            localStorage.setItem("platonaireLang", lang);
            applyLanguage(lang);
        });
    });
});

function applyLanguage(lang) {
    document.body.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-ru]").forEach(el => {
        if (lang === "ru") {
            el.innerHTML = el.dataset.ru;
        } else {
            el.innerHTML = el.dataset.en || el.innerHTML;
        }
    });

    document.querySelectorAll(".lang-switch a").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.lang === lang) {
            btn.classList.add("active");
        }
    });
}
