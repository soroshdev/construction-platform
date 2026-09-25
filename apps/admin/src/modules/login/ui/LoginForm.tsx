"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, InputField, SubmitButton } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormSchema } from "@construction/validation";
const LoginForm = () => {
  const method = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <Card className="w-full max-w-sm bg-sidebar">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text">ورود به پنل نیک آدرین</CardTitle>
        <CardDescription>
          لطفا نام کاربری و رمز عبور خود را وارد کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form<LoginFormSchema>
          onSubmit={() => console.log("first")}
          methods={method}
        >
          <InputField<LoginFormSchema> name={"username"} label="نام کاربری" />
          <InputField<LoginFormSchema>
            name={"password"}
            type="password"
            label="رمز عبور"
          />
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <SubmitButton
          isLoading={false}
          className="w-full"
          title="ایجاد پروژه"
        />
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
