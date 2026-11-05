export type Project = {
  slug: string;
  title: string;
  category: "Web" | "AI & ML" | "Systems";
  context: string;
  subtitle: string;
  summary: string;
  stack: string[];
  media: "mai" | "nimonspedia" | "ffnn" | "alchemy" | "ats" | "luma";
  github?: string;
  demo?: string;
  collaboration: string;
  introduction: string;
  sections: { title: string; paragraphs: string[]; points?: string[] }[];
  evidence: string;
};

export const projects: Project[] = [
  {
    slug: "mai-analytics",
    title: "Multi-client analytics",
    category: "Web",
    context: "MAI · Professional work · 2026",
    subtitle: "From scattered inputs to a repeatable reporting workflow.",
    summary:
      "A connected workflow for client data, configurable KPIs, data corrections, and AI-assisted performance reports.",
    stack: ["React", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    media: "mai",
    collaboration: "Professional work at MAI",
    introduction:
      "Analytics is only useful when the path from incoming data to a readable report holds together. This platform brings client management, data ingestion, KPI analysis, corrections, and report generation into one multi-client application.",
    sections: [
      {
        title: "One workflow, multiple clients",
        paragraphs: [
          "The system supports client account setup and selection, then brings data into a shared workflow through CSV uploads and synchronized external APIs. Keeping those entry points together makes the same analytics and reporting process reusable across client accounts.",
        ],
        points: [
          "Client onboarding and account management",
          "CSV ingestion and external API synchronization",
          "Centralized client data management",
        ],
      },
      {
        title: "Make the data reviewable",
        paragraphs: [
          "A React interface connects to FastAPI REST services, with PostgreSQL persistence through SQLAlchemy. The interface exposes customizable KPI dashboards alongside manual data correction tools.",
          "Corrections are part of the workflow rather than an afterthought: users can review inconsistent inputs and adjust data before using it for performance analysis. Configurable metrics allow the analytics view to reflect different reporting needs.",
        ],
      },
      {
        title: "Turn analysis into a report",
        paragraphs: [
          "The reporting workflow combines structured analytics with AI-assisted performance insights and recommendations. The result is an automated path from reviewed client data to a performance report.",
          "My engineering work spanned the React interface and the backend, ingestion, analytics, and reporting workflows. The CV records support for more than ten client accounts; no claims about revenue, time savings, or model accuracy are made here.",
        ],
      },
    ],
    evidence:
      "Public summary based on the owner-approved description and resume. The diagram is conceptual. Internal interfaces, client data, source code, and company endpoints are intentionally not reproduced.",
  },
  {
    slug: "nimonspedia",
    title: "Nimonspedia",
    category: "Web",
    context: "E-commerce · Collaborative project",
    subtitle: "Two sides of a marketplace, connected by one system.",
    summary:
      "A responsive e-commerce platform connecting product discovery and checkout with seller, catalog, and order management.",
    stack: ["PHP", "PostgreSQL", "Docker", "JavaScript"],
    media: "nimonspedia",
    collaboration: "Collaborative student project",
    introduction:
      "Nimonspedia brings the buyer journey and the seller workflow into a single web application. Buyers discover products, inspect stores, and place orders; sellers manage the catalog and the orders behind those purchases.",
    sections: [
      {
        title: "Discover, compare, purchase",
        paragraphs: [
          "Product discovery supports browsing, search, and filtering. Product detail pages provide a closer view of an item, while store pages give buyers a way to explore the seller’s catalog.",
          "A shopping cart and checkout connect discovery to a transaction. Order history and tracking continue the journey after purchase; buyer profiles and balance management support the account experience.",
        ],
      },
      {
        title: "The other side of the transaction",
        paragraphs: [
          "The seller workspace includes a store dashboard, product creation and editing, catalog management, order approvals, and sales analytics. Store profile management connects that operational view to the public storefront.",
        ],
        points: [
          "Separate buyer and seller registration and authentication",
          "Role-based access to the relevant workflows",
          "Persistent products, profiles, and transaction records in PostgreSQL",
        ],
      },
      {
        title: "A containerized web application",
        paragraphs: [
          "The platform combines PHP server-side logic, a responsive web frontend, and PostgreSQL. Docker Compose coordinates application and database services for a repeatable local runtime.",
          "This is a collaborative project. The case study describes the complete platform rather than attributing every interface or endpoint to one person.",
        ],
      },
    ],
    evidence:
      "Original Product Discovery, Product Detail, and Store Detail screenshots supplied by the owner through the project README. The supplied GitHub repository is currently unavailable, so no repository or demo action is shown.",
  },
  {
    slug: "feedforward-neural-network",
    title: "Neural networks, from scratch",
    category: "AI & ML",
    context: "Machine learning · Collaborative project",
    subtitle: "Understanding the machinery behind a prediction.",
    summary:
      "A configurable NumPy feedforward network with backpropagation, Adam optimization, and experiments against scikit-learn.",
    stack: ["Python", "NumPy", "scikit-learn", "Jupyter"],
    media: "ffnn",
    github: "https://github.com/tkanigara/TubesML_FFNN",
    collaboration: "Collaborative academic project · IF3270",
    introduction:
      "Building the model without a high-level training library makes each part of learning inspectable. This project implements the network’s core numerical operations in Python and NumPy, then uses controlled experiments to explore how configuration affects classification.",
    sections: [
      {
        title: "Build the forward and backward passes",
        paragraphs: [
          "Dense layers support configurable widths and depths. Linear, ReLU, sigmoid, tanh, and softmax activations pair with MSE, binary cross-entropy, or categorical cross-entropy losses.",
          "Backpropagation applies the chain rule to compute gradients. Gradient descent and Adam update the weights; L1 and L2 regularization make the regularization choices explicit. The project also includes a computational-graph autograd implementation.",
        ],
      },
      {
        title: "Configuration is part of the experiment",
        paragraphs: [
          "The implementation includes zero, uniform, and normal initialization, plus Xavier and He options. Leaky ReLU and ELU extend the activation choices. These options make it possible to compare training behavior without changing the core model.",
          "The network drawing illustrates a configurable dense architecture. Its node counts are illustrative, not a claim about a particular trained model or saved experiment.",
        ],
      },
      {
        title: "Compare behavior, not just a final score",
        paragraphs: [
          "The experiment notebook investigates depth, width, activations, learning rates, regularization, and Adam versus basic optimization using the Global Student Placement & Salary dataset.",
          "scikit-learn is used for preprocessing and as a comparison through MLPClassifier, rather than as the custom model’s training engine. No accuracy or loss numbers are reproduced here without the corresponding experiment context. RMSNorm is not implemented.",
        ],
      },
    ],
    evidence:
      "Verified against the public README and implementation files. The network illustration is conceptual and does not show benchmark results. Source link points to the owner’s collaborative fork; its README identifies the upstream project.",
  },
  {
    slug: "little-alchemy",
    title: "Little Alchemy Solver",
    category: "Web",
    context: "Algorithms on the web · Collaborative project",
    subtitle: "Finding a recipe through a graph of possibilities.",
    summary:
      "Explore element-crafting recipes with BFS, DFS, and bidirectional search through a React interface and Go backend.",
    stack: ["React", "Go", "Vite", "Docker"],
    media: "alchemy",
    github: "https://github.com/tkanigara/LittleAlchemyRecipe",
    demo: "https://tubes2-jumbo-uncut.vercel.app/",
    collaboration: "Collaborative academic project · IF2211",
    introduction:
      "In Little Alchemy, new elements are made by combining existing ones. This web application treats the recipe space as a search problem: choose a target element and a search strategy, then explore the paths that connect it to the starting elements.",
    sections: [
      {
        title: "Three ways to traverse the recipe space",
        paragraphs: [
          "The application implements Breadth-First Search, Depth-First Search, and Bidirectional Search. The interface lets users select a target, choose an algorithm, and request a single recipe path or multiple alternatives.",
          "These are graph-search algorithms. They do not require a trained machine learning model.",
        ],
      },
      {
        title: "Make the search legible",
        paragraphs: [
          "Results are presented through a graph visualization and a step-by-step recipe list, connecting the algorithmic output to the combinations a player would actually perform. Multiple-path mode also lets users specify the maximum number of paths.",
        ],
      },
      {
        title: "A small interface over a dedicated search service",
        paragraphs: [
          "A React and Vite frontend sends search requests to a Go backend. The source separates BFS, DFS, BDS, API handlers, and recipe data. Docker Compose provides a local environment for the two services.",
          "The linked live deployment is an external student-project demo. Its availability and backend behavior can change independently of this portfolio.",
        ],
      },
    ],
    evidence:
      "Capabilities verified against the public project README. Media is captured from the actual live demo; any observed deployment limitations are documented in the project caption and handoff.",
  },
  {
    slug: "resume-screening",
    title: "Resume screening with string matching",
    category: "Systems",
    context: "Desktop software · Collaborative project",
    subtitle: "From PDF text to an inspectable keyword match.",
    summary:
      "A Python desktop application combining PDF parsing, KMP and Boyer–Moore matching, and database-backed candidate review.",
    stack: ["Python", "PyQt5", "MySQL", "PyMuPDF"],
    media: "ats",
    github: "https://github.com/tkanigara/CV_ATS",
    collaboration: "Collaborative student project",
    introduction:
      "This application brings document processing and algorithmic text search into a desktop review workflow. It extracts text from resume PDFs, matches keywords, and connects candidate information to structured MySQL storage.",
    sections: [
      {
        title: "Matching without a trained model",
        paragraphs: [
          "Knuth–Morris–Pratt preprocesses a pattern into a longest-prefix-suffix table so matching can reuse earlier comparisons. The project’s Boyer–Moore implementation uses a last-occurrence, or bad-character, rule to skip ahead on mismatches.",
          "These are deterministic string-matching algorithms. The application is not presented as an LLM or machine learning screening model.",
        ],
      },
      {
        title: "Connect documents to candidate review",
        paragraphs: [
          "PyMuPDF handles PDF text extraction, PyQt5 supplies the desktop interface, and MySQL stores candidate data. The repository also includes an encryption-related database seeding workflow.",
          "The original preview contains candidate information. This portfolio uses a labeled processing diagram instead of republishing those records. The repository remains available for the full setup and implementation.",
        ],
      },
    ],
    evidence:
      "README and matcher implementation verified. Original README preview inspected but not republished because it includes candidate personal information. The visual is an explicitly labeled conceptual processing flow.",
  },
  {
    slug: "luma-osjang",
    title: "Luma_OSjang",
    category: "Systems",
    context: "Operating systems · Collaborative project",
    subtitle: "Working below the application layer.",
    summary:
      "An educational x86 operating-system project exploring a kernel, paging, processes, an EXT2 filesystem, and a shell in QEMU.",
    stack: ["C", "GCC", "Make", "QEMU"],
    media: "luma",
    github: "https://github.com/tkanigara/Luma_OSjang/tree/indah8",
    collaboration: "Collaborative academic project · IF2130",
    introduction:
      "Luma_OSjang explores the components that applications normally take for granted. The project brings kernel, memory, process, filesystem, and shell work together in a custom operating system tested with QEMU.",
    sections: [
      {
        title: "The boundary between hardware and software",
        paragraphs: [
          "The source includes interrupt handling, memory paging, and process context switching. Those mechanisms provide the foundation for transferring control, managing address spaces, and scheduling execution.",
        ],
      },
      {
        title: "From disk access to a shell",
        paragraphs: [
          "The system integrates disk I/O and an EXT2 filesystem with a command-line shell. This connects low-level storage and process mechanisms to operations that can be exercised in the emulator.",
          "C code, the GNU toolchain, Make, and QEMU form the development workflow. The source branch is indah8.",
        ],
      },
      {
        title: "Read the implementation with its context",
        paragraphs: [
          "The README lists implemented capabilities but also retains an old milestone label. This case study describes the components supported by source and the resume, without treating the milestone graphic as a completeness guarantee.",
          "The layer diagram is conceptual. It is not a screenshot of a running operating system or a claim about a graphical desktop.",
        ],
      },
    ],
    evidence:
      "Verified against the indah8 branch, its source tree, README, and Fullstack resume. No runnable-system screenshot was available for publication; the visual describes the system layers conceptually.",
  },
];

export const featured = projects.slice(0, 4);
