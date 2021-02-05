import React from 'react';
//21.4.3
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

//21.3.4
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//21.3.4, 21.3.6, 21.5.4
const client = new ApolloClient({
    request: operation => {
        const token = localStorage.getItem('id_token');

        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    },
    uri: '/graphql'
});

//update 21.4.3
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className='flex-column justify-flex-start min-100-vh'>
                    <Header />
                    <div className='container'>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/thought" component={SingleThought} />
                            <Route exact path="/profile/:username?" component={Profile} />
                            <Route exact path="/thought/:id" component={SingleThought} />

                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
