export class Feed {
  // price: any;
  id: string;
  title: string;
  link: string;
  price: string;
  image_link: string;
  description: string;

  availability: string;
  brand: string;
  age_group: string;
  color: string;
  gender: string;
  // size: string;
  // _id: string;
  // __v: number;

  static parse(data) {
    const feed = Object.assign(new Feed(), data);
    return feed;
  }
}
