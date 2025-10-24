export type ShoppingResponse = {
  id : number;
  product : string;
  amount : number;
  _links: {
    self: {
      href: string;
    },
    shopping : {
      href: string;
    }
  }
}

export type Shopping = {
  id? : number;
  product : string;
  amount : number;
}