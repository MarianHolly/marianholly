"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface FilterContextType {
  filterPublished: boolean;
  setFilterPublished: (value: boolean) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
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

export default function ArticleFilterWrapper({ children }: ArticleFilterWrapperProps) {
  const [filterPublished, setFilterPublished] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  const resetFilters = () => {
    setFilterPublished(true);
    setCategoryFilter("");
  };

  return (
    <FilterContext.Provider
      value={{ filterPublished, setFilterPublished, categoryFilter, setCategoryFilter }}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            checked={filterPublished}
            onCheckedChange={(checked) => setFilterPublished(checked as boolean)}
          />
          <label
            htmlFor="published"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show only published
          </label>
        </div>

        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>

        {children}
      </div>
    </FilterContext.Provider>
  );
}
