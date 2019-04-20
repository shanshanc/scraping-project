export class Feed {
  price: any;
  _id: string;
  sku: string;
  name: string;
  link: string;
  image_link: string;
  description: string;
  _v: number;

  static parse(data) {
    const feed = Object.assign(new Feed(), data);
    return feed;
  }
}
