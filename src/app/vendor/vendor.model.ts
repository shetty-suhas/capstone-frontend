export class Vendor {
  constructor(
      public id: null | string = '',
      public name: string = '',
      public pendingAmount: number = 0,
      public totalAmount: number = 0,
      public contactEmail: string = '',
      public type: string = '',
      public eventId: string = ''
  ) {}
}