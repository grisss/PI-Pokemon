import './App.css';
import Home from "./components/Home.jsx"
import { BrowserRouter, Route , Switch } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Create from './components/Create'
import Details from './components/Details'
import  Delete  from './components/Delete';

function App() {
  return (
  <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/home/:id' component={Details}/>
          <Route path='/create' component={Create}/>
          <Route path='/eliminar' component={Delete}/>
        </Switch>      
      </div>
      </BrowserRouter>
  );
}

export default App;
