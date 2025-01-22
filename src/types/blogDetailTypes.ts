export interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  reads_min: number;
  keywords: string | null;
  page_hits: number;
  active: boolean;
  created_at: string;
  images: string[];
}
