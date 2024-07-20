'use client';

import { Box } from "@mui/material"
import { FormProjects } from "../components/form/Form";
import { useEffect, useState } from "react";
import { ProjectDto } from "../services/dto/Project.dto";
import { useAuthContext } from "@/context/AuthContext/auth.context";
import { useCreateProject } from "../hooks/useCreateProject";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NewProjects() {
  const { user } = useAuthContext()
  const router = useRouter()
  const { createProject } = useCreateProject()
  const [project, setProject] = useState<ProjectDto>({
    id: '',
    title: '',
    description: '',
    languages: [],
    backend: false,
    frontend: false,
    user_id: '',
  });

  useEffect(() => {
    if (!user.id) return

    setProject({
      ...project,
      user_id: user.id
    })
  }, [user])

  const handleSubmit = (e: any) => {
    e.preventDefault();

    delete project.id

    createProject(project)
      .then(() => {
        toast.success('Project created successfully')
        router.push('/projects')
      })
      .catch(() => {
        toast.error('Error creating project')
      })
  }

  return (
    <Box>
      <FormProjects
        title="New Project"
        project={project}
        setProject={setProject}
        action={handleSubmit}
      />
    </Box>
  )
}
