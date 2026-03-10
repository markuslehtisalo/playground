import {
  IconBolt,
  IconDatabase,
  IconSearch,
  IconBrandAws,
  IconBrandAzure,
  IconCloud,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

// ---------------------------------------------------------------------------
// Core types
// ---------------------------------------------------------------------------

export type ServiceId = "kafka" | "postgresql" | "opensearch";
export type CloudProvider =
  | "aws"
  | "gcp"
  | "azure"
  | "digitalocean"
  | "upcloud";
export type PlanTier = "free" | "startup" | "scaleup" | "enterprise";
export type BillingPeriod = "monthly" | "hourly";

export interface ResourceRange {
  min: number;
  max: number;
}

export interface PlanResources {
  vms: ResourceRange;
  cpu: ResourceRange;
  ram: ResourceRange;
  storage: ResourceRange;
}

export interface PlanDefinition {
  tier: PlanTier;
  label: string;
  tagline: string;
  baseMonthly: number;
  baseHourly: number;
  supportsSliders: boolean;
  supportsCloudSelection: boolean;
  resources: PlanResources;
}

export interface ServiceDefinition {
  id: ServiceId;
  label: string;
  fullLabel: string;
  icon: Icon;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: Icon;
  services: ServiceDefinition[];
}

export interface CloudProviderDefinition {
  id: CloudProvider;
  label: string;
  icon: Icon;
  regions: { id: string; label: string; flag: string }[];
}

export interface FeatureRow {
  label: string;
  tooltip?: string;
  values: Record<PlanTier, string | boolean>;
}

// ---------------------------------------------------------------------------
// Service categories & definitions
// ---------------------------------------------------------------------------

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "streaming",
    label: "Streaming",
    icon: IconBolt,
    services: [
      {
        id: "kafka",
        label: "Kafka",
        fullLabel: "Apache Kafka®",
        icon: IconBolt,
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: IconDatabase,
    services: [
      {
        id: "postgresql",
        label: "PostgreSQL",
        fullLabel: "PostgreSQL®",
        icon: IconDatabase,
      },
    ],
  },
  {
    id: "apps",
    label: "Apps",
    icon: IconSearch,
    services: [
      {
        id: "opensearch",
        label: "OpenSearch",
        fullLabel: "OpenSearch®",
        icon: IconSearch,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Plan definitions per service
// ---------------------------------------------------------------------------

const KAFKA_PLANS: PlanDefinition[] = [
  {
    tier: "free",
    label: "Free",
    tagline: "For experimentation",
    baseMonthly: 0,
    baseHourly: 0,
    supportsSliders: false,
    supportsCloudSelection: false,
    resources: {
      vms: { min: 0, max: 0 },
      cpu: { min: 0, max: 0 },
      ram: { min: 0, max: 0 },
      storage: { min: 0, max: 0 },
    },
  },
  {
    tier: "startup",
    label: "Startup",
    tagline: "For small workloads",
    baseMonthly: 200,
    baseHourly: 0.27,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 3, max: 3 },
      cpu: { min: 2, max: 2 },
      ram: { min: 2, max: 4 },
      storage: { min: 90, max: 90 },
    },
  },
  {
    tier: "scaleup",
    label: "Scaleup",
    tagline: "For production workloads",
    baseMonthly: 500,
    baseHourly: 0.69,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 3, max: 3 },
      cpu: { min: 2, max: 16 },
      ram: { min: 4, max: 32 },
      storage: { min: 600, max: 18432 },
    },
  },
  {
    tier: "enterprise",
    label: "Enterprise",
    tagline: "For mission-critical systems",
    baseMonthly: 1900,
    baseHourly: 2.6,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 6, max: 30 },
      cpu: { min: 4, max: 16 },
      ram: { min: 8, max: 32 },
      storage: { min: 2250, max: 184320 },
    },
  },
];

