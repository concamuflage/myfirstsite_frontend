
import PropTypes from 'prop-types';
import Option from '../components/Option';
import styles from './Quiz.module.css'
import React from 'react'

// <Quiz question={questionOneWithABlank} choices={[item.WordOne,item.WordTwo]} answer={item.WordOne}/>

export default function Quiz2(props) {
  return (
    <div>
        <h2 className="question" dangerouslySetInnerHTML={{__html: props.question}}></h2>
        
    </div>
  )
}
