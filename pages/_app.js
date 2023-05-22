import { ApolloProvider } from "@apollo/client";
import client from '../config/apollo';
import OrderState from "../context/orders/OrderState";
import '../i18n';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp;
