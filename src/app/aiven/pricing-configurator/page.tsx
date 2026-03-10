import type { Metadata } from "next";
import { PricingConfigurator } from "./_components/pricing-configurator";

export const metadata: Metadata = {
  description:
    "Interactive cloud service pricing configurator demonstrating complex data handling and design system composition.",
  title: "Price Configurator - Markus Lehtisalo",
};

export default function PricingConfiguratorPage() {
  return <PricingConfigurator />;
}
