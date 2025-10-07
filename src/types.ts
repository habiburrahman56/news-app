export interface Article {
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  source?: {
    id?: string;
    name?: string;
  };
}
