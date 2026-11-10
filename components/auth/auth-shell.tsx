import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-[minmax(20rem,0.8fr)_minmax(28rem,1.2fr)]">
      <section className="hidden border-r bg-card px-10 py-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-md border bg-background">
            G
          </span>
          ghost AI
        </div>

        <div className="max-w-md space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Visual thinking, with an AI collaborator
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Turn ideas into clear, connected work.
            </h1>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Build and organize ideas on a shared canvas.</li>
            <li>Collaborate with your team in real time.</li>
            <li>Use AI to move from a prompt to a practical plan.</li>
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">
          A focused workspace for teams and independent builders.
        </p>
      </section>

      <section className="grid min-h-svh place-items-center px-4 py-8 sm:px-8">
        {children}
      </section>
    </main>
  );
}

export { AuthShell };
