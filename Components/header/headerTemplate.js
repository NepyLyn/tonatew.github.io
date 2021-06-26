const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
<!-- CSS, use the path where this object is created -->
<!-- CSS styles doesn't affect the parent css styles -->
<link rel="stylesheet" href="Components/header/header.css">
<link rel="stylesheet" href="Scripts CCSS/reset.min.css">



<!-- Header Start -->
    <header class="site-header">
      <div class="wrapper site-header__wrapper">
        <a href="index.html" class="brand">
          <img class="logo" src="Resources/logo.png" alt="MDN">
        </a>
        <nav class="nav">
          <button class="nav__toggle" aria-expanded="false" type="submit">
          </button>
          <ul class="nav__wrapper">
            <li class="nav__item"><a href="#">Catálogo</a></li>
            <li class="nav__item"><a href="#">Ventas</a></li>
            <li class="nav__item"><a href="#">Nosotros</a></li>
            <li class="nav__item"><a href="/Herramientas.html">Herramientas</a></li>
            <li class="nav__item"><a href="#">F</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <!-- Header End -->
`

class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(headerTemplate.content);

      //You can access to the elements with the shadowroot property, example:
      //let navToggle = this.shadowRoot.querySelector(".nav__toggle");
      let navToggle = this.shadowRoot.querySelector(".nav__toggle");
      let navWrapper = this.shadowRoot.querySelector(".nav__wrapper");

      navToggle.addEventListener("click", function () {
        if (navWrapper.classList.contains("active")) {
          this.setAttribute("aria-expanded", "false");
          this.setAttribute("aria-label", "menu");
          navWrapper.classList.remove("active");
        } else {
          navWrapper.classList.add("active");
          this.setAttribute("aria-label", "close menu");
          this.setAttribute("aria-expanded", "true");
        }
      });
    }
}

customElements.define('header-component', Header);