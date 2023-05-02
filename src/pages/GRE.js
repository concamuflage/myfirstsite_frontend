import { Link,Outlet} from "react-router-dom";
import styles from "./GRE.module.css"

const GRE = () => {
    return (
      <div className={styles.wrapper}>
        {/* this will link to localhost/English/GRE/Confusingwords */}
        <Link to='Confusingwords'><h1>Confusing Words</h1></Link>
        <Link to='Mnemonics'><h1>Mnemonics</h1></Link>
        <Outlet/>
      </div> 
    )
  };
  
  export default GRE;