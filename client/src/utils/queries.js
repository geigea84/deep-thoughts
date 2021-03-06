//21.3.5
import gql from 'graphql-tag';

export const QUERY_THOUGHTS = gql`
    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

//21.4.5
export const QUERY_THOUGHT = gql`
    query thought($id: ID!) {
        thought(_id: $id) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

//21.4.6
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
            }
        }
    }
`;

//21.5.6
export const QUERY_ME = gql`
    {
        me{
            _id
            username
            email
            friendCount
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
                reactions {
                    _id
                    createdAt
                    reactionBody
                    username
                }
            }
            friends {
                _id
                username
            }
        }
    }
`;

//21.5.6
export const QUERY_ME_BASIC = gql `
    {
        me {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;