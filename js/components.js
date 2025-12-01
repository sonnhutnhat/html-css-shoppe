// Hàm dùng chung để tải nội dung HTML từ file khác
async function loadComponent(elementId, filePath) {
  try {
    // 1. Gửi yêu cầu lấy file (ví dụ: header.html)
    const response = await fetch(filePath);

    // 2. Kiểm tra nếu file không tồn tại hoặc lỗi mạng
    if (!response.ok) {
      throw new Error(`Không thể tải file: ${filePath}`);
    }

    // 3. Lấy nội dung text từ file đó
    const htmlContent = await response.text();

    // 4. Gắn nội dung vào thẻ div có id tương ứng
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = htmlContent;
    } else {
      console.warn(`Không tìm thấy thẻ có ID: ${elementId}`);
    }

  } catch (error) {
    console.error('Lỗi hệ thống:', error);
  }
}

// Chạy code khi trang web đã tải xong cấu trúc
document.addEventListener("DOMContentLoaded", function () {
  // Gọi hàm để tải Header
  loadComponent("header-container", "components/header.html");

  // Gọi hàm để tải Footer
  loadComponent("footer-container", "components/footer.html");
});