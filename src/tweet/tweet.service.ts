import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}


  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const tweet:Tweet = new Tweet();
    tweet.text = createTweetDto.text;
    return await this.tweetRepository.save(tweet);
  }

  findAll(): Promise<Tweet[]> {
    return this.tweetRepository.find();
  }

  findOne(id: number) {
    return this.tweetRepository.findOneBy({ id });
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    const tweet:Tweet = await this.tweetRepository.findOneBy({id})

    if (!tweet) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    tweet.text = updateTweetDto.text;

    return await this.tweetRepository.save(tweet);
  }

  async remove(id: number): Promise<void> {
    await this.tweetRepository.delete(id);
  }
}
