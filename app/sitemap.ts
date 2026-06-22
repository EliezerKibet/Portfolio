import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllBlogPosts } from "@/lib/blog";

const servicePages = [
  'freelance-developer-berlin',
  'freelance-developer-germany',
  'react-nextjs-development',
  'dotnet-backend',
  'fullstack-web-development',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eliezerkibet.dev";

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = servicePages.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}
