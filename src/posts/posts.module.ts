import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../common/entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RatingModule } from '../ratings/rating.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, RatingModule],
  controllers: [PostsController],
  providers: [PostsService, JwtAuthGuard],
})
export class PostsModule {}
