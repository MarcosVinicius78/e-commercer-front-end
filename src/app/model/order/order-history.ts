import { OrderItem } from "./OrderItem"

export class OrderHistory {

  orderTracKingNumber!: string
  totalQuantity!: number
  totalPrice!: number
  status!: boolean
  dateCreated!: string
  lastUpdate!: string
  orderItem!: OrderItem

  constructor(){}

}
