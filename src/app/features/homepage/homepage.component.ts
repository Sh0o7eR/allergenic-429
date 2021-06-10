import { Component, OnInit } from '@angular/core';
import {AllergeneService} from "../../services/allergene.service";
import {from, interval, Observable, of} from "rxjs";
import {
  concatAll,
  concatMap,
  concatMapTo,
  delay,
  distinct,
  filter,
  map,
  mergeAll,
  switchMap,
  tap
} from "rxjs/operators";
import {Allergen, AllergeneInterface, AllItem, FinalItem, Item} from "../../mocks/allergene.interface";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  listShop: AllergeneInterface[] = [];
  listShopItems: AllergeneInterface[] = [];
  items: AllItem[] = [];
  allergens: Allergen[] = [];

  constructor(private allergeneService: AllergeneService) {}


  ngOnInit() {
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
    let observable : Observable<AllItem>;
    const allergenesGetter = from(this.items).pipe(
      delay(10000),
      concatMap(x => this.allergeneService.getItem(x))
    );
    allergenesGetter.subscribe(x => newItems.push(x));
    console.log(newItems);
  }

  fillItems(item: AllItem) {

  }
}
