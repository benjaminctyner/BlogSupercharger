import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { PostsProvider } from '../context/postsContext';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserProvider>
      <PostsProvider>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </PostsProvider>
    </UserProvider>
  );
}

export default MyApp;
