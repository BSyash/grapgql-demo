import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  from,
  HttpLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"
import './App.css';
import DataTable from "./components/DataTable/DataTable";


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`error from GraphQL ${message}`)
    })
  }
})

const link = from([errorLink, new HttpLink({ uri: 'https://48p1r2roz4.sse.codesandbox.io' })])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

useEffect(() => {
  const getData = fetch()
}, [])

function App() {
  return (
    <ApolloProvider client={client}>
      <DataTable/>
    </ApolloProvider>
  );
}

export default App;
