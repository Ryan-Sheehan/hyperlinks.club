import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import FormLayout from '../../components/FormLayout';

const Post = () => {
  const [submitted, setSubmitted] = useState(false)
  const [content, setContent] = useState({
    username: '',

  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value.toLowerCase() }));
  }
  const onSubmit = async () => {
    const { username } = content;

    const res = await axios.post('/api/user', { username });
    
    if (res.status === 200) {
      setSubmitted(true)
    }
  }
  return (
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
      
      <button onClick={onSubmit}>Post</button>
    
      
    </div>
    }
    </FormLayout>
  );
};

export default Post;