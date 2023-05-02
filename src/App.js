// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import English from './pages/English';
import Blog from './pages/Blog';
import Home from './pages/Home';
import GRE from './pages/GRE';
import Confusingwords from './pages/Confusingwords';
import Mnemonics from './pages/Mnemonics';
import Expressions from './pages/Expressions';
import Spelling from './pages/Spelling';

function App() {
  return (
    <>
    <Router> 
      <Navbar />
      {/* Why does the following code doesn't work.
      Error: "No routes matched location "/English/GRE""
      For a nested route to work, its parent component
      must contain a <Outlet/>
      My <Home/> <English/> <GRE/> didn't contain such a <Outlet/>
      */
      }
      {/* <Routes>
        <Route path='/' exact element={<Navbar />}/>
          <Route path='Home' element={<Home />}/>
          <Route path='English' element={<English />}/>
            <Route path='GRE' element={<GRE />}/>
              <Route path='Confusingwords' element={<Confusingwords />}/>
              <Route path='Mnemonics' element={<Mnemonics />}/>
          <Route path='Blog' element={<Blog />}/>
      </Routes> */}

      {/* the element is inserted into the <Outlet/> in <Navbar/> */}
      <Routes>
        <Route path='/' exact element={<Home />}/>
        <Route path='English' element={<English />}/>
        <Route path='English/GRE' element={<GRE />}/>
        <Route path='English/GRE/Confusingwords' element={<Confusingwords />}/>
        <Route path='English/GRE/Mnemonics' element={<Mnemonics />}/>
        <Route path='English/Expressions' element={<Expressions />}/>
        <Route path='Blog' element={<Blog />}/>
        <Route path='English/Spelling' element={<Spelling />}/>
      </Routes>
    </Router>
  </>
  );
}

export default App;
