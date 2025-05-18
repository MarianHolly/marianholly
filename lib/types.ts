export interface ArticleMetadata {
  title: string;
  subtitle?: string;  
  publishedAt: string;
  summary?: string;  
  image?: string;
  tags: string[];
  published: boolean;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  source?: string; 
}

export interface FullArticle extends Article {
  slug: string;
  metadata: ArticleMetadata;
  source: string;
}

export function isFullArticle(article: Article): article is FullArticle {
  return typeof article.source === 'string';
}