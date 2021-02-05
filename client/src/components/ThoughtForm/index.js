//21.6.4
import { React, useState } from 'react';
//21.6.5
import { useMutation } from '@apollo/react-hooks';
import { ADD_THOUGHT } from '../../utils/mutations';

/* 21.6.5 Why does it matter which page you're on if Profile 
and Home both use the same ThoughtForm component?

There are actually two things happening here:

The Profile page relies on QUERY_ME (not QUERY_THOUGHTS) to populate
the thoughts, so updating the cache of the latter doesn't help.

If you visit the /profile route without first visiting the homepage, 
QUERY_THOUGHTS will have never been cached, resulting in an error 
when you try to read and update it.

To fix this issue, we'll first wrap the QUERY_THOUGHTS cache update 
in a try...catch statement to prevent the error from blocking the 
next step. That next step will be to update the thoughts array on 
the QUERY_ME cache. */
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
    //21.6.4
    const [thoughtText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    //21.6.5
    const [adddThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { adddThought } }) {
            //could potentially not yet exist, so wrap in a try...catch
            try {
                //read what's currently in the cache
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

                //prepend the newest thought to the front of the array
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [adddThought, ...thoughts] }
                });
            }
            catch (e) {
                console.error(e);
            }

            //update me object's cache, append new thought to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, thoughts: [...me.thoughts, adddThought] } }
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            //add thought to database
            await adddThought({
                variables: { thoughtText }
            });

            //clear form value
            setText('');
            setCharacterCount(0);
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new thought..."
                    value={thoughtText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ThoughtForm;