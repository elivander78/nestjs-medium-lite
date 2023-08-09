import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { User } from './common/entities/user.entity';
import { Post } from './common/entities/post.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RatingModule } from './ratings/rating.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Post],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post]),
    AuthModule,
    UsersModule,
    PostsModule,
    RatingModule,
  ],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService],
})
export class AppModule {}
