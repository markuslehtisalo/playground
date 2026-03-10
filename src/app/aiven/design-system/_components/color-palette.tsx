"use client";

import { Tooltip } from "@/components/aiven/tooltip";
import { StaggerContainer, StaggerItem } from "./scroll-reveal";

const shadeKeys = ["0", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

const colorScales: { name: string; prefix: string }[] = [
  { name: "Primary", prefix: "aiven-primary" },
  { name: "Secondary", prefix: "aiven-secondary" },
  { name: "Grey", prefix: "aiven-grey" },
  { name: "Success", prefix: "aiven-success" },
  { name: "Error", prefix: "aiven-error" },
  { name: "Warning", prefix: "aiven-warning" },
  { name: "Info", prefix: "aiven-info" },
];

/* Hex values mirrored from globals.css @theme so the palette always renders
   correctly even when Tailwind tree-shakes unused CSS custom properties. */
const hexValues: Record<string, Record<string, string>> = {
  "aiven-primary": {
    "0": "#ffffff", "5": "#f3f6ff", "10": "#e3e9ff", "20": "#d5ddfa",
    "30": "#c7d1f4", "40": "#b9c5ef", "50": "#9daaee", "60": "#818eec",
    "70": "#5865cd", "80": "#3545be", "90": "#222f95", "100": "#0e1652",
  },
  "aiven-secondary": {
    "0": "#fffbf8", "5": "#fff3e8", "10": "#fee8d0", "20": "#f8c99c",
    "30": "#fab26e", "40": "#fb9a3e", "50": "#fc871a", "60": "#ff7700",
    "70": "#f96a02", "80": "#f3580d", "90": "#eb4610", "100": "#e11d16",
  },
  "aiven-grey": {
    "0": "#f7f7fa", "5": "#ededf0", "10": "#e1e1e3", "20": "#d2d2d6",
    "30": "#b4b4bb", "40": "#9696a0", "50": "#787885", "60": "#5a5b6a",
    "70": "#4a4b57", "80": "#3a3a44", "90": "#292a31", "100": "#19191d",
  },
  "aiven-success": {
    "0": "#f5faf5", "5": "#ecf7ed", "10": "#cbffc9", "20": "#afffa7",
    "30": "#89eb80", "40": "#60db57", "50": "#40ce37", "60": "#00c300",
    "70": "#00b300", "80": "#009f00", "90": "#008e00", "100": "#006f00",
  },
  "aiven-error": {
    "0": "#fef2f1", "5": "#fee8e7", "10": "#ffcbd2", "20": "#ffadb3",
    "30": "#ed7975", "40": "#e0504f", "50": "#e62728", "60": "#e70000",
    "70": "#d80005", "80": "#c50001", "90": "#b90000", "100": "#aa0000",
  },
  "aiven-warning": {
    "0": "#fffdf9", "5": "#fff8ea", "10": "#fff2cd", "20": "#feebb2",
    "30": "#fddf81", "40": "#fdd44d", "50": "#fdc926", "60": "#ffc107",
    "70": "#ffb300", "80": "#fd9f00", "90": "#ff9003", "100": "#fe6d00",
  },
  "aiven-info": {
    "0": "#f9fdff", "5": "#effaff", "10": "#e0f5fe", "20": "#b4e5fb",
    "30": "#7fd1f7", "40": "#4cc2f7", "50": "#28b4f4", "60": "#02a8f3",
    "70": "#0399e3", "80": "#0788d1", "90": "#0174ba", "100": "#02569a",
  },
};

interface ColorPaletteProps {
  scales?: string[];
}

export function ColorPalette({ scales }: ColorPaletteProps) {
  const filtered = scales
    ? colorScales.filter((s) => scales.includes(s.name))
    : colorScales;
  return (
    <div className="space-y-6">
      {filtered.map((scale) => (
        <div key={scale.name}>
          <h3 className="mb-3 text-sm font-medium text-text-heading">
            {scale.name}
          </h3>
          <StaggerContainer
            className="grid grid-cols-6 gap-1.5 sm:grid-cols-12 sm:gap-1"
            stagger={0.03}
          >
            {shadeKeys.map((shade) => (
              <StaggerItem key={shade}>
                <Tooltip content={`--color-${scale.prefix}-${shade}`}>
                  <div
                    role="img"
                    aria-label={`${scale.name} ${shade}`}
                    tabIndex={0}
                    className="aspect-square rounded-md border border-black/15 outline-none motion-safe:transition-transform motion-safe:hover:scale-110 focus-visible:ring-2 focus-visible:ring-aiven-primary-80 focus-visible:ring-offset-1"
                    style={{ backgroundColor: hexValues[scale.prefix]?.[shade] }}
                  />
                </Tooltip>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      ))}
    </div>
  );
}
