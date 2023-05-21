import React from 'react';
import Quiz from '../components/Quiz';
import styles from './Confusingwords.module.css';

// the following function is used to shuffle an array; copied from a webpage.
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

class Confusingwords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {words_rs: []};

        // What are these?
        // 只是为了后续用map生成表头.
        // 为啥要用string作为KEY呢，奇葩啊。因为这是一个Associative Array.
        this.headers = [
            { key: 'ID', label: 'ID'},
            // { key: 'WordOne', label: 'WordOne' },
            // { key: 'WordTwo', label: 'WordTwo' },
            { key: 'QuestionOne', label: 'QuestionOne' },
            { key: 'QuestionTwo', label: 'QuestionTwo' }
        ];
        // this.state = { checkedBoxes: [] };
        // this.deleteEmployee = this.deleteEmployees.bind(this);
        // this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }
     
    // deleteEmployees = (event) => {
    //     event.preventDefault();
    //     if(window.confirm('Are you sure, want to delete the selected employee?')) {
    //         alert(this.state.checkedBoxes + " Succesfully Deleted");
    //     }
    // }
     
    // toggleCheckbox = (e, item) => {      
    //     if(e.target.checked) {
    //         let arr = this.state.checkedBoxes;
    //         arr.push(item.id);
             
    //         this.setState = { checkedBoxes: arr};
    //     } else {            
    //         let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item.id), 1);
             
    //         this.setState = {
    //             checkedBoxes: items
    //         }
    //     }       
    //     console.log(this.state.checkedBoxes);
    // }
     
    componentDidMount() {
        // Fetch returns "	A Promise that resolves to a Response object."
        // in the browser, you can inspect the response.
        // remember the following syntax, x y is not declared.
        // fetch(file)
        // .then(x => x.text())
        // .then(y => myDisplay(y));

        fetch('http://localhost:80/myFirstSite_Back/Confusingwords.php/').then(response => {
            // response refers to the Response object returned by fetch. 
            // you can use X to refer to it as well.
            console.log(response);
            // https://developer.mozilla.org/en-US/docs/Web/API/Response/json
            // response.json takes json and turn it into an array.
            return response.json(); // this will return an array of objects.
            // For example:
            // [
            // {ID: '469', WordOne: 'weather', WordTwo: 'whether', QuestionOne: 'The weather is very nice!', QuestionTwo: 'Whether you come or not doesn’t matter.'}, 
            // {ID: '470', WordOne: 'cash', WordTwo: 'cache', QuestionOne: 'We only accept cash.', QuestionTwo: 'memory cache'}
            // ]
            //Where is the 'result' from？
            // it refers to the result of response.json().
            // it doesn't need to be declared.
          }).then(result => {
            console.log("result:",result);
            this.setState({
                words_rs:result
            }); 
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }
         
    render() {
        // Isn't this expression redundant?
        // no, it is not; in fact, this is conditional rendering.
        // when employeeFound is true, you render the table.
        // else render "no results found."
        const employeeFound = this.state.words_rs && this.state.words_rs.length;
        if(employeeFound) {
            return (
                <div className={styles.container}><h1> Are you confused by the following words?</h1>
                    <div id="msg"></div>
                    {/* <button type="button" className="btn btn-danger" onClick={this.deleteEmployees}>Delete Selected Employee(s)</button> */}
                    {/* I think the table is styled by bootstrap */}
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                  // What is this line doing here?
                                  //
                                    this.headers.map(function(h) {
                                        return (
                                            // th defines a header cell in HTML
                                            <th key={h.key}>{h.label}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // what do item and index refer to？
                                // item is an element in the array, and index is the index of the element.
                                this.state.words_rs.map(function(item, index) {
                                    // to put two quizzes in an array and shuffle them
                                    // must test if it works.
                                    // To replace a word with ___ in the question.
                                    let targetOne=item.WordOne
                                    let targetTwo=item.WordTwo
                                    // the i means case INSENSITIVE matching
                                    // to generate the regular expressions needed by replace().
                                    // g means global replacement:it will replace the all targets words in a sentence.
                                    let targetOneRegEx= new RegExp(targetOne,"ig")
                                    let targetTwoRegEx= new RegExp(targetTwo,"ig")
                                    // when you want to use a string target contained in a variable
                                    // you need to convert that variable into a regular expression.
                                    let questionOneWithABlank = item.QuestionOne.replace(targetOneRegEx,"___")
                                    let questionTwoWithABlank = item.QuestionTwo.replace(targetTwoRegEx,"___")
                                    const quizOne = <Quiz question={questionOneWithABlank} choices={[item.WordOne,item.WordTwo]} answer={item.WordOne}/>
                                    const quizTwo = <Quiz question={questionTwoWithABlank} choices={[item.WordOne,item.WordTwo]} answer={item.WordTwo}/>
                                    // to shuffle the two questions.
                                    const b = [quizOne,quizTwo]
                                    const a = shuffle(b)
                                return (
                                    <tr key={index}>
                                      {/* <td><input type="checkbox" className="selectsingle" value="{item.id}" checked={this.state.checkedBoxes.find((p) => p.id === item.id)} onChange={(e) => this.toggleCheckbox(e, item)}/>
                                        {item.id}
                                      </td> */}
                                      {/* 到后续要用JSON里面的内容的时候，按照下面这样就可以获取了 */}
                                      <td>{item.ID}</td>
                                      {/* <td>{item.WordOne}</td>
                                      <td>{item.WordTwo}</td> */}
                                      {/* The following code needs to contruct an object that meets this description.
                                      an object with properties: 
                                      question, choices(should be an array called answerOptions), answer
                                      */}
                                      <td>{a[0]}</td>
                                      <td>{a[1]}</td>
                                    </tr>
                                )}.bind(this))
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div id="container">
                    No entries found
                </div>
            )
        }
    }
}
export default Confusingwords;
