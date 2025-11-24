export type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
  level: number; // 1-5 skill level
  color: string; // Tailwind color class
};

export type SkillCategory = {
  name: string;
  description: string;
  skills: Skill[];
  gradient: string;
};

const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    icon: "react",
    category: "frontend",
    level: 5,
    color: "bg-blue-500",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    category: "frontend",
    level: 5,
    color: "bg-black dark:bg-white",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    category: "frontend",
    level: 5,
    color: "bg-blue-600",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    category: "frontend",
    level: 5,
    color: "bg-yellow-400",
  },
  {
    name: "HTML5",
    icon: "html5",
    category: "frontend",
    level: 5,
    color: "bg-orange-500",
  },
  {
    name: "CSS3",
    icon: "css3",
    category: "frontend",
    level: 5,
    color: "bg-blue-400",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    category: "frontend",
    level: 5,
    color: "bg-cyan-500",
  },
  {
    name: "Framer Motion",
    icon: "framer",
    category: "frontend",
    level: 4,
    color: "bg-pink-500",
  },
  {
    name: "Redux",
    icon: "redux",
    category: "frontend",
    level: 4,
    color: "bg-purple-600",
  },

  // Backend
  {
    name: ".NET",
    icon: "dotnet",
    category: "backend",
    level: 5,
    color: "bg-purple-700",
  },
  {
    name: "C#",
    icon: "csharp",
    category: "backend",
    level: 5,
    color: "bg-purple-600",
  },
  {
    name: "Node.js",
    icon: "nodejs",
    category: "backend",
    level: 4,
    color: "bg-green-600",
  },
  {
    name: "Express.js",
    icon: "express",
    category: "backend",
    level: 4,
    color: "bg-gray-700",
  },
  {
    name: "RESTful APIs",
    icon: "api",
    category: "backend",
    level: 5,
    color: "bg-teal-600",
  },
  {
    name: "GraphQL",
    icon: "graphql",
    category: "backend",
    level: 3,
    color: "bg-pink-600",
  },

  // Database
  {
    name: "PostgreSQL",
    icon: "postgresql",
    category: "database",
    level: 4,
    color: "bg-blue-700",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    category: "database",
    level: 4,
    color: "bg-green-700",
  },
  {
    name: "SQL Server",
    icon: "sqlserver",
    category: "database",
    level: 4,
    color: "bg-red-600",
  },
  {
    name: "Redis",
    icon: "redis",
    category: "database",
    level: 3,
    color: "bg-red-500",
  },

  // DevOps
  {
    name: "Docker",
    icon: "docker",
    category: "devops",
    level: 4,
    color: "bg-blue-600",
  },
  {
    name: "Git",
    icon: "git",
    category: "devops",
    level: 5,
    color: "bg-orange-600",
  },
  {
    name: "CI/CD",
    icon: "cicd",
    category: "devops",
    level: 4,
    color: "bg-indigo-600",
  },
  {
    name: "Azure",
    icon: "azure",
    category: "devops",
    level: 3,
    color: "bg-blue-500",
  },
  {
    name: "AWS",
    icon: "aws",
    category: "devops",
    level: 3,
    color: "bg-yellow-600",
  },

  // Tools
  {
    name: "VS Code",
    icon: "vscode",
    category: "tools",
    level: 5,
    color: "bg-blue-600",
  },
  {
    name: "Figma",
    icon: "figma",
    category: "tools",
    level: 4,
    color: "bg-purple-500",
  },
  {
    name: "Jira",
    icon: "jira",
    category: "tools",
    level: 4,
    color: "bg-blue-700",
  },
  {
    name: "Azure DevOps",
    icon: "azuredevops",
    category: "tools",
    level: 4,
    color: "bg-blue-600",
  },
  {
    name: "Postman",
    icon: "postman",
    category: "tools",
    level: 5,
    color: "bg-orange-500",
  },
];

export function getAllSkills(): Skill[] {
  return skills;
}

export function getSkillsByCategory(): SkillCategory[] {
  const categories = [
    {
      name: "Frontend Development",
      description: "Building responsive and interactive user interfaces",
      skills: [],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Backend Development",
      description: "Server-side logic and API development",
      skills: [],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Database & Storage",
      description: "Data management and persistence solutions",
      skills: [],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "DevOps & Cloud",
      description: "Deployment, CI/CD, and cloud infrastructure",
      skills: [],
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "Development Tools",
      description: "Productivity and collaboration tools",
      skills: [],
      gradient: "from-indigo-500 to-purple-500",
    },
  ] as SkillCategory[];

  skills.forEach((skill) => {
    const categoryMap: { [key: string]: string } = {
      frontend: "Frontend Development",
      backend: "Backend Development",
      database: "Database & Storage",
      devops: "DevOps & Cloud",
      tools: "Development Tools",
    };

    const category = categories.find(
      (c) => c.name === categoryMap[skill.category]
    );
    if (category) {
      category.skills.push(skill);
    }
  });

  return categories;
}
