"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  //   const isLoggedIn = useAuth((state) => state.isLoggedIn);
  //   const login = useAuth((state) => state.login);
  const router = useRouter();

  const { isLoggedIn, login } = useAuth();
  const onSubmit = (data: LoginFormValues) => {
    if (data.email) {
      login(data.email);
      router.push("/");
    }
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-[350]">
        <CardHeader>
          <CardTitle>
            Login to your account
            <p className="mt-3 text-sm font-light text-yellow-500">
              Is logged in check:{isLoggedIn ? "true" : "false"}{" "}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Label htmlFor="email">EMAIL</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <Input
              type="submit"
              className="bg-black text-white cursor-pointer"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
