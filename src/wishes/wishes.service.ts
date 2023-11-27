import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, owner: User) {
    return await this.wishesRepository.save({ ...createWishDto, owner });
  }

  // findAll() {
  //   return `This action returns all wishes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} wish`;
  // }

  // update(id: number, updateWishDto: UpdateWishDto) {
  //   return `This action updates a #${id} wish`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} wish`;
  // }
}
