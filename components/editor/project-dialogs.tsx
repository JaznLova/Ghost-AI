"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

interface ProjectDialogsProps {
  dialogs: ReturnType<typeof useProjectDialogs>
}

function ProjectDialogs({ dialogs }: ProjectDialogsProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void dialogs.submit()
  }

  const isFormDialog = dialogs.dialog === "create" || dialogs.dialog === "rename"

  return (
    <>
      <Dialog
        open={isFormDialog}
        onOpenChange={(open) => !open && dialogs.closeDialog()}
      >
        <DialogContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>
                {dialogs.dialog === "rename" ? "Rename Project" : "Create Project"}
              </DialogTitle>
              <DialogDescription>
                {dialogs.dialog === "rename"
                  ? `Rename “${dialogs.project?.name ?? ""}”.`
                  : "Name your new architecture workspace."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2">
              <label htmlFor="project-name" className="text-sm font-medium">
                Project name
              </label>
              <Input
                id="project-name"
                value={dialogs.projectName}
                onChange={(event) => dialogs.setProjectName(event.target.value)}
                placeholder="Untitled project"
                autoFocus={dialogs.dialog === "rename"}
                disabled={dialogs.isLoading}
              />
              {dialogs.dialog === "create" && (
                <p className="text-xs text-muted-foreground">
                  Slug: <span className="font-mono text-foreground">{dialogs.slug || "—"}</span>
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={dialogs.closeDialog}
                disabled={dialogs.isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!dialogs.projectName.trim() || dialogs.isLoading}
              >
                {dialogs.isLoading
                  ? "Saving…"
                  : dialogs.dialog === "rename"
                    ? "Rename"
                    : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialogs.dialog === "delete"}
        onOpenChange={(open) => !open && dialogs.closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Delete “{dialogs.project?.name ?? "this project"}”? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={dialogs.closeDialog}
              disabled={dialogs.isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => void dialogs.submit()}
              disabled={dialogs.isLoading}
            >
              {dialogs.isLoading ? "Deleting…" : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { ProjectDialogs }
