import { IsBoolean, IsDate, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn({ name: 'offer_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  // @Column({
  //   type: 'decimal',
  //   precision: 10,
  //   scale: 2,
  // })
  // @IsNumber()
  // amount: number;

  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @Column({ default: false })
  // @IsBoolean()
  hidden: boolean;

  @CreateDateColumn()
  // @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  // @IsDate()
  updatedAt: Date;
}
