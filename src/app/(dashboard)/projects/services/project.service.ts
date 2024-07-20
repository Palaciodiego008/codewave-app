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

  async getProjects(userId: string): Promise<ProjectDto[]> {
    try {
      const { data } = await ApiGateway.get(`${PROJECT_ROUTES.GET_PROJECTS}?user_id=${userId}`)

      return data;
    } catch (error) {
      const err = String(error);

      throw new Error(err);
    }

  }
}

export const projectService = new ProjectService();
