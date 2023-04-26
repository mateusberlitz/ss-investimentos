import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api-sa-east-1.hygraph.com/v2/clgl3buh53sfn01t20jvxddmi/master",
    cache: new InMemoryCache()
});

export default client;