const POSTGRESQL_PLANS: PlanDefinition[] = [
  {
    tier: "free",
    label: "Free",
    tagline: "For experimentation",
    baseMonthly: 0,
    baseHourly: 0,
    supportsSliders: false,
    supportsCloudSelection: false,
    resources: {
      vms: { min: 0, max: 0 },
      cpu: { min: 0, max: 0 },
      ram: { min: 0, max: 0 },
      storage: { min: 0, max: 0 },
    },
  },
  {
    tier: "startup",
    label: "Startup",
    tagline: "For small workloads",
    baseMonthly: 19,
    baseHourly: 0.026,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 1, max: 1 },
      cpu: { min: 1, max: 2 },
      ram: { min: 1, max: 4 },
      storage: { min: 5, max: 80 },
    },
  },
  {
    tier: "scaleup",
    label: "Scaleup",
    tagline: "For production workloads",
    baseMonthly: 200,
    baseHourly: 0.27,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 2, max: 3 },
      cpu: { min: 2, max: 16 },
      ram: { min: 4, max: 64 },
      storage: { min: 80, max: 3072 },
    },
  },
  {
    tier: "enterprise",
    label: "Enterprise",
    tagline: "For mission-critical systems",
    baseMonthly: 700,
    baseHourly: 0.96,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 3, max: 6 },
      cpu: { min: 4, max: 32 },
      ram: { min: 8, max: 128 },
      storage: { min: 200, max: 6144 },
    },
  },
];

const OPENSEARCH_PLANS: PlanDefinition[] = [
  {
    tier: "free",
    label: "Free",
    tagline: "For experimentation",
    baseMonthly: 0,
    baseHourly: 0,
    supportsSliders: false,
    supportsCloudSelection: false,
    resources: {
      vms: { min: 0, max: 0 },
      cpu: { min: 0, max: 0 },
      ram: { min: 0, max: 0 },
      storage: { min: 0, max: 0 },
    },
  },
  {
    tier: "startup",
    label: "Startup",
    tagline: "For small workloads",
    baseMonthly: 19,
    baseHourly: 0.026,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 1, max: 1 },
      cpu: { min: 1, max: 2 },
      ram: { min: 1, max: 4 },
      storage: { min: 5, max: 80 },
    },
  },
  {
    tier: "scaleup",
    label: "Scaleup",
    tagline: "For production workloads",
    baseMonthly: 250,
    baseHourly: 0.34,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 3, max: 3 },
      cpu: { min: 2, max: 16 },
      ram: { min: 4, max: 64 },
      storage: { min: 120, max: 4096 },
    },
  },
  {
    tier: "enterprise",
    label: "Enterprise",
    tagline: "For mission-critical systems",
    baseMonthly: 900,
    baseHourly: 1.23,
    supportsSliders: true,
    supportsCloudSelection: true,
    resources: {
      vms: { min: 6, max: 15 },
      cpu: { min: 4, max: 32 },
      ram: { min: 8, max: 128 },
      storage: { min: 500, max: 12288 },
    },
  },
];

export const SERVICE_PLANS: Record<ServiceId, PlanDefinition[]> = {
  kafka: KAFKA_PLANS,
  postgresql: POSTGRESQL_PLANS,
  opensearch: OPENSEARCH_PLANS,
};

// ---------------------------------------------------------------------------
// Free-tier display specs (not derivable from resource ranges which are all 0)
// ---------------------------------------------------------------------------

export const FREE_TIER_SPECS: Record<ServiceId, { vm: string; cpu: string; ram: string; storage: string }> = {
  kafka: { vm: "Shared VM", cpu: "Shared vCPU", ram: "1 GB RAM", storage: "5 GB storage" },
  postgresql: { vm: "Shared VM", cpu: "Shared vCPU", ram: "1 GB RAM", storage: "5 GB storage" },
  opensearch: { vm: "Shared VM", cpu: "Shared vCPU", ram: "1 GB RAM", storage: "5 GB storage" },
};

// ---------------------------------------------------------------------------
// Cloud providers & regions
// ---------------------------------------------------------------------------

