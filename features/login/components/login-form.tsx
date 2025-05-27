import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/features/login/hooks/use-login";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    const response = await login({
      email: values.email,
      password: values.password,
    });

    console.log(response);

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-[#F34451]/30 p-3">
              <LockKeyhole className="w-6 h-6 text-[#F34451]" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to access your account and manage your
            dashboard
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@example.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-10 bg-[#F34451] hover:bg-[#F34451]/80"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader
                    className="animate-spin
                "
                  />
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
