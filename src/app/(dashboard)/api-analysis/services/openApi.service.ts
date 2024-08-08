import { OPENAPI_ROUTES } from "@/config/api";
import { ApiGateway } from "@/config/apiGateway";
import { OpenApiDto } from "./dto/OpenApi.dto";
import { log } from "console";

class OpenApiService {
  async createOpenApi(openApi: OpenApiDto): Promise<any> {
    try {
      const { data } = await ApiGateway.post(OPENAPI_ROUTES.CREATE_OPENAPI, { ...openApi });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getOpenApis(userId: string): Promise<OpenApiDto[]> {
    try {
      const { data } = await ApiGateway.get(`${OPENAPI_ROUTES.GET_OPENAPIS}?user_id=${userId}`);
      const { data: openApis } = data;
      return openApis;
    } catch (error) {
      const err = String(error);

      throw new Error(err);
    }
  }

  async getOpenApi(openApiId: string): Promise<OpenApiDto> {
    try {
      const { data } = await ApiGateway.get(`${OPENAPI_ROUTES.GET_OPENAPI}/${openApiId}`);
      console.log("data:", data.data);
      const { data: openApi } = data;
      console.log("openApi:", openApi);

      return openApi;
    } catch (error) {
      const err = String(error);

      throw new Error(err);
    }
  }

  async updateOpenApi(openApiId: string, openApi: OpenApiDto): Promise<any> {
    try {
      const { data } = await ApiGateway.put(`${OPENAPI_ROUTES.UPDATE_OPENAPI}/${openApiId}`, { ...openApi });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export const openApiService = new OpenApiService();
