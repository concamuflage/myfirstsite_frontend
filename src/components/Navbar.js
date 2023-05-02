import React, { useState} from 'react';
import { Link,Outlet } from 'react-router-dom';
import './Navbar.css';
// import { Button } from './Button';

function Navbar() {
  const [click,setClick]= useState(false);
  // const [button,setButton]=useState(true);
  // why not use setClick directly?
  // basically, the following three statements are function expressions.
  // these functions then called in JSX.
  const handleClick = ()=>setClick(!click);
  const closeMobileMenu = ()=>setClick(false);
  // const showButton =()=>{
  //   if (window.innerWidth <=960) {
  //     setButton(false);
  //   } else {
  //     setButton(true);
  //   }
  // }
  // 下面这个做啥的，为啥刷新之后SIGN UP BUTTON就不重新出现了。
  //  useEffect(() => {
  //   showButton();
  // }, []);
  // 下面的代码是错的
  // useEffect(
  //   showButton(),[button]
  // )
  //没有下面这句话，SHOWBUTTON函数完全没有工作。
  // window.addEventListener('resize',showButton)
  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-container'>
          {/* Why not use setClick here directly? */}
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                MySite <i className='fab fa-typo3'/>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times':'fas fa-bars'}/>
            </div>
            <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    {/* closeMobileMenu will retract the mobile menu(only on a small screen the menu will be shown.) */}
                    <Link to='/English' className='nav-links' onClick={closeMobileMenu}>
                    English
                    </Link>
                    
                </li>
                <li className='nav-item'>
                    <Link to='/Blog' className='nav-links' onClick={closeMobileMenu}>
                    Blog
                    </Link>
                </li>
                {/* <li className='nav-item'>
                    <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                    Others
                    </Link>
                </li> */}
            </ul>
            
            {/* {button && <Button buttonStyle='btn-outline'>SIGN UP</Button>} */}
        </div>
      </nav>
      <Outlet/>      
    </div>
  )

}

export default Navbar

