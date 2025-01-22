export interface PackageType {
  id: number;
  slug: string;
  name: string;
  image: string;
  location: string;
  days: number;
  nights: number;
  starting_price: number | null;
}
