export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~ -])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?`~ -]{6,}$/;

// tối thiểu 1 ký tự chữ cái thường
// tối thiểu 1 ký tự chữ cái hoa
// tối thiểu 1 ký tự chữ số
// tối thiểu 1 ký tự đặc biệt

export const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]{2,19}$/;
// Username: chỉ cho phép chữ cái, số, _, . và phải bắt đầu bằng chữ cái

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Email: chuẩn RFC 5322 (ngắn gọn, an toàn)
