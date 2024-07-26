'use client'

import { useState } from "react";
import { ProjectDto } from "../services/dto/Project.dto";
import { projectService } from "../services/project.service";

export const useUpdateProject = () => {
  const updateProject = async (projectId: string, projectDto: ProjectDto) => {
    const res = await projectService.updateProject(projectId, projectDto);

    return res;
  }

  return {
    updateProject,
  };
}
