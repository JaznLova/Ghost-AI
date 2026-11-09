"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      id="project-sidebar"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "fixed top-14 bottom-0 left-0 z-40 flex w-80 flex-col border-r bg-sidebar text-sidebar-foreground shadow-xl transition-[transform,visibility] duration-200 ease-out",
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
          No projects yet
        </TabsContent>
        <TabsContent
          value="shared"
          className="grid place-items-center p-6 text-center text-muted-foreground"
        >
          No shared projects yet
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-sidebar-border p-4">
        <Button type="button" className="w-full">
          <Plus aria-hidden="true" />
          New Project
        </Button>
      </div>
    </aside>
  )
}

export { ProjectSidebar }
