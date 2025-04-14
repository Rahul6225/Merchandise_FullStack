export type UserType = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  gender: string;
  dob: string;
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: UserType;
};
export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};
export type ProductType = {
  name: string;
  stock: number;
  price: number;
  category: string;
  photo: string;
  _id: string;
};

export type ProductResType = {
  success: boolean;
  product: ProductType[];
};

export type ProductDetailRes = {
  success: boolean;
  product: ProductType;
};
export type CategoriesResType = {
  success: boolean;
  categories: string[];
};

export type SearchProductResType = {
  success: boolean;
  products: ProductType[];
  totalPage: number;
};
export type SearchProductReqType = {
  search: string;
  sort: string;
  category: string;
  price: number;
  page: number;
};

export type NewProductReqType = {
  id: string;
  formData: FormData;
};

export type UpdateProductReqType = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type UpdateProductRes = {
  success: boolean;
  message: string;
  product: ProductType;
};

export type DeleteProductReqType = {
  userId: string;
  productId: string;
};

export type CartItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type OrderItemType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  _id: string;
};

export type NewOrderReqType = {
  shippingInfo: ShippingInfoType;
  orderItems: CartItemType[];
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  user: string;
};
export type OrderType = {
  orderItems: OrderItemType[];
  shippingInfo: ShippingInfoType;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: OrderType[];
};

export type SingleOrdersResponse = {
  success: boolean;
  order: OrderType;
};

export type ProcessOrderReqType = {
  userId: string;
  orderId: string;
};

export type ProcessOrderResType = {
  success: string;
  status: string;
};

export type AllUserMessageResponse = {
  success: boolean;
  users: UserType[];
};

export type DeleteUserReq = {
  userId: string;
  adminId: string;
};

type changePercentType = {
  revenue: number;
  user: number;
  product: number;
  order: number;
};
type latestTransactionType = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};
export type StatsType = {
  categories: string[];
  categoryCount: Record<string, number>[];

  categoriesCount: number[];
  changePercent: changePercentType;
  count: changePercentType;
  chart: {
    order: number[];
    revenue: number[];
  };
  modifiedLatestTransactions: latestTransactionType[];
  userRatio: {
    male: number;
    female: number;
  };
};
export type StatsResType = {
  success: boolean;
  stats: StatsType;
};

type PieChartType = {
  orderFullFillment: {
    Delivered: number;
    Processing: number;
    Shipped: number;
  };
  categoryCount: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistributation: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  usersAge: {
    teen: number;
    adult: number;
    old: number;
  };
};
export type PieResType = {
  success: boolean;
  charts:PieChartType;
};
type BarChartType = {
  product: number[];
  users: number[];
  orders: number[];
};
export type BarResType = {
  success: boolean;
  charts: BarChartType;
};


type lineChartType = {
  users: number[];
  revenue: number[];
};
export type lineResType = {
  success: boolean;
  charts: lineChartType;
};