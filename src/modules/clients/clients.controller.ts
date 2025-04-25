import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<ResponseDto>  {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  async findAll() : Promise<ResponseDto>{
    return await this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<ResponseDto>  {
    if (!id.trim()) {
      throw new BadRequestException('Client ID cannot be empty');
    }
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) : Promise<ResponseDto> {
    if (!id.trim()) {
      throw new BadRequestException('Client ID cannot be empty');
    }
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!id.trim()) {
      throw new BadRequestException('Client ID cannot be empty');
    }
    return this.clientsService.remove(id);
  }
}
