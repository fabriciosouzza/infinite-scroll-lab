import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  findAll() {
    return 'Hi Order';
  }
}
