export type SiteConfig = {
  name: string;
  url: string; // page to fetch (list or search page)
  listSelector?: string; // optional CSS selector to find job nodes
  titleSelector?: string;
  linkSelector?: string;
  companySelector?: string;
  locationSelector?: string;
};

// Example site configs. Replace with real sites and selectors.
export const jobSites: SiteConfig[] = [
  {
    name: 'Indeed',
    url: 'https://fr.indeed.com/jobs?q=ing%C3%A9nieur&l=France&from=searchOnHP%2Cwhatautocomplete%2CwhatautocompleteSourceStandard%2Cwhereautocomplete&vjk=a43cae22da6f9e3d',
    // If site has structured JSON-LD JobPosting entries, the API will parse them automatically.
    // Otherwise, fill selectors below to let the scraper extract elements from the HTML.
    listSelector: '.job-listing',
    titleSelector: '.job-title',
    linkSelector: 'a',
    companySelector: '.company',
    locationSelector: '.location',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs',
    // If site has structured JSON-LD JobPosting entries, the API will parse them automatically.
    // Otherwise, fill selectors below to let the scraper extract elements from the HTML.
    listSelector: '.job-listing',
    titleSelector: '.job-title',
    linkSelector: 'a',
    companySelector: '.company',
    locationSelector: '.location',
  },
  {
    name: 'Capijob',
    url: 'https://capijobnew.com/',
    // If site has structured JSON-LD JobPosting entries, the API will parse them automatically.
    // Otherwise, fill selectors below to let the scraper extract elements from the HTML.
    listSelector: '.job-listing',
    titleSelector: '.job-title',
    linkSelector: 'a',
    companySelector: '.company',
    locationSelector: '.location',
  },


  
];

export default jobSites;
