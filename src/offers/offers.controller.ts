import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    return this.offersService.create(createOfferDto, req.user);
  }

  // @Post()
  // async createOffer(@Req() req, @Body() createOfferDto: CreateOfferDto) {
  //   const userId = req.user.id;
  //   return await this.offersService.createOffer(userId, createOfferDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.offersService.findMany();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
}
