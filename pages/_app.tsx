import React from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useTheme } from '@hooks/useTheme'
import { useClientJss } from '@hooks/useClientJss'
import MinDateProvider from '@context/MinDateProvider'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  useClientJss()
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>GitHub Weekly⭐</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <MinDateProvider>
            <Component {...pageProps} />
          </MinDateProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
