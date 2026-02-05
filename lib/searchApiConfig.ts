export type SearchApiConfig = {
  name: string;
  engine: string;
  country?: string;
  type?: string;
};

export const searchApiConfigs: SearchApiConfig[] = [
  {
    name: 'Indeed',
    engine: 'indeed',
    country: 'fr',
    type: 'search',
  },
  {
    name: 'Google Jobs',
    engine: 'google_jobs',
    country: 'fr',
  },
  {
    name: 'LinkedIn',
    engine: 'linkedin',
    country: 'fr',
  },
];

export default searchApiConfigs;
