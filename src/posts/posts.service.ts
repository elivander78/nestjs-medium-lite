import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../common/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../common/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, author: User): Promise<Post> {
    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.author = author;

    return this.postsRepository.save(post);
  }

  async findAll(skip: number, take: number): Promise<Post[]> {
    return this.postsRepository.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: ['author'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }
}
