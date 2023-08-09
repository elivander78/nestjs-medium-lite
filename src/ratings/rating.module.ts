import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingService } from './rating.service';
import { User } from '../common/entities/user.entity';
import { Post } from '../common/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
