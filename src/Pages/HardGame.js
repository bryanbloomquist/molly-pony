import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import CutieMarksJSON from "../JSON/CutieMarks.json";
import MyLittlePoniesEasyJSON from "../JSON/myLittlePoniesEasy.json";
import MyLittlePoniesNormalJSON from "../JSON/myLittlePoniesNormal.json";
import MyLittlePoniesHardJSON from "../JSON/myLittlePoniesHard.json";
import CutieMark from "../Components/GameArea/CutieMark.js";
import GameArea from "../Components/GameArea/GameArea";
import MyLittlePony from "../Components/PonyArea/MyLittlePony";
import PonyArea from "../Components/PonyArea/PonyArea";
import BackButton from "../Components/BackButton";
import Billboard from "../Components/Billboard";
import PonyModal from "../Components/PonyModal";
import Scoreboard from "../Components/Scoreboard";
import '../App.css';

class hardGame extends Component {

  state = {
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    totalClicks: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePonies: MyLittlePoniesEasyJSON.concat( MyLittlePoniesNormalJSON, MyLittlePoniesHardJSON ),
    valArray: [ 1,2,3,4,5,6,7,8,9 ],
    display: "Match the Target Score by clicking on the Cutie Marks, but be careful, their value changes each game.",
    show: false,
    modalBody: "Temp Body",
    modalTitle: "Temp Title",
    modalImage: "Temp Image"
  }

  //function to shuffle array
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

  //generate random number between 18 and 72 for the Target Score
  generateTargetScore = () => {
    let x = Math.floor(( Math.random() * 55 ) + 18 );
    this.setState({ targetScore: x})
  }

  //generates target score and shuffles arrays after the screen has loaded
  componentDidMount() {
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
    this.shuffleArray( this.state.valArray );
    this.shuffleArray( this.state.myLittlePonies );
  }

  //reveals a pony after every win
  selectAPony = ( x ) => {
    let mlpCopy = JSON.parse( JSON.stringify( this.state.myLittlePonies ))
    mlpCopy[ x ].unlocked = 1
    this.setState({ myLittlePonies: mlpCopy })
  }

  //if Player Score = Target Score
  roundWon = () => {
    let text;
    let wins = this.state.playerWins;
    wins++;
    //ends the game if the player unlocked all 60 
    if ( wins === 60 ) {
      let x = this.state.playerWins;
      this.selectAPony( x );
      text = "Amazing job! You found all the My Little Ponies! It only took you " + this.state.totalClicks + " clicks, that is awesome!";
    //otherwise the game keeps going
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
    this.shuffleArray( this.state.valArray );
  }

  //if Player Score > Target Score
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
    this.shuffleArray( this.state.valArray );
  }

  //add value when button is clicked
  clickMark = ( id ) => {
    if ( this.state.playerWins < 60 ) {
      let pointValue = id;
      let currentScore = this.state.playerScore;
      let target = this.state.targetScore;
      let clicks = this.state.totalClicks;
      let losses = this.state.playerLosses;
      currentScore += pointValue;
      clicks++;
      this.setState({ totalClicks: clicks })
      if ( currentScore > target && losses < 9 ) {
        this.roundLost();
      } else if ( currentScore > target && losses === 9 ) {
        this.props.history.push( "/gamelost" );
      } else if ( currentScore === target ) {
        this.roundWon();
      } else {
        this.setState({ playerScore: currentScore })
      }
    } else {
      this.props.history.push( "/gamewon" );
    }
  }

  //display pony and bio if pony is unlocked
  clickPony = ( id ) => {
    let thisPony = this.state.myLittlePonies.filter(( e ) => e.id === id );
    if ( thisPony[ 0 ].unlocked === 1 ) {
      this.setState({ 
        modalTitle: thisPony[ 0 ].name,
        modalBody: thisPony[ 0 ].bio,
        modalImage: thisPony[ 0 ].image
      })
      this.handleShow();
    }
    else return;
  }

  backButton = () => this.props.history.push( "/" );

  //constructor to handle the modal functions
  constructor( props, context ){
    super (props, context );
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  render() {
    return (
      <Container fluid = { true }>
        <Billboard 
          display = { this.state.display }
        />
        <GameArea>
          { this.state.cutieMarks.slice( 0, 4 ).map(( cutieMark, index ) => (
            <CutieMark
              clickMark = { this.clickMark }
              key = { cutieMark.id }
              id = { this.state.valArray[ index ] }
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
        <BackButton 
          backButton = { this.backButton }
        />
        <PonyArea>
          { this.state.myLittlePonies.map(( myLittlePony ) => (
            <MyLittlePony
              clickPony = { this.clickPony }
              key = { myLittlePony.id }
              id = { myLittlePony.id }
              name = { myLittlePony.name }
              image = { myLittlePony.image }
              unlocked = { myLittlePony.unlocked }
            />
          ))}
        </PonyArea>
        <PonyModal 
          handleClose = { this.handleClose }
          show = { this.state.show }
          modalTitle = { this.state.modalTitle }
          modalImage = { this.state.modalImage }
          modalBody = { this.state.modalBody }
        />
      </Container>
    );
  }

}

export default hardGame;