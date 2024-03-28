import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find();
  }

  // Incrições por mês
  async getSubscriptionsPerMonth(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE EXTRACT(YEAR FROM start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      let auxStatus = "'ACTIVE'";
      if (status == 2) {
        auxStatus = "'CANCELED'";
      } else if (status == 3) {
        auxStatus = "'DEMO_CANCELED'";
      }

      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${auxStatus}`;
    }

    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
        SELECT EXTRACT(MONTH FROM ${dateFilter}) as month, COUNT(*) as count
        FROM subscriptions
        ${whereClause}
        GROUP BY EXTRACT(MONTH FROM ${dateFilter})
    `;

    const result = await this.entityManager.query(query);
    return result;
  }

  // Cobranças por mês
  async getSubscriptionChargesPerMonth(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE EXTRACT(YEAR FROM start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      let auxStatus = "'ACTIVE'";
      if (status == 2) {
        auxStatus = "'CANCELED'";
      } else if (status == 3) {
        auxStatus = "'DEMO_CANCELED'";
      }

      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${auxStatus}`;
    }

    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
      SELECT EXTRACT(MONTH FROM ${dateFilter}) as month, SUM(quantity_of_charges) as count
      FROM subscriptions
      ${whereClause}
      GROUP BY EXTRACT(MONTH FROM ${dateFilter})
    `;

    const result = await this.entityManager.query(query);
    return result;
  }

  // Período de cobrança
  async getSubscriptionChargePeriodPerMonth(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE EXTRACT(YEAR FROM start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      let auxStatus = "'ACTIVE'";
      if (status == 2) {
        auxStatus = "'CANCELED'";
      } else if (status == 3) {
        auxStatus = "'DEMO_CANCELED'";
      }

      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${auxStatus}`;
    }
    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
      SELECT EXTRACT(MONTH FROM ${dateFilter}) as month, SUM(charge_period) as count
      FROM subscriptions
      ${whereClause}
      GROUP BY EXTRACT(MONTH FROM ${dateFilter})
    `;
    const result = await this.entityManager.query(query);
    return result;
  }

  // Valor por mês
  async getSubscriptionValuePeriodPerMonth(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE EXTRACT(YEAR FROM start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      let auxStatus = "'ACTIVE'";
      if (status == 2) {
        auxStatus = "'CANCELED'";
      } else if (status == 3) {
        auxStatus = "'DEMO_CANCELED'";
      }

      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${auxStatus}`;
    }

    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
      SELECT EXTRACT(MONTH FROM ${dateFilter}) as month, SUM(value) as count
      FROM subscriptions
      ${whereClause}
      GROUP BY EXTRACT(MONTH FROM ${dateFilter})
    `;
    const result = await this.entityManager.query(query);
    return result;
  }
}
