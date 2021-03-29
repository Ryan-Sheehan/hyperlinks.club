import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import dashify from 'dashify';
import axios from 'axios';
import FormLayout from '../../../components/FormLayout';
import RedButton from '../../../components/hyperlink/RedButton';

const EditUser = () => {
  const router = useRouter()
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
  })

  useEffect(() => {
    async function fetchData () {
    const { id } = router.query;
    console.log(id)
    if (id) {
      const res = await axios.get(`/api/user/${id}`);
      const { title, body } = res.data;
      setContent({
        title,
        body
      })
    }
    }
    fetchData();
  }, [router])

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const onSubmit = async (e) => {
    const { id } = router.query
    const { title, body } = content;
    console.log(id, title, body);
    await axios.put(`/api/user/${id}`, {
      slug: dashify(title),
      title,
      body,
    });
  }

  const onDelete = async () => {
    const { id } = router.query;
    await axios.delete(`/api/user/${id}`);
    router.back();
  }

  return (
    <FormLayout>
    <div className="form">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
      <label htmlFor="body">Link</label>
      <input
        type="text"
        name="body"
        value={content.body}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Update</button>
      <RedButton onClick={onDelete}>Delete</RedButton>
      
      
    </div>
    </FormLayout>
    
  );
};

export default EditUser;