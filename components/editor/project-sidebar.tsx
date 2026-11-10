"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { Project } from "@/hooks/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  ownedProjects: Project[]
  sharedProjects: Project[]
  onCreate: () => void
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onCreate,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close projects sidebar"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={cn(
          "fixed inset-x-0 top-14 bottom-0 z-30 bg-background/70 backdrop-blur-xs transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        id="project-sidebar"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "fixed top-14 bottom-0 left-0 z-40 flex w-80 max-w-[85vw] flex-col border-r bg-sidebar text-sidebar-foreground shadow-xl transition-[transform,visibility] duration-200 ease-out",
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        )}
      >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
        <h2 className="font-heading text-base font-semibold">Projects</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close projects sidebar"
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="min-h-0 flex-1 gap-0">
        <TabsList className="m-4 mb-0 w-auto">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent
          value="my-projects"
          className="grid place-items-center p-6 text-center text-muted-foreground"
        >
          <ProjectList
            projects={ownedProjects}
            onRename={onRename}
            onDelete={onDelete}
          />
        </TabsContent>
        <TabsContent
          value="shared"
          className="grid place-items-center p-6 text-center text-muted-foreground"
        >
          <ProjectList projects={sharedProjects} />
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-sidebar-border p-4">
        <Button type="button" className="w-full" onClick={onCreate}>
          <Plus aria-hidden="true" />
          New Project
        </Button>
      </div>
      </aside>
    </>
  )
}

interface ProjectListProps {
  projects: Project[]
  onRename?: (project: Project) => void
  onDelete?: (project: Project) => void
}

function ProjectList({ projects, onRename, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return <p>No projects yet</p>
  }

  return (
    <ul className="w-full space-y-1 text-left text-sidebar-foreground">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent"
        >
          <span className="min-w-0 flex-1 truncate text-sm">{project.name}</span>
          {onRename && onDelete && (
            <div className="flex shrink-0 items-center">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onRename(project)}
                aria-label={`Rename ${project.name}`}
              >
                <Pencil aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(project)}
                aria-label={`Delete ${project.name}`}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export { ProjectSidebar }
