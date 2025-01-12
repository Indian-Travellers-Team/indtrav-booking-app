export interface PackageMin {
  id: number;
  slug: string;
  name: string;
}

export interface PackageResponse {
  all_packages: PackageMin[];
  summer_packages: PackageMin[];
  winter_packages: PackageMin[];
}

export interface Package {
  id: number;
  slug: string;
  name: string;
  image: string;
  location: string;
  days: number;
  nights: number;
  starting_price: number | null;
}

export interface Section {
  title: string;
  packages: Package[];
  forward_to: string;
}

export interface Banner {
  image_url: string;
  button_text: string | null;
  direct_to: string | null;
  banner_text: string | null;
  active: boolean;
}

export interface HomeResponse {
  sections: Section[];
  banner_list: Banner[];
  testimonials: any[];
}
