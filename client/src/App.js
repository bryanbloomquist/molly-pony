import React, { Component } from 'react';
import { Container, Row, Col, Modal, Table, Button } from "react-bootstrap";
import CutieMarksJSON from "./JSON/CutieMarks.json";
import MyLittlePoniesJSON from "./JSON/myLittlePonies.json";
import CutieMark from "./Components/GameArea/CutieMark.js";
import Login from "./Components/Login";
import GameOver from "./Components/GameOver";
import GameArea from "./Components/GameArea/GameArea.js";
import MyLittlePony from "./Components/PonyArea/MyLittlePony";
import PonyArea from "./Components/PonyArea/PonyArea";
import Billboard from "./Components/Billboard";
import PonyModal from "./Components/PonyModal";
import Scoreboard from "./Components/Scoreboard";
import "./styles.scss";
import API from './Utils/API.js';

class App extends Component {
  constructor( props, context ){
    super ( props, context );
    this.startNewGame = this.startNewGame.bind( this );
    this.setDifficulty = this.setDifficulty.bind( this );
    this.handleShow1 = this.handleShow1.bind( this );
    this.handleShow2 = this.handleShow2.bind( this );
    this.handleClose1 = this.handleClose1.bind( this );
    this.handleClose2 = this.handleClose2.bind( this );
    this.state = {
      playerName: 0, //active players name
      playerWins: 0, //how many times the player matched the target score
      playerLosses: 0, //how many times the player went over the target score
      targetScore: 0, //the score the player needs to match
      playerScore: 0, //the active players score
      totalClicks: 0, //tallys total number of clicks to beat game
      difficulty: 0, //easy(1), hard(3), normal(2)
      gameStatus: 1, //is the game going or not
      topScores: [{ name: "Rasberry Sparkletwist", score: 12, clicks: 69 }], //top ten scores pulled from database
      cutieMarks: CutieMarksJSON, //array to draw game buttons from 
      myLittlePonies: MyLittlePoniesJSON, //array to draw the ponies to be rescued from 
      valArray: [ 1,2,3,4,5,6,7,8,9 ], //number array for hard difficulty
      display: "Match the Target Score by clicking on the Cutie Marks, each Cutie Mark has a hidden value.", //instructions and encouragement for player
      showModal1: false, //is the first modal visible or not
      showModal2: false, //is the second modal visible or not
      modalBody: "Temp Body", //body of the modal
      modalTitle: "Temp Title", //title of the modal
      modalImage: "Temp Image", //image for the modal
      modalTitle2: "Temp Title" //title for modal 2
    }
  }

  //this handles the change when player enters there name on login
  handleInputChange = ( event ) => {
    const { value } = event.target;
    this.setState({ playerName: value })
  }

  //this sets the game difficulty, then generates the score AFTER the difficulty is set
  setDifficulty = ( x ) => {
    if ( !this.state.playerName ) {
      this.setState({
        modalTitle: "Sorry, please enter a name to play.",
        modalBody: "",
        modalImage: "images/sadPony.gif"
      }, () => this.handleShow1( ))
    } else {
      if ( x === 1 ) { //easy difficulty, only selects the first 12 ponies for game play
        this.setState({ myLittlePonies: this.state.myLittlePonies.slice( 0, 12 )});
      } else if ( x === 2 ) { //normal difficulty, only selects the first 24
        this.setState({ myLittlePonies: this.state.myLittlePonies.slice( 0, 24 )});
      }
      this.setState({ difficulty: x, }, () => { 
        this.generateTargetScore();
        this.shuffleArray( this.state.myLittlePonies );
      });
    }
  }

  //reset the state to 0 and start a new game
  startNewGame = ( x ) => {
    this.setState({
      playerWins: 0,
      playerLosses: 0,
      targetScore: 0,
      playerScore: 0,
      totalClicks: 0,
      gameStatus: 1,
      myLittlePonies: MyLittlePoniesJSON,
      display: "Match the Target Score by clicking on the Cutie Marks, each Cutie Mark has a hidden value.",
    }, () => this.setDifficulty( x ));
  }

  //these handle the modal close function for both modals
  handleClose1 = () => this.setState({ showModal1: false });
  handleClose2 = () => this.setState({ showModal2: false });

  //these handle the modal open function for both modals
  handleShow1 = () => this.setState({ showModal1: true });
  handleShow2 = () => this.setState({ showModal2: true });

