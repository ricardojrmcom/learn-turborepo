import React, { useMemo } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  ThemeProvider,
  createTheme,
  Theme,
  ThemeOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from 'scripts';

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: '#24741f',
    },
    background: {
      default: '#f1f1f1',
    },
  },
};

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const AnyComponent = Component as any;

  const muiTheme: Theme = useMemo(() => createTheme(theme), []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AnyComponent {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
