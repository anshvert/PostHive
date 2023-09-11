import './globals.css'
import type { AppProps } from 'next/app'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { wrapper } from "../store/store";

const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [cacheExchange, fetchExchange]
});

function App({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    )
}
export default wrapper.withRedux(App)