import { getCategories } from "@/sanity/queries";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Button } from "./button";
import { RssIcon } from "lucide-react";
import Link from "next/link";

export default async function Categories({
  currentCategory,
  noFeed,
}: {
  currentCategory?: string;
  noFeed?: boolean;
}) {
  const categories = await getCategories();
  if (categories?.length === 0) {
    return;
  }
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium border p-2 rounded-md hover:border-black duration-300">
          {currentCategory ? currentCategory : "All Categories"}{" "}
          <ChevronUpDownIcon className="size-4 text-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href={"/"}
              className="grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5"
            >
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category?.slug}>
              <Link
                href={`/category/${category?.slug}`}
                className="grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-2 py-1 data-[focus]:bg-gray-950/5 capitalize"
              >
                <p className="col-start-2 text-sm/6">{category?.title}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
      {!noFeed && (
        <Button variant="outline" className="gap-1">
          <RssIcon className="size-4" /> RSS Feed
        </Button>
      )}
    </div>
  );
}
