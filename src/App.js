import React from 'react'
import Home from './components/Home'
import Playstation from './components/Playstation'
import './styles/App.css'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import AnimatedCursor from "react-animated-cursor"

const App = () => {
  
  return (
      <BrowserRouter basename='/'>
      <AnimatedCursor
        outerSize={150}
        color='193, 11, 111'
        outerAlpha={0.4}
        outerScale={1}
        innerScale={3}
        trailingSpeed={2}
      />
        <Switch>
          <Route exact path='/where-is-waldo/' component={Home}/>  
          <Route exact path='/where-is-waldo/playstation' component={Playstation}/>  
        </Switch>
      
    </BrowserRouter>
  )
}

export default App;
