import { useRouter } from 'next/router'
import db from '../../utils/db';
import Layout from '../../components/Layout';
import AddLink from '../../components/AddLink'
import RedButton from '../../components/RedButton'
import Error from 'next/error'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'
import {useState} from 'react';
import Link from 'next/link';

const Homepage = (props) => {

  

 
  const { user } = props;
  const username = user.info.username;
  const [adding, setAdding] = useState(false);
  const [links, setLinks] = useState(user.links);
  const AuthUser = useAuthUser()
  

  const addListItem = (newItem) => {
    setLinks(prevState => ([ ...prevState, newItem ]));
  }
  
  const router = useRouter()
  if (router.isFallback) {
    return (
      <div>loading</div>
    )
  } else {
    if (user) {

      return (
        <Layout>
          <Link href="/"><a>Go back home</a></Link>
          <h1>{user.info.username}</h1>
          <ul>
          {links.map((item,i) => 
            <a  key={i} href={item.link} rel="noreferrer" target="_blank"><li>{item.title}</li></a>
          )}
          </ul>
          {adding ? 
            <>
          <AddLink addListItem={addListItem} username={username}/> 
          <RedButton onClick={()=>setAdding(false)}>Done adding</RedButton>
          </>:
          <button onClick={() => setAdding(true)}>+</button>}
          
      
        </Layout>
      );
    } else {
      return (
        <div>not found</div>
      )
    }
  }
};

// export const getStaticPaths = async () => {
//   const users = await db.collection("users").get()
//   //users.docs.map(user => console.log(user.data()));
//   const paths = users.docs.map(user => ({
//     params: {
//       username: user.data().username
//     }
//   }));
//   return {
//     paths: paths,
//     fallback: false
//   }
// }

export const getServerSideProps = async (context) => {
  const {username} = context.params;
  
  
  const user = await db.collection("users").doc(username).get()
  const userLinks = await db.collection("users").doc(username).collection('links').get()
  console.log('-----')
  console.log(user.data())
  console.log('-----')



  const links = []
  userLinks.forEach((item) => {
    
    links.push(item.data())
  })


  
  if(user.exists) {
    return {
      props: {
        user: {
          
          links: links,
          info: user.data() || null,
          revalidate: 5
        }
      }
    }
  }
    return {notFound:true}
 


}

export default withAuthUser({
  whenUnauthed: AuthAction.REDIRECT_TO_APP,
})(Homepage)