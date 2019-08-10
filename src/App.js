import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import CutieMarksJSON from "./CutieMarks.json";
import MyLittlePoniesJSON from "./MyLittlePonies.json";
import Scoreboard from "./Components/Scoreboard";
import GameArea from "./Components/GameArea/GameArea";
import './App.css';
import CutieMark from './Components/GameArea/CutieMark.js';

class App extends Component {

  state = {
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePonies: MyLittlePoniesJSON
  }

  // function to shuffle array, I know, pretty self explanatory
  shuffleArray = ( array ) => {
    let currentIndex = array.length, tempVal, randomIndex;
    while ( 0 !== currentIndex ) {
      randomIndex = Math.floor( Math.random() * currentIndex );
      currentIndex -= 1;
      tempVal = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = tempVal;
    }
    return array;
  }

  // generate random number between 18 and 36 for the Target Score
  generateTargetScore = () => {
    let x = Math.floor(( Math.random() * 17 ) + 18 );
      console.log(x);
    this.setState({ targetScore: x})
  }

  // run generateTargetScore after the screen has loaded
  componentDidMount() {
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
      console.log( this.state.cutieMarks );
  }

  // if Player Score = Target Score
  roundWon = () => {
    let wins = this.state.playerWins;
    wins++;
    this.setState({
      playerWins: wins,
      playerScore: 0
    });
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
  }

  // if Player Score > Target Score
  roundLost = () => {
    let losses = this.state.playerLosses;
    losses++;
    this.setState({
      playerLosses: losses,
      playerScore: 0
    });
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
  }

  // add value when button is clicked
  clickMark = ( id ) => {
    let pointValue = id;
      console.log( pointValue );
    let currentScore = this.state.playerScore;
    let target = this.state.targetScore;
    currentScore += pointValue;
    if ( currentScore > target ) {
      this.roundLost();
    } else if ( currentScore === target ) {
      this.roundWon();
    } else {
      this.setState({ playerScore: currentScore })
        console.log( this.state.playerScore );
    }
  }

  render() {
    return (
      <Container fluid = { true }>
        <Scoreboard 
          playerWins = { this.state.playerWins }
          playerLosses = { this.state.playerLosses }
          targetScore = { this.state.targetScore }
          playerScore = { this.state.playerScore }
        />
        <GameArea>
          { this.state.cutieMarks.slice( 0, 4 ).map(( cutieMark ) => (
            <CutieMark
              clickMark = { this.clickMark }
              id = { cutieMark.id }
              name = { cutieMark.name }
              image = { cutieMark.image }
            />
          ))}
        </GameArea>
        {/* PONY AREA */}
      </Container>
    );

  }

}

export default App;
