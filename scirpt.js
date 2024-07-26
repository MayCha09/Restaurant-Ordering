const foodList = [
  {
    name: "biryani",
    price: 120,
  },
  {
    name: "butter-chicken",
    price: 100,
  },
  {
    name: "dessert",
    price: 100,
  },
  {
    name: "dosa",
    price: 89,
  },
  {
    name: "idly",
    price: 99,
  },
  {
    name: "pizza",
    price: 150,
  },
  {
    name: "burger",
    price: 60,
  },
  { name: "pasta", price: 130 },
  {
    name: "samosa",
    price: 59,
  },
  { name: "rice", price: 39 },
];

const fooDish = document.querySelector(".fooDish");
const orderList = document.getElementById("cartItem");
const totalElement = document.getElementById("subtotal");
let orderCount = 0;
let total = 0;

const getFoodDish = function (food) {
  const req = new XMLHttpRequest();
  req.open("GET", `https://foodish-api.com/api/images/${food.name}`);
  req.send();

  req.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    const html = `<article class="food-box">
      <div class="img-box"> <i class="fa-solid fa-star"> 5.0 </i>
        <img src="${data.image}" alt="" class="food_img"/>
        <p class="food_name">${food.name}</p>
        <p class ="food_price">Price : ${food.price} ฿</p>
        <button onclick='addMenu(${JSON.stringify(food)})'>Add Menu</button>
      </div>
    </article>`;
    fooDish.innerHTML += html;
  });
};

foodList.forEach((item) => {
  getFoodDish(item);
});

// ตัวแปร deliveryFee 
let deliveryFee = 0;

const updateTotal = function () {
  // อัปเดตยอดรวม
  totalElement.textContent = `฿ ${total}`;

  // คำนวณ subtotal และแสดงผลในหน้าเว็บ
  const subtotal = total + deliveryFee; // สมมติมีค่าจัดส่งเป็น deliveryFee (ถ้ามี)
  document.getElementById("subtotal").textContent = `${subtotal} ฿`;
};

const addMenu = function (food) {
  orderCount++;
  document.getElementById("count").textContent = orderCount;
  total += food.price;

  // เพิ่มข้อมูลลงใน cartItem
  const cartItem = `<div class='cart_item'> 
      <p class="cart_name">${food.name}</p>
      <p class ="cart_price">${food.price} ฿</p>
      <i class='fa-solid fa-xmark' onclick='delElement(this)'></i></p>
    </div>`;
  orderList.innerHTML += cartItem;
  updateTotal();
};


function delElement(element) {
  // หา parent element ของไอคอนที่ถูกคลิก
  const cartItemElement = element.closest(".cart_item");

  // ถ้าพบ parent element ให้ลบทิ้ง
  if (cartItemElement) {
    cartItemElement.remove();
    orderCount--; // ลดจำนวนรายการ
    document.getElementById("count").textContent = orderCount;

    // อัปเดตยอดรวม
    const priceText =
      cartItemElement.querySelector(".cart_price").textContent;
    const price = parseInt(priceText.match(/\d+/)[0], 10);
    total -= price;
    updateTotal();
  }
}
const clearBill = function () {
  orderList.innerHTML = ""; // ลบทุกรายการในรายการสั่ง
  total = 0; // รีเซ็ตยอดรวม
  orderCount = 0; // รีเซ็ตจำนวนรายการ
  document.getElementById("count").textContent = orderCount; // อัปเดตจำนวนรายการที่แสดง
  updateTotal(); // อัปเดตยอดรวมทั้งหมด
};

// เพิ่มปุ่ม "Clear Bill" และเชื่อมกับฟังก์ชัน clearBill
const clearBillButton = document.getElementById("btn_clear");
clearBillButton.addEventListener("click", clearBill);
