import { Component } from 'react';

// Component imports
import AppHeader from './components/App/Header';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Restaurant from './pages/Restaurant';
import User from './pages/User';
import NotFound from './pages/NotFound';

// Router imports
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LayoutContainer from './components/Layout/Container';

class App extends Component {
  render() {
    return (
      <Router>
        <main className="app flex flex-col min-h-screen">
          <AppHeader />
          <div className="h-full flex-grow">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/discover" component={Discover} />
              <Route exact path="/restaurant/:id" component={Restaurant} />
              <Route exact path="/user" component={User} />
              <Route exact path="/404" component={NotFound}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
          <footer className="mt-6 px-6 py-3 bg-gray-100 dark:bg-gray-600 dark:bg-opacity-40 text-gray-400 dark:text-gray-400 flex-grow-0 transition-colors">
            <LayoutContainer>
              Crafted with React, TypeScript, and Tailwind CSS &middot; &copy; Terry Mun
            </LayoutContainer>
          </footer>
        </main>
      </Router>
    );
  }
}

export default App;
