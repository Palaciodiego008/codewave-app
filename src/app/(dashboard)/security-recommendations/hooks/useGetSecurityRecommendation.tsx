'use client'

import { useState } from "react";
import { SecurityRecommendationDto } from "../services/dto/SecurityRecommendation.dto";
import { securityRecommendationService } from "../services/security-recommendations.service";

export const useGetSecurityRecommendations = () => {
  const [recommendations, setRecommendations] = useState<SecurityRecommendationDto | null>(null);

  const getSecurityRecommendations = async (snapshotCode: string, sections: string[]) => {
    const res = await securityRecommendationService.getAnalysisSecurityRecommendation(snapshotCode, sections);
    setRecommendations(res);

    return res;
  }

  return {
    getSecurityRecommendations,
    recommendations
  };
}
