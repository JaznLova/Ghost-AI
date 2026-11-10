"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { Button } from "@/components/ui/button"
import { useProjectDialogs, type Project } from "@/hooks/use-project-dialogs"

const ownedProjects: Project[] = [
  { id: "atlas", name: "Atlas Platform" },
  { id: "checkout", name: "Checkout Redesign" },
]

const sharedProjects: Project[] = [
  { id: "mobile", name: "Mobile Architecture" },
]

function EditorHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const dialogs = useProjectDialogs()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
        onCreate={dialogs.openCreate}
        onRename={dialogs.openRename}
        onDelete={dialogs.openDelete}
      />

      <main className="grid min-h-[calc(100dvh-3.5rem)] place-items-center px-6 py-12">
        <div className="max-w-xl text-center">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Create a project or open an existing one
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
          <Button type="button" className="mt-6" onClick={dialogs.openCreate}>
            <Plus aria-hidden="true" />
            New Project
          </Button>
        </div>
      </main>

      <ProjectDialogs dialogs={dialogs} />
    </div>
  )
}

export { EditorHome }
