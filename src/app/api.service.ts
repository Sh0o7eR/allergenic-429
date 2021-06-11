import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Allergen, AllergeneInterface, AllItem } from './mocks/allergene.interface';
import { AllergeneService } from './services/allergene.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  listShop: AllergeneInterface[] = [];
  listShopItems: AllergeneInterface[] = [];
  items: AllItem[] = [];
  allergens: Allergen[] = [];

  constructor(private allergeneService: AllergeneService) { }

  getShops() {
    this.allergeneService.getAllShop()
      .subscribe(res => {
        this.listShop = res;
        this.listShop.map(x => {
          of(x)
            .pipe(
              filter(x => x.items.length > 0)
            ).subscribe(item => this.listShopItems.push(item))
        });
      });
  }

  chargeOnlyItem() {
    this.listShopItems.map(x => {
      x.items.map(item => this.items.push({...item, allergens: []}))
    });
    let newItems : AllItem[] = [];
    const allergenesGetter = from(this.items).pipe(
      concatMap(x => of(x).pipe( delay(1500), switchMap( (x: AllItem) => this.allergeneService.getItem(x)))),
      finalize(() => console.log("FINALMENTE: "+newItems)));
    allergenesGetter.pipe(tap(x => console.log(newItems))).subscribe(x => newItems.push(x));
    console.log("PIPPO: "+newItems);
  }
}
