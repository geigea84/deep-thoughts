//21.5.3
import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

//21.6.3
export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;

//21.6.5
export const ADD_THOUGHT = gql`
    mutation addThought($thoughtText: String!) {
        adddThought(thoughtText: $thoughtText) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
            }
        }
    }
`;

//21.6.6
export const ADD_REACTION = gql`
    mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
        addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
            _id
            reactionCount
            reactions {
                _id
                reactionBody
                createdAt
                username
            }
        }
    }
`;