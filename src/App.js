import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import CutieMarksJSON from "./CutieMarks.json";
import MyLittlePoniesEasyJSON from "./myLittlePoniesEasy.json";
import MyLittlePoniesNormalJSON from "./myLittlePoniesNormal.json";
import MyLittlePoniesHardJSON from "./myLittlePoniesHard.json";
import CutieMark from "./Components/GameArea/CutieMark.js";
import GameArea from "./Components/GameArea/GameArea";
import MyLittlePony from "./Components/PonyArea/MyLittlePony";
import PonyArea from "./Components/PonyArea/PonyArea";
import Billboard from "./Components/Billboard";
import LoginArea from "./Components/LoginArea";
import Scoreboard from "./Components/Scoreboard";
import './App.css';

class App extends Component {

  state = {
    playerName: 0,
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    totalClicks: 0,
    winCondition: 0,
    difficulty: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePoniesEasy: MyLittlePoniesEasyJSON,
    myLittlePoniesNormal: MyLittlePoniesEasyJSON.concat( MyLittlePoniesNormalJSON ),
    myLittlePoniesHard: MyLittlePoniesEasyJSON.concat( MyLittlePoniesNormalJSON, MyLittlePoniesHardJSON ),
    display: "Please enter your name and select a difficulty to begin..."
  }

  // function to shuffle array
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
    let x = Math.floor(( Math.random() * 29 ) + 6 );
    this.setState({ targetScore: x})
  }

  // run generateTargetScore after the screen has loaded
  componentDidMount() {
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
    this.shuffleArray( this.state.myLittlePoniesEasy );
  }

  // render play area
  renderPlayArea() {
    if ( this.state.playerName === 0 ) {
      return <LoginArea/>
    } else if ( this.state.playerName !== 0 && this.state.difficulty !== 0 ) {
      return (
        <GameArea>
          { this.state.cutieMarks.slice( 0, 4 ).map(( cutieMark ) => (
            <CutieMark
              clickMark = { this.clickMark }
              key = { cutieMark.id }
              id = { cutieMark.id }
              name = { cutieMark.name }
              image = { cutieMark.image }
            />
          ))}
        </GameArea>
      )
    }
  }

  // reveals a pony after every fifth win
  selectAPony = ( x ) => {
    let mlpCopy = JSON.parse( JSON.stringify( this.state.myLittlePoniesEasy ))
    mlpCopy[ x ].unlocked = 1
    this.setState({ myLittlePoniesEasy: mlpCopy })
  }

  // if Player Score = Target Score
  roundWon = () => {
    let text;
    let wins = this.state.playerWins;
    wins++;
    console.log( wins );
    if ( wins === 12 ) {
      text = "Amazing job! You found all the My Little Ponies! It only took you " + this.state.totalClicks + " clicks, that is awesome!";
    } else if ( wins < 12 ) {
      let x = this.state.playerWins;
      text = "Good job! You found " + this.state.myLittlePoniesEasy[ x ].name + "!";
      this.selectAPony( x );
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
    let clicks = this.state.totalClicks;
    currentScore += pointValue;
    clicks++;
    this.setState({ totalClicks: clicks })
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
        { this.renderPlayArea() }
        <Scoreboard 
          targetScore = { this.state.targetScore }
          playerScore = { this.state.playerScore }
          playerWins = { this.state.playerWins }
          playerLosses = { this.state.playerLosses }
          totalClicks = { this.state.totalClicks }
        />
        <PonyArea>
          { this.state.myLittlePoniesEasy.map(( myLittlePony ) => (
            <MyLittlePony
              key = { myLittlePony.id }
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
