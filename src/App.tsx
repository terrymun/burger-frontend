import { Component } from 'react';

// Asset imports
import './App.css';

// Component imports
import AppHeader from './components/App/Header';
import Home from './pages/Home';
import Discover from './pages/Discover';
import User from './pages/User';
import NotFound from './pages/NotFound';

// Router imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <main className="app">
          <AppHeader />
          <section>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/discover" component={Discover} />
              <Route exact path="/user" component={User} />
              <Route component={NotFound}></Route>
            </Switch>
          </section>
        </main>
      </Router>
    );
  }
}

export default App;
