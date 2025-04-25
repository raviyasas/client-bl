import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsNotEmpty } from '@nestjs/class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsNotEmpty()
    id: string;
}
