import React from 'react';
import styles from './Option.module.css'

// I wrote a seperate Option component so that 
// you can use it no matter the number of choices in quiz. 

// this function generates one choice
// in the props, you just need the answer.
// you have so many event handlers in this code.
// maybe you can use event delegation.

// You should pass props like <Option choice="" answer="">
// The answer is used to determine if this choice option is the correct choice.
function Option(props) {

  const handleChange = (event)=>{
    // find the element where the target happened.

    // to obtain the target element's data-answer attribute
    // later the answer is used to determine if a choice is correct.
    const t=event.target;
    const answer= t.getAttribute("data-answer");
    console.log(t);
    // to select the grand parent of the event element; 
    // the grand element is a div. div>li>input(radio)
    const grand= event.target.parentElement.parentElement;
    // to select the span element in this div.
    // this is used to unselect the other option when one option is selected.
    const comment_container = grand.getElementsByTagName("span")[0];
    console.log(comment_container);
    // if the value property of the target is equal to the answer.
    if (t.value===answer) {
      grand.style.border = '3px solid limegreen';
      //why does the following code doesn't work!!!!
      comment_container.innerHTML = "Correct!";
      comment_container.style.color = 'limegreen';
    } else {
      grand.style.border = '3px solid red';
      
      comment_container.style.color = 'red';
      //why doesn't the following code work?
      comment_container.innerHTML = "Wrong!";
    }  

    // all the following three comments and their code
    // just to achieve one visual effect. When one radio input is 
    // selected, the border 

    // to define a function that gets all the siblings of a element; the result is an array.
    // in our case, elem is the div in div > li > input
    // the filter function removes all the chidren of the div that is not a <li>
    function getSiblings (elem) {
      return Array.from(elem.parentNode.children).filter(
        function (sibling) {return sibling !== elem;}
        );
    }
    // the siblings are the <li> elements that contain all the choices(raido inputs).
    const siblings = getSiblings(grand);
    console.log(siblings);
    
    // to iterate and make the border of these siblings transparent.
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].style.border='none'
      comment_container.innerHTML=''
    }
  }

  return (
    <li className={styles.Option}>
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
        // by element.answer; it will be undefined.
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
        {/* The props object has a choice property that contains the answer option. */}
        {props.choice}
      </label>
      {/* You must not delete the following span. It makes sure that the other option is unchosen when you click one option */}
      <span></span>
    </li>
  );
}

export default Option;