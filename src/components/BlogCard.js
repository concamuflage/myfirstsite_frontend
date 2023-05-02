import React, { useState } from 'react'
import styles from './BlogCard.module.css'
import { useSearchParams } from 'react-router-dom'


export default function BlogCard(props) {

  let [searchParams, setSearchParams] = useSearchParams();
  function handleClick(event){
    let obtained_id = event.currentTarget.getAttribute('id');
    // before I used target instead of currentTarget;
    // this caused me lots of headache because the following statement always
    // generated "id=null"
    // this is because the target element refers to the  element you actually click.
    // in my case, the p or h1 element in the div; 
    // these elements have no id attribute, so id=null.
    // After you click the the child elements, the event will bubble to the div.
    // your event handler in the div must use the currentTarget to refer to the div.

    // let obtained_id = event.target.getAttribute('id');
    // console.log(obtained_id);
    setSearchParams({id:obtained_id});
    // if you add this in this handler, the page won't load again.
    // the change happens on the same page.
  }
  return (
      <div key={props.id} id={props.id} className={styles.container} onClick={handleClick}>
        <h1>{props.title}</h1>
        <h2>{props.time}</h2>
        {/* {console.log("props",props)} */}
        <div className={(props.size=="smallPanel")? styles.smallPanel:styles.bigPanel} dangerouslySetInnerHTML={{__html: props.body}}></div>
      </div>
  )
}



