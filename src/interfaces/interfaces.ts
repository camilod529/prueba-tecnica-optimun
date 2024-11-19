export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  category: Category;
  name: string;
  description: string;
  service: boolean;
  selling_price: number;
  product_cost: number;
  taxes: Tax[];
  createdAt: string;
  updatedAt: string;
  barcode: string;
  presentation: string;
  reference: string;
}

export interface Tax {
  code: string;
  name: string;
  percentage: number;
  _id?: string;
}
