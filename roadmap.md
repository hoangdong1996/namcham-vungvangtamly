# Roadmap

- [ ] Hoàn thiện Bản đồ cảm xúc Chạm 1: lựa chọn, mức độ 1–5, nguyên nhân, chia sẻ tùy chọn, bản đồ và gợi ý; không gửi/lưu dữ liệu.
- [ ] Kiểm thử từ đầu đến cuối, làm lại/quay về, tải lại xóa dữ liệu và hiển thị máy tính/điện thoại.

- [x] Kế hoạch Góc đồng hành được duyệt; triển khai /dong-hanh, ba lối vào trang chủ trước LastTouch, liên kết Footer, bảy ngày, năm tình huống, ba vòng hỗ trợ và tài liệu thật.
- [x] Kiểm thử 15 lựa chọn tình huống, bảy dấu chọn/reset/bàn phím, ba nhóm hỗ trợ, bộ lọc/tài liệu và chín trang ở 1280/390px; không POST hoặc lưu câu trả lời, không tràn/ảnh hỏng/lỗi trình duyệt; 54 kiểm thử đạt. Chưa có tài liệu riêng cha mẹ/giáo viên; AI gửi thật và quản lý tệp đăng nhập không thử lại vì không thay đổi.

- [x] Đồng bộ hướng dẫn nguy cơ cao, bỏ gọi nhanh 111/115 toàn website; sửa lỗi mạng AI và minh bạch quyền riêng tư, giữ thiết kế/chức năng khác.
- [x] Năm tình huống AI thật thành công; lỗi kết nối mô phỏng gửi đúng một lần mỗi lần bấm, 8 trang ở 1280/390px không có tel/tràn ngang, nội dung mất khi tải lại; 50 kiểm thử đạt. Lưu giữ ngoài ứng dụng chưa xác minh, nhật ký AI trả bản đã che thông tin.

- [x] Kiểm thử lại AI Chạm 1 bằng tình huống thường và khủng hoảng thật; lỗi mạng và lỗi AI mô phỏng, quyền riêng tư trong ứng dụng, các liên kết trợ giúp.
- [x] Ghi nhận giới hạn: nhật ký AI còn bản đã che thông tin; chưa xác minh lưu giữ ngoài ứng dụng hoặc thực hiện cuộc gọi 111/115; lỗi mạng hiện thông báo tiếng Anh.

- [x] Cập nhật kế hoạch THE LAST TOUCH theo bản thiết kế cuối cùng; chỉ lập kế hoạch, chưa sửa mã nguồn.
- [x] Triển khai bốn phân cảnh riêng trang chủ và Footer chung; hòm thư chưa kích hoạt gửi.
- [x] Kiểm tra năm liên kết, nhập/xóa hòm thư không gửi, tám trang và 404, 360/390/768px, bàn phím và giảm chuyển động; 42 kiểm thử đạt. AI gửi thật, video phát, in PDF, quản lý tệp có đăng nhập và màn hình lỗi chưa thử lại trong lần này.

- [x] Bổ sung năm điểm chạm kết nối trong mô hình hiện có, chỉ chuyển động một lần và giữ liên kết.
- [x] Kiểm tra năm điểm, năm liên kết, điện thoại và chế độ giảm chuyển động — kiểm thử đạt, bấm cả năm liên kết ở 1280px và 390px.

- [x] Cập nhật nút ♡ Tìm điểm tựa và thêm sáu nguồn trợ giúp tại trang hiện có, giữ nguyên hành trình Chạm 5.
- [x] Kiểm tra sáu hướng dẫn, an toàn không cần biểu mẫu, liên kết và giao diện máy tính/điện thoại — 17 kiểm thử đạt; bấm thử toàn bộ sáu nguồn và các nút quay lại ở 1280px/390px, không tràn ngang hoặc lỗi trình duyệt.

- [x] Thiết kế lại riêng cẩm nang đồng hành Chạm 5: minh họa, năm bước mở rộng, lời nói tương tác, tình huống và nhắc nhở an toàn.
- [x] Kiểm tra toàn bộ tương tác, liên kết bản đồ/CLB và giao diện máy tính, máy tính bảng, điện thoại.

- [x] Chỉnh riêng Chạm 2: kiến thức áp lực số, bản đồ yếu tố, sổ tay 7 ngày, thử thách và tổng kết.
- [x] Kiểm tra tương tác, quyền riêng tư trong phiên và giao diện máy tính/điện thoại — 8 test đạt; bấm thử các hoạt động, hai liên kết và việc xóa câu trả lời khi rời trang; không có lỗi hiển thị.

- [x] Đổi tên 5 thẻ Chạm trong mục "Hành trình 5 CHẠM" (trang chủ): LẮNG NGHE / THẤU HIỂU / VỮNG VÀNG / KẾT NỐI / ĐIỂM TỰA
- [x] Thêm test kiểm tra tên thẻ và liên kết đúng trang (src/test/home-cham-titles.test.tsx, 3/3 test pass)
- [x] Chụp ảnh giao diện kiểm tra bố cục sau khi sửa — 5 thẻ một hàng, đúng tên, không có lời giới thiệu
- [x] Xây dựng Chạm 5 – Điểm tựa: bản đồ điểm tựa, cẩm nang, thử thách, đề xuất CLB, phần kết

## Creative Direction (5 CHẠM – new generation)
- [x] Biểu tượng 5 điểm chạm + hero mới + Hành trình của tôi + Một bước nhỏ + Trạm thông điệp (mẫu)
- [ ] Bản sắc riêng từng trang Chạm 1–5 (sóng lan, khối giao nhau, mầm cây, mạng lưới, vòng tròn mở)
- [ ] CLB: bộ công cụ thành viên, tình huống lắng nghe
- [ ] Thư viện: lọc theo nhu cầu sử dụng
