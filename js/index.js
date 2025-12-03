document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const pagination = document.getElementById('pagination');

  const productsPerPage = 30;
  let currentPage = 1;

  // 30 món Giò Chả Việt Nam + ảnh thật 100% online (không cần tải về)
  const gioChaImages = [
    "https://36foods.vn/wp-content/uploads/2025/06/mua-gio-cha-o-dau-ngon-ha-noi-06-1.jpg",
    "https://dacsanngondanang.com/wp-content/uploads/2022/06/cha-bo-da-nang-loai-dac-biet-dsndn.jpg",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];

  const mockProducts = [
    "Giò Lụa Hà Nội Cao Cấp 500g", "Chả Bò Đặc Biệt 300g", "Giò Thủ Truyền Thống 400g",
    "Chả Quế Phú Thọ 250g", "Giò Bò Hảo Hạng 500g", "Chả Lụa Thanh Trì 300g",
    "Giò Xá Xíu Đặc Sản 350g", "Chả Cá Hà Nội 400g", "Giò Ngũ Vị Hương 300g",
    "Chả Ốc Đặc Biệt 250g", "Giò Tai Heo Cao Cấp 400g", "Chả Tôm Đất Đặc Sản 200g"
  ].map((name, i) => ({
    name,
    price: Math.floor(Math.random() * 70000) + 55000,
    oldPrice: Math.floor(Math.random() * 80000) + 95000,
    sold: Math.floor(Math.random() * 4000) + 500,
    rating: (4.7 + Math.random() * 0.3).toFixed(1),
    img: gioChaImages[i]
  }));

  const allProducts = mockProducts.map((p, i) => ({ ...p, id: i + 1 }));

  // Render sao
  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '<i class="home-product-item__star-gold fas fa-star"></i>';
    if (half) stars += '<i class="home-product-item__star-gold fas fa-star-half-alt"></i>';
    for (let i = 0; i < 5 - full - (half ? 1 : 0); i++) stars += '<i class="fas fa-star"></i>';
    return stars;
  }

  // Render sản phẩm – QUAN TRỌNG: dùng grid__column-5
  function renderProducts(page = 1) {
    productList.innerHTML = '';
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const items = allProducts.slice(start, end);

    items.forEach(product => {
      const col = document.createElement('div');
      col.className = 'grid__column-5'; // ĐÃ FIX: 5 sản phẩm/hàng
      col.innerHTML = `
        <a class="home-product-item" href="product-detail.html?id=${product.id}">
          <div class="home-product-item__img" style="background-image:url(${product.img})"></div>
          <h4 class="home-product-item__name">${product.name}</h4>
          <div class="home-product-item__price">
            <span class="home-product-item__price-old">${product.oldPrice.toLocaleString()}đ</span>
            <span class="home-product-item__price-current">${product.price.toLocaleString()}đ</span>
          </div>
          <div class="home-product-item__action">
            <span class="home-product-item__like">
              <i class="home-product-item__like-icon-empty far fa-heart"></i>
              <i class="home-product-item__like-icon-fill fas fa-heart"></i>
            </span>
            <div class="home-product-item__rating">${renderStars(product.rating)}</div>
            <span class="home-product-item__sold">${product.sold} đã bán</span>
          </div>
          <div class="home-product-item__origin">
            <span class="home-product-item__brand">Đặc Sản Việt</span>
            <span class="home-product-item__origin-name">Hà Nội</span>
          </div>
          <div class="home-product-item__favorite"><i class="fas fa-check"></i><span>Yêu thích</span></div>
          ${product.oldPrice > product.price ? `
          <div class="home-product-item__sale-off">
            <span class="home-product-item__sale-off-percent">${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
            <span class="home-product-item__sale-off-label">GIẢM</span>
          </div>` : ''}
        </a>`;
      productList.appendChild(col);
    });

    // Thả tim
    document.querySelectorAll('.home-product-item__like').forEach(btn => {
      btn.onclick = e => {
        e.preventDefault(); e.stopPropagation();
        btn.classList.toggle('home-product-item__like--liked');
      };
    });
  }

  // Phân trang
  function renderPagination() {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    pagination.innerHTML = `
      <li class="pagination-item"><a href="#" class="pagination-item__link"><i class="fas fa-angle-left"></i></a></li>
      ${Array.from({ length: totalPages }, (_, i) => `
        <li class="pagination-item ${i + 1 === currentPage ? 'pagination-item--active' : ''}">
          <a href="#" class="pagination-item__link">${i + 1}</a>
        </li>`).join('')}
      <li class="pagination-item"><a href="#" class="pagination-item__link"><i class="fas fa-angle-right"></i></a></li>
    `;

    pagination.querySelectorAll('a').forEach((link, i) => {
      link.onclick = e => {
        e.preventDefault();
        if (i === 0 && currentPage > 1) currentPage--;
        else if (i === totalPages + 1 && currentPage < totalPages) currentPage++;
        else if (i > 0 && i <= totalPages) currentPage = i;
        renderProducts(currentPage);
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  }

  renderProducts(currentPage);
  renderPagination();

  // Các chức năng khác
  document.querySelectorAll('.home-filter__btn').forEach(b => b.onclick = () => {
    document.querySelector('.home-filter__btn.btn--primary')?.classList.remove('btn--primary');
    b.classList.add('btn--primary');
  });

  document.querySelectorAll('.select-input__link').forEach(l => l.onclick = e => {
    e.preventDefault();
    document.querySelector('.select-input__label').textContent = l.textContent;
  });

  document.querySelectorAll('.category-item').forEach(item => item.onclick = e => {
    e.preventDefault();
    document.querySelector('.category-item--active')?.classList.remove('category-item--active');
    item.classList.add('category-item--active');
  });
});