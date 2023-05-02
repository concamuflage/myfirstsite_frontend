import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import AnswerOption from '../components/AnswerOption';
import styles from './Quiz.module.css'

// pass in an object with properties: question, choices(should be an array called answerOptions), answer
// the object from database is not the correct format; must adjust before
// being passed in as props.
// maybe not. maybe we just need to asign the correct info to the different
// attributes ,which will be passed in as props.
function Quiz(props) {
  // what is the key in this function?
  // in this context, the key is an object like the following one.
  // {"ID":"1","WordOne":"coma","WordTwo":"comma","QuestionOne":"","QuestionTwo":""}
  function renderAnswerOptions(element) {
    return (
      <AnswerOption
        // Keys serve as a hint to React but they don’t get passed to your components.
        // If you need the same value in your component, pass it explicitly as a prop with a different name:
        key={element}
        choice ={element}
        answer= {props.answer}
      />
    );
  }
  return (
      <div className={styles.quiz}>
        <Question content={props.question} />
        <ul className={styles.choices}>
          {/* only arrays have this map function, 
          so choices must be an array containing 
          all the answers.
          wrong: the element of each array is an object. 
          use the dot notation to access an object's values */}
          {/* so each element is passed in the above renderAnswerOptions.
           */}
          {props.choices.map(renderAnswerOptions)}
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


