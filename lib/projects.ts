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
  clientProblem?: string;
  outcome?: string;
  timeline?: string;
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
    clientProblem:
      "The client had a Figma design for a high-end cybersecurity company website but no developer capable of translating the complex animations and video backgrounds into a performant Next.js build.",
    outcome:
      "Delivered a pixel-perfect implementation of the Figma design with smooth GSAP and Framer Motion animations, Stripe payment integration, and a Supabase-backed certificate management system — live at redfacers.com.",
    timeline: "6 weeks",
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
    clientProblem:
      "The engineering team was context-switching between Jira and Azure DevOps constantly, duplicating tickets across both systems and losing visibility into cross-platform work.",
    outcome:
      "Built a unified dashboard that scrapes both platforms every 30 seconds, deduplicates tickets with AI similarity scoring, and surfaces assignee recommendations — reducing context-switching overhead for the team.",
    timeline: "8 weeks",
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
    clientProblem:
      "The client needed a personal finance dashboard to track investment portfolio performance across multiple holdings with real-time P&L visibility.",
    outcome:
      "Delivered a live dashboard with Stripe API integration, real-time portfolio P&L tracking, transaction management, and secure JWT authentication with refresh token rotation.",
    timeline: "4 weeks",
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
    clientProblem:
      "The client needed a production-ready e-commerce platform with a robust test suite and CI/CD pipeline to ensure reliability before launch.",
    outcome:
      "Shipped a full e-commerce platform with 60 passing tests at 98% code coverage, automated GitHub Actions CI/CD, and sub-50ms API response times under 100 concurrent users.",
    timeline: "6 weeks",
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
    clientProblem:
      "The client needed a multi-tier event ticketing platform with real-time capacity management to prevent overbooking and QR code validation at the venue door.",
    outcome:
      "Delivered a full ticketing platform with 24 passing tests, JWT + refresh token auth, real-time capacity management using optimistic concurrency, QR code validation completing in under 200ms, and a GitHub Actions CI/CD pipeline.",
    timeline: "7 weeks",
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
    clientProblem:
      "A garage business was running entirely on phone calls, paper job cards, and spreadsheets — mechanics had no digital job queue, customers had no visibility into service status, and managers had no real-time floor overview.",
    outcome:
      "Built a three-portal platform (admin, customer, mechanic) with an AI chatbot grounded to live database data, smart scheduling with conflict detection, and predictive maintenance alerts — eliminating the paper-based workflow entirely.",
    timeline: "8 weeks",
    demoUrl: "https://github.com/EliezerKibet",
    githubUrl: "https://github.com/EliezerKibet/AI_based_garage",
    featured: false,
    date: "2024-01-25",
  },
  {
    id: "8",
    slug: "propertiesonline-listing-platform",
    title: "PropertiesOnline Listing Platform",
    description:
      "A large-scale multi-tenant real estate listing platform serving thousands of property listings across the US. The system spans multiple web applications — including a public listing server, agent/client portals, a media uploader, and an admin toolbox — all built on ASP.NET with a shared VB.NET framework library.",
    image: "/projects/propertiesonline.png",
    additionalImages: ["/projects/listing-project.png"],
    technologies: [
      "ASP.NET WebForms",
      "VB.NET",
      ".NET Framework",
      "SQL Server",
      "AWS S3",
      "Mailgun",
      "RestSharp",
      "Google Maps API",
      "reCAPTCHA",
    ],
    features: [
      "Public listing server rendering fully responsive property pages with photos, virtual tours, embedded video, open house schedules, and downloadable documents",
      "Mobile-optimised listing pages with swipe photo gallery, Google Maps embed, and guestbook lead-capture system with optional/required registration modes",
      "Agent and client portals (POClients, Clients, Accounts, POClientsV2) with role-based access for managing listings, leads, and account settings",
      "Media uploader application allowing agents to upload, manage, and publish property photos stored on AWS S3",
      "Admin Toolbox with email template management supporting multiple Mailgun sending domains (PropertiesOnline, UniquePropertySites, RealEstateSites)",
      "Mailgun HTTP API integration via RestSharp for transactional email delivery across three branded domains with authenticated sender identities",
      "reCAPTCHA v2 verification on public-facing forms to prevent spam lead submissions",
      "Flyer/PDF generation with multiple master-page layouts for printable property marketing materials",
      "Shared POFramework library providing database management, email helpers, tracing, and security utilities across all web applications",
      "DNS and multi-domain routing supporting custom agent domains mapped to individual listing pages",
    ],
    challenges:
      "Coordinating a shared compiled library (POFramework.dll) across six independently deployed web applications required strict versioning discipline. Ensuring TLS compatibility after Mailgun deprecated older cipher suites meant auditing all application startup paths and enforcing TLS 1.2 at the process level in each host app, since the framework DLL itself targets .NET 3.5 and cannot set the protocol directly.",
    clientProblem:
      "The client needed a production-grade multi-application real estate platform capable of serving public property listing pages, supporting agent self-service portals, handling media uploads to cloud storage, and sending transactional emails at scale — all under multiple branded domains.",
    outcome:
      "Delivered and maintained a live multi-tenant listing platform with six deployed web applications, AWS S3-backed media storage, Mailgun transactional email across three branded domains, reCAPTCHA-protected lead capture, and PDF flyer generation — with TLS 1.2 enforced across all applications for ongoing Mailgun API compatibility.",
    timeline: "Ongoing",
    demoUrl: "https://www.propertiesonline.com/",
    featured: true,
    date: "2026-04-08",
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
    clientProblem:
      "The Embassy of Kenya needed a full official web presence with 60 pages, a public appointment booking system, and a secure multi-user admin backend — built to government-grade security standards.",
    outcome:
      "Delivered 60 fully responsive pages, a slot-based appointment booking system with SendGrid email confirmations, a media management backend, and 2FA-secured multi-role admin access — live at embassydemo.netlify.app.",
    timeline: "10 weeks",
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
