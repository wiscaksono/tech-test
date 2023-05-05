class OrderItem {
  constructor(ID, OrderID, ProductID, Price, Qty) {
    this.ID = ID;
    this.OrderID = OrderID;
    this.ProductID = ProductID;
    this.Price = Price;
    this.Qty = Qty;
  }
}

function calculateOrderTotal(orderItems) {
  let total = 0;
  orderItems.forEach((item) => {
    total += item.Price * item.Qty;
  });
  return total;
}

const orderItems = [
  new OrderItem(1, 1, 1, 10, 2),
  new OrderItem(2, 1, 2, 5, 3),
  new OrderItem(3, 1, 3, 20, 1),
];

const orderTotal = calculateOrderTotal(orderItems);

console.log(`The total price of the order is ${orderTotal}`);
