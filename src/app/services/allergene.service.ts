import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllergeneInterface, AllItem} from "../mocks/allergene.interface";

@Injectable({
  providedIn: 'root'
})
export class AllergeneService {

  constructor(private http: HttpClient) {

  }

  getAllShop(){
    return this.http.get<AllergeneInterface[]>('https://5f9fef6ce21bab0016dfc996.mockapi.io/api/v1/shop');
  }

  getItem(item: AllItem){
    return this.http.get<AllItem>(`https://5f9fef6ce21bab0016dfc996.mockapi.io/api/v1/shop/${item.shopId}/item/${item.id}`);
  }
}
