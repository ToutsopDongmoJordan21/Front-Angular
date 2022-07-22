import { Injectable } from '@angular/core';
import { Brand } from './entities/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private brands: Brand[];

  constructor() { 
    this.brands = [
      { id: '1', name: 'MARUTI'},
      { id: '2', name: 'BMW'},
      { id: '3', name: 'AUDI'},
      { id: '4', name: 'NISSAN'},
      { id: '5', name: 'TOYOTA'},
      { id: '6', name: 'MARUTIU'}
    ];
  }

  findAll(): Brand[] {
    return this.brands;
  }

}

