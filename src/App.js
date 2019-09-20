import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import CutieMarksJSON from "./JSON/CutieMarks.json";
import MyLittlePoniesJSON from "./JSON/myLittlePonies.json";
import CutieMark from "./Components/GameArea/CutieMark.js";
import Login from "./Components/Login";
import GameArea from "./Components/GameArea/GameArea.js";
import MyLittlePony from "./Components/PonyArea/MyLittlePony";
import PonyArea from "./Components/PonyArea/PonyArea";
import Billboard from "./Components/Billboard";
import PonyModal from "./Components/PonyModal";
import Scoreboard from "./Components/Scoreboard";
import "./styles.scss";

class App extends Component {
  constructor( props, context ){
    super ( props, context );
    this.setDifficulty = this.setDifficulty.bind( this );
    this.handleShow = this.handleShow.bind( this );
    this.handleClose = this.handleClose.bind( this );
    this.state = {
      playerWins: 0,
      playerLosses: 0,
      targetScore: 0,
      playerScore: 0,
      totalClicks: 0,
      difficulty: 0,
      cutieMarks: CutieMarksJSON,
      myLittlePonies: MyLittlePoniesJSON,
      valArray: [ 1,2,3,4,5,6,7,8,9 ],
      display: "Match the Target Score by clicking on the Cutie Marks, each Cutie Mark has a hidden value.",
      show: false,
      modalBody: "Temp Body",
      modalTitle: "Temp Title",
      modalImage: "Temp Image"
    }
  }

  //this sets the game difficulty, then generates the score AFTER the difficulty is set
  setDifficulty = ( x ) => {
    if ( x === 1 ) { 
      this.setState({ myLittlePonies: this.state.myLittlePonies.slice( 0, 12 )});
    } else if ( x === 2 ) {
      this.setState({ myLittlePonies: this.state.myLittlePonies.slice( 0, 24 )});
    }
    this.setState({ difficulty: x }, () => { 
      this.generateTargetScore();
      this.shuffleArray( this.state.myLittlePonies );
    });
  }

  //this handles the modal close function
  handleClose = () => this.setState({ show: false });

  //this handles the modal open function
  handleShow = () => this.setState({ show: true });

  //this function is used shuffle the array passed into it
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

  //this function generates a random number between the min and max number
  randomizer = ( min, max ) => Math.floor(( Math.random() * ( max - min + 1 ) + min ));

  //this determines the Target Score based on difficulty selected
  generateTargetScore = () => {
    if ( this.state.difficulty === 1 ) {
      let x = this.randomizer( 6, 36 );
      this.setState({ targetScore: x });
      return;
    } else if ( this.state.difficulty === 2 ) {
      let x = this.randomizer( 9, 48 );
      this.setState({ targetScore: x });
      return;
    } else if ( this.state.difficulty === 3 ) {
      let x = this.randomizer( 18, 96 );
      this.setState({ targetScore: x });
      return;
    }
  }

  //run generateTargetScore after the screen has loaded
  componentDidMount = () => {
    this.shuffleArray( this.state.cutieMarks );
    this.shuffleArray( this.state.valArray );
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
    let x = this.state.playerWins;
    let y = this.state.myLittlePonies.length - 1;
    this.selectAPony( x );
    this.showPony( x );
    if ( x === y ) {
      text = "Amazing job! You found all the My Little Ponies! It only took you " + this.state.totalClicks + " clicks, that is awesome!";
    } else if ( x < y ) {
      text = "Good job! You found " + this.state.myLittlePonies[ x ].name + "!";
      this.generateTargetScore();
      this.shuffleArray( this.state.cutieMarks );
      this.shuffleArray( this.state.valArray );
    }
    this.setState({
      playerWins: x + 1,
      playerScore: 0,
      display: text
    });
  }

  //if Player Score > Target Score
  roundLost = () => {
    let losses = this.state.playerLosses;
    losses++;
    this.setState({
      playerLosses: losses,
      playerScore: 0,
      display: "That's okay. You can do it. Try Again."
    });
    this.generateTargetScore();
    this.shuffleArray( this.state.cutieMarks );
    this.shuffleArray( this.state.valArray );
  }

  //add value when button is clicked
  clickMark = ( id ) => {
    let y = this.state.myLittlePonies.length;
    if ( this.state.playerWins < y ) {
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
    } else {
      this.setState({ // Once DB setup, replace with top ten scores!!!!
        modalTitle: "Congratulations",
        modalBody: "You have found all of the Ponies and their friends! You are Awesome!",
        modalImage: ""
      })
      this.handleShow();

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

  //display pony modal when pony is first unlocked
  showPony = ( x ) => {
    let thisPony = this.state.myLittlePonies[ x ];
    this.setState({ 
      modalTitle: thisPony.name,
      modalBody: thisPony.bio,
      modalImage: thisPony.image
    })
    this.handleShow();
  }

  render() {
    return (
      !this.state.difficulty ? <Login setDifficulty = { this.setDifficulty }/> :
      <Container fluid = { true }>
        <Row>
          <Col xs = { 12 } sm = { 3 }>
            <Billboard 
              display = { this.state.display }
            />          
            <GameArea>
              <Row>
              { this.state.cutieMarks.slice( 0, 4 ).map(( cutieMark, index ) => (
                <CutieMark
                  clickMark = { this.clickMark }
                  key = { cutieMark.id }
                  id = { this.state.difficulty === 3 ? this.state.valArray[ index ] : cutieMark.id }
                  name = { cutieMark.name }
                  image = { cutieMark.image }
                />
              ))}
              </Row>
            </GameArea>
            <Scoreboard 
              targetScore = { this.state.targetScore }
              playerScore = { this.state.playerScore }
              playerWins = { this.state.playerWins }
              playerLosses = { this.state.playerLosses }
              totalClicks = { this.state.totalClicks }
            />
          </Col>
          <Col xs = { 12 } sm = { 9 } className = "pr-0">
            <PonyArea>
              { this.state.myLittlePonies.map(( myLittlePony ) => (
                <MyLittlePony
                  difficulty = { this.state.difficulty }
                  clickPony = { this.clickPony }
                  key = { myLittlePony.id }
                  id = { myLittlePony.id }
                  name = { myLittlePony.name }
                  image = { myLittlePony.image }
                  unlocked = { myLittlePony.unlocked }
                />
              ))}
            </PonyArea>
          </Col>
        </Row>
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

export default App;