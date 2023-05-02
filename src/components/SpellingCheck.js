import React, { Component } from 'react'

// give this class 3 props: word,sentence,reminder
export class SpellingCheck extends Component {
  constructor(props) {
    super(props)
    // since you only need to use the properties in the props object,
    // you don't need to use state.
    // this.state = {
    //    word:props.word,
    //    sentence: props.sentence,
    // }
    this.handleChange=this.handleChange.bind(this)
    // useRef is a hook and is used in a functional component.
    this.textInput=React.createRef();
  }
  // compare the input text with the answer
  // unfortunately, if this function is directly used like the following, it doesn't work
  // s = `<input type="text" size="${length}" onChange=${this.handleChange}>`
  // <p dangerouslySetInnerHTML={{__html: s}}></p>
  // For this reason, we have to add an event listener after the component is mounted.


  handleChange(e){
    let s = e.target.value;
    if (s===this.props.word) {
        e.target.style.border ="3px solid green"
    } else {
        e.target.style.border ="3px solid red"
    }
  };
  // I tried to useEffect here to add the event listener, but it can only be
  // used in a functional component. All hooks can only be used in functional components.
  // useEffect(() => {
  //   // useEffect can be used to directly update the DOM.
  //   // here we add an event listener to the text field.
  // }, [third])
  // useEffect(()=>{}
  // ,[])
  
  // You can only add the event listner after the mounting; 
  // otherwise, the code may fail to find the element because the element is not in the DOM.
  // the following code works correctly with the first line but incorrectly with 
  // the rest of the lines.
  
  componentDidMount(){
    // why does it return null for in the second line?
    // let el = document.getElementById(this.props.word);
    // console.log("element is"+el);
    // el.addEventListener('change',this.handleChange)
    let el = this.textInput.current;
     // I used firstChild and it chose a text node.
    // in order to chose the first element child, you use firstElementChild.
    // I tried the following method, but it didn't work.
    // `<input type="text" size=${length} id=${this.props.word} ref=${this.textInput}>`
    // somehow, when ref is used in the template literal, textInput.current is not associated 
    // the desired input element.
    // the following method is a workaround.
    // ref is used by only react; it doesn't appear as an attribute in the div.
    let grandchild=el.firstElementChild.firstElementChild;
    if(!grandchild){
      console.log("The target word in the intence is not replaced by a text field. The issue might be caused by a punctuation following the target word"+el)
    }
    grandchild.addEventListener('change',this.handleChange)
  }
  // // // why do we need the following line?
  // // // it will be called immediately before a component is removed 
  // // // release resourses of the browsers. 
  // // // but in our case, what resources are released?
  componentWillUnmount(){
    let el = this.textInput.current;
    let grandchild=el.firstElementChild.firstElementChild;
    grandchild.removeEventListener('change',this.handleChange)
  }

  render() {
        let old_text = new RegExp(this.props.word,"i")
        let length = this.props.word.length
        // Because of the following code, each sentence should contain only one correct word.
        // otherwise, there will be multiple text input with the same id.
        let i = `<input type="text" size=${length} id=${this.props.word}>`
        // let new_text = new RegExp(i)

        let s = this.props.sentence.replace(old_text,i)
        
        // let dom = new DOMParser.parseFromString(s,"text/xml")
    return (
        
      <div ref={this.textInput}>
        {/* // this is dangerous because it allows cross site scripting 
        // however, in our case, it doesn't matter because the string is
        from the server instead of a user input.*/}
        <p dangerouslySetInnerHTML={{__html: s}}></p>
      </div>
    )
  }
}

export default SpellingCheck
