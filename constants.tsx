import React from 'react';
import { Network, Cpu, ShieldCheck } from 'lucide-react';
import { TowerData, TowerType } from './types';

export const TOWERS: TowerData[] = [
  {
    id: TowerType.OPENFGA,
    title: 'OpenFGA',
    label: 'RELATIONSHIPS',
    description: "A high-performance relationship-based access control (ReBAC) engine meticulously engineered based on the core principles of Google's Zanzibar research. It redefines authorization by representing permissions as a distributed graph of relationship tuples, facilitating massive-scale, fine-grained access management across billions of objects and users. OpenFGA utilizes a unique 'Check' and 'Expand' API that traverses complex graph paths in sub-millisecond timeframes, ensuring global consistency through causal ordering and 'Zookies'—a mechanism for maintaining snapshot consistency without sacrificing horizontal scalability. By centralizing authorization logic into a graph-based data model, it eliminates the performance bottlenecks of traditional relational joins, enabling developers to model deeply nested hierarchies, transitive permissions (e.g., 'User A is an editor of Folder X because they are a member of Group Y'), and complex resource-sharing patterns with unprecedented architectural elegance. It is the definitive solution for B2B SaaS platforms and enterprise systems requiring planetary-scale, low-latency permission checks across highly interconnected data structures where the primary challenge is managing deep, recursive relationships at scale.",
    architecture: 'Zanzibar-style global scale, tuple-based storage, high-speed graph traversal, causal consistency.',
    useCase: 'Complex folder structures, multi-tenant B2B apps with millions of relationship entries, and large-scale nested groups.',
    detailedScenario: 'In a global document management system with billions of files, OpenFGA resolves deep inheritance (e.g., "Can User X access Sub-folder Y through Group Z membership?") by traversing the relationship graph. It ensures that permission changes propagate instantly across the globe without the latency of traditional database joins, maintaining strict causal consistency.',
    performanceMetrics: [
      '< 5ms p95 check latency',
      'Global Read Consistency via Zookies',
      'Scales to Billions of Tuples'
    ],
    colorClass: 'purple',
    accentColor: '#A855F7',
    icon: <Network className="w-8 h-8 text-purple-400" />,
    iconDescription: 'Relationship Graph & Tuple Storage',
    docsUrl: 'https://openfga.dev/docs'
  },
  {
    id: TowerType.OSO,
    title: 'Oso',
    label: 'LOGIC',
    description: "An advanced logic-driven authorization framework that utilizes the specialized Polar language to enable a declarative, policy-as-code paradigm, fundamentally decoupling intricate business logic from the application's core code. Oso redefines authorization by treating it as a first-class logic evaluation problem, allowing architects to model complex attribute-based access control (ABAC) and sophisticated logic gates with a Datalog-inspired syntax that is both powerful and highly readable. Its primary architectural innovation is the 'Data Filtering' engine, which bridges the gap between high-level security policies and the physical persistence layer. Unlike traditional systems that require separate logic for 'Can a user see this?' and 'Show me all things the user can see,' Oso translates unified Polar policies directly into optimized SQL or NoSQL queries. This solves the notorious 'N+1' authorization problem by pushing permission filters into the database level, ensuring that applications only ever fetch authorized data sets. Polar's flexibility allows for the seamless expression of complex rules involving multiple attributes—such as 'Managers can approve expenses only if the amount is under $5,000, they belong to the same cost center, and the request is within business hours'—without cluttering the application logic. This approach dramatically increases developer velocity and ensures that security policies remain consistent, testable, and easily auditable throughout the entire software development lifecycle.",
    architecture: 'Logic engine, Polar language (Datalog-like), integrated data filtering, local/cloud hybrid execution.',
    useCase: 'Complex business rules, attribute-based access (ABAC), rapid policy iteration, and high-performance list filtering.',
    detailedScenario: 'Consider a project management app where "Managers can edit tasks if they are in the same department AND the task is not locked." Oso evaluates these dynamic attributes in real-time and, crucially, translates the policy into SQL filters. This allows the app to fetch only the authorized tasks in a single query, preventing data leakage at the database level.',
    performanceMetrics: [
      'Local execution performance (micro-seconds)',
      'O(1) policy evaluation complexity',
      'Push-down database filtering (SQL/NoSQL)'
    ],
    colorClass: 'cyan',
    accentColor: '#06B6D4',
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    iconDescription: 'Policy Logic & Polar Engine',
    docsUrl: 'https://www.osohq.com/docs'
  },
  {
    id: TowerType.GAUTH_GO,
    title: 'Gauth_go',
    label: 'AGENCY',
    description: "A pioneer in fiduciary-based authorization, Gauth_go represents a radical paradigm shift by encoding legal liability and power-of-attorney directly into the system's core authentication and authorization flows. It transcends simple binary permissions to focus on the 'Legal Agency' of actors, ensuring every delegated action is anchored by a verifiable, cryptographically-signed audit trail on an immutable fiduciary ledger. Imagine a real-world scenario where a patient in a high-stakes clinical environment delegates 'Limited Medical Proxy' to a trauma specialist. Gauth_go doesn't just grant a temporary token; it issues a digital 'Warrant of Agency' that is continuously validated against the patient's fiduciary ledger. This warrant specifies that the specialist may access encrypted genomic records and psychiatric history exclusively for the duration of a medical emergency. If the specialist attempts to exceed this pre-defined scope—for instance, by attempting to export sensitive biometric telemetry to an external research database—the fiduciary engine doesn't just block the process; it seals the transaction state and generates a 'Forensic Liability Proof' anchored by Hardware Security Modules (HSMs). This proof serves as a legally admissible record of a breach of fiduciary duty, allowing healthcare providers and patients to resolve disputes with absolute cryptographic certainty. By transforming digital identity into a legally recognized representative capacity, Gauth_go allows organizations to manage complex signatory rights, medical proxy delegations, and cross-border AI agency with the same rigor as physical legal contracts, effectively bridging the gap between digital authorization and real-world forensic accountability.",
    architecture: 'Fiduciary duty ledger, cryptographically signed agency proofs, legal-tech integration, forensic audit logs.',
    useCase: 'Trust management, AI agent delegation, legal document signing, and high-stakes fiduciary actions.',
    detailedScenario: "Scenario: A patient in London delegates 'Diagnostic Agency' to a specialist in Tokyo via Gauth_go. The fiduciary ledger records a time-bound, cryptographically-signed mandate limited to viewing MRI data for 72 hours. When the specialist attempts to trigger an 'Export' command for the patient's entire psychiatric history, Gauth_go's fiduciary layer identifies the mismatch between the specialist's current 'Representative Capacity' and the requested action. It blocks the export, logs a 'High-Severity Fiduciary Breach' on the ledger, and notifies the patient's legal proxy with a tamper-proof evidence chain, ensuring full forensic accountability.",
    performanceMetrics: [
      'Hardware security module (HSM) signing',
      '100% verifiable non-repudiation',
      'Real-time liability validation'
    ],
    colorClass: 'emerald',
    accentColor: '#10B981',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    iconDescription: 'Fiduciary Duty & Agency Proofs',
    docsUrl: 'https://github.com/mauriciomferz/Gauth_go'
  }
];

export const RADAR_DATA = [
  { subject: 'Scalability', A: 95, B: 70, C: 60, D: 82, fullMark: 100 },
  { subject: 'Logic Depth', A: 60, B: 95, C: 75, D: 85, fullMark: 100 },
  { subject: 'Legal Compliance', A: 40, B: 50, C: 98, D: 75, fullMark: 100 },
  { subject: 'Developer Velocity', A: 75, B: 90, C: 65, D: 88, fullMark: 100 },
  { subject: 'Performance', A: 98, B: 85, C: 70, D: 85, fullMark: 100 },
];