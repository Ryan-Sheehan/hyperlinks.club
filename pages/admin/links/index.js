import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import FormLayout from '../../../components/FormLayout';

const Post = () => {
  const [content, setContent] = useState({
    username: '',
    title: '',
    link: '',

  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { username, title, link } = content;
    
    await axios.post('/api/links', { username, title, link});
  }
  return (
    <FormLayout>
    <div className="form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={content.username}
        onChange={onChange}
      />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
      <label htmlFor="link">Link</label>
      <input
        type="text"
        name="link"
        value={content.link}
        onChange={onChange}
      />
      
      <button onClick={onSubmit}>Post</button>
      
    </div>
    </FormLayout>
  );
};

export default Post;