import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "نام کاربری خالی است.").max(100),
  password: z.string().min(3, "رمزعبور خالی است."),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
