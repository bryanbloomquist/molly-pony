import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Login = ( props ) => {
  return (
    <Container>
      <Row className = "justify-content-center">
        <Col xs = { 12 } sm = { 6 } className = "login p-5 my-5">
          <form>
            <h1>Welcome to Ponyville.</h1>
            <p>What is your name?</p>
            <input
              value = { props.name }
              name = "name"
              type = "text"
              autoComplete = "off"
              className = "nameInput mb-2 p-1"
              onChange = { props.handleInputChange }
            />
            <p>Can you rescue the missing My Little Ponies and all their friends?</p>
            <p>Select Difficulty:</p>
            <button className = "loginBtn p-2 m-2" type = "button" value = "1" onClick = {() => props.setDifficulty( 1 )}>Easy</button>
            <button className = "loginBtn p-2 m-2" type = "button" value = "2" onClick = {() => props.setDifficulty( 2 )}>Normal</button>
            <button className = "loginBtn p-2 m-2" type = "button" value = "3" onClick = {() => props.setDifficulty( 3 )}>Hard</button>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login;