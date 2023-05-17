export declare interface PostalAddress {
  street: string;
  city: string;
  country: string;
  state: string;
  zip: string;
}
export declare interface City {
  name: string;
  state: string;
  country: string;
}

export class City implements City {
  constructor(city: Partial<City>) {
    Object.assign(this, city);
  }
  toString() {
    return this.name + ', ' + this.state + ', ' + this.country;
  }
}
