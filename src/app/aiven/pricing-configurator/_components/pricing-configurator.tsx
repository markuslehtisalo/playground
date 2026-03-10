"use client";

import { useReducer } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatedNumber, Button, Separator, ToggleGroup } from "@/components/aiven";
import { DarkModeToggle } from "@/components/aiven/dark-mode-toggle";
import { ServicePicker } from "./service-picker";
import { PlanCardsGrid } from "./plan-cards-grid";
import { ResourceSliders } from "./resource-sliders";
import { CloudRegionSelect } from "./cloud-region-select";

const CompareDrawer = dynamic(
  () => import("./compare-table").then((mod) => mod.CompareDrawer),
  { ssr: false },
);
import {
  type ServiceId,
  type CloudProvider,
  type PlanTier,
  type BillingPeriod,
  SERVICE_PLANS,
  SERVICE_CATEGORIES,
  calculatePrice,
  getRecommendedTier,
  getDefaultRegion,
} from "./pricing-data";

const SERVICE_LABEL_MAP = new Map(
  SERVICE_CATEGORIES.flatMap((c) => c.services).map((s) => [s.id, s.fullLabel]),
);

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface ConfigState {
  serviceId: ServiceId;
  cloudProvider: CloudProvider;
  region: string;
  billingPeriod: BillingPeriod;
  selectedTier: PlanTier;
  cpu: number;
  ram: number;
  storage: number;
}

export type ConfigAction =
  | { type: "SET_SERVICE"; serviceId: ServiceId }
  | { type: "SET_CLOUD"; provider: CloudProvider }
  | { type: "SET_REGION"; region: string }
  | { type: "SET_BILLING"; period: BillingPeriod }
  | { type: "SELECT_TIER"; tier: PlanTier }
  | { type: "SET_CPU"; value: number }
  | { type: "SET_RAM"; value: number }
  | { type: "SET_STORAGE"; value: number };

function getInitialSliders(serviceId: ServiceId, tier: PlanTier) {
  const plan = SERVICE_PLANS[serviceId].find((p) => p.tier === tier);
  if (!plan || !plan.supportsSliders) {
    return { cpu: 0, ram: 0, storage: 0 };
  }
  return {
    cpu: plan.resources.cpu.min,
    ram: plan.resources.ram.min,
    storage: plan.resources.storage.min,
  };
}

const INITIAL_SERVICE: ServiceId = "kafka";
const INITIAL_TIER: PlanTier = "startup";
const INITIAL_CLOUD: CloudProvider = "aws";

const initialSliders = getInitialSliders(INITIAL_SERVICE, INITIAL_TIER);

const initialState: ConfigState = {
  serviceId: INITIAL_SERVICE,
  cloudProvider: INITIAL_CLOUD,
  region: getDefaultRegion(INITIAL_CLOUD),
  billingPeriod: "monthly",
  selectedTier: INITIAL_TIER,
  ...initialSliders,
};

