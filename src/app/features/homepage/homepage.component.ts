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
  finalize,
  map,
  mergeAll,
  switchMap,
  tap
} from "rxjs/operators";
import {Allergen, AllergeneInterface, AllItem, FinalItem, Item} from "../../mocks/allergene.interface";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getShops();
  }
  
  fillItems() {
    this.apiService.chargeOnlyItem()
  }
}
