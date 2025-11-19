export type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools";
  level: number; // 1-5 skill level
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};

const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "react", category: "frontend", level: 5 },
  { name: "Next.js", icon: "nextjs", category: "frontend", level: 5 },
  { name: "TypeScript", icon: "typescript", category: "frontend", level: 5 },
  { name: "JavaScript", icon: "javascript", category: "frontend", level: 5 },
  { name: "HTML5", icon: "html5", category: "frontend", level: 5 },
  { name: "CSS3", icon: "css3", category: "frontend", level: 5 },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend", level: 5 },
  { name: "Framer Motion", icon: "framer", category: "frontend", level: 4 },
  { name: "Redux", icon: "redux", category: "frontend", level: 4 },

  // Backend
  { name: ".NET", icon: "dotnet", category: "backend", level: 5 },
  { name: "C#", icon: "csharp", category: "backend", level: 5 },
  { name: "Node.js", icon: "nodejs", category: "backend", level: 4 },
  { name: "Express.js", icon: "express", category: "backend", level: 4 },
  { name: "RESTful APIs", icon: "api", category: "backend", level: 5 },
  { name: "GraphQL", icon: "graphql", category: "backend", level: 3 },

  // Database
  { name: "PostgreSQL", icon: "postgresql", category: "database", level: 4 },
  { name: "MongoDB", icon: "mongodb", category: "database", level: 4 },
  { name: "SQL Server", icon: "sqlserver", category: "database", level: 4 },
  { name: "Redis", icon: "redis", category: "database", level: 3 },

  // DevOps
  { name: "Docker", icon: "docker", category: "devops", level: 4 },
  { name: "Git", icon: "git", category: "devops", level: 5 },
  { name: "CI/CD", icon: "cicd", category: "devops", level: 4 },
  { name: "Azure", icon: "azure", category: "devops", level: 3 },
  { name: "AWS", icon: "aws", category: "devops", level: 3 },

  // Tools
  { name: "VS Code", icon: "vscode", category: "tools", level: 5 },
  { name: "Figma", icon: "figma", category: "tools", level: 4 },
  { name: "Jira", icon: "jira", category: "tools", level: 4 },
  { name: "Azure DevOps", icon: "azuredevops", category: "tools", level: 4 },
  { name: "Postman", icon: "postman", category: "tools", level: 5 },
];

export function getAllSkills(): Skill[] {
  return skills;
}

export function getSkillsByCategory(): SkillCategory[] {
  const categories = [
    { name: "Frontend", skills: [] },
    { name: "Backend", skills: [] },
    { name: "Database", skills: [] },
    { name: "DevOps", skills: [] },
    { name: "Tools", skills: [] },
  ] as SkillCategory[];

  skills.forEach((skill) => {
    const category = categories.find(
      (c) => c.name.toLowerCase() === skill.category
    );
    if (category) {
      category.skills.push(skill);
    }
  });

  return categories;
}
