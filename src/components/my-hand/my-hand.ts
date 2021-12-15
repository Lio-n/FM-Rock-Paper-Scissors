const rock = require("url:../../assets/images/icon-rock.svg");
const paper = require("url:../../assets/images/icon-paper.svg");
const scissors = require("url:../../assets/images/icon-scissors.svg");

export class Hand extends HTMLElement {
  shadow: ShadowRoot;
  tag: string;
  imgURL: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.tag = this.getAttribute("tag") || "";
    this.render();
  }
  listeners() {
    const handEl = this.shadow.querySelector(`.${this.tag}`);
    handEl.addEventListener("click", (e: any) => {
      const event = new CustomEvent("change", {
        detail: { myPlay: this.tag },
      });
      this.dispatchEvent(event);
    });
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `* {box-sizing: border-box;margin: 0;padding: 0;}
    .root {
        /* box model */
        display: flex;
        justify-content: center;
        width: min-content;
    }
    .hand {
        /* box model */
        border-radius: 50%;
        padding: 0.8rem;
        display: inline-block;
        cursor: pointer;
        /* It doesn't work with ROCK, so I leave it here. Where it does work. */
        /* visual */  
        background: linear-gradient(to bottom, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
        box-shadow: 0 7px 0 0 #c32240;
      }
    .hand:hover {
      /* visual */
        box-shadow: 1px 1px 10px 5px var(--White);
    }
    .hand__container {
        /* box model */
        border-radius: 50%;
        padding: 1rem;
        /* visual */
        background-color: var(--White);
        box-shadow: inset 0 8px 0 0 #ccc;
      }

      // ? These classes only take care of the visual
     .rock {
        /* visual */
        background: linear-gradient(to bottom, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
        box-shadow: 0 7px 0 0 #c32240;}
        
     .paper {
        /* visual */
        background: linear-gradient(to bottom, hsl(230, 89%, 62%), hsl(230, 89%, 65%));  
        box-shadow: 0 7px 0 0 #0d2fd9;}

     .scissors {
        /* visual */
        background: linear-gradient(to bottom, hsl(39, 89%, 49%), hsl(40, 84%, 53%));
        box-shadow: 0 7px 0 0 #d39312;}
        `;

    if (this.tag !== "") {
      const handURL = this.tag == "rock" ? rock : this.tag == "paper" ? paper : scissors;
      this.shadow.innerHTML = `
      <dic class="root">
        <div class="hand ${this.tag}">
          <div class="hand__container">
            <img src="${handURL}" alt="${this.tag}">
          </div>
        </div>
      </div>
      `;

      this.listeners();
    }

    this.shadow.appendChild(style);
  }
}

customElements.define("my-hand", Hand);
