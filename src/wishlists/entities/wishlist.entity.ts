import {
  IsDate,
  IsInt,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn({ name: 'wish-list_id' })
  @IsInt()
  id: number;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User)
  owner: User;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
