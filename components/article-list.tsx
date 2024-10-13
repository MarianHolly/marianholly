"use client";

import { useFilterContext } from "./article-wrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Article {
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    publishedAt: Date;
    summary: string;
    image: string;
    tags: string[];
    published: boolean;
  };
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const { filterPublished, categoryFilter, setCategoryFilter } = useFilterContext();

  const filteredArticles = articles.filter(
    (article) =>
      (!filterPublished || article.metadata.published) &&
      (categoryFilter === "" || article.metadata.tags.includes(categoryFilter))
  );

  const categories: any[] = Array.from(new Set(articles.flatMap((article) => article.metadata.tags)));
  console.log(categories);

  return (
    <div>
      <div className="mb-4">
        <div className="h-20"></div>

        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >   <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
          
          <SelectContent>
            {categories && categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>



      <ul className="space-y-4">
        {filteredArticles.map((article) => (
          <li key={article.slug} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{article.metadata.title}</h2>
            <p className="text-sm text-gray-500">
              Category: {article.metadata.tags} | Status:{" "}
              {article.metadata.published ? "Published" : "Draft"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
