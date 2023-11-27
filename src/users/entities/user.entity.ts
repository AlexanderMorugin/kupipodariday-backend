import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(2, {
  //   message: 'Имя пользователя должно быть не менее 2 символов',
  // })
  // @MaxLength(30, {
  //   message: 'Имя пользователя должно быть не более 30 символов',
  // })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  // @IsString()
  // @IsOptional()
  @MinLength(2, {
    message: 'Информация о себе должна быть не менее 2 символов',
  })
  @MaxLength(200, {
    message: 'Информация о себе должна быть не более 200 символов',
  })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  // @IsOptional()
  // @IsUrl()
  avatar: string;

  @Column({ unique: true })
  // @IsNotEmpty()
  // @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6, {
    message: 'Пароль должен быть не менее 6 символов',
  })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner, { onDelete: 'CASCADE' })
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user, { onDelete: 'CASCADE' })
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner, {
    onDelete: 'CASCADE',
  })
  wishlists: Wishlist[];

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
