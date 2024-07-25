'use client'

import { useState } from "react";
import { ProjectDto } from "../services/dto/Project.dto";
import { projectService } from "../services/project.service";

export const useGetProject = () => {
  const [project, setProject] = useState<ProjectDto>({} as ProjectDto);

  const getProject = async (projectId: string) => {
    const res = await projectService.getProject(projectId);
    setProject(res);

    return res;
  }

  return {
    getProject,
    project
  };
}
