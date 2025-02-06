function route(event){
  event = event || window.event
  event.preventDefault()

  console.log(event)
}

document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', route);
});