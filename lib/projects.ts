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
      "A comprehensive ticket management system that integrates Jira and Azure DevOps API scrapers with a React frontend and .NET backend. Utilises the Postgresql to store the tickets.",
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
      "Javascript",
      "Docker",
      "C#",
      "Azure DevOps API",
      "Jira API",
    ],
    features: [
      "Unified dashboard for Jira and Azure DevOps tickets . This was scraping each all tickets based on project name and inserting it into one table in a PostgreSQL database.",
      "Real-time synchronization with external systems , the system scrapes the tickets after every 30 seconds based off the API .",
      "Frontend design utilized the interface to showcase each tickets with further details shown when clicked on. The details included the project name, assignee , creator , ticket name , ticket details as well as date issued .",
      "Pagination of the tickets on the frontend design allowed a custom number of tickets to be shown per page. The options were 10  , 20 , or 30 tickets per page",
      "Incorporates an AI tool to suggest the best assignee based on the ticket data.",
      "Ability to choose which project to scrape based on the project code",
      "The frontend design adapted to device screen sizes as needed. Whether mobile , desktop or tablet",
    ],
    challenges:
      "Integrating with different API structures (Jira and Azure DevOps) required creating a unified data model while preserving platform-specific features. I implemented adapter patterns and a robust caching system to ensure seamless operations.At first the Jira and Azure API were working as intended. After some time the Jira API was deprecated and could only scrape 100 tickets instead of the full ticket amount. ",
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
      "Portfolio summary with breakdown of the total value in preferred currency",
      "Total P&L value with green for gains and red for losses",
      "Number of holdings available as of the time of logging in",
      "Transaction breakdown of the type, symbol, quantity, price and date. With actions to delete from the current transactions table modal. Including a dynamic search where you can filter the transactions based on type and also manual addition of transactions not automatically traced by the application",
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
  {
    id: "7",
    slug: "embassy-of-kenya-website",
    title: "Embassy of Kenya Website",
    description:
      "A large-scale official embassy website for the Embassy of Kenya, featuring 60 front-end pages, an appointment booking system, a media management backend, and secure multi-user access with two-factor authentication.",
    image: "/projects/embassy_website_kenya.png",
    additionalImages: ["/projects/embassy_website_kenya.png"],
    technologies: ["React", "C#", "Tailwind CSS", "SendGrid", ".NET"],
    features: [
      "60 fully responsive front-end pages covering embassy services, news, and information",
      "Appointment booking system allowing users to schedule embassy visits and consular services",
      "Media management backend enabling admins to upload, update, and remove media content across the site",
      "Multi-user backend access with role-based permissions for embassy staff",
      "Two-factor authentication (2FA) for secure admin and staff login",
      "SendGrid webhook integration for automated email notifications to users upon booking confirmation and updates",
    ],
    challenges:
      "Managing a large number of pages while keeping content consistent and maintainable required a well-structured component architecture. Implementing 2FA alongside multi-user role management added complexity to the authentication flow, which was resolved using a layered middleware approach in the .NET backend.",
    demoUrl: "https://embassydemo.netlify.app/",
    featured: true,
    date: "2026-03-08",
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
