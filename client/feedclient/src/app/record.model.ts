export class Record {
  id: number;
  number_of_items: number;
  _id: string;
  __v: number;

  static parse(data) {
    const record = Object.assign(new Record(), data);
    return record;
  }
}


