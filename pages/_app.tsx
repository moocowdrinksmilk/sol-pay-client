import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import PaymentProvider from '../context/PaymentProvider'
import React from 'react';
import WalletWrapper from '../context/utils/WalletWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <WalletWrapper>
      <PaymentProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </PaymentProvider>
    </WalletWrapper>
  )
}
export default MyApp
