import type { KnowledgeEntry, QuizQuestion } from '../types';

// Helper to generate inline questions with consistent IDs
function q(
  id: string,
  topic: QuizQuestion['topic'],
  question: string,
  choices: string[],
  correctIndex: number,
  explanation: string,
  keyTerm?: string,
): QuizQuestion {
  return { id, topic, question, choices, correctIndex, explanation, keyTerm };
}

export const knowledgeBase: KnowledgeEntry[] = [
  // ────────────────────────── CLOUD COMPUTING ──────────────────────────
  {
    topic: 'Cloud Computing',
    keywords: [
      'cloud computing', 'what is cloud', 'cloud', 'cloud computing basics',
      'define cloud computing', 'what is the cloud',
    ],
    explain:
      'Cloud computing means renting computing services — like servers, storage, databases, and software — from a provider over the internet, instead of buying and maintaining your own physical hardware. You pay only for what you use, similar to how you pay for electricity or water. The provider (like Microsoft Azure, Amazon Web Services, or Google Cloud) owns and operates the data centres, and you access the services you need through the internet.',
    example:
      'Imagine you run a small online shop. Instead of buying an expensive server computer, keeping it in an air-conditioned room, and hiring someone to maintain it, you can rent server space from a cloud provider. When your shop gets busy during a holiday sale, you can temporarily rent more server power, and when things quiet down, you scale back and pay less.',
    africanExample:
      'Think of cloud computing like renting a matatu (minibus) for a group trip instead of buying your own bus. A matatu owner maintains the vehicle, pays for fuel, and handles repairs. You just pay for the seats you need for the journey. When you have more passengers, you rent a bigger vehicle; when you have fewer, you rent a smaller one. You never worry about parking, servicing, or insurance — the owner handles all that. In the same way, a cloud provider handles the hardware while you just use what you need.',
    keyTerms: [
      {
        term: 'Cloud Provider',
        definition:
          'A company that owns and runs data centres full of servers and rents out computing services over the internet. Examples include Microsoft Azure, Amazon Web Services (AWS), and Google Cloud Platform (GCP).',
      },
      {
        term: 'Data Centre',
        definition:
          'A secure facility filled with servers and networking equipment. Cloud providers run many data centres around the world so services are always available and close to users.',
      },
      {
        term: 'Pay-As-You-Go',
        definition:
          'A pricing model where you pay only for the computing resources you actually use, typically billed by the second, minute, or hour.',
      },
    ],
    compareConcepts: {
      conceptA: 'Cloud Computing',
      conceptB: 'On-Premises (Traditional IT)',
      comparison:
        'On-premises means you buy, own, and maintain your own servers in your own building. You pay upfront costs (capital expenditure), handle repairs, and must plan for peak demand even when you are not using the full capacity. Cloud computing means you rent from a provider, pay only for what you use (operational expenditure), and the provider handles hardware maintenance. Cloud gives you flexibility to scale up or down quickly, while on-premises gives you full physical control but requires significant upfront investment and technical staff.',
    },
    inlineQuestion: q(
      'kb-cloud-basic',
      'cloud-concepts',
      'What is the main benefit of the pay-as-you-go pricing model in cloud computing?',
      [
        'You pay a fixed monthly fee regardless of usage',
        'You pay only for the computing resources you actually use',
        'You get all cloud services for free',
        'You must pay for a full year of service in advance',
      ],
      1,
      'Pay-as-you-go means you are billed only for the resources you consume, typically by the second or hour. This is different from traditional IT where you buy hardware upfront. It allows you to match costs to actual demand and scale up or down as needed.',
      'Pay-As-You-Go',
    ),
  },

  // ────────────────────────── CLOUD MODELS ──────────────────────────
  {
    topic: 'Cloud Models (Public, Private, Hybrid)',
    keywords: [
      'public cloud', 'private cloud', 'hybrid cloud', 'cloud models',
      'types of cloud', 'public vs private', 'public private hybrid',
      'cloud deployment models', 'deployment models',
    ],
    explain:
      'There are three main ways to deploy cloud services:\n\n1. Public Cloud: The entire infrastructure is owned and operated by a cloud provider (like Azure) and shared by many customers over the internet. You do not manage the hardware.\n\n2. Private Cloud: Computing resources are used exclusively by one organisation. It can be hosted in the organisation\'s own data centre or by a third party, but resources are not shared with other customers.\n\n3. Hybrid Cloud: A combination of public and private clouds that work together. Data and applications move between them, giving you the flexibility to keep sensitive data private while using the public cloud for scalable workloads.',
    example:
      'A public cloud is like a public library — many people share the same building and resources. A private cloud is like a company\'s private book collection — only employees can use it. A hybrid approach is like a company that has its own library for sensitive internal documents but also borrows books from the public library for general research.',
    africanExample:
      'Think of public cloud as a shared taxi that anyone can hail — affordable, available to everyone, and you pay per ride. Private cloud is like a company\'s own shuttle bus — only employees ride it, giving more privacy and control. Hybrid cloud is like a company that uses its own shuttle bus for executives but also uses public taxis when they need extra capacity for a big event.',
    keyTerms: [
      {
        term: 'Public Cloud',
        definition:
          'Cloud services owned and operated by a provider and shared over the internet by many customers. Azure, AWS, and Google Cloud are all public cloud providers.',
      },
      {
        term: 'Private Cloud',
        definition:
          'Cloud resources used exclusively by a single organisation. It offers more control and privacy but requires more investment and maintenance.',
      },
      {
        term: 'Hybrid Cloud',
        definition:
          'An environment that combines public and private clouds, allowing data and applications to move between them as needed.',
      },
      {
        term: 'Multi-Cloud',
        definition:
          'Using services from more than one cloud provider (for example, Azure and AWS) to avoid vendor lock-in or take advantage of unique features from each provider.',
      },
    ],
    compareConcepts: {
      conceptA: 'Public Cloud',
      conceptB: 'Private Cloud',
      comparison:
        'Public cloud: shared infrastructure, low upfront cost, fast to set up, no hardware maintenance, but less control over the physical infrastructure. Private cloud: dedicated infrastructure, higher cost, requires technical staff, but gives full control over security and compliance. Hybrid cloud combines both so you can keep sensitive workloads private while using the public cloud for everything else.',
    },
    inlineQuestion: q(
      'kb-cloud-models',
      'cloud-concepts',
      'A company wants to keep customer data on its own dedicated servers for security reasons, but wants to use a public cloud provider for its website that gets traffic spikes. Which cloud model should they use?',
      [
        'Public cloud only',
        'Private cloud only',
        'Hybrid cloud',
        'No cloud — use on-premises only',
      ],
      2,
      'A hybrid cloud combines public and private clouds. The company can keep sensitive customer data on the private cloud while using the public cloud for the website, taking advantage of the public cloud\'s ability to scale during traffic spikes.',
      'Hybrid Cloud',
    ),
  },

  // ────────────────────────── IAAS / PAAS / SAAS ──────────────────────────
  {
    topic: 'IaaS, PaaS, and SaaS',
    keywords: [
      'iaas', 'paas', 'saas', 'infrastructure as a service', 'platform as a service',
      'software as a service', 'cloud service types', 'service models',
      'iaas paas saas', 'explain iaas paas saas', 'types of cloud services',
      'cloud service models',
    ],
    explain:
      'Cloud computing offers three main service types, each giving you a different level of control and responsibility:\n\n1. IaaS (Infrastructure as a Service): You rent the raw computing infrastructure — servers, storage, and networking. You install and manage the operating system, applications, and data. The provider manages the physical hardware.\n\n2. PaaS (Platform as a Service): You rent a ready-to-use platform that includes the operating system, databases, and development tools. You only manage your applications and data. The provider manages the infrastructure and the platform.\n\n3. SaaS (Software as a Service): You use a fully managed software application over the internet. The provider manages everything — infrastructure, platform, and software. You just use it.',
    example:
      'IaaS is like renting an empty plot of land — you build and furnish the house yourself. PaaS is like renting a furnished apartment — you just bring your personal belongings. SaaS is like staying at a hotel — everything is provided and maintained for you, you just check in and use it.',
    africanExample:
      'IaaS is like renting a stall at an open market — you bring your own goods, set up your display, and manage everything yourself. PaaS is like renting a shop that already has shelves, lights, and a counter — you just bring your products and start selling. SaaS is like using a ready-made delivery service like Glovo or Jumia Food — the entire platform is already running, you just use the app to order or sell.',
    keyTerms: [
      {
        term: 'IaaS (Infrastructure as a Service)',
        definition:
          'A cloud service model where the provider rents out computing infrastructure (servers, storage, networking) and you manage everything above the hardware — operating systems, applications, and data. Azure Virtual Machines are an example of IaaS.',
      },
      {
        term: 'PaaS (Platform as a Service)',
        definition:
          'A cloud service model where the provider manages the infrastructure and the platform (operating system, databases, development tools), and you manage only your applications and data. Azure App Service is an example of PaaS.',
      },
      {
        term: 'SaaS (Software as a Service)',
        definition:
          'A cloud service model where the provider manages the entire software application, and you simply use it over the internet. Microsoft 365 and Gmail are examples of SaaS.',
      },
      {
        term: 'Shared Responsibility Model',
        definition:
          'A principle that defines which parts of a system are managed by the cloud provider and which parts are managed by the customer. As you move from IaaS to PaaS to SaaS, the provider takes on more responsibility and the customer manages less.',
      },
    ],
    compareConcepts: {
      conceptA: 'IaaS',
      conceptB: 'PaaS and SaaS',
      comparison:
        'IaaS gives you the most control but the most responsibility — you manage operating systems, patches, and applications. PaaS reduces your burden by managing the operating system and development tools, so you focus only on your application code. SaaS removes almost all responsibility — the provider manages everything and you just use the software. Choose IaaS when you need full control, PaaS when you want to focus on development, and SaaS when you just need to use a ready-made application.',
    },
    inlineQuestion: q(
      'kb-iaas-paas-saas',
      'cloud-concepts',
      'Which cloud service model gives you the MOST control over the operating system and applications, but also the MOST responsibility for managing them?',
      [
        'SaaS (Software as a Service)',
        'PaaS (Platform as a Service)',
        'IaaS (Infrastructure as a Service)',
        'All three give the same level of control',
      ],
      2,
      'IaaS provides raw computing infrastructure (servers, storage, networking) and you are responsible for managing the operating system, applications, and data. This gives you maximum control but also maximum responsibility. SaaS gives you the least control, and PaaS is in the middle.',
      'IaaS',
    ),
  },

  // ────────────────────────── REGIONS & AVAILABILITY ZONES ──────────────────────────
  {
    topic: 'Azure Regions and Availability Zones',
    keywords: [
      'region', 'regions', 'availability zone', 'availability zones',
      'region vs availability zone', 'region and availability zone',
      'azure regions', 'what is a region', 'what is an availability zone',
      'difference between region and availability zone', 'region vs zone',
    ],
    explain:
      'A region is a geographical area in the world where Azure has one or more data centres. For example, there are Azure regions in West Europe, East US, and South Africa North. Each region has its own power, cooling, and networking infrastructure. When you create resources in a specific region, your data and applications live in the data centres in that area.\n\nAn availability zone is a separate physical location within a region. Each zone has its own independent power, cooling, and networking. A region typically has at least three availability zones. If one zone has a power failure or other problem, the other zones in the same region keep running. This protects your applications from local failures.',
    example:
      'A region is like a city that has multiple fire stations. Each fire station (availability zone) is in a different part of the city, has its own water supply, and operates independently. If one fire station has a water pipe burst, the other fire stations in the city still work. Your buildings (applications) are protected because you can rely on whichever fire station is still operational.',
    africanExample:
      'Think of a region as Nairobi — a city where Azure has set up data centres. Within that region, there are availability zones, which are like different neighbourhoods in Nairobi, each with its own power substation and water supply. If a power outage affects one neighbourhood (zone), the other neighbourhoods in Nairobi (region) keep running. This way, if you run an app for customers across East Africa, hosting it in the South Africa North region means it is physically close to your users, and spreading it across availability zones ensures it stays online even if one data centre has a problem.',
    keyTerms: [
      {
        term: 'Region',
        definition:
          'A geographical area in the world containing one or more Azure data centres. Regions give you control over where your data is stored and how close it is to your users. There are over 60 Azure regions worldwide.',
      },
      {
        term: 'Availability Zone',
        definition:
          'A physically separate location within a region, with its own power, cooling, and networking. Zones protect against local failures. Not all regions support availability zones.',
      },
      {
        term: 'Region Pair',
        definition:
          'Azure pairs certain regions within the same geography (for example, East US and West US) for automatic data replication and disaster recovery. If one region has a major outage, its pair can take over.',
      },
      {
        term: 'Geography',
        definition:
          'A discrete market of Azure regions that preserves data residency and compliance boundaries. Examples include Africa, Europe, and Asia Pacific.',
      },
    ],
    compareConcepts: {
      conceptA: 'Region',
      conceptB: 'Availability Zone',
      comparison:
        'A region is a large geographical area (like a city) containing one or more data centres. An availability zone is a specific physical data centre within a region that has independent power, cooling, and networking. Key difference: a region gives you geographic choice (where in the world your data lives), while availability zones give you physical redundancy (protecting against local failures within that region). A region may contain multiple availability zones, but an availability zone always belongs to exactly one region.',
    },
    inlineQuestion: q(
      'kb-region-zone',
      'azure-architecture',
      'What is the main purpose of an availability zone in Azure?',
      [
        'To provide cheaper pricing for cloud services',
        'To physically separate data centres within a region for fault tolerance',
        'To determine which countries can access your application',
        'To store backup data in a different country',
      ],
      1,
      'An availability zone is a physically separate location within a region with its own power, cooling, and networking. Its main purpose is to protect applications and data from local failures (like a power outage or fire in one data centre) by providing redundancy within the same region.',
      'Availability Zone',
    ),
  },

  // ────────────────────────── VIRTUAL MACHINES & CONTAINERS ──────────────────────────
  {
    topic: 'Azure Virtual Machines and Containers',
    keywords: [
      'virtual machine', 'virtual machines', 'vm', 'vms', 'containers',
      'container', 'vm vs container', 'azure virtual machines',
      'what is a vm', 'what is a container', 'virtual machines and containers',
      'azure vm', 'docker', 'azure container instances',
    ],
    explain:
      'A Virtual Machine (VM) is a software-based computer that runs inside a physical server. With Azure Virtual Machines, you rent a VM in the cloud and install your own operating system and applications. You have full control over the VM, just like a physical computer, but you do not need to buy or maintain the hardware. VMs are an example of IaaS.\n\nA container is a lightweight, standalone package that contains an application and everything it needs to run (code, libraries, and settings), but it shares the host operating system instead of running its own. Containers start up much faster than VMs and use fewer resources because they do not need a full operating system. Azure Container Instances and Azure Kubernetes Service (AKS) are Azure\'s container services.',
    example:
      'A virtual machine is like renting a fully independent apartment in a building — it has its own kitchen, bathroom, and entrance. You can paint the walls, change the furniture, and live however you want. A container is like renting a hotel room — it shares the building\'s water and electricity, comes furnished and ready to use, and you can quickly move to a different room if needed. Containers are lighter and faster to set up, while VMs give you more control.',
    africanExample:
      'A VM is like building a self-contained house on rented land — you design the layout, bring your own furniture, and manage everything. A container is like a shipping container shop in a busy market like Balogun Market in Lagos — the shop comes pre-built, you just stock it with goods and start selling. If you want to move to a different part of the market, you pick up the container and place it somewhere else. Multiple containers can sit side by side, sharing the same land (host operating system), while each VM needs its own separate plot.',
    keyTerms: [
      {
        term: 'Virtual Machine (VM)',
        definition:
          'A software-based computer running on a physical server. You manage the operating system and applications; the cloud provider manages the physical hardware. Azure Virtual Machines is an IaaS service.',
      },
      {
        term: 'Container',
        definition:
          'A lightweight, portable package that includes an application and its dependencies. Containers share the host operating system, making them faster and more efficient than VMs. Docker is the most popular container technology.',
      },
      {
        term: 'Azure Kubernetes Service (AKS)',
        definition:
          'A managed service for running and orchestrating containers at scale. Kubernetes automatically handles deploying, scaling, and managing containers across multiple hosts.',
      },
      {
        term: 'Image',
        definition:
          'A template used to create VMs or containers. An image includes the operating system and sometimes pre-installed software. You can use pre-built images from Azure Marketplace or create your own.',
      },
    ],
    compareConcepts: {
      conceptA: 'Virtual Machine',
      conceptB: 'Container',
      comparison:
        'VM: includes a full operating system, gives you complete control, takes minutes to start, uses more resources (CPU, memory, storage), and is ideal when you need full OS control or are running different operating systems. Container: shares the host OS, starts in seconds, uses fewer resources, is easily portable across environments, and is ideal for microservices and modern applications. Many organisations use both — VMs for the host OS and containers for the applications running on top.',
    },
    inlineQuestion: q(
      'kb-vm-container',
      'azure-architecture',
      'Why are containers generally faster to start and more resource-efficient than virtual machines?',
      [
        'Containers use special hardware that VMs cannot access',
        'Containers share the host operating system instead of running a full separate OS',
        'Containers do not need any operating system at all',
        'Containers are always smaller than 1 MB in size',
      ],
      1,
      'Unlike VMs, which each run a full separate operating system, containers share the host operating system. This means they do not need to boot an entire OS, making them start in seconds rather than minutes, and they use fewer CPU and memory resources.',
      'Container',
    ),
  },

  // ────────────────────────── AZURE STORAGE ──────────────────────────
  {
    topic: 'Azure Storage Services',
    keywords: [
      'storage', 'azure storage', 'blob storage', 'blob',
      'file storage', 'file share', 'disk storage', 'azure disks',
      'table storage', 'queue storage', 'storage account',
      'data storage', 'object storage', 'cosmos db', 'azure storage services',
      'types of storage', 'redundancy', 'lrs', 'grs', 'ra-grs',
    ],
    explain:
      'Azure provides several types of storage to suit different needs:\n\n1. Blob Storage: Stores unstructured data like images, videos, documents, and backups. "Blob" stands for Binary Large Object. It is the most common type of Azure storage.\n\n2. File Storage: Provides fully managed file shares in the cloud that you can access from anywhere using standard protocols (like SMB). It is like having a shared network drive in the cloud.\n\n3. Disk Storage: Provides virtual hard disks for Azure Virtual Machines. When you create a VM, it needs a disk to store the operating system and data, just like a physical computer.\n\n4. Table Storage: Stores structured, non-relational data (NoSQL) — like configuration data, device telemetry, or user preferences.\n\n5. Queue Storage: Stores large numbers of messages that can be accessed from anywhere, used for asynchronous communication between different parts of an application.\n\nAll of these are accessed through an Azure Storage Account, which is a container that uniquely identifies your storage in Azure.',
    example:
      'Think of Azure Storage as a self-storage warehouse with different types of rooms: Blob storage is the general-purpose room for boxes of any size (images, videos, documents). File storage is like a shared filing cabinet that multiple people can access at the same time. Disk storage is like the hard drive inside a computer. Table storage is like a spreadsheet that stores simple key-value data. Queue storage is like a message board where tasks are posted and picked up by workers.',
    africanExample:
      'Blob storage is like the large storage unit at a logistics hub in Mombasa port — you store containers of goods (files) of any type and size, and retrieve them when needed. File storage is like a shared storeroom at a school where multiple teachers can access the same supplies simultaneously. If you run a mobile money platform like M-Pesa, you might use Table storage to store user preferences and Queue storage to manage the flow of transaction messages between different parts of the system.',
    keyTerms: [
      {
        term: 'Storage Account',
        definition:
          'The top-level container in Azure that provides a unique namespace for your storage services. All access to Azure Storage goes through a storage account.',
      },
      {
        term: 'Blob Storage',
        definition:
          'Azure\'s object storage service for unstructured data (images, videos, documents, backups). Blobs can be stored in three tiers: Hot (frequent access), Cool (infrequent access), and Archive (rare access).',
      },
      {
        term: 'Locally Redundant Storage (LRS)',
        definition:
          'A redundancy option that keeps three copies of your data within a single data centre. It protects against drive failures but not against a whole data centre outage.',
      },
      {
        term: 'Geo-Redundant Storage (GRS)',
        definition:
          'A redundancy option that replicates your data to a second region (the paired region). It protects against a whole region outage, providing higher durability than LRS.',
      },
    ],
    compareConcepts: {
      conceptA: 'Blob Storage',
      conceptB: 'Disk Storage',
      comparison:
        'Blob storage is for unstructured files (images, videos, documents) that you access over the internet — it is independent of any VM. Disk storage is specifically designed as virtual hard drives attached to Azure VMs — it provides the operating system disk and data disks for VMs. Use Blob storage for files you want to store and retrieve; use Disk storage when a VM needs a hard drive to run.',
    },
    inlineQuestion: q(
      'kb-storage',
      'azure-architecture',
      'Which Azure storage service is best for storing large numbers of unstructured files like images, videos, and documents?',
      [
        'Queue Storage',
        'Blob Storage',
        'Table Storage',
        'Disk Storage',
      ],
      1,
      'Blob Storage (Binary Large Object) is designed for storing unstructured data such as images, videos, documents, and backups. It supports different access tiers (Hot, Cool, Archive) so you can optimise cost based on how frequently the data is accessed.',
      'Blob Storage',
    ),
  },

  // ────────────────────────── AZURE NETWORKING ──────────────────────────
  {
    topic: 'Azure Networking',
    keywords: [
      'networking', 'azure networking', 'vnet', 'virtual network',
      'subnet', 'load balancer', 'application gateway', 'cdn',
      'content delivery network', 'dns', 'azure dns',
      'network security group', 'nsg', 'expressroute',
      'azure network', 'virtual network peering',
    ],
    explain:
      'Azure networking services let you connect your cloud resources to each other, to the internet, and to your on-premises network. Key networking services include:\n\n1. Virtual Network (VNet): The building block of Azure networking. It lets you create isolated networks in the cloud where your resources (VMs, databases) can communicate securely. You can divide a VNet into subnets for better organisation.\n\n2. Load Balancer: Distributes incoming traffic across multiple servers so no single server gets overwhelmed. This keeps applications responsive and available.\n\n3. Application Gateway: A specialised load balancer for web applications that can route traffic based on URL paths and handle SSL.\n\n4. Content Delivery Network (CDN): A distributed network of servers that caches your content closer to users, so they experience faster load times no matter where they are in the world.\n\n5. Azure DNS: Hosts your domain names and resolves them to IP addresses, just like a phone book for the internet.\n\n6. Network Security Group (NSG): A set of security rules that control what traffic can flow in and out of your Azure resources — like a firewall for your virtual network.',
    example:
      'A Virtual Network is like the internal road system of a company campus — only authorised vehicles can enter, and the roads connect different buildings (resources). A Load Balancer is like a traffic officer at a roundabout directing cars to different lanes so no single road gets jammed. A CDN is like having local distribution centres across the country — instead of shipping goods from one central warehouse, products are stored in regional centres closer to customers for faster delivery.',
    africanExample:
      'A VNet is like the internal road network of a university campus — students and staff can move between buildings, but the public cannot enter without going through the main gate (NSG rules). A Load Balancer is like a boda-boda (motorcycle taxi) dispatcher at a busy stage in Kampala — instead of all passengers crowding one rider, the dispatcher distributes passengers across multiple riders so everyone gets served faster. An Azure CDN is like a supermarket chain (such as Shoprite or Carrefour) that has branches in multiple cities — instead of everyone in the country travelling to one central warehouse, each city has a local branch with stock, making it faster for customers to get what they need.',
    keyTerms: [
      {
        term: 'Virtual Network (VNet)',
        definition:
          'The fundamental building block for Azure networking. It creates an isolated, private network in the cloud where your resources can communicate securely.',
      },
      {
        term: 'Subnet',
        definition:
          'A subdivision of a Virtual Network. Subnets help you organise resources and apply different security rules to different parts of your network.',
      },
      {
        term: 'Network Security Group (NSG)',
        definition:
          'A set of security rules that filter network traffic to and from Azure resources. It acts like a firewall, allowing or denying traffic based on rules you define.',
      },
      {
        term: 'Content Delivery Network (CDN)',
        definition:
          'A globally distributed network of servers that caches content close to end users, reducing latency and improving load times for websites and applications.',
      },
    ],
    compareConcepts: {
      conceptA: 'Load Balancer',
      conceptB: 'Application Gateway',
      comparison:
        'A Load Balancer distributes network-level traffic (TCP/UDP) across multiple servers — it operates at Layer 4 and does not look inside the traffic. An Application Gateway is a web traffic load balancer that operates at Layer 7 — it can route based on URL paths, handle SSL termination, and provides web application firewall features. Use a Load Balancer for general network traffic; use Application Gateway for web (HTTP/HTTPS) applications that need smarter routing.',
    },
    inlineQuestion: q(
      'kb-networking',
      'azure-architecture',
      'What is the primary purpose of a Network Security Group (NSG) in Azure?',
      [
        'To speed up network traffic between Azure regions',
        'To filter and control network traffic in and out of Azure resources',
        'To store network configuration files in the cloud',
        'To automatically assign IP addresses to virtual machines',
      ],
      1,
      'A Network Security Group (NSG) contains a list of security rules that allow or deny inbound and outbound network traffic to and from Azure resources. It acts like a firewall for your virtual network, helping you control which traffic is permitted.',
      'Network Security Group',
    ),
  },

  // ────────────────────────── IDENTITY & ACCESS MANAGEMENT ──────────────────────────
  {
    topic: 'Identity and Access Management',
    keywords: [
      'identity', 'access management', 'iam', 'azure ad',
      'entra id', 'microsoft entra', 'active directory',
      'rbac', 'role based access control', 'entra',
      'authentication', 'authorization', 'identity and access',
      'azure active directory', 'single sign on', 'mfa',
      'multi-factor authentication', 'conditional access',
    ],
    explain:
      'Identity and Access Management (IAM) is about making sure the right people have the right access to the right resources. In Azure, the main service for this is Microsoft Entra ID (formerly called Azure Active Directory or Azure AD).\n\nMicrosoft Entra ID is a cloud-based identity service. It manages users, groups, and applications. It provides features like:\n\n1. Single Sign-On (SSO): Users sign in once and can access many applications without signing in again.\n\n2. Multi-Factor Authentication (MFA): Requires users to provide two or more forms of verification (like a password plus a code sent to their phone), making it much harder for attackers to break in.\n\n3. Role-Based Access Control (RBAC): You assign users to roles (like "Owner", "Contributor", or "Reader"), and each role has a specific set of permissions. This follows the principle of least privilege — giving people only the access they need.\n\n4. Conditional Access: Policies that check conditions (like user location, device, or risk level) before granting access.',
    example:
      'Entra ID is like an ID card system for a large office building. Single sign-on is like using one ID badge to enter the building, access your floor, and use the cafeteria — you do not need separate keys for each door. MFA is like the security guard asking for both your ID badge and a fingerprint scan. RBAC is like assigning people different access levels — a visitor can only enter the lobby, an employee can access their floor, and a manager can access all floors.',
    africanExample:
      'Entra ID is like the national ID system in many African countries (like the Ghana Card or Nigeria\'s NIN). One ID lets you access government services, open a bank account, and register for exams — you do not need a separate ID for each service (this is single sign-on). MFA is like a bank requiring both your ATM card and your PIN to withdraw money — two factors make it harder for someone to steal your account. RBAC is like a hospital where a receptionist can see patient appointments, a nurse can see medical records, but only a doctor can prescribe medication — each role has access only to what they need.',
    keyTerms: [
      {
        term: 'Microsoft Entra ID',
        definition:
          'Azure\'s cloud-based identity and access management service (formerly Azure Active Directory). It manages users, groups, and application access, and provides authentication and single sign-on.',
      },
      {
        term: 'RBAC (Role-Based Access Control)',
        definition:
          'A system that assigns permissions through roles. Instead of giving individual permissions to each user, you assign users to roles (like Owner, Contributor, Reader) that already have the right set of permissions.',
      },
      {
        term: 'Multi-Factor Authentication (MFA)',
        definition:
          'A security process that requires two or more forms of verification (such as a password and a phone code) before granting access. It significantly reduces the risk of unauthorised access.',
      },
      {
        term: 'Principle of Least Privilege',
        definition:
          'A security best practice where users are given only the minimum access they need to do their job — no more. This reduces the risk of accidental or intentional damage.',
      },
    ],
    compareConcepts: {
      conceptA: 'Authentication',
      conceptB: 'Authorization',
      comparison:
        'Authentication is about proving WHO you are — verifying your identity (for example, entering your username and password). Authorization is about WHAT you are allowed to do — checking whether you have permission to access a specific resource or perform a specific action. Authentication happens first, then authorization. For example: logging into Azure with your email and password is authentication; being able to start a virtual machine because you have the "Contributor" role is authorization.',
    },
    inlineQuestion: q(
      'kb-iam',
      'azure-management',
      'What is the principle of least privilege in Azure access management?',
      [
        'Giving every user full access to all resources for convenience',
        'Giving users only the minimum access they need to perform their job',
        'Granting access only to users who have been with the company longest',
        'Using a single shared account for all users to simplify management',
      ],
      1,
      'The principle of least privilege means giving users only the minimum level of access required to do their tasks. This limits the potential damage from accidental actions or compromised accounts. In Azure, this is implemented through RBAC roles like Reader (view only) and Contributor (manage, but not assign roles).',
      'Principle of Least Privilege',
    ),
  },

  // ────────────────────────── SECURITY & GOVERNANCE ──────────────────────────
  {
    topic: 'Security and Governance',
    keywords: [
      'security', 'governance', 'azure policy', 'policy',
      'azure security', 'defender', 'microsoft defender',
      'key vault', 'azure key vault', 'blueprint',
      'resource lock', 'locks', 'service trust portal',
      'compliance', 'az monitor', 'azure monitor',
      'log analytics', 'security center', 'sentinel',
      'shared responsibility', 'shared responsibility model',
    ],
    explain:
      'Security and governance in Azure means protecting your cloud resources and making sure they follow your organisation\'s rules and compliance requirements. Key services include:\n\n1. Azure Policy: Lets you create rules that your cloud resources must follow. For example, you can create a policy that says "all storage accounts must use encryption" or "resources must be created only in allowed regions". Non-compliant resources are flagged or blocked.\n\n2. Azure Key Vault: A secure store for sensitive information like passwords, encryption keys, and certificates. Instead of hard-coding secrets in your application code, you store them in Key Vault and retrieve them securely at runtime.\n\n3. Resource Locks: Prevents resources from being accidentally deleted or modified. A "CanNotDelete" lock prevents deletion, and a "ReadOnly" lock prevents any changes.\n\n4. Microsoft Defender for Cloud: A security management tool that monitors your cloud resources, identifies vulnerabilities, and provides recommendations to improve security.\n\n5. Azure Monitor: Collects and analyses data from your Azure resources so you can track performance, detect issues, and set up alerts.\n\n6. The Shared Responsibility Model: In the cloud, security is shared between the provider and the customer. The provider secures the physical data centres, the network, and the underlying infrastructure. The customer is responsible for securing their data, managing access, and configuring applications correctly. The exact split depends on the service model (IaaS, PaaS, SaaS).',
    example:
      'Azure Policy is like a building inspector who checks that every room meets fire safety standards — if a room does not have a fire extinguisher, the inspector blocks it from being used. Key Vault is like a bank safe deposit box for your most valuable documents — only authorised people with the right key can access them. Resource Locks are like putting a padlock on a door so nobody can accidentally remove important equipment. The shared responsibility model is like renting an apartment — the landlord is responsible for the building structure and plumbing, but you are responsible for locking your door and keeping your valuables safe.',
    africanExample:
      'Azure Policy is like the Standards Organisation of Nigeria (SON) inspecting imported goods at the port — products that do not meet standards are rejected. Key Vault is like the vault at the Central Bank of Kenya — sensitive items are stored securely and only authorised staff with proper credentials can access them. Resource Locks are like a traditional African community protecting a sacred forest — no one is allowed to cut trees or build there, preventing accidental destruction. The shared responsibility model is like renting a shop at a mall — the mall management handles the building, electricity, and security cameras (provider), but you are responsible for locking your shop door, managing your cash, and keeping your goods safe (customer).',
    keyTerms: [
      {
        term: 'Azure Policy',
        definition:
          'A service that enforces organisational standards and compliance rules across Azure resources. It can audit, flag, or block resources that do not meet your defined policies.',
      },
      {
        term: 'Azure Key Vault',
        definition:
          'A cloud service for securely storing and managing secrets such as passwords, encryption keys, and certificates. Applications retrieve secrets at runtime instead of storing them in code.',
      },
      {
        term: 'Resource Lock',
        definition:
          'A protection mechanism that prevents Azure resources from being accidentally deleted or modified. Two types: CanNotDelete (prevents deletion) and ReadOnly (prevents any changes).',
      },
      {
        term: 'Shared Responsibility Model',
        definition:
          'The division of security duties between the cloud provider and the customer. The provider always secures the physical infrastructure; the customer\'s responsibility depends on the service type (IaaS = most customer responsibility, SaaS = least).',
      },
    ],
    compareConcepts: {
      conceptA: 'Azure Policy',
      conceptB: 'RBAC (Role-Based Access Control)',
      comparison:
        'RBAC controls WHO can do things — it determines which users can create, read, modify, or delete resources based on their assigned roles. Azure Policy controls WHAT can be done — it enforces rules on resources regardless of who created them (for example, requiring encryption or restricting regions). Even if a user has "Owner" RBAC permissions, Azure Policy can still block them from creating a resource in an unapproved region. They work together: RBAC manages access; Policy enforces compliance.',
    },
    inlineQuestion: q(
      'kb-security-governance',
      'azure-management',
      'Under the shared responsibility model, which of the following is ALWAYS the responsibility of the cloud provider?',
      [
        'Securing data stored in databases',
        'Managing user passwords and access rights',
        'Physical security of the data centre',
        'Configuring firewall rules on virtual machines',
      ],
      2,
      'Under the shared responsibility model, the cloud provider is always responsible for physical security of the data centre, the hardware, the network infrastructure, and the host operating system. The customer is responsible for their data, access management, and application configuration. The exact split of responsibilities above the physical layer depends on the service model (IaaS, PaaS, SaaS).',
      'Shared Responsibility Model',
    ),
  },

  // ────────────────────────── PRICING & COST MANAGEMENT ──────────────────────────
  {
    topic: 'Azure Pricing and Cost Management',
    keywords: [
      'pricing', 'cost', 'cost management', 'azure pricing',
      'tco calculator', 'total cost of ownership', 'pricing calculator',
      'cost analysis', 'budgets', 'azure cost',
      'capex', 'opex', 'capital expenditure', 'operational expenditure',
      'cost optimization', 'spending', 'azure pricing and cost',
      'free tier', 'free account', 'pricing models',
    ],
    explain:
      'Azure provides tools to help you understand and manage your cloud spending:\n\n1. Pricing Calculator: An online tool that lets you estimate the cost of Azure services before you use them. You add the services you need, configure them, and see an estimated monthly cost.\n\n2. TCO (Total Cost of Ownership) Calculator: Helps you compare the total cost of running your workloads on Azure versus keeping them on-premises. It considers hardware, electricity, IT staff, and maintenance to show potential savings.\n\n3. Azure Cost Management: A built-in tool that shows you where your money is going. You can view cost breakdowns by service, resource, or time period, set budgets, and get alerts when spending approaches your budget.\n\n4. Budgets and Alerts: You can set spending budgets and receive alerts when costs are nearing or exceeding those limits.\n\nAzure offers several pricing models:\n- Pay-As-You-Go: Pay for what you use, billed per second/hour.\n- Reserved Instances: Commit to using a resource for 1 or 3 years and get a significant discount (up to 72%).\n- Spot Pricing: Use spare Azure capacity at a large discount, but Azure can reclaim the resource with short notice.\n\nA key concept is CapEx vs OpEx: Capital Expenditure (CapEx) is spending money upfront on physical hardware (on-premises). Operational Expenditure (OpEx) is paying for services as you use them (cloud). OpEx gives you flexibility — you can adjust spending based on current needs rather than committing large sums upfront.',
    example:
      'The Pricing Calculator is like getting a quote before buying furniture — you select the items you want, see the total price, and adjust your choices before committing. The TCO Calculator is like comparing the cost of buying a car (CapEx: purchase price, insurance, maintenance, fuel) versus using a ride-hailing service every day (OpEx: pay per ride) — it helps you see which is cheaper over time. Cost Management is like your monthly bank statement showing where your money went, with alerts when you are about to overspend.',
    africanExample:
      'Pay-As-You-Go is like paying for electricity with a prepaid meter — you buy what you need, and when your usage goes up (like running multiple air conditioners during harmattan), you pay more; when it goes down, you pay less. Reserved Instances are like signing a one-year lease for a shop in a market — the landlord gives you a discount for committing long-term, and you save compared to paying month-to-month. Spot pricing is like buying goods at a clearance sale — the prices are very low, but the stock might run out at any time. The TCO Calculator is like a farmer comparing the cost of buying their own tractor (CapEx) versus hiring one during harvest season (OpEx) — sometimes hiring is cheaper if you only need it for a few weeks a year.',
    keyTerms: [
      {
        term: 'CapEx (Capital Expenditure)',
        definition:
          'Spending money upfront on physical assets like servers, buildings, or equipment. This is the traditional on-premises model. The cost is incurred before you start using the asset.',
      },
      {
        term: 'OpEx (Operational Expenditure)',
        definition:
          'Spending money on services as you use them, with no upfront cost. This is the cloud model. You pay for what you consume, which gives you flexibility to scale spending up or down.',
      },
      {
        term: 'Reserved Instances',
        definition:
          'A pricing option where you commit to using a resource for 1 or 3 years in exchange for a significant discount (up to 72% compared to pay-as-you-go). Best for workloads with predictable, steady usage.',
      },
      {
        term: 'Azure Cost Management',
        definition:
          'A built-in Azure tool for monitoring, analysing, and controlling cloud spending. It provides cost breakdowns, budget alerts, and spending forecasts.',
      },
    ],
    compareConcepts: {
      conceptA: 'CapEx',
      conceptB: 'OpEx',
      comparison:
        'CapEx (Capital Expenditure) is spending money upfront on physical assets like servers and networking equipment. You own the asset, but you must pay for it before you use it, and you are responsible for maintenance, power, and space. OpEx (Operational Expenditure) is paying for services as you use them, with no upfront cost. Cloud computing uses OpEx — you rent resources and pay only for what you use, giving you flexibility to scale spending with demand. Traditional on-premises IT uses CapEx — you buy hardware upfront whether you use it fully or not.',
    },
    inlineQuestion: q(
      'kb-pricing',
      'azure-management',
      'What is the main difference between CapEx and OpEx in cloud computing?',
      [
        'CapEx is for small businesses; OpEx is for large enterprises',
        'CapEx is upfront spending on physical assets; OpEx is paying for services as you use them',
        'CapEx is always cheaper than OpEx in the long run',
        'OpEx can only be used for software, not infrastructure',
      ],
      1,
      'CapEx (Capital Expenditure) is spending money upfront on physical assets like servers — you buy them before you use them. OpEx (Operational Expenditure) is paying for services as you consume them — no upfront cost, just ongoing usage-based billing. Cloud computing shifts spending from CapEx to OpEx, giving organisations more financial flexibility.',
      'CapEx vs OpEx',
    ),
  },
];

// ────────────────────────── KNOWLEDGE BASE SEARCH ──────────────────────────

export function findKnowledgeEntry(query: string): KnowledgeEntry | null {
  const normalized = query.toLowerCase().trim();

  // Score each entry by keyword matches
  let bestEntry: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        const score = keyword.length; // longer keyword = more specific = higher score
        if (score > bestScore) {
          bestScore = score;
          bestEntry = entry;
        }
      }
    }
  }

  return bestEntry;
}

// ────────────────────────── SHARED RESPONSIBILITY ──────────────────────────
// This is a common standalone query — redirect to the security entry
export const sharedResponsibilityEntry = knowledgeBase.find((e) =>
  e.keywords.includes('shared responsibility'),
)!;
