  export class PaymentItem {
    constructor(
      public _id: string,
      public Customer_Name: string,
      public Deliver_Address: string,
      public Phone_Number: string,
      public Email: string,
      public Payment_Method: string,
      public Shipping_Method: string,
      public currentPrice: string,
    ) {}
  }
  
  export class CartItem {
    constructor(
      public _id: string,
      public Artist: string,
      public Name: string,
      public UnitPrice: string,
      public category: string,
      public Image: string,
      public amount: number,
      public Promotion: string
    ) {}
  }
  
  export class PaymentInfo {
    constructor(
      public _id: string,
      public items: {
        paymentInfo: PaymentItem;
        cartInfo: {
          items: CartItem[];
        };
      },
      public status: string,
    ) {}
  }