"use client";

import { useAuth } from "@/store/store";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuth((s) => s.hasHydrated);

  if (!hasHydrated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="text-gray-600">Loading...</span>
      </div>
    ); // or loader
  }

  return <>{children}</>;
}
