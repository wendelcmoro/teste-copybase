import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscription.entity';

const moment = require('moment');

@Controller('csv')
export class CsvController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    // Crie um fluxo de leitura a partir do buffer do arquivo
    const stream = Readable.from([file.buffer.toString()]);

    stream
      .pipe(csvParser({ separator: ';' }))
      .on('data', async (data) => {
        // Verifica se o usuário existe no banco de dados
        // usando como referência o ID assinante
        let user = await this.userRepository.findOne({
          where: { username: data['ID assinante'] },
        });

        // Se o usuário não existir, cria um novo usuário
        if (!user) {
          user = new User();
          user.username = data['ID assinante'];
          await this.userRepository.save(user);
        }

        // console.log(
        //   data['quantidade cobranças'],
        //   data['cobrada a cada X dias'],
        //   data['data início'],
        //   data['status'],
        //   data['data status'],
        //   data['data cancelamento'],
        //   data['valor'],
        //   data['próximo ciclo'],
        //   data['ID assinante'],
        // );

        // Cria uma nova Subscription associada ao usuário
        const subscription = new Subscription();
        subscription.quantity_of_charges = data['quantidade cobranças'];
        subscription.charge_period = data['cobrada a cada X dias'];

        // data início
        let startDate = moment.utc(data['data início'], 'D/M/YYYY HH:mm');
        if (!startDate.isValid()) {
          startDate = moment.utc(data['data início'], 'M/D/YYYY HH:mm');
        }
        subscription.start_date = startDate.format('YYYY-MM-DD HH:mm:ss');

        //  status
        if (data['status'] == 'Ativa') {
          subscription.status = 'ACTIVE';
        } else if (data['status'] == 'Cancelada') {
          subscription.status = 'CANCELED';
        } else {
          subscription.status = 'DEMO_CANCELED';
        }

        // data status
        let statusDate = moment.utc(data['data status'], 'D/M/YYYY HH:mm');
        if (!statusDate.isValid()) {
          statusDate = moment.utc(data['data status'], 'M/D/YYYY HH:mm');
        }
        subscription.status_date = statusDate.format('YYYY-MM-DD HH:mm:ss');

        // data cancelamento
        let cancelDate = moment.utc(
          data['data cancelamento'],
          'D/M/YYYY HH:mm',
        );
        if (!cancelDate.isValid()) {
          cancelDate = moment.utc(data['data cancelamento'], 'M/D/YYYY HH:mm');
        }
        subscription.cancel_date = cancelDate.format('YYYY-MM-DD HH:mm:ss');

        // valor
        subscription.value = data['valor'].replace(/,/g, '.');

        // próximo ciclo
        let nextCycle = moment.utc(data['próximo ciclo'], 'D/M/YYYY HH:mm');
        if (!nextCycle.isValid()) {
          nextCycle = moment.utc(data['próximo ciclo'], 'M/D/YYYY HH:mm');
        }
        subscription.next_cycle = nextCycle.format('YYYY-MM-DD HH:mm:ss');

        // usuário
        subscription.user = user;

        // Salva a nova Subscription no banco de dados
        await this.subscriptionRepository.save(subscription);
      })
      .on('end', () => {
        console.log('CSV data processed successfully');
      });

    return { message: 'File uploaded successfully' };
  }
}
