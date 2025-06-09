import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  findAll() {
    return console.log('Hi');
  }
}
