import '../scss/custom.scss'; // Adjust the path according to where your SCSS files are
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Any global effect you may want to trigger
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;