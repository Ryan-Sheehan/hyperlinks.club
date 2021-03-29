import { withAuthUser, AuthAction } from 'next-firebase-auth'
import SignIn from '../components/SignIn'
const MyLoader = () => <div>Loading...</div>


const LoginPage = () => <div>
<SignIn/>

</div>

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(LoginPage)