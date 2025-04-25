import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { GraphqlService } from './common/graphql/graphql/graphql.service';

@Module({
  imports: [ClientsModule],
  controllers: [],
  providers: [GraphqlService],
})
export class AppModule {}
