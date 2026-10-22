import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // DOMAIN 1: DESCRIBE CLOUD CONCEPTS
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'q-cc-01',
    topic: 'cloud-concepts',
    question:
      'A startup wants to launch a new web application but has a limited budget and no in-house servers. Which cloud deployment model would let them rent computing resources over the internet without buying hardware?',
    choices: [
      'On-premises data centre',
      'Public cloud',
      'Private cloud',
      'Hybrid cloud with no public component',
    ],
    correctIndex: 1,
    explanation:
      'A public cloud provides computing resources over the internet, owned and operated by a third-party provider. The startup does not need to buy or maintain any hardware — they rent what they need from the provider and pay only for what they use.',
    keyTerm: 'Public Cloud',
  },
  {
    id: 'q-cc-02',
    topic: 'cloud-concepts',
    question:
      'Which of the following best describes the difference between Capital Expenditure (CapEx) and Operational Expenditure (OpEx)?',
    choices: [
      'CapEx is paying for services as you use them; OpEx is buying hardware upfront',
      'CapEx is buying physical assets upfront; OpEx is paying for services as you use them',
      'CapEx and OpEx are identical terms for the same thing',
      'CapEx is only used in the cloud; OpEx is only used on-premises',
    ],
    correctIndex: 1,
    explanation:
      'CapEx means spending money upfront on physical assets like servers and networking equipment (the on-premises model). OpEx means paying for services as you consume them with no upfront cost (the cloud model). Cloud computing shifts spending from CapEx to OpEx.',
    keyTerm: 'CapEx vs OpEx',
  },
  {
    id: 'q-cc-03',
    topic: 'cloud-concepts',
    question:
      'A company uses a public cloud for its customer-facing website and a private cloud for its internal HR database, with data moving between them. Which cloud model are they using?',
    choices: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Multi-cloud'],
    correctIndex: 2,
    explanation:
      'A hybrid cloud combines public and private clouds, allowing data and applications to move between them. The company uses the public cloud for the website and the private cloud for sensitive HR data, connected together — this is the definition of a hybrid cloud.',
    keyTerm: 'Hybrid Cloud',
  },
  {
    id: 'q-cc-04',
    topic: 'cloud-concepts',
    question:
      'Which cloud service model provides a ready-to-use software application that is fully managed by the provider, where the customer only uses the application?',
    choices: ['IaaS', 'PaaS', 'SaaS', 'DaaS'],
    correctIndex: 2,
    explanation:
      'SaaS (Software as a Service) is a model where the provider manages everything — infrastructure, platform, and the software application itself. The customer simply uses the application over the internet. Examples include Microsoft 365 and Gmail.',
    keyTerm: 'SaaS',
  },
  {
    id: 'q-cc-05',
    topic: 'cloud-concepts',
    question:
      'Under the shared responsibility model, which responsibility ALWAYS belongs to the cloud provider, regardless of the service model (IaaS, PaaS, or SaaS)?',
    choices: [
      'Managing user passwords',
      'Securing data in the application',
      'Physical security of the data centre',
      'Configuring firewall rules',
    ],
    correctIndex: 2,
    explanation:
      'The cloud provider is always responsible for the physical security of the data centre, including the building, power, cooling, and hardware. The customer is always responsible for their data and access management. The responsibilities in between depend on the service model.',
    keyTerm: 'Shared Responsibility Model',
  },
  {
    id: 'q-cc-06',
    topic: 'cloud-concepts',
    question:
      'What does the term "elasticity" mean in cloud computing?',
    choices: [
      'The ability to access cloud services from any device',
      'The ability to automatically add or remove resources based on current demand',
      'The ability to store unlimited data at no cost',
      'The ability to run multiple operating systems on the same server',
    ],
    correctIndex: 1,
    explanation:
      'Elasticity is the ability of the cloud to automatically add resources when demand increases (scale out) and remove resources when demand decreases (scale in). For example, an e-commerce site can automatically add more servers during a sale and remove them when the sale ends.',
    keyTerm: 'Elasticity',
  },
  {
    id: 'q-cc-07',
    topic: 'cloud-concepts',
    question:
      'A company wants to develop a custom web application without worrying about managing the operating system or server patches. Which cloud service model should they choose?',
    choices: ['IaaS', 'PaaS', 'SaaS', 'On-premises'],
    correctIndex: 1,
    explanation:
      'PaaS (Platform as a Service) provides a ready-to-use development platform including the operating system, databases, and development tools. The provider manages the infrastructure and the platform, so the company can focus only on developing their application. Azure App Service is an example.',
    keyTerm: 'PaaS',
  },
  {
    id: 'q-cc-08',
    topic: 'cloud-concepts',
    question:
      'Which of the following is a benefit of cloud computing compared to on-premises infrastructure?',
    choices: [
      'Requires a large upfront investment in hardware',
      'You must predict and buy capacity before you need it',
      'You can scale resources up or down quickly based on demand',
      'You are responsible for all hardware maintenance',
    ],
    correctIndex: 2,
    explanation:
      'One of the key benefits of cloud computing is scalability — you can increase or decrease resources quickly based on current demand. Unlike on-premises, where you must buy hardware in advance, the cloud lets you adjust in real time and pay only for what you use.',
    keyTerm: 'Scalability',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DOMAIN 2: DESCRIBE AZURE ARCHITECTURE AND SERVICES
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'q-aa-01',
    topic: 'azure-architecture',
    question:
      'What is an Azure region?',
    choices: [
      'A single data centre in a specific city',
      'A set of data centres deployed within a latency-defined perimeter and connected through a regional network',
      'A country where Azure is available',
      'A collection of all Azure data centres worldwide',
    ],
    correctIndex: 1,
    explanation:
      'An Azure region is a set of one or more data centres deployed within a specific geographic area, connected through a low-latency regional network. Regions give you control over where your data is stored and how close it is to your users.',
    keyTerm: 'Region',
  },
  {
    id: 'q-aa-02',
    topic: 'azure-architecture',
    question:
      'What distinguishes an availability zone from a region?',
    choices: [
      'An availability zone is a larger area that contains multiple regions',
      'An availability zone is a physically separate location within a region with its own power, cooling, and networking',
      'An availability zone is the same as a region but with a different name',
      'An availability zone refers to a region in a different country',
    ],
    correctIndex: 1,
    explanation:
      'An availability zone is a physically separate location within a single region. Each zone has independent power, cooling, and networking. If one zone experiences a failure, services in the other zones within the same region continue to operate.',
    keyTerm: 'Availability Zone',
  },
  {
    id: 'q-aa-03',
    topic: 'azure-architecture',
    question:
      'A company wants to run a legacy application that requires a specific operating system and full administrative control. Which Azure service should they use?',
    choices: [
      'Azure Container Instances',
      'Azure Virtual Machines',
      'Azure App Service (PaaS)',
      'Azure Blob Storage',
    ],
    correctIndex: 1,
    explanation:
      'Azure Virtual Machines (IaaS) gives you full control over the operating system and applications. You can install any OS, configure it however you need, and run legacy applications. Containers and PaaS services abstract the OS layer, which may not support all legacy applications.',
    keyTerm: 'Virtual Machine',
  },
  {
    id: 'q-aa-04',
    topic: 'azure-architecture',
    question:
      'Which Azure storage service is designed for storing unstructured data such as images, videos, and documents?',
    choices: [
      'Azure Table Storage',
      'Azure Queue Storage',
      'Azure Blob Storage',
      'Azure Disk Storage',
    ],
    correctIndex: 2,
    explanation:
      'Azure Blob Storage (Binary Large Object) is designed for storing unstructured data like images, videos, documents, and backups. It supports different access tiers (Hot, Cool, Archive) to help you balance cost and access frequency.',
    keyTerm: 'Blob Storage',
  },
  {
    id: 'q-aa-05',
    topic: 'azure-architecture',
    question:
      'What is the primary purpose of a Virtual Network (VNet) in Azure?',
    choices: [
      'To provide faster internet access for users',
      'To create an isolated, private network in the cloud where Azure resources can communicate securely',
      'To automatically back up data to another region',
      'To monitor the performance of Azure applications',
    ],
    correctIndex: 1,
    explanation:
      'A Virtual Network (VNet) is the fundamental building block of Azure networking. It creates an isolated, private network in the cloud where your resources (VMs, databases) can communicate with each other securely, and you can control inbound and outbound traffic.',
    keyTerm: 'Virtual Network (VNet)',
  },
  {
    id: 'q-aa-06',
    topic: 'azure-architecture',
    question:
      'Which Azure service distributes incoming network traffic across multiple servers to prevent any single server from being overloaded?',
    choices: [
      'Azure Load Balancer',
      'Azure Key Vault',
      'Azure Policy',
      'Azure DNS',
    ],
    correctIndex: 0,
    explanation:
      'Azure Load Balancer distributes incoming network traffic across multiple servers. This ensures no single server is overwhelmed, improves application availability, and allows the system to handle more users by spreading the workload.',
    keyTerm: 'Load Balancer',
  },
  {
    id: 'q-aa-07',
    topic: 'azure-architecture',
    question:
      'What is the key advantage of using containers over virtual machines?',
    choices: [
      'Containers provide more control over the operating system',
      'Containers are always free',
      'Containers are lightweight and start faster because they share the host operating system',
      'Containers can only run on Azure and no other platform',
    ],
    correctIndex: 2,
    explanation:
      'Containers share the host operating system, so they do not need to boot a separate OS. This makes them lightweight, fast to start (seconds vs minutes), and more resource-efficient than VMs, which each run a full OS.',
    keyTerm: 'Container',
  },
  {
    id: 'q-aa-08',
    topic: 'azure-architecture',
    question:
      'What is the purpose of Azure region pairs?',
    choices: [
      'To connect two regions for automatic replication and disaster recovery',
      'To reduce the cost of running virtual machines',
      'To prevent users from accessing resources outside their country',
      'To combine all Azure services into one region',
    ],
    correctIndex: 0,
    explanation:
      'Azure pairs certain regions within the same geography (for example, East US and West US) for automatic data replication and disaster recovery. If one region experiences a major outage, its paired region can take over, providing business continuity.',
    keyTerm: 'Region Pair',
  },
  {
    id: 'q-aa-09',
    topic: 'azure-architecture',
    question:
      'Which Azure storage redundancy option replicates your data to a second Azure region to protect against a regional outage?',
    choices: [
      'Locally Redundant Storage (LRS)',
      'Zone-Redundant Storage (ZRS)',
      'Geo-Redundant Storage (GRS)',
      'Backup Redundant Storage (BRS)',
    ],
    correctIndex: 2,
    explanation:
      'Geo-Redundant Storage (GRS) replicates your data to a second paired region. LRS keeps copies within a single data centre, and ZRS keeps copies across multiple availability zones in the same region. Only GRS protects against a full regional outage.',
    keyTerm: 'Geo-Redundant Storage (GRS)',
  },
  {
    id: 'q-aa-10',
    topic: 'azure-architecture',
    question:
      'What does a Content Delivery Network (CDN) do?',
    choices: [
      'Encrypts data stored in Azure storage accounts',
      'Caches content closer to users worldwide to reduce load times',
      'Blocks malicious traffic from reaching your application',
      'Automatically scales virtual machines based on demand',
    ],
    correctIndex: 1,
    explanation:
      'A Content Delivery Network (CDN) is a globally distributed network of servers that caches your content (images, videos, web pages) close to end users. When a user requests content, it is served from the nearest CDN server, reducing latency and improving load times.',
    keyTerm: 'Content Delivery Network (CDN)',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DOMAIN 3: DESCRIBE AZURE MANAGEMENT AND GOVERNANCE
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'q-am-01',
    topic: 'azure-management',
    question:
      'What is the purpose of Azure Role-Based Access Control (RBAC)?',
    choices: [
      'To enforce compliance rules on resource configurations',
      'To manage access to Azure resources by assigning users to roles with specific permissions',
      'To monitor the performance of Azure virtual machines',
      'To automatically scale resources based on demand',
    ],
    correctIndex: 1,
    explanation:
      'RBAC manages WHO can access Azure resources and WHAT they can do. You assign users to roles (like Owner, Contributor, Reader) that have predefined permissions. This helps follow the principle of least privilege — users get only the access they need.',
    keyTerm: 'RBAC',
  },
  {
    id: 'q-am-02',
    topic: 'azure-management',
    question:
      'Which Azure service allows you to securely store and manage secrets such as passwords, encryption keys, and certificates?',
    choices: [
      'Azure Key Vault',
      'Azure Policy',
      'Azure Monitor',
      'Azure Storage',
    ],
    correctIndex: 0,
    explanation:
      'Azure Key Vault is a secure cloud service for storing and managing secrets like passwords, encryption keys, and certificates. Applications retrieve secrets from Key Vault at runtime, so secrets are never hard-coded in application code.',
    keyTerm: 'Azure Key Vault',
  },
  {
    id: 'q-am-03',
    topic: 'azure-management',
    question:
      'A cloud administrator accidentally deleted a critical production database. Which Azure feature could have prevented this?',
    choices: [
      'Azure Policy',
      'Azure Monitor',
      'A resource lock (CanNotDelete)',
      'Azure DNS',
    ],
    correctIndex: 2,
    explanation:
      'A CanNotDelete resource lock prevents any resource from being deleted, even by an administrator. It would have stopped the accidental deletion. Resource locks add a layer of protection against unintentional changes to critical resources.',
    keyTerm: 'Resource Lock',
  },
  {
    id: 'q-am-04',
    topic: 'azure-management',
    question:
      'What is the main purpose of Azure Policy?',
    choices: [
      'To assign user permissions to resources',
      'To enforce organisational rules and compliance standards on Azure resources',
      'To encrypt data at rest in Azure storage',
      'To monitor network traffic for security threats',
    ],
    correctIndex: 1,
    explanation:
      'Azure Policy enforces organisational standards and compliance rules. For example, you can create a policy requiring all storage accounts to use encryption, or restricting resources to certain regions. Non-compliant resources are flagged or blocked.',
    keyTerm: 'Azure Policy',
  },
  {
    id: 'q-am-05',
    topic: 'azure-management',
    question:
      'Which Azure tool would you use to estimate the monthly cost of Azure services before deploying them?',
    choices: [
      'Azure Cost Management',
      'Azure Pricing Calculator',
      'Azure Monitor',
      'Azure Advisor',
    ],
    correctIndex: 1,
    explanation:
      'The Azure Pricing Calculator lets you add services, configure them, and see an estimated monthly cost before you deploy anything. It helps you plan your cloud budget by understanding costs in advance.',
    keyTerm: 'Pricing Calculator',
  },
  {
    id: 'q-am-06',
    topic: 'azure-management',
    question:
      'What is the benefit of Multi-Factor Authentication (MFA)?',
    choices: [
      'It speeds up the login process by removing passwords',
      'It requires two or more forms of verification, making it much harder for attackers to gain unauthorised access',
      'It allows unlimited login attempts without lockout',
      'It stores all passwords in a single shared database',
    ],
    correctIndex: 1,
    explanation:
      'MFA requires users to provide two or more forms of verification (such as a password and a code sent to their phone). Even if an attacker steals a password, they would still need the second factor, making unauthorised access much more difficult.',
    keyTerm: 'Multi-Factor Authentication (MFA)',
  },
  {
    id: 'q-am-07',
    topic: 'azure-management',
    question:
      'Which pricing option offers the largest discount but requires a commitment of 1 or 3 years?',
    choices: [
      'Pay-As-You-Go',
      'Spot pricing',
      'Reserved Instances',
      'Free tier',
    ],
    correctIndex: 2,
    explanation:
      'Reserved Instances let you commit to using a resource for 1 or 3 years in exchange for a significant discount (up to 72% compared to pay-as-you-go). They are best for workloads with predictable, steady usage.',
    keyTerm: 'Reserved Instances',
  },
  {
    id: 'q-am-08',
    topic: 'azure-management',
    question:
      'What is the principle of least privilege?',
    choices: [
      'Giving all users the same level of access to simplify management',
      'Giving users only the minimum access they need to perform their job',
      'Granting access only to users with the longest tenure',
      'Using a single password for all accounts to reduce complexity',
    ],
    correctIndex: 1,
    explanation:
      'The principle of least privilege means giving users only the minimum access required to do their job — no more. This reduces the risk of accidental damage or security breaches. In Azure, it is implemented through RBAC roles like Reader and Contributor.',
    keyTerm: 'Principle of Least Privilege',
  },
  {
    id: 'q-am-09',
    topic: 'azure-management',
    question:
      'What is the difference between Azure Policy and RBAC?',
    choices: [
      'Azure Policy controls who can access resources; RBAC controls what configurations are allowed',
      'Azure Policy enforces rules on resource configurations; RBAC controls who can access resources',
      'They are two names for the same service',
      'Azure Policy is for billing; RBAC is for networking',
    ],
    correctIndex: 1,
    explanation:
      'RBAC controls WHO can do things — which users can create, read, modify, or delete resources. Azure Policy controls WHAT can be done — it enforces compliance rules on resources regardless of who created them. Even a user with Owner RBAC permissions can be blocked by Azure Policy from creating a non-compliant resource.',
    keyTerm: 'Azure Policy vs RBAC',
  },
  {
    id: 'q-am-10',
    topic: 'azure-management',
    question:
      'Which Azure service provides a unified view of your cloud spending, lets you set budgets, and sends alerts when spending approaches limits?',
    choices: [
      'Azure Pricing Calculator',
      'Azure Cost Management',
      'Azure Advisor',
      'Azure Monitor',
    ],
    correctIndex: 1,
    explanation:
      'Azure Cost Management provides a comprehensive view of your cloud spending. You can analyse costs by service, resource, or time period, set budgets, and receive alerts when spending is approaching or exceeding your defined limits.',
    keyTerm: 'Azure Cost Management',
  },
  {
    id: 'q-am-11',
    topic: 'azure-management',
    question:
      'Which of the following is an example of the authentication step in Azure identity management?',
    choices: [
      'Checking whether a user has the Contributor role on a resource group',
      'Verifying a user\'s identity with a username, password, and MFA code',
      'Determining which regions a user is allowed to deploy resources in',
      'Auditing whether a storage account has encryption enabled',
    ],
    correctIndex: 1,
    explanation:
      'Authentication is the process of verifying WHO you are. Entering a username and password, plus an MFA code, confirms your identity. The other options describe authorization (checking permissions) or policy enforcement, which happen after authentication.',
    keyTerm: 'Authentication',
  },
  {
    id: 'q-am-12',
    topic: 'azure-management',
    question:
      'Which Azure service helps you compare the total cost of running workloads on Azure versus keeping them on-premises?',
    choices: [
      'Azure Pricing Calculator',
      'Total Cost of Ownership (TCO) Calculator',
      'Azure Cost Management',
      'Azure Advisor',
    ],
    correctIndex: 1,
    explanation:
      'The TCO (Total Cost of Ownership) Calculator helps you compare the full cost of running workloads on Azure versus on-premises. It considers hardware, electricity, IT staff, and maintenance costs to show potential savings from moving to the cloud.',
    keyTerm: 'TCO Calculator',
  },
];
