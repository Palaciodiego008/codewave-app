export interface ProjectDto {
  id?: string;
  title: string;
  description: string;
  language: string;
  backend: boolean;
  frontend: boolean;
  user_id: string;
}
