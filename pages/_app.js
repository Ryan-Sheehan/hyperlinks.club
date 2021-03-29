import '../styles/fonts.css';
import '../styles/base.css';
import '../styles/prism-theme.css';

import initAuth from '../utils/auth';

initAuth();

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
