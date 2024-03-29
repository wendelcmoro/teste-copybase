import { Controller, Get, Query } from '@nestjs/common';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionService.findAll();
  }

  @Get('/subscriptions-per-month')
  async getSubscriptionsPerMonth(
    @Query('year')
    year?: number,
    @Query('status')
    status?: number,
    @Query('date_filter')
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    return this.subscriptionService.getSubscriptionsPerMonth(
      year,
      status,
      date_filter,
    );
  }

  @Get('/charges-per-month')
  async getSubscriptionChargesPerMonth(
    @Query('year')
    year?: number,
    @Query('status')
    status?: number,
    @Query('date_filter')
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    return this.subscriptionService.getSubscriptionChargesPerMonth(
      year,
      status,
      date_filter,
    );
  }

  @Get('/value-per-month')
  async getSubscriptionValuePeriodPerMonth(
    @Query('year')
    year?: number,
    @Query('status')
    status?: number,
    @Query('date_filter')
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    return this.subscriptionService.getSubscriptionValuePeriodPerMonth(
      year,
      status,
      date_filter,
    );
  }
}
