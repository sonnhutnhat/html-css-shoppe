// js/product-detail.js
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  if (!productId || productId < 1 || productId > 30) {
    document.body.innerHTML = '<h1 style="text-align:center;margin:100px;color:#ee4d2d">Không tìm thấy sản phẩm!</h1>';
    return;
  }

  // Danh sách ảnh & tên sản phẩm Giò Chả (30 món)
  const images = [
    "https://36foods.vn/wp-content/uploads/2025/06/mua-gio-cha-o-dau-ngon-ha-noi-06-1.jpg",
    "https://dacsanngondanang.com/wp-content/uploads/2022/06/cha-bo-da-nang-loai-dac-biet-dsndn.jpg",
    "https://giochaotm.com/wp-content/uploads/2023/08/gio-thu-truyen-thong.jpg",
    "https://giochaua.com/wp-content/uploads/2024/01/cha-que-phu-tho.jpg",
    "https://giochaua.com/wp-content/uploads/2024/02/gio-bo-cao-cap.jpg",
    "https://giochaotm.com/wp-content/uploads/2023/08/gio-lua-thanh-tri.jpg",
    "https://giochaua.com/wp-content/uploads/2024/03/gio-xa-xiu.jpg",
    "https://giochaotm.com/wp-content/uploads/2023/08/cha-ca-ha-noi.jpg",
    "https://giochaua.com/wp-content/uploads/2024/01/gio-ngu-vi-huong.jpg",
    "https://giochaotm.com/wp-content/uploads/2023/08/cha-oc-dac-biet.jpg",
    "https://giochaua.com/wp-content/uploads/2024/02/gio-tai-heo.jpg",
    "https://giochaotm.com/wp-content/uploads/2023/08/cha-tom-dat.jpg"
  ];

  const names = [
    "Giò Lụa Hà Nội Cao Cấp ", "Chả Bò Đặc Biệt ", "Giò Thủ Truyền Thống ",
    "Chả Quế Phú Thọ ", "Giò Bò Hảo Hạng ", "Chả Lụa Thanh Trì ",
    "Giò Xá Xíu Đặc Sản ", "Chả Cá Hà Nội ", "Giò Ngũ Vị Hương ",
    "Chả Ốc Đặc Biệt ", "Giò Tai Heo Cao Cấp ", "Chả Tôm Đất Đặc Sản "
  ];

  const product = {
    id: productId,
    name: names[productId - 1],
    img: images[productId - 1],
    price: Math.floor(Math.random() * 60000) + 65000,
    oldPrice: Math.floor(Math.random() * 70000) + 110000,
    sold: Math.floor(Math.random() * 3500) + 800,
    rating: (4.7 + Math.random() * 0.3).toFixed(1),
    reviews: Math.floor(Math.random() * 400) + 80
  };

  // Cập nhật toàn bộ nội dung
  document.title = `${product.name} - Shoppe Giò Chả Việt Nam`;
  document.getElementById('product-img').src = product.img;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-old-price').textContent = product.oldPrice.toLocaleString() + 'đ';
  document.getElementById('product-price').textContent = product.price.toLocaleString() + 'đ';
  document.getElementById('product-sale').textContent = '-' + Math.round((1 - product.price / product.oldPrice) * 100) + '%';
  document.getElementById('product-reviews').textContent = `(${product.reviews} đánh giá)`;
  document.getElementById('product-sold').textContent = product.sold + ' đã bán';
  document.getElementById('product-stock').textContent = (Math.floor(Math.random() * 80) + 20) + ' sản phẩm có sẵn';

  // Render sao
  const starsContainer = document.getElementById('product-stars');
  starsContainer.innerHTML = '';
  const fullStars = Math.floor(product.rating);
  for (let i = 0; i < fullStars; i++) {
    starsContainer.innerHTML += '<i class="fas fa-star" style="color:#ee4d2d"></i>';
  }
  if (product.rating % 1 >= 0.5) {
    starsContainer.innerHTML += '<i class="fas fa-star-half-alt" style="color:#ee4d2d"></i>';
  }
  for (let i = Math.ceil(product.rating); i < 5; i++) {
    starsContainer.innerHTML += '<i class="far fa-star" style="color:#ee4d2d"></i>';
  }

  // Hiệu ứng thêm vào giỏ
  document.querySelector('.btn-add-cart').addEventListener('click', function () {
    this.innerHTML = '<i class="fas fa-check"></i> Đã thêm vào giỏ!';
    this.style.background = '#ee4d2d';
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng';
      this.style.background = '';
    }, 2000);
  });
});