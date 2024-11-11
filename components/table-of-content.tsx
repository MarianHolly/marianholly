'use client'

import React, { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ChevronDown } from "lucide-react";

export default function TableOfContent() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <details
        id="mobile"
        open={isOpen}
        className="group col-start-2 mx-4 block rounded-xl border p-4 xl:hidden"
      >
        <summary
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="flex cursor-pointer items-center justify-between text-xl font-semibold"
        >
          Table of Contents
        </summary>
        <ScrollArea className="flex max-h-64 flex-col overflow-y-auto">
          <nav></nav>
        </ScrollArea>
      </details>

      <nav
        id="desktop"
        className="sticky top-[5.5rem] col-start-1 hidden h-[calc(100vh-5.5rem)] text-xs leading-4 xl:block"
      >
        <div className="flex justify-end">
          <ScrollArea className="max-h-[calc(100vh-8rem)]">
            <ul
              id="toc-container"
              className="flex flex-col justify-end gap-y-2 overflow-y-auto px-8"
            >
              <li>
                <h2 className="mb-2 text-lg font-semibold">
                  Table of Contents
                </h2>
              </li>
            </ul>
          </ScrollArea>
        </div>
      </nav>
    </>
  );
}
