export class Router{
  routes = {}

  add(routeName, page){
    this.routes[routeName] = page
  }

  route(event){
    event = event || window.event
    event.preventDefault()
  
    const pathname = event.target.getAttribute('href')
    window.history.pushState({}, "", pathname)
  
    this.handle()
  }
  
  handle(){
    const {pathname} = window.location
    const route = this.routes[pathname] || this.routes[404]
  
    fetch(route)
    .then(response => response.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    this.toggleBackgroundImage(pathname)
    this.updateActiveLink()
  }
  
  toggleBackgroundImage(pathname){
    const body = document.body

    const backgrounds = {
      "/": "url('./assets/mountains-universe-1.png')",
      "/universe": "url('./assets/mountains-universe-2.png')",
      "/exploration": "url('./assets/mountains-universe-3.png')"
    }

    body.style.backgroundImage = backgrounds[pathname] || "url('./assets/mountains-universe-1.png')"
    body.style.backgroundSize = "cover"
    body.style.backgroundPosition = "center"
    body.style.backgroundRepeat = "no-repeat"
  }

  updateActiveLink() {
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === window.location.pathname) {
        link.classList.add("active");
      }
    });
  }
}