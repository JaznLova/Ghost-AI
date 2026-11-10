"use client"

import { useMemo, useState } from "react"

type Project = {
  id: string
  name: string
}

type ProjectDialog = "create" | "rename" | "delete" | null

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function useProjectDialogs() {
  const [dialog, setDialog] = useState<ProjectDialog>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const slug = useMemo(() => toSlug(projectName), [projectName])

  function openCreate() {
    setProject(null)
    setProjectName("")
    setDialog("create")
  }

  function openRename(nextProject: Project) {
    setProject(nextProject)
    setProjectName(nextProject.name)
    setDialog("rename")
  }

  function openDelete(nextProject: Project) {
    setProject(nextProject)
    setProjectName("")
    setDialog("delete")
  }

  function closeDialog() {
    if (isLoading) return

    setDialog(null)
    setProject(null)
    setProjectName("")
  }

  async function submit() {
    if ((dialog === "create" || dialog === "rename") && !projectName.trim()) {
      return
    }

    setIsLoading(true)
    await Promise.resolve()
    setIsLoading(false)
    setDialog(null)
    setProject(null)
    setProjectName("")
  }

  return {
    dialog,
    project,
    projectName,
    slug,
    isLoading,
    setProjectName,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    submit,
  }
}

export { useProjectDialogs }
export type { Project }
