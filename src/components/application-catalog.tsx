"use client";

import { CheckCircle, Filter, Search } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ImageCard } from "@/components/image-card";
import { ImageCardGroup } from "@/components/image-card-group";

interface Application {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  category: string;
}

interface ApplicationCatalogProps {
  applications: Application[];
  categories: string[];
}

const ApplicationCatalog = ({
  applications,
  categories,
}: ApplicationCatalogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category],
      );
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(application.category);
      const matchesSearch =
        application.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategories, applications]);

  const highlight = (text: string): ReactNode => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    let keyCounter = 0;
    return text.split(regex).map((part) =>
      regex.test(part) ? (
        <mark
          key={`highlight-${keyCounter++}`}
          style={{
            backgroundColor: "var(--color-fd-primary)",
            color: "var(--color-fd-card)",
          }}
        >
          {part}
        </mark>
      ) : (
        <span key={`text-${keyCounter++}`}>{part}</span>
      ),
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFilterButtonText = () => {
    if (selectedCategories.length === 0) {
      return "Showing all categories";
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0];
    }
    return `${selectedCategories.length} categories selected`;
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <div className="relative grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search apps by name or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-9 border border-fd-border rounded-lg bg-fd-secondary text-fd-foreground text-sm h-[42px]"
          />
        </div>
        <div
          className="relative grow md:grow-0 w-full md:w-auto"
          ref={dropdownRef}
        >
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full md:w-auto flex items-center justify-between gap-2 p-2 border border-fd-border rounded-lg bg-fd-secondary text-fd-foreground text-sm h-[42px]"
          >
            <div className="flex items-center gap-2 md:px-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <span className="whitespace-nowrap text-left">
                {getFilterButtonText()}
              </span>
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-max min-w-full p-2 border rounded-lg bg-fd-popover shadow-lg z-10">
              <button
                type="button"
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-fd-muted w-full text-left"
                onClick={() => handleCategoryChange("all")}
              >
                <div
                  className={`w-4 h-4 border rounded-full flex items-center justify-center ${selectedCategories.length === 0 ? "bg-fd-primary border-fd-primary" : "border-gray-400"}`}
                >
                  {selectedCategories.length === 0 && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-sm">All Categories</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-fd-muted w-full text-left"
                  onClick={() => handleCategoryChange(category)}
                >
                  <div
                    className={`w-4 h-4 border rounded-full flex items-center justify-center ${selectedCategories.includes(category) ? "bg-fd-primary border-fd-primary" : "border-gray-400"}`}
                  >
                    {selectedCategories.includes(category) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {categories.map((category) => {
        const applicationsForCategory = filteredApplications.filter(
          (application) => application.category === category,
        );
        if (applicationsForCategory.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="mt-12 mb-2">{category}</h3>
            <ImageCardGroup>
              {applicationsForCategory.map((application) => (
                <ImageCard
                  key={application.title}
                  title={highlight(application.title)}
                  description={highlight(application.description)}
                  href={application.href}
                  imageSrc={application.imageSrc}
                  imageAlt={application.title}
                />
              ))}
            </ImageCardGroup>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationCatalog;
