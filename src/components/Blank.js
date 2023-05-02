import React, { Component } from 'react'

// give this class 3 props: word, sentence
// this class will replace the word in the sentence with "____"
export class Blank extends Component {
  constructor(props) {
    super(props)
  }
  render() {
        let s = this.props.sentence.replace(props.word,"____")
    return (
        <p>{s}</p>
    )
  }
}

export default Blank
