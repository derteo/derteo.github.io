// script.js
(function () {
    function revealBootLines() {
        const lines = document.querySelectorAll(".boot-line");
        lines.forEach((el) => {
            const delay = Number(el.getAttribute("data-delay") || "0");
            window.setTimeout(() => el.classList.add("show"), delay);
        });
    }

    function setActiveNav() {
        // Supporto semplice:
        // - se usi file statici: index.html, skills.html...
        // - se usi percorsi “puliti”: /skills, /projects...
        const path = window.location.pathname;
        const file = (path.split("/").pop() || "").toLowerCase();

        const routeGuess = file === "" || file === "index.html" ? "/" : file.endsWith(".html") ? "/" + file.replace(".html", "") : path;

        const links = document.querySelectorAll(".nav-link");
        links.forEach((a) => a.classList.remove("active"));

        let matched = null;

        // 1) match su data-route (stile Next /skills)
        links.forEach((a) => {
            if (a.getAttribute("data-route") === routeGuess) matched = a;
        });

        // 2) fallback: match su href file (skills.html ecc.)
        if (!matched) {
            links.forEach((a) => {
                const href = (a.getAttribute("href") || "").toLowerCase();
                if (file && href.endsWith(file)) matched = a;
            });
        }

        // 3) default: about
        if (!matched) matched = document.querySelector('.nav-link[data-route="/"]');

        if (matched) matched.classList.add("active");
    }

    function enableReducedMotion() {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!mq.matches) return;

        // Se l’utente preferisce ridurre animazioni, mostra subito le righe
        document.querySelectorAll(".boot-line").forEach((el) => {
            el.classList.add("show");
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        setActiveNav();
        enableReducedMotion();

        // Se reduced motion non è attivo, anima boot lines
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduced) revealBootLines();
    });
})();
