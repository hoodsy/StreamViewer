import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import Nav from './components/Nav';
import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact component={SplashPage} />
        <Route path="/home" component={HomePage} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
