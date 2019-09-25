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
      playerName: 0,
      playerWins: 59,
      playerLosses: 0,
      targetScore: 0,
      playerScore: 0,
      totalClicks: 0,
      difficulty: 0,
      gameStatus: 1,
      topScores: [{ name: "Rasberry Sparkletwist", score: 12, clicks: 69 }],
      cutieMarks: [ ...CutieMarksJSON],
      myLittlePonies: [ ...MyLittlePoniesJSON],
      valArray: [ 1,2,3,4,5,6,7,8,9 ],
      display: 0,
      showModal1: false,
      showModal2: false,
      modalBody: "Temp Body",
      modalImage: "Temp Image",
      modalTitle: "Temp Title",
      modalTitle2: "Temp Title"
    }
  }

  clickMark = ( id ) => { //updates the player score and total clicks, then checks for end game conditions
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

  clickPony = ( id ) => { //checks to see if pony is unlocked, if so reveals modal with larger image and bio
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

  generateTargetScore = () => { //depending on the difficulty then sets the state
    let min = this.state.difficulty * 5;
    let max = this.state.difficulty * 25;
    this.setState({ targetScore: this.randomizer( min, max )});
  }

  getScoreboard = ( difficulty ) => { //from corresponding database then sets the state
    API.getScores( difficulty )
    .then(( res ) => this.setState({ topScores: res.data }))
    .catch(( err ) => console.log( err ));
  }

  handleClose1 = () => this.setState({ showModal1: false }); //closes modal 1

  handleClose2 = () => this.setState({ showModal2: false }); //closes modal 2

  handleInputChange = ( event ) => { //recognizes when player enters name and updates state
    const { value } = event.target;
    this.setState({ playerName: value })
  }

  handleShow1 = () => this.setState({ showModal1: true }); //opens modal 1

  handleShow2 = () => this.setState({ showModal2: true }); //opens modal 2

  howToPlay = () => { //opens modal 1 with instructions on how to play the game depending on difficulty
    let instructions;
    if ( this.state.difficulty === 1 ) {
      instructions = "Match the Target Score by clicking on the Cutie Marks. The point value for each Cutie Mark is visible. When you match the score you will reveal a hidden Pony. Can you rescue all 12?"
    } else if ( this.state.difficulty === 2 ) {
      instructions = "Match the Target Score by clicking on the Cutie Marks. Each Cutie Mark has a hidden value between 1 and 8, this value is hidden but will stay the same from round to round. When you match the Target Score you will reveal a hidden pony. Can you rescue all 24?"
    } else if ( this.state.difficulty === 3 ) {
      instructions = "Match the Target Score by clicking on the Cutie Marks. Each Cutie Mark has a hidden value between 1 and 9, this value is randomly assigned and changes from round to round. When you match the Target Score you will reveal a hidden pony. Can you rescue all 60?"
    }
    this.setState({
      modalTitle: "How To Play",
      modalImage: "images/Group.jpg",
      modalBody: instructions
    })
    this.handleShow1();
  }

  randomizer = ( min, max ) => Math.floor(( Math.random() * ( max - min + 1 ) + min )); //from mozilla documentation

  restartGame = () => { //will change the content of the modal, then restart the game at whatever difficulty the player selects.
    this.setState({
      modalTitle: "Choose your difficulty.",
      modalBody: 
        <GameOver 
          showHighScores = { this.showHighScores }
          startNewGame = { this.startNewGame }
          gameStatus = { this.state.gameStatus }
        />,
      modalImage: "images/Group.jpg"
    })
    this.handleShow1();
  }

  revealPony = ( x ) => { //by changing it's attribute unlocked to true
    let mlpCopy = JSON.parse( JSON.stringify( this.state.myLittlePonies ))
    mlpCopy[ x ].unlocked = 1
    this.setState({ myLittlePonies: mlpCopy })
  }

  roundLost = () => { //if the Player Score is greater than the Target Score, update state and begin the next round.
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

  roundWon = () => { //if the Player Score matches the Target Score.
    let text;
    let name = this.state.playerName;
    let clicks = this.state.totalClicks + 1;
    let losses = this.state.playerLosses;
    let x = this.state.playerWins;
    let y = this.state.myLittlePonies.length;
    let wins = x + 1;
    this.revealPony( x );
    if ( wins === y ) { //then the game is won, send results to database and load the end screen. 
      text = "Amazing job, " + name + "! You found all the My Little Ponies! It only took you " + clicks + " clicks, that is awesome! Do you want to play again?";
      let playerData = {
        "name": name,
        "score": wins,
        "losses": losses,
        "clicks": clicks
      };
      this.saveResult( playerData );
      this.setState({ gameStatus: 0 });
    } else if ( wins < y ) { //the game continues, update state and begin the next round.
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

  saveResult = ( score ) => { //to the corresponding database at the end of the game
    let difficulty;
    if ( this.state.difficulty === 1 ) {
      difficulty = "easies"
    } else if ( this.state.difficulty === 2 ) {
      difficulty = "normals"
    } else if ( this.state.difficulty === 3 ) {
      difficulty = "hard"
    }
    API.saveScore( difficulty, score )
  }

  setDifficulty = ( x ) => { //to "x" then generates the target score, as long as the player has entered a name.
    if ( !this.state.playerName ) {
      this.setState({
        modalTitle: "Sorry, please enter a name to play.",
        modalBody: "",
        modalImage: "images/sadPony.gif"
      }, () => this.handleShow1( ))
    } else {
      if ( x === 1 ) { 
        this.setState({ 
          myLittlePonies: [ ...MyLittlePoniesJSON.slice( 0, 12 )],
          cutieMarks: [ ...CutieMarksJSON.slice( 0, 4 )]
          // myLittlePonies: this.state.myLittlePonies.slice( 0, 12 ),
          // cutieMarks: this.state.cutieMarks.slice( 0, 4 )
        });
      } else if ( x === 2 ) {
        this.setState({ myLittlePonies: [ ...MyLittlePoniesJSON.slice( 0, 24 )]});
         // this.setState({ myLittlePonies: this.state.myLittlePonies.slice( 0, 24 )});
      } 
      this.setState({ 
        difficulty: x, 
        display: "Good luck, " + this.state.playerName + "!"
      }, () => { 
        this.generateTargetScore();
        this.shuffleArray( this.state.myLittlePonies );
        this.shuffleArray( this.state.cutieMarks );
        this.shuffleArray( this.state.valArray );    
      });
    }
  }

  showHighScores = ( ) => { //at the end of the game when Show High Scores Button is clicked.
    if ( this.state.difficulty === 1 ) {
      this.getScoreboard( "easies" );
      this.setState({ modalTitle2: "Top Scores ( Easy )" }, () => { this.handleShow2( )});
    } else if ( this.state.difficulty === 2 ) {
      this.getScoreboard( "normals" );
      this.setState({ modalTitle2: "Top Scores ( Normal )" }, () => { this.handleShow2( )});
    } else if ( this.state.difficulty === 3 ) {
      this.getScoreboard( "hard" );
      this.setState({ modalTitle2: "Top Scores ( Hard )" }, () => { this.handleShow2( )});
    }
  }

  shuffleArray = ( array ) => { //using the Fisher-Yates algoritim.
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

  startNewGame = ( x ) => { //by reseting all the variables and then setting the difficulty to x
    this.setState({
      playerWins: 0,
      playerLosses: 0,
      targetScore: 0,
      playerScore: 0,
      totalClicks: 0,
      gameStatus: 1,
      myLittlePonies: [ ...MyLittlePoniesJSON],
      cutieMarks: [ ...CutieMarksJSON],
      display: "Good luck, " + this.state.playerName + "!",
    }, () => this.setDifficulty( x ));
    this.handleClose1();
    console.log( this.state.myLittlePonies );
    console.log( this.state.cutieMarks );
    console.log( CutieMarksJSON );
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
            { 
              this.state.gameStatus === 1
            ? 
              <GameArea>
                <Row>
                  { this.state.cutieMarks.slice( 0, 4 ).map(( cutieMark, index ) => (
                    <CutieMark
                      difficulty = { this.state.difficulty }
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
                gameStatus = { this.state.gameStatus }
              />
            }      
            <Scoreboard 
              targetScore = { this.state.targetScore }
              playerScore = { this.state.playerScore }
              playerWins = { this.state.playerWins }
              playerLosses = { this.state.playerLosses }
              totalClicks = { this.state.totalClicks }
            />
            <Button className = "button" onClick = { () => this.howToPlay() }>
              How To Play
            </Button>
            <Button className = "button" onClick = { () => this.restartGame() }>
              Restart
            </Button>
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
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                { this.state.topScores.map(( scores, i ) => (
                  <tr key = { scores._id + "a" }>
                    <td key = { scores._id + "b" }>{ scores.name }</td>
                    <td key = { scores._id + "c" }>{ scores.score }</td>
                    <td key = { scores._id + "e" }>{ scores.clicks }</td>
                    <td key = { scores._id + "d" }>{ scores.losses }</td>
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