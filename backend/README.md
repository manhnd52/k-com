# K-Com Backend

Dự án backend của hệ thống K-Com sử dụng Node.js, Express, TypeScript và Prisma ORM kết nối với cơ sở dữ liệu PostgreSQL.

---

## 🚀 Cách khởi chạy dự án

### 1. Chuẩn bị môi trường
Yêu cầu máy tính đã cài đặt:
- **Node.js** (v18 trở lên)
- **PostgreSQL** (đang chạy cục bộ hoặc trên cloud)

### 2. Cài đặt các thư viện
Cài đặt tất cả các package phụ thuộc trong dự án:
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` ở thư mục gốc của dự án và điền thông tin kết nối cơ sở dữ liệu của bạn:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/k_com?schema=public"
PORT=3000
```
*(Hãy thay đổi thông tin `postgres:postgres@localhost:5432/k_com` sao cho phù hợp với tài khoản, mật khẩu, cổng và tên database của bạn).*

### 4. Chạy Migration để đồng bộ Database
Đồng bộ các model Prisma với database PostgreSQL và tự động tạo Prisma Client:
```bash
npx prisma migrate dev
```

### 5. Khởi chạy Server ở chế độ Phát triển (Dev Mode)
Chạy dự án bằng `tsx` để tự động hot-reload khi thay đổi mã nguồn:
```bash
npm run dev
```
Server sẽ chạy mặc định tại cổng `3000` (hoặc cổng cấu hình trong `.env`). Bạn có thể kiểm tra sức khỏe hệ thống qua endpoint: `http://localhost:3000/api/health`.

---

## 🗄️ Cách kết nối DB và sử dụng Prisma để phát triển

### 1. Cơ chế kết nối DB trong Prisma 7
Dự án sử dụng **Prisma v7**. Trong phiên bản này, cấu trúc quản lý kết nối cơ sở dữ liệu có các điểm quan trọng:
- **`prisma.config.ts`**: Đây là nơi tập trung cấu hình kết nối của CLI (chạy migrate, generate). URL kết nối được lấy từ hàm `env("DATABASE_URL")`.
- **Driver Adapter**: Prisma 7 không tích hợp sẵn driver Rust cho database. Khi ứng dụng chạy, chúng ta sử dụng driver adapter JavaScript (`@prisma/adapter-pg` và thư viện `pg`) được tiêm (inject) trực tiếp vào constructor `PrismaClient` tại file [app/config/prisma.tsx](file:///d:/Pj%20Hust/k-com/backend/app/config/prisma.tsx).

### 2. Quy trình sửa đổi Database (Workflow Dev)
Mỗi khi cần thay đổi cấu trúc bảng cơ sở dữ liệu:
1. Sửa đổi/Thêm mới các model trong file [prisma/schema.prisma](file:///d:/Pj%20Hust/k-com/backend/prisma/schema.prisma).
2. Tạo và áp dụng bản thiết kế migration mới bằng lệnh:
   ```bash
   npx prisma migrate dev --name <ten_migration_goi_nho>
   ```
3. Lệnh trên cũng sẽ tự động chạy `npx prisma generate` để cập nhật kiểu dữ liệu (Types) của Prisma Client nằm tại thư mục `app/generated/prisma`.
4. Sử dụng đối tượng `prisma` được export từ `app/config/prisma.tsx` để truy vấn trong các controller.

---

## 🛠️ Các API Endpoints hiện tại

Tất cả các API được mount dưới tiền tố `/api`:

### 1. Xác thực (Authentication)
- **`POST /api/auth/login`**: Đăng nhập hoặc đăng ký tự động bằng email.
  - **Request Body**: `{ "email": "user@example.com", "displayName": "User Name" }`
  - **Response**: Trả về thông tin của `User`.

### 2. Người dùng (Users)
- **`POST /api/users`**: Tạo tài khoản người dùng mới thủ công.
  - **Request Body**: `{ "email": "user@example.com", "name": "User Name" }`
- **`GET /api/users/:id`**: Lấy thông tin chi tiết của người dùng bằng UUID `id`.

### 3. Lộ trình học tập (Roadmaps)
- **`GET /api/roadmaps`**: Lấy danh sách toàn bộ lộ trình học tập, tự động đi kèm theo `Category` (Danh mục) và `Stages` (Các giai đoạn) / `Steps` (Các bước học) được sắp xếp theo thứ tự `orderIndex`.

### 4. Hệ thống (System)
- **`GET /api/health`**: Kiểm tra trạng thái máy chủ và kết nối trực tiếp đến cơ sở dữ liệu PostgreSQL.

---

## 📂 Cấu trúc dự án và Quy ước Code

### 1. Sơ đồ cấu trúc thư mục
```text
backend/
├── app/                        # Thư mục chứa mã nguồn chính của ứng dụng
│   ├── config/                 # Các file cấu hình hệ thống
│   │   └── prisma.tsx          # Khởi tạo Prisma Client kèm Driver Adapter
│   ├── controllers/            # Xử lý logic nghiệp vụ và phản hồi HTTP
│   │   ├── auth.controller.ts
│   │   ├── roadmap.controller.ts
│   │   └── user.controller.ts
│   ├── routes/                 # Định nghĩa các endpoints và định tuyến route
│   │   ├── auth.routes.ts
│   │   ├── roadmap.routes.ts
│   │   └── user.routes.ts
│   ├── generated/              # Mã nguồn Prisma Client tự động sinh ra
│   │   └── prisma/
│   ├── database/               # (Tùy chọn) Chứa hạt giống (seeds) dữ liệu
│   ├── middleware/             # Các Express middlewares của hệ thống
│   └── utils/                  # Các hàm tiện ích dùng chung
├── prisma/                     # Chứa schema.prisma và các file migrations SQL
├── app.ts                      # Cấu hình Express app và đăng ký middleware/router
├── server.ts                   # Điểm khởi chạy (entry point) để listen port HTTP
├── package.json                # Quản lý script và dependencies
├── tsconfig.json               # Cấu hình TypeScript compiler
└── .env                        # Chứa các biến môi trường (Database URI, Port)
```

### 2. Quy ước Code (Coding Conventions)

- **Tách biệt App và Server Listener**:
  - [app.ts](file:///d:/Programming/k-com/backend/app.ts) đảm nhận việc thiết lập Express, CORS, JSON parser và định tuyến.
  - [server.ts](file:///d:/Programming/k-com/backend/server.ts) chỉ đảm nhận việc khởi chạy cổng lắng nghe HTTP (listen). Cách tách này giúp việc viết unit test/integration test sau này trở nên dễ dàng và không bị nghẽn cổng.
- **Quy ước đặt tên file**:
  - Controller đặt tên dạng: `*.controller.ts` (Ví dụ: `user.controller.ts`).
  - Router đặt tên dạng: `*.routes.ts` (Ví dụ: `user.routes.ts`).
- **TypeScript & Import Path**:
  - Dự án sử dụng cấu hình TypeScript **NodeNext** (`moduleResolution: "nodenext"`). Điều này yêu cầu tất cả các lệnh `import` file local phải chỉ định rõ đuôi mở rộng `.js` (Ví dụ: `import { prisma } from '@/config/prisma.js'`).
  - Dự án có cấu hình path alias `@/` trỏ trực tiếp đến thư mục `app/` để tránh các đường dẫn tương đối phức tạp như `../../../`.
