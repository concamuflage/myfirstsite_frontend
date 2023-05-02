import { useSearchParams} from 'react-router-dom';
import styles from './Blog.module.css'
import { useEffect,useState } from 'react';
import BlogCard from '../components/BlogCard.js'

const Blog = () => {
    let entries;
    // const [searchParams,setSearchParams] = useSearchParams();
    // const [entries,setEntries] = useState(null);
    // const [searchParams,setSearchParams] = useSearchParams(null);
    // in a class component, you use componentDidMount,
    // in a functional component, you use useEffect hook.
    // the following statement is completely wrong! you shouldn't write anything in the
    // useSearchParams if you want it to use the current url's query string.
    // {year:2023} in the following statement caused undesired behaviors.
    // 1 when I refreshed the page, it didn't use id=3 in the url.
    //   instead, it used year=2023 as the query string because I wrote this as the default.
    // it took me half a day to fix this bug...I hate React!
    // const [searchParams,setSearchParams] = useSearchParams({year:2023});
    const [searchParams,setSearchParams] = useSearchParams();
    // const [entries,setEntries]=useState()
    let url = `http://localhost:80/myFirstSite_Back/Blog.php?${searchParams}`;
    fetch(url).then(response => {
        // response refers to the Response object returned by fetch. 
        // you can use X to refer to it as well.
        console.log(response);
        // https://developer.mozilla.org/en-US/docs/Web/API/Response/json
        // response.json takes json and turn it into an object.
        // the returned response is an array of objects.I assume
        // that the following code turns it into json
        return response.json();
        //Where is the 'result' from？
        // it refers to the result of response.json().
        // it doesn't need to be declared.
        }).then(result => {
        entries = result;
        console.log("second");
        console.log("entries",entries);
        }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
        }); 
    // in asynchronous code, the following is run before 
    // the fetch, so entriesFound will be undefined.
    
    console.log("first")
    const entriesFound = entries && entries.length;
    console.log("entriesFound",entriesFound);
    if (entriesFound
            ) {
            // why this console.log printed twice?
            // I guess because when the search params change and the state entries change,
            // the following code runs each time.
            // so I stopped using entries as a state.
            console.log("entries length",entries.length);
            let panel = (entries.length == 1)? "bigPanel":"smallPanel";
            // console.log("panel",panel)
            return (
              <div className={styles.container}>
                <div className={styles.leftColumn}>
                  <h1 className={styles.year} onClick={()=>setSearchParams({year:2023})}>2023</h1>
                  <h1 className={styles.year} onClick={()=>setSearchParams({year:2022})}>2022</h1>
                </div>
                <div className={styles.rightColumn}>
                  {entries.map(function(item,index){
                    return (
                      // when you use an array to generate a list of components
                      // you must give these components a unique key.
                      // also, children of these components must be given the 
                      // same unique id. 
                      // I didn't give <BlogCard> such a unique key and there was the following error:
                      // act-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.
                      // I thought only list elements should contain such a unique key.
                      <BlogCard key={item.id} size={panel} id={item.id} title={item.Title} time={item.Time} body={item.Body}/>
                    )
                  })}
                </div>
              </div>);
          } else {
            return (
              <div id={styles.container}>
                  No entries found
              </div>
            )
          }   
  };

  export default Blog;