export type ShoppingResponse = {
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
  priduct : string;
  amount : number;
}

export type ShoppingEntity = {
  shopping : Shopping;
  url: string;
}