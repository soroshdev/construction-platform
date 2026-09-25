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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormSchema } from "@construction/validation";
import { authClient } from "@/lib/auth-client";
const LoginForm = () => {
  const router = useRouter();
  const method = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormSchema) => {
      const result = await authClient.signIn.username(values);

      if (result.error) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است.");
      }

      return result.data;
    },
    onSuccess: () => router.replace("/dashboard"),
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
          onSubmit={(values) => loginMutation.mutate(values)}
          methods={method}
        >
          <InputField<LoginFormSchema> name={"username"} label="نام کاربری" />
          <InputField<LoginFormSchema>
            name={"password"}
            type="password"
            label="رمز عبور"
          />
          <SubmitButton
            isLoading={loginMutation.isPending}
            className="mt-4 w-full"
            title="ورود"
          />
        </Form>
      </CardContent>
      {loginMutation.error && (
        <CardFooter className="text-sm text-red-500">
          {loginMutation.error.message}
        </CardFooter>
      )}
    </Card>
  );
};

export default LoginForm;
