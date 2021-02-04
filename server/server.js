//21.3.6
const path = require('path');

//21.1.4
const express = require('express');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');
//21.2.5
const { authMiddleware } = require('./utils/auth');

//import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
//create a new Apollo server and pass in our schema data
//update 21.2.5
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

//integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//21.3.6
//serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//21.3.6
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        //log where we can go to test our GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