export const CLOUD_PROVIDERS: CloudProviderDefinition[] = [
  {
    id: "aws",
    label: "Amazon Web Services",
    icon: IconBrandAws,
    regions: [
      { id: "aws-us-east-1", label: "US East (Virginia)", flag: "🇺🇸" },
      { id: "aws-us-west-2", label: "US West (Oregon)", flag: "🇺🇸" },
      { id: "aws-eu-west-1", label: "Europe (Ireland)", flag: "🇮🇪" },
      { id: "aws-ap-southeast-1", label: "Asia Pacific (Singapore)", flag: "🇸🇬" },
    ],
  },
  {
    id: "gcp",
    label: "Google Cloud",
    icon: IconCloud,
    regions: [
      { id: "gcp-us-central1", label: "US Central (Iowa)", flag: "🇺🇸" },
      { id: "gcp-europe-west1", label: "Europe West (Belgium)", flag: "🇧🇪" },
      { id: "gcp-asia-east1", label: "Asia East (Taiwan)", flag: "🇹🇼" },
    ],
  },
  {
    id: "azure",
    label: "Microsoft Azure",
    icon: IconBrandAzure,
    regions: [
      { id: "azure-eastus", label: "East US (Virginia)", flag: "🇺🇸" },
      { id: "azure-westeurope", label: "West Europe (Netherlands)", flag: "🇳🇱" },
      { id: "azure-southeastasia", label: "Southeast Asia (Singapore)", flag: "🇸🇬" },
    ],
  },
  {
    id: "digitalocean",
    label: "DigitalOcean",
    icon: IconCloud,
    regions: [
      { id: "do-nyc", label: "New York", flag: "🇺🇸" },
      { id: "do-ams", label: "Amsterdam", flag: "🇳🇱" },
      { id: "do-sgp", label: "Singapore", flag: "🇸🇬" },
    ],
  },
  {
    id: "upcloud",
    label: "UpCloud",
    icon: IconCloud,
    regions: [
      { id: "upcloud-fi-hel", label: "Helsinki", flag: "🇫🇮" },
      { id: "upcloud-us-chi", label: "Chicago", flag: "🇺🇸" },
      { id: "upcloud-de-fra", label: "Frankfurt", flag: "🇩🇪" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Feature comparison data
// ---------------------------------------------------------------------------

const KAFKA_FEATURES: FeatureRow[] = [
  {
    label: "Dedicated VMs",
    values: { free: "N/A", startup: "3", scaleup: "3", enterprise: "6–30" },
  },
  {
    label: "Data encrypted on disk & network",
    values: { free: true, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "Schema Registry & REST proxy",
    values: { free: true, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "One-click version upgrade",
    values: { free: false, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "Seamless upgrade/downgrade",
    values: { free: false, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "High availability",
    tooltip: "Automatic failover to another node in case of a node failure",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "99.99% SLA",
    values: { free: false, startup: false, scaleup: false, enterprise: true },
  },
  {
    label: "VPC peering",
    tooltip: "Available in AWS, GCP, and Microsoft Azure",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Kafka Connect",
    tooltip: "Included in the base Kafka cluster",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Tiered Storage",
    tooltip: "Offload data from local disks to object storage",
    values: { free: false, startup: false, scaleup: "Add-on", enterprise: "Add-on" },
  },
  {
    label: "Dynamic disk sizing",
    tooltip: "Add or remove additional storage",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Support",
    values: {
      free: "Docs only",
      startup: "Email (best-effort)",
      scaleup: "Email (best-effort)",
      enterprise: "Email (best-effort)",
    },
  },
];

const POSTGRESQL_FEATURES: FeatureRow[] = [
  {
    label: "Dedicated VMs",
    values: { free: "N/A", startup: "1", scaleup: "2–3", enterprise: "3–6" },
  },
  {
    label: "Data encrypted on disk & network",
    values: { free: true, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "Connection pooling",
    values: { free: false, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "One-click version upgrade",
    values: { free: false, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "Automatic backups",
    values: { free: false, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "High availability",
    tooltip: "Standby nodes with automatic failover",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Read replicas",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "99.99% SLA",
    values: { free: false, startup: false, scaleup: false, enterprise: true },
  },
  {
    label: "VPC peering",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Dynamic disk sizing",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Support",
    values: {
      free: "Docs only",
      startup: "Email (best-effort)",
      scaleup: "Email (best-effort)",
      enterprise: "Email (best-effort)",
    },
  },
];

const OPENSEARCH_FEATURES: FeatureRow[] = [
  {
    label: "Dedicated VMs",
    values: { free: "N/A", startup: "1", scaleup: "3", enterprise: "6–15" },
  },
  {
    label: "Data encrypted on disk & network",
    values: { free: true, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "OpenSearch Dashboards",
    values: { free: true, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "One-click version upgrade",
    values: { free: false, startup: true, scaleup: true, enterprise: true },
  },
  {
    label: "Cross-cluster replication",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "High availability",
    tooltip: "Multiple nodes with automatic failover",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "99.99% SLA",
    values: { free: false, startup: false, scaleup: false, enterprise: true },
  },
  {
    label: "VPC peering",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Dynamic disk sizing",
    values: { free: false, startup: false, scaleup: true, enterprise: true },
  },
  {
    label: "Support",
    values: {
      free: "Docs only",
      startup: "Email (best-effort)",
      scaleup: "Email (best-effort)",
      enterprise: "Email (best-effort)",
    },
  },
];

export const SERVICE_FEATURES: Record<ServiceId, FeatureRow[]> = {
  kafka: KAFKA_FEATURES,
  postgresql: POSTGRESQL_FEATURES,
  opensearch: OPENSEARCH_FEATURES,
};

// ---------------------------------------------------------------------------
// Pricing logic
// ---------------------------------------------------------------------------

export function calculatePrice(
  plan: PlanDefinition,
  cpu: number,
  ram: number,
  storage: number,
  billing: BillingPeriod,
): number {
  if (plan.tier === "free") return 0;

  const { resources } = plan;

  const clampedCpu = Math.max(resources.cpu.min, Math.min(resources.cpu.max, cpu));
  const clampedRam = Math.max(resources.ram.min, Math.min(resources.ram.max, ram));
  const clampedStorage = Math.max(resources.storage.min, Math.min(resources.storage.max, storage));

  const cpuRange = resources.cpu.max - resources.cpu.min;
  const ramRange = resources.ram.max - resources.ram.min;
  const storageRange = resources.storage.max - resources.storage.min;

  const cpuFraction = cpuRange > 0 ? (clampedCpu - resources.cpu.min) / cpuRange : 0;
  const ramFraction = ramRange > 0 ? (clampedRam - resources.ram.min) / ramRange : 0;
  const storageFraction =
    storageRange > 0 ? (clampedStorage - resources.storage.min) / storageRange : 0;

  // Weighted average: storage contributes more to price
  const WEIGHT_CPU = 0.3;
  const WEIGHT_RAM = 0.3;
  const WEIGHT_STORAGE = 0.4;
  const fraction = cpuFraction * WEIGHT_CPU + ramFraction * WEIGHT_RAM + storageFraction * WEIGHT_STORAGE;

  // Price scales from base to ~3x base across the tier range
  const MAX_PRICE_MULTIPLIER = 2;
  const multiplier = 1 + fraction * MAX_PRICE_MULTIPLIER;
  const monthly = plan.baseMonthly * multiplier;

  const HOURS_PER_MONTH = 730;
  if (billing === "hourly") {
    return Math.round((monthly / HOURS_PER_MONTH) * 100) / 100;
  }
  return Math.round(monthly);
}

// ---------------------------------------------------------------------------
// Recommendation logic
// ---------------------------------------------------------------------------

export const TIER_ORDER: PlanTier[] = ["free", "startup", "scaleup", "enterprise"];

export function getRecommendedTier(
  serviceId: ServiceId,
  selectedTier: PlanTier,
  cpu: number,
  ram: number,
  storage: number,
): PlanTier | null {
  const plans = SERVICE_PLANS[serviceId];
  const selectedIdx = TIER_ORDER.indexOf(selectedTier);
  const currentPlan = plans.find((p) => p.tier === selectedTier);

  if (!currentPlan || !currentPlan.supportsSliders) return null;

  const { resources: cur } = currentPlan;

  // Recommend upgrade when user has maxed out at least one adjustable resource
  const atMax =
    (cur.cpu.max > cur.cpu.min && cpu >= cur.cpu.max) ||
    (cur.ram.max > cur.ram.min && ram >= cur.ram.max) ||
    (cur.storage.max > cur.storage.min && storage >= cur.storage.max);

  if (!atMax) return null;

  // Return the next available tier
  for (const tier of TIER_ORDER) {
    const tierIdx = TIER_ORDER.indexOf(tier);
    if (tierIdx <= selectedIdx) continue;

    const plan = plans.find((p) => p.tier === tier);
    if (!plan || !plan.supportsSliders) continue;

    return tier;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getSliderStep(range: ResourceRange): number {
  const span = range.max - range.min;
  if (span <= 0) return 1;
  if (span <= 10) return 1;
  if (span <= 100) return 5;
  if (span <= 1000) return 50;
  if (span <= 10000) return 500;
  return 1000;
}

export function formatStorage(gb: number): string {
  if (gb >= 1024) {
    const tb = gb / 1024;
    return Number.isInteger(tb) ? `${tb} TB` : `${tb.toFixed(1)} TB`;
  }
  return `${gb} GB`;
}

export function formatPrice(value: number, billing: BillingPeriod): string {
  if (value === 0) return "$0";
  if (billing === "hourly") {
    return `$${value.toFixed(2)}`;
  }
  return `$${value.toLocaleString("en-US")}`;
}

export function getDefaultRegion(provider: CloudProvider): string {
  const cloud = CLOUD_PROVIDERS.find((c) => c.id === provider);
  return cloud?.regions[0]?.id ?? "";
}

export function getServiceForCategory(categoryId: string): ServiceId | null {
  const cat = SERVICE_CATEGORIES.find((c) => c.id === categoryId);
  return cat?.services[0]?.id ?? null;
}
