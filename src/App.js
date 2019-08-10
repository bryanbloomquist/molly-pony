import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import CutieMarksJSON from "./CutieMarks.json";
import MyLittlePoniesJSON from "./MyLittlePonies.json";
import Scoreboard from "./Components/Scoreboard";
import Billboard from "./Components/Billboard";
import GameArea from "./Components/GameArea/GameArea";
import CutieMark from "./Components/GameArea/CutieMark.js";
import PonyArea from "./Components/PonyArea/PonyArea";
import MyLittlePony from "./Components/PonyArea/MyLittlePony";
import './App.css';

class App extends Component {

  state = {
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePonies: MyLittlePoniesJSON,
    display: "Match the Target Score by clicking on the Cutie Marks, each Cutie Mark has a hidden value."
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
    this.setState({ targetScore: x})
  }

// run generateTargetScore after the screen has loaded

  componentDidMount() {
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
    this.shuffleArray( this.state.myLittlePonies );
  }

// if Player Score = Target Score

  roundWon = () => {
    let text;
    let wins = this.state.playerWins;
    wins++;
    console.log( wins );
    if ( wins % 5 === 0 ) {
      // let found = wins/5;
      // myLittlePonies[ found ].unlocked = true;
      text = "Good job! You found a pony!"
    } else if ( wins < 5 ) {
      let remainder = 5 - wins;
      text = "Good job, match " + remainder + " more to find a pony!"
    } else if ( wins > 5 && wins % 5 !== 0 ) {
      text = "Good job, match " + wins%5 + " more to find another pony!"
    }
    this.setState({
      playerWins: wins,
      playerScore: 0,
      display: text
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
      playerScore: 0,
      display: "That's okay. You can do it. Try again."
    });
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
  }

// add value when button is clicked

  clickMark = ( id ) => {
    let pointValue = id;
    let currentScore = this.state.playerScore;
    let target = this.state.targetScore;
    currentScore += pointValue;
    if ( currentScore > target ) {
      this.roundLost();
    } else if ( currentScore === target ) {
      this.roundWon();
    } else {
      this.setState({ playerScore: currentScore })
    }
  }

  render() {
    return (
      <Container fluid = { true }>
        <Billboard 
          display = { this.state.display }
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
        <Scoreboard 
          playerWins = { this.state.playerWins }
          playerLosses = { this.state.playerLosses }
          targetScore = { this.state.targetScore }
          playerScore = { this.state.playerScore }
        />
        <PonyArea>
          { this.state.myLittlePonies.map(( myLittlePony ) => (
            <MyLittlePony
              name = { myLittlePony.name }
              image = { myLittlePony.image }
              unlocked = { myLittlePony.unlocked }
            />
          ))}
        </PonyArea>
      </Container>
    );

  }

}

export default App;
