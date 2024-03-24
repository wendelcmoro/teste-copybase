import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { CsvController } from './csv/csv.controller';
import { Subscription } from './subscriptions/subscription.entity';
import { SubscriptionService } from './subscriptions/subscription.service';
import { SubscriptionController } from './subscriptions/subscription.controller';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Subscription]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [UserController, CsvController, SubscriptionController],
  providers: [UserService, SubscriptionService],
})
export class AppModule {
  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
