export class Product {
    constructor(
        public _id:any=null,
        public Artist:string="",
        public Name:string="",
        public category:string="",
        public UnitPrice:string="",
        public Image:string="",
        public Image_1:string="",
        public Image_2:string="",
        public Image_3:string="",


    ){}
}
export interface Product {
    _id: any;
    Artist: string;
    Name: string;
    category: string;
    // Add other required properties here
    // ...
  }