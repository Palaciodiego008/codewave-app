import { RECOMMENDATION_ROUTES } from "@/config/api";
import { ApiGateway } from "@/config/apiGateway";
import { SecurityRecommendationDto } from "./dto/SecurityRecommendation.dto";

class SecurityRecommendationService {
  async getAnalysisSecurityRecommendation(snapshotCode: string, sections: string[]): Promise<SecurityRecommendationDto> {
    try {
      const { data } = await ApiGateway.post(RECOMMENDATION_ROUTES.GET_SECURITY_RECOMMENDATIONS, {
        snapshot_code: snapshotCode,
        sections: sections,
      });

      return data;
    } catch (error) {
      const err = String(error);
      throw new Error(err);
    }
  }
}

export const securityRecommendationService = new SecurityRecommendationService();
