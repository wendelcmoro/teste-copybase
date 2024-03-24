import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { CsvController } from './csv/csv.controller';
import { Subscription } from './subscriptions/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Subscription]),
  ],
  controllers: [UserController, CsvController],
  providers: [UserService],
})
export class AppModule {}
