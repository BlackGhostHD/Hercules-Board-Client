import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ProgressiveFragmentMatcher } from "apollo-progressive-fragment-matcher";

const fragmentMatcher = new ProgressiveFragmentMatcher();

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  const ls = JSON.parse(localStorage.getItem("vuex"));
  const token = ls?.user?.credential?.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      Accept: "application/vnd.github.antiope-preview+json"
    }
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher })
});
