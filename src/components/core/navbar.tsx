"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/store/store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className="flex justify-between items-center bg-green-200 p-5">
      <h6 className="text-bold  font-bold text-zinc-600">
        <Link href="/">BRAND</Link>
      </h6>
      <div className="space-x-3 text-sm font-semibold">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Button variant="default" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
