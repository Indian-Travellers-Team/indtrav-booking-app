// src/types/PackageDetailTypes.ts
export interface PackageDetail {
  id: number;
  name: string;
  location: string;
  image: string;
  days: number;
  nights: number;
  itinerary: string;
  inclusion: string;
  exclusion: string;
  costings: {
    quad_sharing_cost: number;
    triple_sharing_cost: number;
    double_sharing_cost: number;
  };
  package_link: string;
}