  //the Fisher-Yates algoritim is used shuffle the array passed into it
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
    } else if ( this.state.difficulty === 2 ) {
      let x = this.randomizer( 9, 48 );
      this.setState({ targetScore: x });
    } else if ( this.state.difficulty === 3 ) {
      let x = this.randomizer( 18, 96 );
      this.setState({ targetScore: x });
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
    let name = this.state.playerName;
    let clicks = this.state.totalClicks + 1;
    let x = this.state.playerWins;
    let y = this.state.myLittlePonies.length;
    let wins = x + 1;
    this.selectAPony( x );
    this.showPony( x );
    if ( wins === y ) {
      text = "Amazing job, " + name + "! You found all the My Little Ponies! It only took you " + clicks + " clicks, that is awesome! Do you want to play again?";
      let playerData = {
        "name": name,
        "score": wins,
        "clicks": clicks
      };
      this.saveResult( playerData );
      this.setState({ gameStatus: 0 });
    } else if ( wins < y ) {
      text = "Good job, " + name + "! You found " + this.state.myLittlePonies[ x ].name + "!";
      this.generateTargetScore();
      this.shuffleArray( this.state.cutieMarks );
      this.shuffleArray( this.state.valArray );
    }
    this.setState({
      playerWins: wins,
      playerScore: 0,
      display: text,
    });
  }

  //save player score to database at the end of the game
  saveResult = ( score ) => {
    if ( this.state.difficulty === 1 ) {
      API.saveScore( "easies", score )
      .then(( res ) => console.log( res.data ))
      .catch(( err ) => console.log( err ));
    } else if ( this.state.difficulty === 2 ) {
      API.saveScore( "normals", score )
      .then(( res ) => console.log( res.data ))
      .catch(( err ) => console.log( err ));
    } else if ( this.state.difficulty === 3 ) {
      API.saveScore( "hards", score )
      .then(( res ) => console.log( res.data ))
      .catch(( err ) => console.log( err ));
    }
  }

  //calls the top ten scores to display at the end of the game
  getTopScore = ( diff ) => {
    API.getScores( diff )
    .then(( res ) => this.setState({ topScores: res.data }))
    .catch(( err ) => console.log( err ));
  }

  //shows the top ten scores when button is clicked
  showHighScores = ( ) => {
    if ( this.state.difficulty === 1 ) {
      this.getTopScore( "easies" );
      this.setState({ modalTitle2: "Top Scores ( Easy )" }, () => { this.handleShow2( )});
    } else if ( this.state.difficulty === 2 ) {
      this.getTopScore( "normals" );
      this.setState({ modalTitle2: "Top Scores ( Normal )" }, () => { this.handleShow2( )});
    } else if ( this.state.difficulty === 3 ) {
      this.getTopScore( "hards" );
      this.setState({ modalTitle2: "Top Scores ( Hard )" }, () => { this.handleShow2( )});
    }
  }

  //if Player Score > Target Score
  roundLost = () => {
    let losses = this.state.playerLosses;
    let name = this.state.playerName;
    losses++;
    this.setState({
      playerLosses: losses,
      playerScore: 0,
      display: "That's okay, " + name + ". You can do it. Try Again."
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
      this.handleShow1();
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
    this.handleShow1();
  }

  render() {
    return (
      !this.state.difficulty
    ?
      <Container fluid = {true}>
        <Login 
          setDifficulty = { this.setDifficulty }
          handleInputChange = { this.handleInputChange }
        />
        <PonyModal 
          handleClose1 = { this.handleClose1 }
          showModal1 = { this.state.showModal1 }
          modalTitle = { this.state.modalTitle }
          modalImage = { this.state.modalImage }
          modalBody = { this.state.modalBody }
        />
      </Container>
    :
      <Container fluid = { true }>
        <Row>
          <Col xs = { 12 } sm = { 3 } xl = { 2 } className = "pl-0">
            <Billboard 
              display = { this.state.display }
            />
            { this.state.gameStatus === 1
            ? 
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
            : 
              <GameOver
                showHighScores = { this.showHighScores }
                startNewGame = { this.startNewGame }
              />
            }      
            <Scoreboard 
              targetScore = { this.state.targetScore }
              playerScore = { this.state.playerScore }
              playerWins = { this.state.playerWins }
              playerLosses = { this.state.playerLosses }
              totalClicks = { this.state.totalClicks }
            />
          </Col>
          <Col xs = { 12 } sm = { 9 } xl = { 10 }className = "p-0">
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
          handleClose1 = { this.handleClose1 }
          showModal1 = { this.state.showModal1 }
          modalTitle = { this.state.modalTitle }
          modalImage = { this.state.modalImage }
          modalBody = { this.state.modalBody }
        />
        <Modal show = { this.state.showModal2 } onHide = { this.handleClose2 }>
          <Modal.Header className = "modalHeader" closeButton>
            <Modal.Title>{ this.state.modalTitle2 }</Modal.Title>
          </Modal.Header>
          <Modal.Body className = "modalBody">
            <img src = "/images/ManeSix.png" alt = "The Mane Six" className = "modalImg" />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                { this.state.topScores.map(( scores, i ) => (
                  <tr key = { scores._id + "a" }>
                    <td key = { scores._id + "b" }>{ scores.name }</td>
                    <td key = { scores._id + "c" }>{ scores.score }</td>
                    <td key = { scores._id + "d" }>{ scores.clicks }</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer className = "modalFooter">
            <Button onClick = { () => this.handleClose2() } className = "modalBtn mx-auto">Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }

}

export default App;