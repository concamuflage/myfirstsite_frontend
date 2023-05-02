import styles from './Home.module.css'

const Home = () => {
    return (
      <div className={styles.wrapper}>

        <h1>Welcome to My World</h1>
        <h2>On this site, you can </h2>
        <ul>
          <li>Practice English</li>
          <li>Prepare for the GRE exam</li>
          <li>Read my nonsense</li>
        </ul>
      </div>
    )
  };
  
  export default Home;