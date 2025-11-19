export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  additionalImages?: string[];
  technologies: string[];
  features: string[];
  challenges: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
};

const projects: Project[] = [
  {
    id: "1",
    slug: "redface-cybersecurity",
    title: "REDFACE Cybersecurity Platform",
    description:
      "A comprehensive cybersecurity company website with complex animations and video backgrounds, showcasing services and solutions for enterprise clients.",
    image: "/images/projects/redface-preview.jpg",
    additionalImages: [
      "/images/projects/redface-dashboard.jpg",
      "/images/projects/redface-mobile.jpg",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
    ],
    features: [
      "Responsive design with fluid animations",
      "Interactive service showcases with detailed information",
      "Dynamic video backgrounds with fallback options",
      "Client testimonials carousel",
      "Contact form with form validation",
    ],
    challenges:
      "The main challenge was implementing complex animations while maintaining performance. I utilized Framer Motion with optimized configurations and lazy-loaded video backgrounds to ensure smooth performance across devices.",
    demoUrl: "https://redface-demo.vercel.app",
    githubUrl: "https://github.com/EliezerKibet/redface",
    featured: true,
    date: "2024-07-15",
  },
  {
    id: "2",
    slug: "flowlenz-ticket-management",
    title: "FlowLenz Ticket Management System",
    description:
      "A comprehensive ticket management system that integrates Jira and Azure DevOps API scrapers with a React frontend and .NET backend.",
    image: "/images/projects/flowlenz-preview.jpg",
    additionalImages: [
      "/images/projects/flowlenz-board.jpg",
      "/images/projects/flowlenz-analytics.jpg",
    ],
    technologies: [
      "React",
      "TypeScript",
      ".NET",
      "PostgreSQL",
      "Docker",
      "Azure DevOps API",
      "Jira API",
    ],
    features: [
      "Unified dashboard for Jira and Azure DevOps tickets",
      "Real-time synchronization with external systems",
      "Advanced filtering and search capabilities",
      "Custom reporting and analytics",
      "User role management and permissions",
    ],
    challenges:
      "Integrating with different API structures (Jira and Azure DevOps) required creating a unified data model while preserving platform-specific features. I implemented adapter patterns and a robust caching system to ensure seamless operations.",
    demoUrl: "https://flowlenz-demo.vercel.app",
    githubUrl: "https://github.com/EliezerKibet/flowlenz-poc",
    featured: true,
    date: "2024-05-02",
  },
  {
    id: "3",
    slug: "fintech-dashboard",
    title: "Fintech Dashboard Platform",
    description:
      "A modern financial technology dashboard that displays real-time data visualizations, transaction history, and account management features.",
    image: "/images/projects/fintech-preview.jpg",
    additionalImages: [
      "/images/projects/fintech-transactions.jpg",
      "/images/projects/fintech-settings.jpg",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Chart.js",
      "Stripe API",
    ],
    features: [
      "Real-time financial data visualization",
      "Transaction history with advanced filtering",
      "Secure account management",
      "Budget planning tools",
      "Payment processing with Stripe integration",
    ],
    challenges:
      "Ensuring data accuracy and real-time updates while maintaining security was crucial. I implemented WebSockets for live data and JWT authentication with refresh token rotation for enhanced security.",
    demoUrl: "https://fintech-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/EliezerKibet/fintech-dashboard",
    featured: false,
    date: "2024-03-18",
  },
  {
    id: "4",
    slug: "e-commerce-platform",
    title: "Modern E-Commerce Platform",
    description:
      "A fully-featured e-commerce platform with product management, cart functionality, checkout process, and order management.",
    image: "/images/projects/ecommerce-preview.jpg",
    additionalImages: [
      "/images/projects/ecommerce-product.jpg",
      "/images/projects/ecommerce-cart.jpg",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "PostgreSQL",
    ],
    features: [
      "Responsive product catalog with filtering",
      "User authentication and profiles",
      "Shopping cart with persistent storage",
      "Secure checkout process",
      "Order tracking and history",
    ],
    challenges:
      "Creating a seamless user experience from browsing to checkout while handling various edge cases (inventory changes, session management) required careful state management and optimistic UI updates.",
    demoUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/EliezerKibet/ecommerce-platform",
    featured: false,
    date: "2024-01-25",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
