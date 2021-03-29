import Link from 'next/link'
import db from '../../utils/db';
import Layout from '../../components/Layout';

const Posts = (props) => {
  const { usersData } = props;
  console.log(usersData)
  return (
    <Layout>
    <div>
      <h1>Users</h1>
      {usersData.map(user => (
        <ul key={user.id}>
          <Link href={`/users/${user.username}`}>
            <a><li>{user.username}</li></a>
          </Link>
          
        </ul>
      ))}
    </div> 
    </Layout>
  );
};

export const getStaticProps = async () => {

  const users = await db.collection('users').orderBy('created', 'desc').get();

  const usersData = users.docs.map(user => ({
    id: user.id,
    ...user.data()
  }));
  console.log(usersData)
  return {
    props: { usersData },
    revalidate: 10
  }
}

export default Posts;