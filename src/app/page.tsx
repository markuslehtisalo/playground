import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Personal project playground.",
  title: "Home - Playground",
};

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}
