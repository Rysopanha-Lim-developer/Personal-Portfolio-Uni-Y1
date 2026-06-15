//Nav toggle for small screen
const navToggler = document.getElementById("nav-toggler")
const navRetract = document.getElementById("nav-retract")
const navBar = document.getElementById("navigator")
const sectionLink = document.querySelectorAll(".section-link")

navToggler.addEventListener("click", () =>{
    navToggler.classList.add("hide-burger-nav")
    navRetract.classList.add("show-x-nav")
    navBar.classList.add("showNav")
    navBar.removeAttribute('inert');
})
navRetract.addEventListener("click", () =>{
    navToggler.classList.remove("hide-burger-nav")
    navRetract.classList.remove("show-x-nav")
    navBar.classList.remove("showNav")
    navBar.setAttribute('inert', '');
})
