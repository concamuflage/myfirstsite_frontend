import React from "react";

// this component is only suitable for cases
// where all the columns in the table is used.
// such a the mnemonic table,the Expressions table.

class List extends React.Component {
    constructor(props) {
        super(props);
        state = {lines: [],headers:[]};
        // this.headers = [
        //     { key: 'ID', label: 'ID'},
        //     { key: 'Word', label: 'Word' },
        //     { key: 'Mnemonic', label: 'Mnemonic' },
        // ];
    }
       
    componentDidMount() {
        fetch('http://localhost:80/myFirstSite_Back/toFetchData.php?table=mnemonics').then(response => {
            // response refers to the Response object returned by fetch. 
            // you can use X to refer to it as well.
            console.log(response);
            // https://developer.mozilla.org/en-US/docs/Web/API/Response/json
            // response.json takes json and turn it into an object.
            return response.json();
            //Where is the 'result' from？
            // it refers to the result of response.json().
            // it doesn't need to be declared.
          }).then(result => {
            // Work with JSON data here
            console.log(result);
            this.setState({
                // result is an js object returned by response.json()
                lines:result
            }); 
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }
         
    render() {
        // Isn't this expression redundant?
        const lineFound = this.state.lines && this.state.lines.length;
        if(lineFound) {
            return (
                <div className="container"><h1>Useful mnemonics to help you remember these words!</h1>
                    <div id="msg"></div>
                    {/* <button type="button" className="btn btn-danger" onClick={this.deleteEmployees}>Delete Selected Employee(s)</button> */}
                    {/* I think the table is styled by bootstrap */}
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {
                                  // What is this line doing here?
                                    this.state.headers.map(function(h) {
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
                                // 这个item 和index分别指代的啥？
                                this.state.lines.map(function(item, index) {
                                    // to put two quizzes in an array and shuffle them
                                    // must test if it works.
                                    // const quizOne = <td><Quiz question={item.QuestionOne} choices={[item.WordOne,item.WordTwo]} answer={item.WordOne}/></td>
                                    // const quizTwo = <td><Quiz question={item.QuestionTwo} choices={[item.WordOne,item.WordTwo]} answer={item.WordTwo}/></td>
                                    // const a = [quizOne,quizTwo].sort()
                                return (
                                    <tr key={index}>
                                      {/* <td><input type="checkbox" className="selectsingle" value="{item.id}" checked={this.state.checkedBoxes.find((p) => p.id === item.id)} onChange={(e) => this.toggleCheckbox(e, item)}/>
                                        {item.id}
                                      </td> */}
                                      {/* 到后续要用JSON里面的内容的时候，按照下面这样就可以获取了 */}
                                      <td>{item.id}</td>
                                      <td>{item.Word}</td>
                                      <td>{item.Mnemonic}</td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div id="container">
                    No entries found!
                </div>
            )
        }
    }
}
export default List;



