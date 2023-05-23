import React from 'react';
import PropTypes from 'prop-types';
import Option from '../components/Option';
import styles from './Quiz.module.css'

// You should pass in an object with the following properties: 
// question, choices(should be an array called Options), answer

function Quiz(props) {
  // this is to generate a list of options with the Option component
  const optionList = props.choices.map(choice=><Option
    key={choice}
    choice ={choice}
    answer= {props.answer}
  />)

  return (
      <div className={styles.quiz}>
        <h2 className="question" dangerouslySetInnerHTML={{__html: props.question}}></h2>
        <ul className={styles.choices}>
          {optionList}
        </ul>
      </div>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
};

export default Quiz;


