import React from 'react';
import styles from './AnswerOption.module.css'
// import PropTypes from 'prop-types';
// import { useState } from 'react';


// this function generates one choice
// use this function and map() to generate all the choices in a quiz
// in the props, you just need the answer.
function AnswerOption(props) {
  // const handleChange=()=>{
  //   if (this.value = this.answer){
  //     this.style.border='3px solid limegreen'
  //   }
  //   else{
  //     this.style.border='3px solid red'
  //   }
  // }

  // const [border,changeBorder] =useState()
  const handleChange = (event)=>{
    // find the element where the target happened.
    // style={{border:`${border}`}
    // to find the parement element of the even.target(this is also an element)
    const t=event.target;
    const answer= t.getAttribute("data-answer");
    console.log(t);
    // to select the grand parent of the event element; the grand element is the div.
    const grand= event.target.parentElement.parentElement;
    const comment_container = grand.getElementsByTagName("span")[0];
    console.log(comment_container);
    if (t.value===answer) {
      grand.style.border = '3px solid limegreen';
      //why does the following code doesn't work!!!!
      comment_container.innerHTML = "Correct!";
      comment_container.style.color = 'limegreen';
    } else {
      grand.style.border = '3px solid red';
      
      comment_container.style.color = 'red';
      //why does the following code doesn't work!!!!
      comment_container.innerHTML = "Wrong!";
    }  
    // to get all the siblings of the grand element; the result is an array.
    function getSiblings (elem) {
      return Array.from(elem.parentNode.children).filter(
        function (sibling) {return sibling !== elem;}
        );
    }
    // the siblings are the li elements that contain other answerchoices.
    const siblings = getSiblings(grand);
    console.log(siblings);
    
    // to iterate and make the border of these siblings transparent.
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].style.border='none'
      comment_container.innerHTML=''
    }


    // if (t.checked){
    //   console.log(t.value,answer)
    //   if (t.value===answer) {
    //     grand.style.border = '3px solid limegreen'
    //   } else {
    //     grand.style.border = '3px solid red'
    //   }  
    // }
    // else{
    //   grand.style.border = ''
    // }
  }

  return (
    <li className={styles.answerOption}>
      <label className="radioCustomLabel" >
      <input
        type="radio"
        className="radioCustomButtonn"
        // radio buttons have the same name is in one group
        name="radioGroup" 
        // value is sent to the server when the form is submitted.
        value={props.choice}
        // can we access the props of its parent function? I think so.
        // I think the compare function should be present in the quiz component
        // else, the same code is repeated in each option.
        // data-attributes must start with data-; the following cannot be accessed
        // through element.answer; it will be undefined.
        // answer={props.answer}
        data-answer={props.answer}

        // the following syntax is wrong! you must use an js object here.
        // style = "border: 3px solid red"
        // such a style doesn't work on radio button, so we should style the label instead.
        // style ={{border:"3px solid red"}}
        
        // The following code can change the border successfully!
        // onChange={()=>changeBorder('2px solid red')}
        // you don't need to use parentheses here.
        // the following event handler only work when the radio button is checked.
        
        onChange={handleChange}
      />
        {/* // the props has a choice property that contains the answer option. */}
        {props.choice}
      </label>
      <span></span>
    </li>
  );
}

// AnswerOption.propTypes = {
//   oneOption: PropTypes.string.isRequired,
//   answer: PropTypes.string.isRequired,
//   compare: PropTypes.func.isRequired
// };

export default AnswerOption;