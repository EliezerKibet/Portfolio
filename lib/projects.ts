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
      "A comprehensive cybersecurity company website with complex animations and video backgrounds, showcasing services and solutions for enterprise clients. This Website was derived from a Figma design and implemented to Next version 15.5.4 ",
    image: "/projects/redfacemainpage.png",
    additionalImages: [
      "/projects/redfacemainpage.png",
      "/images/projects/redface-mobile.jpg",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Stripe",
      "Gsap",
      "lenis",
      "Recharts",
    ],
    features: [
      "Responsive design with fluid animations",
      "Interactive service showcases with detailed information",
      "Dynamic video backgrounds with fallback options",
      "Client testimonials carousel",
      "Contact form with form validation",
      "Stat cards for all employees of the company detailed with a score card for their best attributes",
      "Payment Integrations for Atome and Stripe",
      "Music background player that is pausable",
      "Scroll behavior with background animation for the landing page",
      "Admin issue of pdf certificates to users with certificates stored in Supabase Storage (certificates bucket)",
      "Custom app upload of profile pictures for personalization that are stored in 2MB image files each",
    ],
    challenges:
      "The main challenge was implementing complex animations while maintaining performance. I utilized Framer Motion with optimized configurations and lazy-loaded video backgrounds to ensure smooth performance across devices. ",
    demoUrl: "https://redfacers.com/",
    githubUrl: "https://github.com/EliezerKibet",
    featured: true,
    date: "2024-07-15",
  },
  {
    id: "2",
    slug: "flowlenz-ticket-management",
    title: "FlowLenz Ticket Management System",
    description:
      "A comprehensive ticket management system that integrates Jira and Azure DevOps API scrapers with a React frontend and .NET backend.",
    image: "/projects/flowlenzmainpage.png",
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
    demoUrl: "https://github.com/EliezerKibet",
    githubUrl: "https://github.com/EliezerKibet",
    featured: true,
    date: "2024-05-02",
  },
  {
    id: "3",
    slug: "fintech-dashboard",
    title: "Fintech Dashboard Platform",
    description:
      "A modern financial technology dashboard that displays real-time data visualizations, transaction history, and account management features.",
    image: "/projects/fintechmainpage.png",
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
    demoUrl: "https://github.com/EliezerKibet",
    githubUrl: "https://github.com/EliezerKibet",
    featured: false,
    date: "2025-03-18",
  },
  {
    id: "4",
    slug: "e-commerce-platform",
    title: "Modern E-Commerce Platform",
    description:
      "A fully-featured e-commerce platform with product management, cart functionality, checkout process, and order management.",
    image: "/projects/ecommercemainpage.jpg",
    additionalImages: [
      "/projects/ecommerceproductpage.jpg",
      "/projects/ecommerce-cart.jpg",
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
    demoUrl: "https://github.com/EliezerKibet",
    githubUrl: "https://github.com/EliezerKibet/ecommerce-platform",
    featured: false,
    date: "2025-01-25",
  },
  {
    id: "5",
    slug: "event-ticket-system",
    title: "Modern Event Ticketing Platform",
    description:
      "A fully-featured event ticketing platform with event management, ticket purchasing, checkout process, and order management.",
    image: "/projects/eventticket.jpg",
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
    demoUrl: "https://github.com/EliezerKibet",
    githubUrl: "https://github.com/EliezerKibet/EventTicketingPlatform",
    featured: false,
    date: "2024-01-25",
  },
  {
    id: "6",
    slug: "garage-management-system",
    title: "AI auto garage management system",
    description:
      "An automated garage management system that leverages AI to optimize operations, manage inventory, and enhance customer experience.",
    image: "/projects/AImainpage.jpg",
    additionalImages: [
      "/projects/AImainpage.jpg",
      "/images/projects/ecommerce-cart.jpg",
    ],
    technologies: ["React", "Boostrap", "C#", ".NET", "Stripe", "MySQL"],
    features: [
      "AI powered inventory management",
      "Invoice generation and tracking",
      "Inventory alerts and notifications",
      "Role-based access control",
      "Notfication system for maintenance schedules",
    ],
    challenges:
      "Creating responses for chatbot AI to handle diverse customer queries while ensuring accurate and context-aware interactions required extensive training data and fine-tuning of the language model.",
    demoUrl: "https://github.com/EliezerKibet",
    githubUrl: "https://github.com/EliezerKibet/AI_based_garage",
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
