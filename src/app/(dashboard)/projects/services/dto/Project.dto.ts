export interface ProjectDto {
  id?: string;
  title: string;
  description: string;
  languages: string[];
  backend: boolean;
  frontend: boolean;
  user_id: string;
}
