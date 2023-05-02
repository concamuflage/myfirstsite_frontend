import { useSearchParams} from 'react-router-dom';
import styles from './Blog.module.css'
import { useEffect,useState } from 'react';
import BlogCard from '../components/BlogCard.js'

// change of hooks will trigger re-render;
// avoid unnecessary re-renders;
// if searchParams change will trigger a re-render, why
// the behavior is so strange when the searchParams is
// removed from depenencies.
// note that this searchParams is an object. 
// what if you use searchParams.id? searchParams.year?
// why my component has so many unnecessary re-renders?

const Blog = () => {
    // why does this statement prints twice sometimes?
    console.log("component rendered");
    // const [searchParams,setSearchParams] = useSearchParams();
    const [entries,setEntries] = useState(null);
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
    // you cannot use searchParams directly in useEffect.
    // so you need to process them like the following.
    // what is the meaning of the following statement?
    
    useEffect(()=>{
       console.log("useEffect called");
       // Fetch returns "	A Promise that resolves to a Response object."
        // in the browser, you can inspect the response.
        // remember the following syntax, x y is not declared.
        // x is just the result from fetch, and y is just the result from 
        // the first then. then() returns a promise as well.

        // fetch(file)
        // .then(x => x.text())
        // .then(y => myDisplay(y));
        // let filter = searchParams.get('year');
      
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
            setEntries(result);
            console.log("entries here",entries);
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    // you can use searchParams as the dependency .
    // this  is better than using state to trigger the update.
    // because when you go- back, you go to the desired page.
  },[searchParams]);
  const entriesFound = entries && entries.length;
  // the following is a conditional rendering.
  // when the component renders for the first time
  // entriesFound is null, and the code in the else() is run.
  // then, useEffect is run, and entriesFound is not null any more.
  // then, the code in if() is run.
  // this whole process explains why there is a flash of no entries found before the 
  // data is used for rendering the page.

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