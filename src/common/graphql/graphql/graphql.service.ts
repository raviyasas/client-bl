import { ApolloClient, ApolloLink, DocumentNode, HttpLink, InMemoryCache } from '@apollo/client/core';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class GraphqlService {

    protected logger = new Logger(GraphqlService.name);
    private readonly apolloClient: ApolloClient<any>;

    constructor() {
        const httpLink = new HttpLink({
            uri: 'http://localhost:3002/graphql', 
            fetch,
        });

        this.apolloClient = new ApolloClient({
            link: ApolloLink.from([httpLink]),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                },
            },
        });
    }

    // Execute graphql query
    async executeQuery(query: DocumentNode, variables?: any): Promise<any>{
        try {
            const response = await this.apolloClient.query({
                query,
                variables
            })
            return response.data;
        } catch (error) {
            this.logger.error(`GraphQL Query failed: ${error.message}`, error.stack);
            this.handleGraphQLError(error);
            throw new InternalServerErrorException('Error executing GraphQL query.');
        }
    }

    // Execute graphql mutation
    async executeMutation<T = any>(mutation: DocumentNode, variables?: any): Promise<T> {

        try {
            const response = await this.apolloClient.mutate({
                mutation,
                variables,
            });
    
            return response.data;
        } catch (error) {
            this.logger.error(`GraphQL Mutation failed: ${error.message}`, error.stack);
            this.handleGraphQLError(error);
            throw new InternalServerErrorException('Error executing GraphQL mutation.');
        }
    }

     // Helper function to handle GraphQL errors
     private handleGraphQLError(error: any): void {
        if (error.networkError) {
            this.logger.error(`Network error: ${error.networkError.message}`, error.networkError.stack);
        } else if (error.graphQLErrors?.length) {
            this.logger.error(`GraphQL error: ${error.graphQLErrors[0].message}`, error.graphQLErrors[0].stack);
        } else {
            this.logger.error('Unknown error occurred', error.stack);
        }
    }
}
