import { Router } from "@vaadin/router";
import { state } from "../../state";
type Play = {
  myPlay: string;
  botPlay: string;
};
export class Result extends HTMLElement {
  shadow: ShadowRoot;
  plays: Play;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.plays = state.getState().currentGame;
    this.render();
  }
  addListener() {
    const resultButton = this.shadow.querySelector(".result__button");
    resultButton.addEventListener("click", (e) => {
      e.preventDefault();
      Router.go("/");
    });
  }
  render() {
    const { myPlay, botPlay } = this.plays as any;
    // * Check who won
    const whoWin = state.whoWin(myPlay, botPlay);
    const result = whoWin == "Draw" ? whoWin : whoWin == "Win" ? "YOU WIN" : "YOU LOSE";

    const style = document.createElement("style");
    style.innerHTML = `* {box-sizing: border-box;margin: 0;padding: 0;}
    .result {
        /* box model */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
      }
      .result__hand {
        /* box model */
        display: flex;
        justify-content: space-between;
        margin: 5rem 0 2rem 0;
      }
      .result__again {
        /* typography */
        text-align: center;
        margnin-bottom: 2rem;
      }
      .result__picked{
        /* box model */
        margin-top: 50px;
        /* visual */
        color: var(--White);
        /* typography */
        font-size: 13px;
        letter-spacing: 2px;
        word-spacing: 3px;
      }
      .result__title {
        /* box model */
        margin-bottom: 1rem;
        /* visual */
        color: var(--White);
        /* typography */
        font-size: 3rem;
      }
      .result__button {
        /* box model */
        padding: 0.6rem;
        width: 55%;
        border-radius: 7px;
        /* visual */
        transition: 0.2s;
        color: var(--Dark-Text);
        border: none;
        background-color: var(--White);
        cursor: pointer;
        /* typography */
        letter-spacing: 1px;
        font-size: 16px;
      }
      .result__button:hover {
        /* visual */
        box-shadow: 1px 1px 10px 5px var(--White);
      }
      @media (max-width: 600px){
        .container__rule-custome{
          /* box model */
          display: flex;
          justify-content: center;
        }
      }
      .winner{
        /* box model */
        width: min-content;
        /* visual */
        box-shadow: 0 0 0 25px hsla(214,47%,23%,80%),0 0 0 45px hsla(214,47%,23%,60%),0 0 0 75px hsla(214,47%,23%,40%);
        border-radius:50%;
      }
      .results__cont-house {
        /* box model */
        width: auto; 
        display: flex; 
        justify-content: space-between; 
        flex-direction: column; 
        align-items: center;
      }
      .results__cont-your {
        /* box model */
        margin-right:71.5px; 
        /* typography */
        text-align: center;
      }
      `;
    this.shadow.innerHTML = `
    <section class="result">
        <header-score></header-score>

        <div class="result__hand">

          <div class="results__cont-your" >
            <div class="${whoWin == "Win" ? "winner" : ""}">
              <my-hand tag="${myPlay}"></my-hand>            
            </div>
            <h2 class="result__picked">YOU PICKED</h2>
          </div>

          <div class="results__cont-house">
            <div class="${whoWin == "Lose" ? "winner" : ""}">
              <my-hand tag="${botPlay}"></my-hand>
            </div>
            <h2 class="result__picked">THE HOUSE PICKED</h2>
          </div>

        </div>

        <div class="result__again">
          <h1 class="result__title">${result}</h1>
          <button class="result__button">PLAY AGAIN</button>
        </div>

        <div class="container__rule-custome">
          <rule-custome></rule-custome>
        </div>
    </section>
        
        `;

    this.shadow.appendChild(style);
    this.addListener();
  }
}

customElements.define("results-page", Result);
