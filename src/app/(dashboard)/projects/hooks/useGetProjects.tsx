'use client'

import { useState } from "react";
import { ProjectDto } from "../services/dto/Project.dto";
import { projectService } from "../services/project.service";

export const useGetProjects = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);

  const getProjects = async (userId: string) => {
    const res = await projectService.getProjects(userId);
    setProjects(res);

    return res;
  }

  return {
    getProjects,
    projects
  };
}
