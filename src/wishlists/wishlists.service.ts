import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  create(createWishlistDto: CreateWishlistDto) {
    return 'This action adds a new wishlistlist';
  }

  findAll() {
    return `This action returns all wishlistlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlistlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlistlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlistlist`;
  }
}