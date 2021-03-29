import {useState} from 'react';
import axios from 'axios';

export default function AddLink({username, addListItem}) {


  const [submitted, setSubmitted] = useState(false)
  const [content, setContent] = useState({
    title: '',
    name: ''

  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value.toLowerCase() }));
  }
  const onSubmit = async () => {
    const { title, link } = content;
    
    const res = await axios.post('/api/links', { username, title, link});


    if (res.status === 200) {
      addListItem({ title, link  });
      setSubmitted(true)
    }
  }

  return (

    <div className="container">

    <table>
    <thead>
        <tr>
            <th colspan="2">New Link</th>
        </tr>
    </thead>
    <tbody>
        <tr className="top-row">
          
            <label htmlFor="username">Title</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
            
            
        </tr>
        <tr>
            
      <label htmlFor="username">Link</label>
      <input
        type="text"
        name="link"
        value={content.link}
        onChange={onChange}
      />
      
      
            
            
        </tr>
        <tr className="bottom-row">
            
            <button onClick={onSubmit}>Post</button>
        
            
        </tr>

            
    
    </tbody>
</table>


    
    <style jsx>{`

        .container {
         
          width: 100%;
          display: flex;
          justify-content:flex-start;
          align-items:center;
          flex-direction:column;
          border-radius: 10%;
          
        }
        `}</style>

    </div>
  );
}