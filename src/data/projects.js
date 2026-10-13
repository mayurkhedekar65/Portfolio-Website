/**
 * projects.js — Central source of truth for all project data.
 *
 * Each project includes:
 * - High-level summary for showcase cards & orbit
 * - Structured engineering breakdown (problem, architecture, key decisions,
 *   trade-offs, reliability/error handling, limitations & planned improvements)
 *
 * All technical details reflect actual implementations and architectural designs.
 * Editable placeholders are marked with comments for easy personal verification.
 *
 * Project order (7 total):
 *   1. BugTracker
 *   2. CareerIQ
 *   3. Diagnostic
 *   4. LegalNext.ai
 *   5. SHG E-Commerce Platform
 *   6. Quizize.ai
 *   7. Rakthdaan — A Blood Donation Platform
 */

// Project screenshots — imported from src/assets/images
import bugtracker   from '../assets/images/Bugtracker.png';
import careeriq     from '../assets/images/careeriq.png';
import diagnosticai from '../assets/images/DiagnosticAI.png';
import legalnext    from '../assets/images/legalnext.png';
import shg          from '../assets/images/shg.png';
import quizize      from '../assets/images/quizee.png';
import rakthdaan    from '../assets/images/rakthdaan.png';

export const projects = [
  // ── 1. BugTracker ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'BugTracker',
    description:
      'A code review and defect detection platform combining deterministic static rule analysis with complementary LLM-assisted inspection. Designed to parse source files, evaluate code context, and flag runtime hazards, type inconsistencies, and logic bugs prior to deployment.',
    category: 'Code Analysis · Developer Tool',
    technologies: ['Python', 'FastAPI', 'AST Analysis', 'LangChain', 'PostgreSQL', 'React'],
    color: '#8b5cf6',
    githubUrl: 'https://github.com/mayurkhedekar65/BugTracker-AI-Code-Analysis-Bug-Tracking-System',
    liveUrl: null,
    image: bugtracker,
    details: {
      problem:
        'Developers need early detection of defects before code reaches staging. Standard linters excel at syntax and static types but miss context-dependent logic flaws. Conversely, pure LLM prompts hallucinate non-existent issues and lack deterministic repeatability.',
      architecture:
        'FastAPI backend accepts source code submissions. Deterministic AST parsing executes first to extract syntax trees, variable scopes, and execute static checks. When deeper semantic analysis is requested, relevant code contexts and diagnostic prompts are dispatched to an LLM service. Findings are merged into a normalized JSON diagnostic report.',
      keyDecisions:
        'Separated deterministic AST validation from semantic model queries to keep basic linting instantaneous and cost-effective. Output schemas enforce strict JSON formatting with line numbers and severity levels rather than unstructured prose.',
      tradeoffs:
        'Static checks guarantee zero hallucination and sub-millisecond execution, but cannot infer developer intent. The LLM catches subtle logic discrepancies but introduces API latency and non-deterministic variations; mitigated by strict prompt boundary constraints.',
      reliability:
        'Pydantic payload validation ensures valid source file payloads before parsing. LLM calls implement timeout cutoffs and fallback handlers to return deterministic findings even during external AI API unavailability.',
      limitations:
        'Currently analyzes single files or targeted code blocks. Multi-file dependency graph resolution and local sandboxed AST execution are planned future extensions.',
    },
  },

  // ── 2. CareerIQ ────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'CareerIQ',
    description:
      'An automated skill-gap analysis service that parses developer resumes and target job requirements, identifying missing technical proficiencies and generating structured learning recommendations.',
    category: 'Profile Parsing · Applied AI',
    technologies: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'React'],
    color: '#3b82f6',
    githubUrl: 'https://github.com/mayurkhedekar65/CareerIQ-AI-Career-Intelligence-Platform',
    liveUrl: null,
    image: careeriq,
    details: {
      problem:
        'Engineers transitioning roles struggle to identify exact technical gaps from lengthy, inconsistent job descriptions.',
      architecture:
        'FastAPI service accepts resume text and job postings, extracts technical competencies and experience levels using LangChain, and computes domain-specific coverage scores against target competencies.',
      keyDecisions:
        'Enforced strict Pydantic data schemas on LLM outputs to categorize skills into defined engineering tiers (Languages, Frameworks, Infrastructure, Databases) instead of unparseable prose.',
      tradeoffs:
        'Prompt-driven extraction handles diverse resume formats without manual regex maintenance, but introduces model latency; solved by caching parsed skill signatures.',
      reliability:
        'Sanitizes file inputs and applies prompt truncation limits to stay safely within model context windows without crashing on oversized inputs.',
      limitations:
        'Skill classification relies on prompt heuristics rather than a standardized taxonomy (e.g., O*NET); fine-tuned embedding classifiers are planned for future revisions.',
    },
  },

  // ── 3. Diagnostic ──────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Diagnostic',
    description:
      'A clinical research case-synthesis prototype that structures unstructured medical notes into relational knowledge graphs, connecting patient diagnoses, medications, and laboratory observations for research exploration.',
    category: 'Knowledge Extraction · Clinical AI',
    technologies: ['Python', 'Django', 'LangChain', 'ChromaDB', 'PostgreSQL', 'React'],
    color: '#6366f1',
    githubUrl: 'https://github.com/Abhiraj05/Diagnostic-AI',
    liveUrl: null,
    image: diagnosticai,
    details: {
      problem:
        'Clinical research notes are stored as dense, unstructured narrative text across disparate visits. Synthesizing connections between treatments, lab variations, and disease progressions currently requires labor-intensive manual chart review.',
      architecture:
        'Text ingestion pipeline parses research notes and utilizes LangChain extraction prompts to identify clinical entities (diagnoses, medications, dosages, lab results). Extracted entities and relationships are stored in ChromaDB for semantic retrieval and PostgreSQL for relational persistence, surfaced via an interactive exploration interface.',
      keyDecisions:
        'Maintained a strict boundary between relational record metadata (PostgreSQL) and vector-based semantic search embeddings (ChromaDB), preserving referential integrity while enabling semantic similarity queries.',
      tradeoffs:
        'Vector search facilitates rapid similarity matching across unstructured notes, but lacks formal medical ontology validation (e.g. SNOMED CT / UMLS). Handled through structured entity schemas to constrain extraction formats.',
      reliability:
        'All AI outputs are explicitly scoped as research assistance prototypes without clinical diagnostic claims. Schema validation discards unparseable entity structures before graph construction to protect graph integrity.',
      limitations:
        'Concept application only: not clinically validated or intended for live medical diagnosis. Does not yet include HIPAA-compliant de-identification pipelines or distributed graph database (e.g. Neo4j) backing.',
    },
  },

  // ── 4. LegalNext.ai ────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'LegalNext.ai',
    description:
      'An intelligent legal partner that ingests legal documents, statutes, and case references and enables conversational retrieval, clause analysis, and structured contract summarization using retrieval-augmented generation.',
    category: 'Legal AI · Document Intelligence',
    technologies: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React'],
    color: '#f59e0b',
    githubUrl: 'https://github.com/mayurkhedekar65/LegalNext.ai-Intelligent-Legal-Partner',
    liveUrl: null,
    image: legalnext,
    details: {
      problem:
        'Legal professionals spend significant time searching through lengthy documents, statutes, and precedents. Unguided LLM responses carry hallucination risk, making grounded retrieval essential for any legal-context application.',
      architecture:
        'FastAPI backend accepts legal document uploads, splits text into semantic chunks, and indexes embeddings in ChromaDB. User queries retrieve top-ranked relevant passages, which are injected as grounded context into structured LLM prompts to produce cited summaries and clause analyses.',
      keyDecisions:
        'Strictly grounded all responses to retrieved document context with explicit source citations, preventing the model from speculating beyond indexed material and making outputs auditable.',
      tradeoffs:
        'Retrieval grounding significantly reduces hallucination but limits answers to indexed content. Broad legal queries outside the document corpus receive explicit scope-boundary responses rather than speculative answers.',
      reliability:
        'Document ingestion validates file types and enforces content length limits. Prompt schemas require cited references in the response format, enabling downstream verification of every factual claim.',
      limitations:
        'Does not yet support handwritten document OCR or multi-jurisdictional statute comparison. Integration with live legal databases and court record APIs is a planned future extension.',
    },
  },

  // ── 5. SHG E-Commerce Platform ─────────────────────────────────────────────
  {
    id: 5,
    title: 'SHG E-Commerce',
    description:
      'A full-stack e-commerce platform built for Self-Help Groups, enabling product listing, order management, inventory tracking, and member-based role access to connect artisan producers directly with buyers.',
    category: 'E-Commerce · Full-Stack Platform',
    technologies: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'REST APIs'],
    color: '#10b981',
    githubUrl: 'https://github.com/mayurkhedekar65/SHG-E-Commerce-Platform',
    liveUrl: null,
    image: shg,
    details: {
      problem:
        'Self-Help Groups producing handmade goods lack affordable digital storefronts to reach buyers beyond local markets. Existing platforms impose high fees and complex onboarding that disadvantages small producer groups.',
      architecture:
        'Django MVC backend modeling Products, Categories, Orders, Members, and Inventory. REST API endpoints serve a JavaScript frontend with product browsing, cart management, and order submission. Role-based permissions separate buyer and SHG-admin workflows.',
      keyDecisions:
        'Implemented member-level role access control at the model layer so SHG admins can list and manage products without exposing platform administration capabilities to regular buyers.',
      tradeoffs:
        'Prioritized simplicity and low operational overhead over a microservices split, keeping the full stack deployable as a single Django instance appropriate for small-scale community use.',
      reliability:
        'All order state transitions execute within database transactions to prevent partial order creation. Inventory updates apply row-level locks to prevent overselling under concurrent checkouts.',
      limitations:
        'Payment gateway integration and automated shipping label generation are planned extensions. Currently supports manual payment confirmation and local delivery coordination.',
    },
  },

  // ── 6. Quizize.ai ──────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Quizize.ai',
    description:
      'An automated assessment generation system that chunks study documents, stores passage embeddings in ChromaDB, and synthesizes grounded multiple-choice questions with source citations.',
    category: 'Retrieval-Augmented Generation · EdTech',
    technologies: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React'],
    color: '#ec4899',
    githubUrl: 'https://github.com/Abhiraj05/Quizize.ai-AI-Powered-Quiz-Generation-Platform',
    liveUrl: null,
    image: quizize,
    details: {
      problem:
        'Generating practice questions from study texts manually is labor-intensive, while ungrounded LLM generation frequently hallucinates inaccurate facts and misleading explanations.',
      architecture:
        'FastAPI backend extracts document text, splits it into overlapping semantic chunks, and creates vector embeddings in ChromaDB. Generation prompts retrieve relevant source passages to anchor question generation.',
      keyDecisions:
        'Constrained question and explanation generation strictly to retrieved document chunks, requiring explicit reference citations in the output schema.',
      tradeoffs:
        'Chunk size selection balances vector retrieval accuracy against context completeness: smaller chunks provide precise lookup, while overlapping sliding windows preserve multi-sentence concepts.',
      reliability:
        'Structured JSON validation verifies question format, correct answer presence, and distractor plausibility, rejecting malformed responses.',
      limitations:
        'Currently optimized for text documents; mathematical formulas, tables, and complex diagram parsing remain planned future enhancements.',
    },
  },

  // ── 7. Rakthdaan — A Blood Donation Platform ───────────────────────────────
  {
    id: 7,
    title: 'Rakthdaan',
    description:
      'A blood donation coordination platform connecting registered donors with hospitals and blood banks, managing donation drives, real-time blood group availability, and emergency request matching.',
    category: 'Social Impact · Healthcare Platform',
    technologies: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'REST APIs'],
    color: '#ef4444',
    githubUrl: 'https://github.com/mayurkhedekar65/Rakthdaan-A-Blood-Donation-Platform',
    liveUrl: null,
    image: rakthdaan,
    details: {
      problem:
        'Emergency blood shortages occur because donors and recipients are poorly coordinated. Hospitals lack real-time visibility into registered donor availability by blood group and geographic proximity.',
      architecture:
        'Django backend models Donors, BloodGroups, Hospitals, DonationDrives, and EmergencyRequests. REST endpoints expose blood group availability queries, donor registration, and drive management. Proximity filtering surfaces nearby donors for urgent requests.',
      keyDecisions:
        'Maintained blood group availability as a computed view from confirmed donation records rather than a manually updated field, ensuring availability data stays consistent with actual donation history.',
      tradeoffs:
        'Query-time availability computation adds database load during high-traffic emergency lookups but eliminates the risk of stale cached inventory figures in life-critical situations.',
      reliability:
        'Donor eligibility checks enforce medical waiting periods between donations. Emergency request workflows apply priority queuing logic and notification dispatch to nearest eligible donors.',
      limitations:
        'Currently operates on voluntarily reported donor data. Integration with hospital blood bank management systems and SMS/push notification for emergency alerts are planned future features.',
    },
  },
];
