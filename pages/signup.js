import { withAuthUser, AuthAction } from 'next-firebase-auth'
import SignUp from '../components/SignUp'
const MyLoader = () => <div>Loading...</div>


const LoginPage = () => <div>
<SignUp/>

</div>

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(LoginPage)