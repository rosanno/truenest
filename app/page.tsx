"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetAuthUser } from "@/hooks/use-get-auth-user";

import LoginForm from "@/features/login/components/login-form";
import SplashScreen from "@/components/splash-screen";

function Page() {
  const router = useRouter();
  const { data, isLoading } = useGetAuthUser();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        router.replace("/dashboard");
      } else {
        setCheckedAuth(true);
      }
    }
  }, [data, isLoading, router]);

  if (!checkedAuth) {
    return <SplashScreen />;
  }

  return <LoginForm />;
}

export default Page;
