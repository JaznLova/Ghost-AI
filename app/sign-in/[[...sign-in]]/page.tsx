import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";

export const instant = false;

export default function SignInPage() {
  return (
    <AuthShell>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading sign in...</p>}>
        <SignIn />
      </Suspense>
    </AuthShell>
  );
}
