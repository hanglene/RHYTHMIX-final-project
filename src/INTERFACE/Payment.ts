export class PaymentInfo{
    constructor(
    public _id:any=null,
    public Customer_Name:string="",
    public Deliver_Address:string="",
    public Phone_Number:string="",
    public Email:string="",
    public Payment_Method:string="",
    public Shipping_Method:string="",

){}}


export class discountInfo{
    constructor(
    public _id: any=null,
    public discount_code:string="",
    public discount_percent: number = 0,
    public discount_quantity: number = 0,
){}}