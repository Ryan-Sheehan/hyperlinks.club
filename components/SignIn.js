/* globals window */
import React, { useEffect, useState } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth';
import axios from 'axios';
import FormLayout from './FormLayout';
import Link from 'next/link';



const SignIn = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [content, setContent] = useState({
    username: '',
    email:'',
    password:'',
  })

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: name === 'username' ? value.toLowerCase() : value }));
  }

  const onSubmit = async () => {
    
    const authRes = signUp(content);
    console.log(authRes.code)
    if(authRes.code === 'auth/email-already-in-use') {

    }
    else if(authRes.code === 'auth/weak-password') {

    }  else {
      //registerUsername();
    }
    console.log(authRes.code === 'auth/weak-password')


    
  }

  const registerUsername = async () => {
    const { username } = content;
    const res = await axios.post('/api/user', { username });
    
    if (res.status === 200) {
      setSubmitted(true)
    }
  }

  const signUp = async ({ username, email, password }) => {
   return await firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
     console.log(response)
    })
    .catch((error) => {
      
     return { error };
    });
  }; 

  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <FormLayout>
    {submitted ? <div>Submitted</div> :
    <div className="form">
      
      <label htmlFor="username">Email</label>
      <input
        type="text"
        name="email"
        value={content.email}
        onChange={onChange}
      />
      <label htmlFor="username">Password</label>
      <input
        type="text"
        name="password"
        value={content.password}
        onChange={onChange}
      />
      
      <button onClick={onSubmit}>Post</button>

      <Link href="/signup"><a className="text-link">I need an account</a></Link>
    
      
    </div>
    }
    </FormLayout>
      ) : null}
    </div>
  )
}

export default SignIn