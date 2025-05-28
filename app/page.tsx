import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import LoginForm from "@/features/login/components/login-form";

async function Page() {
  const session = await auth();

  if (session?.user) redirect("/dashboard");

  return <LoginForm />;
}

export default Page;
