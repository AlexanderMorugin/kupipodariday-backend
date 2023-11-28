import { IsDate, IsString, IsUrl, Length, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn({ name: 'wish-list_id' })
  id: number;

  @Column()
  // @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  // @Column()
  // @IsString()
  // @MinLength(1)
  // @MaxLength(1500)
  // description: string;

  @Column()
  @IsUrl()
  image: string;

  // @ManyToMany(() => Wish, (wish) => wish.name)
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  // @ManyToOne(() => User, (user) => user.wishlists)
  @ManyToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  owner: User;

  @CreateDateColumn()
  // @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  // @IsDate()
  updatedAt: Date;
}
