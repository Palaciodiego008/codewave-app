'use client';

import { useState } from "react";
import { OpenApiDto } from "../services/dto/OpenApi.dto";
import { openApiService } from "../services/openApi.service";

export const useGetOpenApis = () => {
  const [openApis, setOpenApis] = useState<OpenApiDto[]>([]);

  const getOpenApis = async (userId: string) => {
    const res = await openApiService.getOpenApis(userId);
    setOpenApis(res);

    return res;
  }

  return {
    getOpenApis,
    openApis
  };
}
