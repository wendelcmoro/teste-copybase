import { Controller, Get } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionService.findAll();
  }
}
