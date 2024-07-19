import { ProjectDto } from "../services/dto/Project.dto";
import { projectService } from "../services/project.service";

export const useCreateProject = () => {
  const createProject = async (project: ProjectDto) => {
    return await projectService.createProject(project);
  }

  return {
    createProject
  };
}
