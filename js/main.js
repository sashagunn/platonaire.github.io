// Language toggle system
const langButtons = document.querySelectorAll('.lang-btn');
const body = document.body;

// Load saved language or default EN
let currentLang = localStorage.getItem('siteLang') || 'en';
setLang(currentLang);

// Change language on click
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLang(lang);
    });
});

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);

    document.querySelectorAll('[data-ru]').forEach(el => {
        if (lang === 'ru') {
            el.innerHTML = el.dataset.ru;
        } else {
            el.innerHTML = el.innerHTML = el.getAttribute('data-en') || el.innerHTML;
        }
    });

    langButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');

    body.setAttribute('data-lang', lang);
}
