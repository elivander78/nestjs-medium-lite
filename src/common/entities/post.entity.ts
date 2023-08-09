import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 }) // Общая сумма рейтингов
  ratingSum: number;

  @Column({ default: 0 }) // Количество оценок
  ratingCount: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
