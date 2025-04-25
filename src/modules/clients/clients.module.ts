import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { GraphqlService } from 'src/common/graphql/graphql/graphql.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, GraphqlService],
  
})
export class ClientsModule {}
