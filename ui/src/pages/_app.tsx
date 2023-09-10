import './globals.css'
import type { AppProps } from 'next/app'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [cacheExchange, fetchExchange]
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    )
}