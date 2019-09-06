import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import CutieMarksJSON from "../CutieMarks.json";
import MyLittlePoniesEasyJSON from "../myLittlePoniesEasy.json";
import MyLittlePoniesNormalJSON from "../myLittlePoniesNormal.json";
import MyLittlePoniesHardJSON from "../myLittlePoniesHard.json";
import CutieMark from "./GameArea/CutieMark.js";
import GameArea from "./GameArea/GameArea";
import MyLittlePony from "./PonyArea/MyLittlePony";
import PonyArea from "./PonyArea/PonyArea";
import Billboard from "./Billboard";
import Scoreboard from "./Scoreboard";
import '../App.css';

class easyGame extends Component {

  state = {
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    totalClicks: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePonies: MyLittlePoniesEasyJSON.concat( MyLittlePoniesNormalJSON, MyLittlePoniesHardJSON ),
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
    console.log( this.state.difficulty );
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
    this.shuffleArray( this.state.myLittlePonies );
  }

  // reveals a pony after every fifth win
  selectAPony = ( x ) => {
    let mlpCopy = JSON.parse( JSON.stringify( this.state.myLittlePonies ))
    mlpCopy[ x ].unlocked = 1
    this.setState({ myLittlePonies: mlpCopy })
  }

  // if Player Score = Target Score
  roundWon = () => {
    let text;
    let wins = this.state.playerWins;
    wins++;
    console.log( wins );
    if ( wins === 60 ) {
      text = "Amazing job! You found all the My Little Ponies! It only took you " + this.state.totalClicks + " clicks, that is awesome!";
    } else if ( wins < 60 ) {
      let x = this.state.playerWins;
      text = "Good job! You found " + this.state.myLittlePonies[ x ].name + "!";
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
        <Scoreboard 
          targetScore = { this.state.targetScore }
          playerScore = { this.state.playerScore }
          playerWins = { this.state.playerWins }
          playerLosses = { this.state.playerLosses }
          totalClicks = { this.state.totalClicks }
        />
        <PonyArea>
          { this.state.myLittlePonies.map(( myLittlePony ) => (
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

export default easyGame;