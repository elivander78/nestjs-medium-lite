import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Module, Post } from '@nestjs/common';
import { RatingModule } from '../ratings/rating.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), RatingModule], // Добавьте RatingModule
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
