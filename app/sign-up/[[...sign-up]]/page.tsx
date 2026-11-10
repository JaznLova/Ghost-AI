import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";

export const instant = false;

export default function SignUpPage() {
  return (
    <AuthShell>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading sign up...</p>}>
        <SignUp />
      </Suspense>
    </AuthShell>
  );
}
