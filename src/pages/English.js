import {Link,Outlet} from 'react-router-dom';
import styles from './English.module.css'
const English = () => {
    return (
        <div className = {styles.wrapper}>
            <ul>
                {/* this will link to localhost/English/GRE */}
                <Link to='GRE'>
                    <li>Prepare for the GRE</li>
                </Link>
                <Link to='Expressions'>
                    <li>Expressions</li>
                </Link>
                <Link to='Spelling'>
                    <li> Spelling Exercises</li>
                </Link>
            </ul>
        </div>
    )
  };
  
  export default English;