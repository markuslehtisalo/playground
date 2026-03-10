import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Step-by-step service creation flow.",
  title: "UI Wizard - Markus Lehtisalo",
};

export default function UIWizardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
