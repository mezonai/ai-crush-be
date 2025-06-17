import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Character')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
}
