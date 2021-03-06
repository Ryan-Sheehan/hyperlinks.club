import { useRouter } from 'next/router'
import db from '../utils/db';
import Layout from '../components/Layout';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'

const Homepage = (props) => {
  const AuthUser = useAuthUser()
  console.log(AuthUser)
  const { user } = props;
  const router = useRouter()
  if (router.isFallback) {
    return (
      <div>loading</div>
    )
  } else {
    if (user) {
      console.log(user)
      return (
        <Layout>
        <div>
          <h1>{user.info.username}</h1>
          <ul>
          {user.links.map((item,i) => 
            <a  key={i} href={item.link} rel="noreferrer" target="_blank"><li>{item.title}</li></a>
          )}
          </ul>
          
        </div>
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
//   const paths = users.docs.map(user => ({
//     params: {
//       username: user.data().username
//     }
//   }));
//   return {
//     paths: paths,
//     fallback: true
//   }
// }

export const getServerSideProps = async (context) => {
  const { username } = context.params;
  
  const user = await db.collection("users").doc(username).get()
  const userLinks = await db.collection("users").doc(username).collection('links').get()
  
  const links = []
  userLinks.forEach((item) => {
    
    links.push(item.data())
  })


  
  if (user.exists) {
    return {
      props: {
        user: {info: user.data() || null,
          links: links}
      }
    }
  } else {
    return {
      notFound:true
    }
  }
}

export default withAuthUser()(Homepage);