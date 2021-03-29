import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'
import db from '../utils/db';
import Page from '../components/landing/page';
import LogInButton from '../components/LogInButton';
import SignOutButton from '../components/SignOutButton';
import Link from 'next/link';

const MyLoader = () => <div>Loading...</div>



function Index({username}) {
  const AuthUser = useAuthUser()


  return (
    <Page
      title="hyperlink.club"
      description="A place for all of your hyperlinks."
    >
      <p>
        A place for all of your stuff online.
      </p>

      <table>
    <thead>
        <tr>
            <th colspan="2">Home</th>
        </tr>
      
      </thead>
      <tbody>
        <tr className="top-row bottom-row">
        <ul className="home-navigation">
            <Link href={`/${username}`}><a><li>Go to your links</li></a></Link>

           <Link href={`/links/${username}`}><a><li>Go to your link editor</li></a></Link>
           </ul>
        </tr>

      </tbody>
      </table>


      {AuthUser.email && <p>Your email is {AuthUser.email}</p>}
      {AuthUser.email && <p>Your username is {username}</p>}
      {AuthUser.email && <SignOutButton onClick={AuthUser.signOut}/>}
      {!AuthUser.email && <Link href='/login'><LogInButton><a>Log in</a></LoginButton></Link>}
      

      
    </Page>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const id = AuthUser.id
  
  const user = await db.collection("users").where("id", "==", id).get();
  const username = user.docs[0].data().username

  
  return {
    props: {
      username
    }
  }
})

export default withAuthUser()(Index)
