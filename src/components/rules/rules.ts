const rulesURL = require("url:../../assets/images/image-rules.svg");
const closeURL = require("url:../../assets/images/icon-close.svg");

export class Rule extends HTMLElement {
  shadow: ShadowRoot;
  rulesURL: string;
  closeURL: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.rulesURL = rulesURL;
    this.closeURL = closeURL;
    this.render();
  }
  showRules() {
    const rulesBtn = this.shadow.querySelector(".rules__button");
    const rulesClose = this.shadow.querySelector(".rules__close");
    const overlay = this.shadow.querySelector(".overlay");
    const contRules = this.shadow.querySelector(".rules__container");
    let menuOpen = false;

    rulesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!menuOpen) {
        contRules.classList.add("open");
        overlay.classList.add("open");
        menuOpen = true;
      } else {
        contRules.classList.remove("open");
        overlay.classList.remove("open");
        menuOpen = false;
      }
    });
    rulesClose.addEventListener("click", (e) => {
      e.preventDefault();
      if (!menuOpen) {
        contRules.classList.add("open");
        overlay.classList.add("open");
        menuOpen = true;
      } else {
        contRules.classList.remove("open");
        overlay.classList.remove("open");
        menuOpen = false;
      }
    });
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `* {box-sizing: border-box;margin: 0;padding: 0;}

    /* Menu */
    .rules {
      /* box model */
      display: flex;
      justify-content: center;
    }
    .rules__button {
      /* box model */
      min-width: 100px;
      padding: 0.5rem;
      /* visual */
      background: none;
      color: var(--White);
      border: var(--Header-Outline) solid 3px;
      border-radius: 10px;
      cursor: pointer;
      /* typography */
      letter-spacing: 3px;
      font-size: 12px;
    }
    
    @media (max-width: 600px) {
      /*<!--Sub-Menu-->*/
      .rules__container {
        /* positioning */
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-414px);
        transition: all 0.5s ease-in-out;
        /* box model */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        height: 100%;
        /* visual */
        background-color: var(--White);
        visibility: hidden;
      }
      .rules__container.open {
        /* positioning */
        transform: translateX(0px);
        /* visual */
        visibility: inherit;
        background-color: var(--White);
      }
    }
    @media (min-width: 600px) {
      /*<!--Sub-Menu-->*/
      .rules__container {
        /* positioning */
        position: fixed;
        z-index: 1;
        /* box model */
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        bottom: 100px;
        gap: 1rem;
        /* visual */
        border-radius: 10px;
        visibility: hidden;
        background-color: var(--White);
      }
      .rules__container.open {
        /* visual */
        visibility: inherit;
      }
      /* Overlay */
      .overlay {
        /* positioning */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        /* box model */
        display: none;
        height: 100%;
        width: 100%;
        /* visual */
        background-color: rgba(0, 0, 0, 0.5);
      }
      .overlay.open {
        /* box model */
        display: block;
      }
      .rules__button{
        /* positioning */
        position: fixed;
        right: 20px;
        bottom: 20px;
      }
    }
    .rules__title {
      /* visual */
      color: var(--Dark-Text);
    }
    .rules__close {
      /* box model */
      cursor: pointer;
      width: 35px;
      height: 35px;
    }
      `;

    this.shadow.innerHTML = `
    <div class="root">
    <div class="overlay"></div>
      <div class="rules">
        <div class="rules__container">
          <h2 class="rules__title">RULES</h2>
          <img class="rules__img-rules" src="${this.rulesURL}" alt="rules" />
          <img class="rules__close" src="${this.closeURL}" alt="close-rules" />
        </div>
        </div>
        <button class="rules__button">RULES</button>
    </div>
    `;

    this.shadow.appendChild(style);
    this.showRules();
  }
}

customElements.define("rule-custome", Rule);
