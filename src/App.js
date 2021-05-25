import './App.css';
import Map from './Map'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Check from './Check'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Map} />
          <Route path="/check" component={Check} />
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
