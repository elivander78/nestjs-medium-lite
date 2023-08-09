import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { Post } from '../common/entities/post.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async ratePost(postId: number, rating: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    post.ratingSum += rating;
    post.ratingCount++;
    await this.postsRepository.save(post);

    await this.updateUserRating(post.author.id); // Обновляем рейтинг автора поста

    return post;
  }

  async updateUserRating(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const userPosts = user.posts;
    const totalPostCount = userPosts.length;
    let totalRating = 0;

    for (const post of userPosts) {
      totalRating += post.ratingSum;
    }

    user.rating = totalPostCount > 0 ? totalRating / totalPostCount : 0;

    await this.usersRepository.save(user);

    return user;
  }
}
