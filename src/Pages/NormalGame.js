import React, { Component } from 'react';
import { Button, Container, Modal } from "react-bootstrap";
import CutieMarksJSON from "../JSON/CutieMarks.json";
import MyLittlePoniesEasyJSON from "../JSON/myLittlePoniesEasy.json";
import MyLittlePoniesNormalJSON from "../JSON/myLittlePoniesNormal.json";
import CutieMark from "../Components/GameArea/CutieMark.js";
import GameArea from "../Components/GameArea/GameArea";
import MyLittlePony from "../Components/PonyArea/MyLittlePony";
import PonyArea from "../Components/PonyArea/PonyArea";
import BackButton from "../Components/BackButton";
import Billboard from "../Components/Billboard";
import Scoreboard from "../Components/Scoreboard";
import '../App.css';

class easyGame extends Component {

  state = {
    playerWins: 0,
    playerLosses: 0,
    targetScore: 0,
    playerScore: 0,
    totalClicks: 0,
    cutieMarks: CutieMarksJSON,
    myLittlePonies: MyLittlePoniesEasyJSON.concat( MyLittlePoniesNormalJSON ),
    display: "Match the Target Score by clicking on the Cutie Marks, each Cutie Mark has a hidden value.",
    show: false,
    modalBody: "Temp Body",
    modalTitle: "Temp Title"
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

  //generate random number between 6 and 36 for the Target Score
  generateTargetScore = () => {
    let x = Math.floor(( Math.random() * 31 ) + 6 );
    this.setState({ targetScore: x})
  }

  //run generateTargetScore after the screen has loaded
  componentDidMount() {
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
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
    if ( wins === 24 ) {
      let x = this.state.playerWins;
      this.selectAPony( x );
      text = "Amazing job! You found all the My Little Ponies! It only took you " + this.state.totalClicks + " clicks, that is awesome!";
    } else if ( wins < 24 ) {
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
  }

  //add value when button is clicked
  clickMark = ( id ) => {
    if ( this.state.playerWins < 24 ) {
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
        modalBody: thisPony[ 0 ].bio
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
        <Modal show = { this.state.show } onHide = { this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>{ this.state.modalTitle }</Modal.Title>
          </Modal.Header>
          <Modal.Body>{ this.state.modalBody }</Modal.Body>
          <Modal.Footer>
            <Button variant = "warning" onClick = { this.handleClose }>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }

}

export default easyGame;