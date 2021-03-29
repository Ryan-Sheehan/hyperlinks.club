/* globals window */
import React, { useEffect, useState } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth';
import axios from 'axios';
import FormLayout from './FormLayout';



const SignUp = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [content, setContent] = useState({
    username: '',
    email:'',
    password:'',
    id: ''
  })

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: name === 'username' ? value.toLowerCase() : value }));
  }

  

  const registerUsername = async (id) => {
    console.log(id)
    const {username} = content;
    const res = await axios.post('/api/user', { username, id });
    
    if (res.status === 200) {
      setSubmitted(true)
    }
  }

  const signUp = async ({ username, email, password }) => {
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
     return registerUsername(response.user.uid)
    })
    .catch((error) => {
     return {error};
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
      
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={content.username}
        onChange={onChange}
      />
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
      
      <button onClick={() => signUp(content)}>Post</button>
    
      
    </div>
    }
    </FormLayout>
      ) : null}
    </div>
  )
}

export default SignUp