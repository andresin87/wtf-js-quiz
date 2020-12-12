/* @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui';
import { Helmet } from 'react-helmet';
import { Global } from '@emotion/core';

import { Header } from './Header';

interface PageProps {
  children: React.ReactNode;
}
export function Page({ children }: PageProps) {
  return (
    <BaseStyles>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <title>wtf?! JavaScript Quiz</title>
        <meta
          key="twitter:title"
          property="twitter:title"
          content="wtf?! JavaScript Quiz"
        />
        <meta
          name="description"
          content="JavaScript Quiz. Come and see how much you don't know about JS."
        />
        <meta
          key="og:description"
          property="og:description"
          content="JavaScript Quiz. Come and see how much you don't know about JS."
        />
        ,
        <meta
          key="twitter:description"
          property="twitter:description"
          content="JavaScript Quiz. Come and see how much you don't know about JS."
        />
        ,
        <meta name="keywords" content="quiz, javascript" />
        <meta key="og:image" name="og:image" content="seo.png" />,
        <meta key="twitter:image" name="twitter:image" content="seo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald&family=Andika+New+Basic:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
      </Helmet>
      <Global
        styles={{
          html: {
            scrollBehavior: 'smooth',
            minHeight: '100%',
          },
          body: {
            minHeight: '100vh',
            position: 'relative',
            ':before': {
              content: '""',
              backgroundImage: 'url("wtf.png")',
              backgroundSize: '110px',
              backgroundBlendMode: 'hard-light',
              opacity: 0.5,
              top: 0,
              width: '100%',
              height: '100%',
              left: 0,
              position: 'absolute',
            },
          },
          '#___gatsby': {
            minHeight: '100%',
          },
        }}
      />
      <div
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'background',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Header />
      </div>
      {children}
      <div
        sx={{
          width: '100%',
          backgroundColor: 'background',
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <footer
          sx={{
            p: 1,
            px: 2,
            mt: 2,
            textAlign: 'center',
            position: ['relative', 'absolute', 'absolute'],
            bottom: 0,
            backgroundColor: 'background',
          }}
        >
          © 2020 ・ Built with 🍷 by{' '}
          <a href="https://twitter.com/aleksandrasays">Aleksandra Sikora</a>
        </footer>
      </div>
    </BaseStyles>
  );
}
