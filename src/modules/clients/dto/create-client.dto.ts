import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsString()
    @IsNotEmpty()
    clientCode: string;

    @IsString()
    @IsOptional()
    clientDescription?: string;

    @IsBoolean()
    clientIsActive: boolean;

    @IsString()
    clientCreatedBy: string;
}
