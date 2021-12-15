type Move = "rock" | "paper" | "scissors";
type Game = {
  myScore: Number;
  botScore: Number;
};
export const state = {
  data: {
    currentGame: {
      myPlay: "",
      botPlay: "",
    },
    // Save results
    history: {
      myScore: 0,
      botScore: 0,
    },
  },
  listeners: [],
  // Initializar
  init() {
    // Get the local data
    const localData = JSON.parse(localStorage.getItem("saved-state"));
    // If localdata retuns "null", do nothing
    if (!localData) {
      return;
    } else {
      this.setState(localData);
    }
  },
  // Get the data
  getState() {
    return this.data;
  },
  setState(newStateHistory) {
    this.data.history = newStateHistory;
    //callback = cb
    localStorage.setItem("saved-state", JSON.stringify(newStateHistory));
  },
  // Only stores data.currentGame
  setMove(myMove: Move, botMove: Move) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = myMove;
    currentState.currentGame.botPlay = botMove;
    console.log(`Current State: My Move ${myMove} : Bot Move ${botMove}`);
  },
  // Scissors > Paper > Rock > Scissors
  // How to determine who won?
  whoWin(myPlay: Move, botPlay: Move) {
    let result = "Draw";
    if (myPlay == botPlay) {
      this.pushToHistory({ myScore: 0, botScore: 0 });
      // Using return without a value will return the value undefined.
      // Undefined will work as false
      return result;
    }
    const winScissors = myPlay == "scissors" && botPlay == "paper";
    const winPaper = myPlay == "paper" && botPlay == "rock";
    const winRock = myPlay == "rock" && botPlay == "scissors";

    // If this returns False, the Bot wins
    result = [winScissors, winPaper, winRock].includes(true) ? "Win" : "Lose";

    result == "Win"
      ? this.pushToHistory({ myScore: 1, botScore: 0 })
      : this.pushToHistory({ myScore: 0, botScore: 1 });
    return result;
  },

  // Only stores data.history
  pushToHistory(play: Game) {
    const currentState = this.getState();
    // I get the last values of each one
    const myScore = currentState.history.myScore;
    const botScore = currentState.history.botScore;

    // Sumo "play" + sus ultimos valores [myScore, botScore]
    currentState.history.myScore = myScore + play.myScore;
    currentState.history.botScore = botScore + play.botScore;
    this.setState(currentState.history);
  },
  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
