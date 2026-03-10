import type { CloudProviderOption, Plan, Region, ServiceOption } from "./wizard-types";

export const SERVICES: ServiceOption[] = [
  {
    id: "pg",
    name: "PostgreSQL",
    category: "databases",
    description:
      "Fully managed PostgreSQL with high availability and automated backups.",
    availablePlans: ["free", "startup", "scaleup", "enterprise"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "databases",
    description:
      "Managed MySQL with automated failover and point-in-time recovery.",
    availablePlans: ["free", "startup", "scaleup", "enterprise"],
  },
  {
    id: "redis",
    name: "Redis",
    category: "databases",
    description: "In-memory data store for caching, queues, and real-time apps.",
    availablePlans: ["free", "startup", "scaleup", "enterprise"],
  },
  {
    id: "opensearch",
    name: "OpenSearch",
    category: "search",
    description:
      "Full-text search, log analytics, and observability at any scale.",
    availablePlans: ["startup", "scaleup", "enterprise"],
  },
  {
    id: "kafka",
    name: "Apache Kafka",
    category: "streaming",
    description:
      "Distributed event streaming for real-time data pipelines.",
    availablePlans: ["startup", "scaleup", "enterprise"],
  },
  {
    id: "clickhouse",
    name: "ClickHouse",
    category: "databases",
    description:
      "Columnar database for blazing-fast analytical queries.",
    availablePlans: ["startup", "scaleup", "enterprise"],
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "monitoring",
    description:
      "Dashboards and observability for metrics, logs, and traces.",
    availablePlans: ["free", "startup", "scaleup"],
  },
];

export const CLOUD_PROVIDERS: CloudProviderOption[] = [
  { id: "aws", name: "Amazon Web Services", shortName: "AWS", multiplier: 1.0 },
  { id: "gcp", name: "Google Cloud Platform", shortName: "GCP", multiplier: 1.05 },
  { id: "azure", name: "Microsoft Azure", shortName: "Azure", multiplier: 1.08 },
];

export const REGIONS: Region[] = [
  // AWS
  { id: "aws-eu-west-1", name: "Ireland", code: "eu-west-1", provider: "aws", continent: "Europe", flag: "\uD83C\uDDEE\uD83C\uDDEA" },
  { id: "aws-eu-central-1", name: "Frankfurt", code: "eu-central-1", provider: "aws", continent: "Europe", flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  { id: "aws-us-east-1", name: "Virginia", code: "us-east-1", provider: "aws", continent: "North America", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { id: "aws-us-west-2", name: "Oregon", code: "us-west-2", provider: "aws", continent: "North America", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { id: "aws-ap-southeast-1", name: "Singapore", code: "ap-southeast-1", provider: "aws", continent: "Asia Pacific", flag: "\uD83C\uDDF8\uD83C\uDDEC" },
  // GCP
  { id: "gcp-europe-west1", name: "Belgium", code: "europe-west1", provider: "gcp", continent: "Europe", flag: "\uD83C\uDDE7\uD83C\uDDEA" },
  { id: "gcp-europe-north1", name: "Finland", code: "europe-north1", provider: "gcp", continent: "Europe", flag: "\uD83C\uDDEB\uD83C\uDDEE" },
  { id: "gcp-us-central1", name: "Iowa", code: "us-central1", provider: "gcp", continent: "North America", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { id: "gcp-asia-east1", name: "Taiwan", code: "asia-east1", provider: "gcp", continent: "Asia Pacific", flag: "\uD83C\uDDF9\uD83C\uDDFC" },
  // Azure
  { id: "azure-westeurope", name: "Netherlands", code: "westeurope", provider: "azure", continent: "Europe", flag: "\uD83C\uDDF3\uD83C\uDDF1" },
  { id: "azure-northeurope", name: "Ireland", code: "northeurope", provider: "azure", continent: "Europe", flag: "\uD83C\uDDEE\uD83C\uDDEA" },
  { id: "azure-eastus", name: "Virginia", code: "eastus", provider: "azure", continent: "North America", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { id: "azure-southeastasia", name: "Singapore", code: "southeastasia", provider: "azure", continent: "Asia Pacific", flag: "\uD83C\uDDF8\uD83C\uDDEC" },
];

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    cpu: 1,
    memory: "1 GB",
    storage: "5 GB",
    backups: false,
    ha: false,
    basePrice: 0,
    features: ["Single node", "Community support", "Best-effort SLA"],
  },
  {
    id: "startup",
    name: "Startup",
    cpu: 2,
    memory: "4 GB",
    storage: "80 GB",
    backups: true,
    ha: false,
    basePrice: 29,
    features: [
      "Daily backups",
      "Email support",
      "Monitoring dashboard",
      "99.9% SLA",
    ],
  },
  {
    id: "scaleup",
    name: "Scaleup",
    cpu: 4,
    memory: "16 GB",
    storage: "350 GB",
    backups: true,
    ha: true,
    basePrice: 199,
    features: [
      "Continuous backups",
      "HA standby node",
      "Priority support",
      "VPC peering",
      "99.99% SLA",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    cpu: 8,
    memory: "64 GB",
    storage: "1000 GB",
    backups: true,
    ha: true,
    basePrice: 799,
    features: [
      "Everything in Business",
      "Dedicated hardware",
      "24/7 phone support",
      "Custom configuration",
      "99.999% SLA",
    ],
  },
];

export const EXTRA_DISK_PRICE_PER_GIB = 0.12;
