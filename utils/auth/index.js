// ./initAuth.js
import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/login',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'hyperlink-9719e',
        client_email: "firebase-adminsdk-nplxv@hyperlink-9719e.iam.gserviceaccount.com",
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: 'https://my-example-app.firebaseio.com',
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyBRddZTr1nnxe89T8JbvwodQZeOAW1ViYg", 
      authDomain: "hyperlink-9719e.firebaseapp.com",
      databaseURL: "https://hyperlink-9719e-default-rtdb.firebaseio.com",
      projectId: "hyperlink-9719e",
      storageBucket: "hyperlink-9719e.appspot.com",
      messagingSenderId: "581744685089",
      appId: "1:581744685089:web:b3f5cc98baed6453a5b360",
      measurementId: "G-C3G84MD2H0"
    },
    cookies: {
      name: 'hyperlink', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}

export default initAuth