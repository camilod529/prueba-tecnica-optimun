export interface Product {
  _id?: string;
  name: string;
  barcode: string;
  presentation: string;
  reference: string;
  description: string;
  service: boolean;
  selling_price: number;
  product_cost: number;
  category_id: string;
  taxes: Tax[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tax {
  _id: string;
  code: string;
  name: string;
  percentage: number;
}
