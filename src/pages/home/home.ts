import { Router } from "@vaadin/router";
import { state } from "../../state";
const triangleURL = require("url:../../assets/images/bg-triangle.svg");

export class Home extends HTMLElement {
  shadow: ShadowRoot;
  triangleURL: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.triangleURL = triangleURL;
  }
  connectedCallback() {
    this.render();
  }
  addListener() {
    const shadow = this.shadow;
    // ! Bot Move Random
    const botMoveRm = () => {
      let num = Math.floor(Math.random() * (3 - 0)) + 0;
      let array = ["rock", "paper", "scissors"];
      return array[num];
    };
    // ! User MOVE
    const userMove = () => {
      const myMove = shadow.querySelectorAll("my-hand");
      for (const choice of myMove) {
        choice.addEventListener("change", (e: any) => {
          const botMove = botMoveRm() as any;
          state.setMove(e.detail.myPlay, botMove);
          Router.go("/results");
        });
      }
    };
    userMove();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `* {box-sizing: border-box;margin: 0;padding: 0;}
      .root {
        /* box model */
        height: 100%;
        margin: 0 auto;
      }
      .home {
        /* box model */
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
      }
      .hand {
        /* positioning */
        position: relative;
        /* box model */
        display: flex;
        justify-content: center;
        width: 370px;
        height: 200px;
        /* visual */
        transition: 0.4s;
      }
      @media (min-width: 550px) {
        .hand {
          /* visual */
          transform: scale(1.2);
        }
      }

      /* position HANDS */
      my-hand {
        /* positioning */
        position: absolute;
      }
      .left-top {
        /* positioning */
        top: -50px;
        left: 25px;
      }
      .right-top {
        /* positioning */
        top: -50px;
        right: 25px;
      }
      .bottom-center {
        /* positioning */
        bottom: -50px;
      }
      @media (max-width: 600px){
        .container__rule-custome{
          /* box model */
          display: flex;
          justify-content: center;
        }
      }
      @media (min-width: 600px){
        .hand{
          /* box model */
          margin-top: 4rem;
        }
      }`;
    this.shadow.innerHTML = `
    <section class="home">
        <header-score></header-score>
        <div class="hand">
          <img class="hand__triangle" src="${this.triangleURL}" alt="triangle" />
          <my-hand tag="paper" class="left-top"></my-hand>
          <my-hand tag="scissors" class="right-top"></my-hand>
          <my-hand tag="rock" class="bottom-center"></my-hand>
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

customElements.define("home-page", Home);
