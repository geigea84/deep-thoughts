import React from 'react';

//21.3.5, 21.5.6
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
//21.6.4
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
    //21.3.5 use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_THOUGHTS);

    //21.5.6 
    /* use object destructuring to extract 'data' from the 'useQuery' 
    Hook's response and rename it 'userData' to be more descriptive */
    const { data: userData } = useQuery(QUERY_ME_BASIC);

    //21.3.5
    /* What we're saying is, if data exists, store it in the 
    thoughts constant we just created. If data is undefined, 
    then save an empty array to the thoughts component. */
    const thoughts = data?.thoughts || [];
    console.log(thoughts);

    //21.5.6
    /* If you're logged in, the loggedIn variable will be true; 
    otherwise, it will be false */
    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div className='flex-row justify-space-between'>
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <ThoughtForm />
                    </div>
                )}
                <div className={`col-12 mb-3${loggedIn && 'col-lg-8'}`}> {
                    //21.3.5 ternary operator
                    loading
                        ? (
                            <div>Loading...</div>
                        ) : (
                            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
                        )
                }
                </div>
                {loggedIn && userData ? (
                    <div className="col-12 col-lg-3 mb-3">
                        <FriendList
                            username={userData.me.username}
                            friendCount={userData.me.friendCount}
                            friends={userData.me.friends}
                        />
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default Home;
