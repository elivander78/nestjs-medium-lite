import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../common/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Pagination } from '../common/pagination/pagination.dto';
import { PaginationUtil } from '../common/pagination/pagination.utils';
import { User } from '../common/entities/user.entity';
import { RatingService } from '../ratings/rating.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RatingDto } from '../ratings/dto/rating.dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly ratingService: RatingService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ): Promise<PostEntity> {
    const user: User = req.user;
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  async findAll(@Query() pagination: Pagination): Promise<PostEntity[]> {
    return this.postsService.findAll(
      PaginationUtil.getSkip(pagination),
      PaginationUtil.getTake(pagination),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Put('rate-post/:id')
  async ratePost(
    @Param('id', ParseIntPipe) id: number,
    @Body('') body: RatingDto,
  ): Promise<PostEntity> {
    return this.ratingService.ratePost(id, body.rating);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findCurrentUserPosts(
    @Req() req,
    @Query() pagination: Pagination,
  ): Promise<PostEntity[]> {
    const user: User = req.user;
    return this.postsService.findByAuthor(
      user,
      PaginationUtil.getSkip(pagination),
      PaginationUtil.getTake(pagination),
    );
  }
}
