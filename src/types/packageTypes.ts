export interface Package {
  id: number;
  slug: string;
  name: string;
}

export interface PackageResponse {
  all_packages: Package[];
  summer_packages: Package[];
  winter_packages: Package[];
}
