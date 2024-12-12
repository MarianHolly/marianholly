"use client";

import { createContext, useState, ReactNode, useContext } from "react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import BlurFade from "./ui/blur-fade";

interface FilterContextType {
  filterPublished: boolean;
  setFilterPublished: (value: boolean) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}

interface ArticleFilterWrapperProps {
  children: ReactNode;
}

const BLUR_FADE_DELAY = 0.04;

export default function ArticleFilterWrapper({
  children,
}: ArticleFilterWrapperProps) {
  const [filterPublished, setFilterPublished] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // const resetFilters = () => {
  //   setFilterPublished(true);
  //   setCategoryFilter("");
  //   setSortOrder("desc");
  // };

  const toggleFilter = () => {
    setFilterPublished((prev) => !prev);
  };

  // const toggleSortOrder = () => {
  //   setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  // };

  return (
    <FilterContext.Provider
      value={{
        filterPublished,
        setFilterPublished,
        categoryFilter,
        setCategoryFilter,
        sortOrder,
        setSortOrder,
      }}
    >
      <div className="w-full">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-3xl font-bold">Articles</h1>
            <div className="flex flex-row gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full p-1 ${
                      filterPublished ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={toggleFilter}
                  >
                    {filterPublished ? (
                      <EyeIcon className="h-12 w-12" />
                    ) : (
                      <EyeOffIcon className="h-12 w-12" />
                    )}
                    <span className="sr-only">
                      {filterPublished
                        ? "zvedavý na naplánované články?"
                        : "len publikované články"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {filterPublished
                      ? "zvedavý na naplánované články?"
                      : "len publikované články"}
                  </p>
                </TooltipContent>
              </Tooltip>

              {/*
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full p-1 ${
                      filterPublished ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={resetFilters}
                  >
                    <RotateCcwIcon className="h-12 w-12" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>reset</p>
                </TooltipContent>
              </Tooltip>
            */}
            </div>
          </div>

          <Separator className="my-2" />
        </BlurFade>

        {children}
      </div>
    </FilterContext.Provider>
  );
}
