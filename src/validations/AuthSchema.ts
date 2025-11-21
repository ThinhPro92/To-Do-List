import z from "zod";
import { emailRegex, passwordRegex, usernameRegex } from "../constants/common";

export const genderEnum = z.enum(["male", "female", "other"]).optional();

export const registerSchema = z.object({
  email: z.string().regex(emailRegex, {
    message: "Email không hợp lệ. Ví dụ đúng: example@domain.com",
  }),

  username: z
    .string({ message: "Tên người dùng là bắt buộc" })
    .min(3, { message: "Tên người dùng phải có ít nhất 3 ký tự" })
    .max(20, { message: "Tên người dùng không được quá 20 ký tự" })
    .regex(usernameRegex, {
      message:
        "Tên người dùng chỉ được chứa chữ cái, số, dấu chấm (.) và gạch dưới (_), và phải bắt đầu bằng chữ cái.",
    }),

  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .regex(passwordRegex, {
      message:
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
    }),
  gender: genderEnum,
});

export const loginSchema = z.object({
  email: z.string().regex(emailRegex, {
    message: "Email không hợp lệ. Ví dụ đúng: example@domain.com",
  }),

  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .regex(passwordRegex, {
      message:
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
    }),
});
