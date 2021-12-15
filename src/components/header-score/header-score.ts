const logo = require("url:../../assets/images/logo.svg");
import { state } from "../../state";
type Score = {
  myScore: number;
  botScore: number;
};
export class Header extends HTMLElement {
  shadow: ShadowRoot;
  score: Score;
  logoURL: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.logoURL = logo;
    this.score = state.getState().history; // * I get the score of the state.ts
    this.render();
  }
  render() {
    const { myScore, botScore } = this.score;

    const style = document.createElement("style");
    style.innerHTML = `* {box-sizing: border-box;margin: 0;padding: 0;}
      .header {
        /* box model */
        padding: .8rem;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        /* visual */
        border: var(--Header-Outline) solid 3px;
        transition: 0.4s;
      }
      @media (min-width: 550px) {
        .header {
          transform: scale(1.3);
        }
      }
      .header__logo {
        /* box model */
        width: 100px;
      }
      .header__score {
        /* box model */
        padding: 10px;
        border-radius: 10px;
        display: flex;
        /* typography */
        text-align: center;
        /* visual */
        background-color: var(--White);
      }
      .score__title {
        /* typography */
        font-size: 12px;
        /* visual */
        color: var(--Score-Text);
      }
      .score__num {
        /* typography */
        font-size: 30px;
        /* visual */
        color: var(--Dark-Text);
      }
      .your__score {
        /* box model */
        padding-right: 10px;
      }
      .house__score {
        /* box model */
        padding-left: 10px;
        /* visual */
        border-left: solid 2px #c7c7c7;
      }`;

    this.shadow.innerHTML = `
    <header class="header">
        <img class="header__logo" src="${this.logoURL}" alt="logo" />
        <div class="header__score">
          <div class="your__score">
            <h2 class="score__title">YOUR SCORE</h2>
            <span class="score__num">${myScore}</span>
          </div>
          <div class="house__score">
            <h2 class="score__title">HOUSE SCORE</h2>
            <span class="score__num">${botScore}</span>
          </div>
        </div>
    </header>
    `;

    this.shadow.appendChild(style);
  }
}

customElements.define("header-score", Header);
