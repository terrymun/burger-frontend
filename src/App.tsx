import { Component } from 'react';

// Asset imports
import './App.css';

// Component imports
import AppHeader from './components/AppHeader/AppHeader';
import Home from './pages/Home';
import Discover from './pages/Discover';
import User from './pages/User';

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
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/discover">
                <Discover />
              </Route>
              <Route exact path="/user">
                <User />
              </Route>
            </Switch>
          </section>
        </main>
      </Router>
    );
  }
}

export default App;
