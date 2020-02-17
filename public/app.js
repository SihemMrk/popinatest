var datas;
var totalPrice;

function getDatas() {
  fetch("data.json")
    .catch(function(err) {
      console.log(err);
    })
    .then(
      response => response.json(),
      function(err) {
        console.log(err);
      }
    )
    .then(handleOrders);
}

function handleOrders(data) {
  datas = data;

  document.getElementById("oneOrder").style.display = "none";
  const dataArray = data.orders;
  let commandes = "";

  if (dataArray.length <= 1) {
    commandes = "commande";
  } else {
    commandes = "commandes";
  }

  const ordersNb = (document.getElementById("ordersNb").innerHTML =
    dataArray.length + " " + commandes);

  const price = dataArray.map(arr =>
    arr.items.map(item => item.price).reduce((a, b) => a + b)
  );

  document.getElementById("allOrders").innerHTML = dataArray
    .map(order => {
      const orderTable = order.table;

      totalPrice = order.items.map(item => item.price).reduce((a, b) => a + b);
      const currency = order.items[0].currency;
      const guests = order.guests;

      return (
        "<div class='order' onclick='displayOrder(" +
        order.id +
        ");'>" +
        "<div class='table'>" +
        orderTable +
        "</div>" +
        "<div class='guest'>" +
        "guest(s): " +
        guests +
        "</div>" +
        "<div class='priceTotal'>" +
        totalPrice +
        currency +
        "</div>" +
        "</div>"
      );
    })
    .join("");
}

function displayOrder(id) {
  var matchedOrder;

  for (var i = 0; i < datas.orders.length; i++) {
    var order = datas.orders[i];
    if (order.id !== id) {
      continue;
    } else {
      document.getElementById("allOrders").style.display = "none";
      document.getElementById("oneOrder").style.display = "block";
      document.getElementById("ordersNb").style.display = "none";
      matchedOrder = order;

      document.getElementById("oneOrder").innerHTML =
        "<div id='top'>" +
        "<p onclick='back()'>" +
        "retour" +
        "</p>" +
        "<h2>" +
        "table " +
        matchedOrder.table +
        "</h2>" +
        "</div>" +
        "<div id='orderInfo'>" +
        "<h3 class='product'>" +
        matchedOrder.items.length +
        " produits" +
        "</h3>" +
        "<div class='verticalLine'>" +
        "</div>" +
        "<h3 class='priceOrder'>" +
        totalPrice +
        " €" +
        "</h3>" +
        "</div>" +
        matchedOrder.items
          .map(dish => {
            const dishName = dish.name;
            const dishPrice = dish.price;
            const color = dish.color;
            const currency = dish.currency;

            return (
              "<div class='dish' >" +
              "<div class='name'  style='color:" +
              color +
              "'>" +
              dishName +
              "</div>" +
              "<div class='price'  style='color:" +
              color +
              "'>" +
              dishPrice +
              currency +
              "</div>" +
              "</div>"
            );
          })
          .join("");
    }
  }
}

function back() {
  document.getElementById("allOrders").style.display = "block";
  document.getElementById("oneOrder").style.display = "none";
  document.getElementById("ordersNb").style.display = "block";
}

getDatas();