function reducer(state: ConfigState, action: ConfigAction): ConfigState {
  switch (action.type) {
    case "SET_SERVICE": {
      const sliders = getInitialSliders(action.serviceId, "startup");
      return {
        ...state,
        serviceId: action.serviceId,
        selectedTier: "startup",
        ...sliders,
      };
    }
    case "SET_CLOUD": {
      return {
        ...state,
        cloudProvider: action.provider,
        region: getDefaultRegion(action.provider),
      };
    }
    case "SET_REGION":
      return { ...state, region: action.region };
    case "SET_BILLING":
      return { ...state, billingPeriod: action.period };
    case "SELECT_TIER": {
      const sliders = getInitialSliders(state.serviceId, action.tier);
      return {
        ...state,
        selectedTier: action.tier,
        ...sliders,
      };
    }
    case "SET_CPU":
      return { ...state, cpu: action.value };
    case "SET_RAM":
      return { ...state, ram: action.value };
    case "SET_STORAGE":
      return { ...state, storage: action.value };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PricingConfigurator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const plans = SERVICE_PLANS[state.serviceId];
  const currentPlan = plans.find((p) => p.tier === state.selectedTier);
  const isFree = state.selectedTier === "free";

  const price = currentPlan
    ? calculatePrice(
        currentPlan,
        state.cpu,
        state.ram,
        state.storage,
        state.billingPeriod,
      )
    : 0;

  const recommendedTier = getRecommendedTier(
    state.serviceId,
    state.selectedTier,
    state.cpu,
    state.ram,
    state.storage,
  );

  const unit = state.billingPeriod === "hourly" ? "/hr" : "/mo";

  const serviceLabel = SERVICE_LABEL_MAP.get(state.serviceId) ?? state.serviceId;

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-6 sm:px-8">
        {/* Header */}
        <header className="mb-6 flex items-center">
          <div className="flex-1">
            <Link
              className="inline-flex items-center gap-1.5 rounded-sm text-sm text-text-muted outline-none transition-colors hover:text-aiven-grey-60 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 dark:hover:text-aiven-grey-20"
              href="/aiven"
            >
              <IconArrowLeft size={14} />
              Back
            </Link>
          </div>
          <h1 className="flex items-center gap-2 text-sm font-semibold text-text-heading">
            <Image
              src="/aiven-logo.png"
              alt="Aiven"
              width={24}
              height={24}
            />
            Aiven Configurator
          </h1>
          <div className="flex flex-1 justify-end">
            <DarkModeToggle />
          </div>
        </header>

        {/* Service selector */}
        <section className="mb-6">
          <ServicePicker
            serviceId={state.serviceId}
            onServiceChange={(id: ServiceId) =>
              dispatch({ type: "SET_SERVICE", serviceId: id })
            }
          />
        </section>

        {/* Price hero */}
        <section className="mb-6 flex flex-col items-center">
          <p className="mb-2 text-sm text-text-muted">
            Aiven for {serviceLabel}
            {currentPlan && (
              <>
                {" "}
                &middot; {currentPlan.label} plan
              </>
            )}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums text-text-heading sm:text-5xl">
              {price === 0 ? (
                "$0"
              ) : (
                <>
                  $<AnimatedNumber value={price} decimals={state.billingPeriod === "hourly" ? 2 : 0} />
                </>
              )}
            </span>
            {price > 0 && (
              <span className="text-base text-text-muted sm:text-lg">
                {unit}
              </span>
            )}
          </div>
          {state.billingPeriod === "hourly" && price > 0 && (
            <p className="mt-1 text-sm text-text-muted">
              ~$<AnimatedNumber value={Math.round(price * 730)} />/mo
            </p>
          )}
          <div className="mt-3">
            <ToggleGroup
              value={[state.billingPeriod]}
              onValueChange={(val) => {
                if (val.length > 0)
                  dispatch({
                    type: "SET_BILLING",
                    period: val[0] as BillingPeriod,
                  });
              }}
            >
              <ToggleGroup.Item value="hourly">Hourly</ToggleGroup.Item>
              <ToggleGroup.Item value="monthly">Monthly</ToggleGroup.Item>
            </ToggleGroup>
          </div>
        </section>

        {/* Plan cards + compare link */}
        <section className="mb-6">
          <PlanCardsGrid
            serviceId={state.serviceId}
            selectedTier={state.selectedTier}
            recommendedTier={recommendedTier}
            billing={state.billingPeriod}
            cpu={state.cpu}
            ram={state.ram}
            storage={state.storage}
            onSelectTier={(tier: PlanTier) =>
              dispatch({ type: "SELECT_TIER", tier })
            }
          />
          <div className="mt-4 grid grid-cols-1 items-center sm:grid-cols-3">
            <div className="hidden sm:block">
              <CompareDrawer
                serviceId={state.serviceId}
                selectedTier={state.selectedTier}
              >
                <button
                  type="button"
                  className="cursor-pointer text-sm text-aiven-primary-80 outline-none transition-colors hover:text-aiven-primary-90 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 dark:hover:text-aiven-primary-50"
                >
                  Compare all plans
                </button>
              </CompareDrawer>
            </div>
            <div className="flex justify-center">
              <Button>
                <span className="whitespace-nowrap">Continue with {currentPlan?.label ?? "plan"}</span>
                <IconArrowRight size={16} />
              </Button>
            </div>
            <div className="hidden sm:block" />
          </div>
        </section>

        {/* Configuration: cloud/region + resource sliders */}
        {!isFree && currentPlan && (
          <section>
            <Separator className="mb-6" />
            <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
              <CloudRegionSelect
                cloudProvider={state.cloudProvider}
                region={state.region}
                onCloudChange={(provider: CloudProvider) =>
                  dispatch({ type: "SET_CLOUD", provider })
                }
                onRegionChange={(region: string) =>
                  dispatch({ type: "SET_REGION", region })
                }
              />
              <ResourceSliders
                plan={currentPlan}
                cpu={state.cpu}
                ram={state.ram}
                storage={state.storage}
                onCpuChange={(value: number) =>
                  dispatch({ type: "SET_CPU", value })
                }
                onRamChange={(value: number) =>
                  dispatch({ type: "SET_RAM", value })
                }
                onStorageChange={(value: number) =>
                  dispatch({ type: "SET_STORAGE", value })
                }
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
