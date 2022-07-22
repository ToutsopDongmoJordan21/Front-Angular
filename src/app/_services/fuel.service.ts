import { Injectable } from '@angular/core';
import { Fuel } from './entities/fuel';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  private fuels: Fuel[];

  constructor() {
    this.fuels = [
      {id: '1', name: 'Petrol'},
      {id: '2', name: 'Diesel'},
      {id: '3', name: 'CNG'}
    ];
  }

  findAll(): Fuel[] {
    return this.fuels;
  }
}
