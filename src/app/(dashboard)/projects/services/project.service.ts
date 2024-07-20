import { PROJECT_ROUTES } from "@/config/api";
import { ApiGateway } from "@/config/apiGateway";
import { ProjectDto } from "./dto/Project.dto";

class ProjectService {
  async createProject(project: ProjectDto): Promise<any> {
    try {
      const { data } = await ApiGateway.post(PROJECT_ROUTES.CREATE_PROJECT, { ...project })

      return data;
    } catch (error) {
      return error;
    }
  }

  async getProjects(): Promise<any> {
    try {
      const { data } = await ApiGateway.get(PROJECT_ROUTES.GET_PROJECTS)

      return data;
    } catch (error) {
      return error;
    }

  }
}

export const projectService = new ProjectService();
