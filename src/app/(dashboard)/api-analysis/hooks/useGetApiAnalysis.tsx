'use client';

import { useState } from "react";
import { OpenApiDto } from "../services/dto/OpenApi.dto";
import { openApiService } from "../services/openApi.service";


export const useGetOpenApiById = () => {
  const [openApi, setOpenApi] = useState<OpenApiDto | null>(null);

  const getOpenApiById = async (id: string) => {
    try {
      // Directly use the response from the service function
      const response = await openApiService.getOpenApi(id);
      console.log("OpenAPI by ID:", response);
      setOpenApi(response); // Directly set the response as it is already the data
      return response;
    } catch (error) {
      console.error("Error fetching OpenAPI by ID:", error);
      return null;
    }
  };

  return {
    openApi,
    getOpenApiById
  };
};
