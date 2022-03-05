import type { AppProps } from 'next/app';
import '../../styles/index.scss';
import {useEffect} from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
