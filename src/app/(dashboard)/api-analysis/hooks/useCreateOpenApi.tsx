'use client';

import { useState } from "react";
import { OpenApiDto } from "../services/dto/OpenApi.dto";
import { openApiService } from "../services/openApi.service"; // Asegúrate de ajustar la ruta de importación según tu estructura

export const useCreateOpenApi = () => {
  const [error, setError] = useState<string | null>(null);

  const createOpenApi = async (openApi: OpenApiDto): Promise<OpenApiDto | null> => {
    try {
      const { data } = await openApiService.createOpenApi(openApi);
      console.log("OpenAPI created:", data);
      return data;
    } catch (error) {
      // Maneja el error y establece el mensaje en el estado
      console.error("Error creating OpenAPI:", error);
      setError("Error creating OpenAPI");
      return null;
    }
  };

  return {
    createOpenApi,
    error
  };
};
