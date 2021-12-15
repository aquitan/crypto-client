export default class CurrencyDto {
  name
  amount
  rate

  constructor(model: any) {
    this.name = model.name
    this.amount = model.amount
    this.rate = model.rate
  }
}