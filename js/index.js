import { Router } from "./router.js";

const router = new Router();

router.add("/", "/pages/home.html");
router.add("/universe", "/pages/universe.html");
router.add("/exploration", "/pages/exploration.html");
router.add("/404", "/pages/404.html");

// Delegação de eventos para links e botões com data-link
document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]"); // Captura o elemento mais próximo com data-link

  if (link) {
    event.preventDefault();
    const pathname = link.getAttribute("data-link");
    router.route(pathname);
  }
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => router.route(event));
});

window.onpopstate = () => router.handle();
router.handle();
