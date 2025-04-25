import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateClientDto {
    @IsNotEmpty()
    clientName: string;
    @IsNotEmpty()
    clientCode: string;
    @IsOptional()
    clientDescription?: string;
    clientIsActive: boolean;
    clientCreatedBy: string;
}
