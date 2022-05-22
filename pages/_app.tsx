import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import PaymentProvider from '../context/PaymentProvider'
import React, { useEffect } from 'react';
import WalletWrapper from '../context/utils/WalletWrapper';
import { getSession } from '../supabase/discord';
import { initSupabaseClient } from '../supabase/client';
import SupabaseAuthWrapper from '../wrapper/SupabaseAuthWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <SupabaseAuthWrapper>
      <WalletWrapper>
        <PaymentProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </PaymentProvider>
      </WalletWrapper>
    </SupabaseAuthWrapper>
  )
}
export default MyApp
