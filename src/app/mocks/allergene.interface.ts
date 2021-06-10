export interface Item {
  id: string;
  shopId: string;
  createdAt: Date;
  productName: string;
  price: string;
  description: string;
  material: string;
  amountLeft: number;
}

export interface FinalItem {
  id: string;
  productName: string;
  price: string;
  description: string;
  material: string;
  shopId: string[];
  allergens: Allergen[]
}

export interface AllergeneInterface {
  id: string;
  createdAt: Date;
  name: string;
  distance: number;
  location: string;
  lat: string;
  lon: string;
  items: Item[];
}

export interface Allergen {
  id: string;
  itemId: string;
  name: string;
}

export interface AllItem {
  id: string;
  shopId: string;
  createdAt: Date;
  productName: string;
  price: string;
  description: string;
  material: string;
  amountLeft: number;
  allergens: Allergen[];
}
