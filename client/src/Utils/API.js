import axios from "axios";

export default {
  getScores: function( difficulty ) {
    return axios.get( "/api/" + difficulty );
  },
  saveScore: function( difficulty, playerScore ) {
    return axios.post( "/api/" + difficulty, playerScore )
  }
}