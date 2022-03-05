import type { AppProps } from 'next/app';
import '../../styles/index.scss';
import {useEffect} from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle');
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
