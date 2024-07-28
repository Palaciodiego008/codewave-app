export interface SecurityRecommendationDto {
  response: {
    Security?: Check[];
    Readability?: Check[];
    StaticCodeAnalysis?: Check[];
    DependencyScanning?: Check[];
  };
}

export interface Check {
  title: string;
  description: string;
  status: 'Passed' | 'Needs Improvement' | 'Failed';
}
