export interface Product {
  id?: number;
  name: string;
  selling_price: number;
  cost_price: number;
  quantity: number;
  barcode?: string;
  hsn_code?: string;
}

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  credit_balance: number;
}

export interface Sale {
  id?: number;
  timestamp: string;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  customer_id?: number;
}

export interface SaleItem {
  id?: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
}
