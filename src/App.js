import React, { Component } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import CutieMarksJSON from "./CutieMarks.json";
import MyLittlePoniesJSON from "./MyLittlePonies.json";
import Scoreboard from "./Components/Scoreboard";
import './App.css';

class App extends Component {

  state = {
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePonies: MyLittlePoniesJSON
  }

  // generate random number between 18 and 36 for the Target Score
  generateTargetScore = () => {
    let x = Math.floor(( Math.random() * 17 ) + 18 );
    console.log(x);
    this.setState({ targetScore: x})
  };

  

  render() {
    return (
      <Container fluid = { true }>
        <Scoreboard 
          playerWins = { this.state.playerWins }
          playerLosses = { this.state.playerLosses }
          targetScore = { this.state.targetScore }
          playerScore = { this.state.playerScore }
        />
        GAME AREA
        PONY AREA
      </Container>
    );

  }

}

export default App;
