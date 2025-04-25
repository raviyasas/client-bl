import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GraphqlService } from 'src/common/graphql/graphql/graphql.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { gql } from '@apollo/client';

@Injectable()
export class ClientsService {

  constructor(private readonly graphqlService: GraphqlService) { }

  // Create a new client
  async create(createClientDto: CreateClientDto) {
    try {
      
      const variables = {
        client: {
          clientName: createClientDto.clientName,
          clientCode: createClientDto.clientCode,
          clientDescription: createClientDto.clientDescription ?? '',
          clientIsActive: createClientDto.clientIsActive ?? true,
          clientCreatedBy: createClientDto.clientCreatedBy
        }
      }

      const mutation = gql`mutation CreateClient($client: CreateClientDto!){
        createClient(client: $client){
          id
          data
          message
          success
        }
      }`

      const result = await this.graphqlService.executeMutation(mutation, variables);
      return result;
    } catch (error) {
      console.error('Create Client Error:', error.stack || error.message);
      throw new InternalServerErrorException('Unable to create client. Please try again later.');
    }
  }

  // Find all clients
  async findAll(): Promise<ResponseDto> {
    try {
      const query = gql`query Clients {
        clients {
            id
            data
            message
            success
        }}`

      const data = await this.graphqlService.executeQuery(query);

      return this.mapToResponseDto(data.clients);
    } catch (error) {
      console.error('Fetch Client Error:', error.stack ?? error.message);
      throw new InternalServerErrorException('Unable to find client. Please try again later.');
    }
  }

  // Find client by ID
  async findOne(id: string): Promise<ResponseDto> {

    try {
      const query = gql`query Client($clientId: String!) {
          client(clientId: $clientId) {
            id
            data
            message
            success
          }}`;

      const variables = { clientId: id };
      const data = await this.graphqlService.executeQuery(
        query, variables
      );

      return this.mapToResponseDto(data.client);
    } catch (error) {
      console.error('Create Client by id Error:', error.stack ?? error.message);
      throw new InternalServerErrorException('Unable to find client. Please try again later.');
    }
  }

  // Update a client
  async update(id: string, updateClientDto: UpdateClientDto) {

    try {
      const variables = {
        client: {
          id: id,
          clientName: updateClientDto.clientName,
          clientCode: updateClientDto.clientCode,
          clientDescription: updateClientDto.clientDescription,
          clientIsActive: updateClientDto.clientIsActive,
          clientCreatedBy: updateClientDto.clientCreatedBy
        }
      }

      const mutation = gql`mutation UpdateClient($client: UpdateClientDto!){
        updateClient(client: $client){
          id
          data
          message
          success
        }
      }`

      const result = await this.graphqlService.executeMutation(mutation, variables);
      return result;
    } catch (error) {
      console.error('Update Client Error:', error.stack ?? error.message);
      throw new InternalServerErrorException('Unable to update a client. Please try again later.');
    }
  }

  // Delete a client
  async remove(id: string) {
    try {
      const mutation = gql`mutation DeleteClient($clientId: String!){
        deleteClient(clientId: $clientId){
          id
          data
          message
          success
        }
      }`

      const variables = { clientId: id };
      const result = await this.graphqlService.executeMutation(mutation, variables);
      return result;
    } catch (error) {
      console.error('Delete Client Error:', error.stack ?? error.message);
      throw new InternalServerErrorException('Unable to delete a client. Please try again later.');
    }
  }

  private mapToResponseDto(response: any): ResponseDto {
    return {
      id: response.id ?? null,
      data: response.data,
      message: response.message,
      success: response.success,
    };
  }
}
