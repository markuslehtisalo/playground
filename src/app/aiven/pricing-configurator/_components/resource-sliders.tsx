"use client";

import { IconCpu, IconDeviceDesktop, IconDatabase, IconMinus, IconPlus } from "@tabler/icons-react";
import { Slider, AnimatedNumber, Tooltip } from "@/components/aiven";
import {
  type PlanDefinition,
  formatStorage,
  getSliderStep,
} from "./pricing-data";

interface ResourceSlidersProps {
  plan: PlanDefinition;
  cpu: number;
  ram: number;
  storage: number;
  onCpuChange: (value: number) => void;
  onRamChange: (value: number) => void;
  onStorageChange: (value: number) => void;
}

interface SingleSliderProps {
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  formatValue?: (v: number) => string;
  disabled: boolean;
  onChange: (value: number) => void;
}

function StepButton({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "decrement" | "increment";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex size-6 items-center justify-center rounded-md border border-aiven-grey-10 bg-white text-text-muted outline-none transition-colors cursor-pointer hover:bg-aiven-grey-5 hover:text-text-heading focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-30 dark:border-aiven-grey-80 dark:bg-aiven-grey-90 dark:hover:bg-aiven-grey-80"
    >
      {direction === "decrement" ? <IconMinus size={12} /> : <IconPlus size={12} />}
    </button>
  );
}

function SingleSlider({
  icon,
  label,
  tooltip,
  value,
  min,
  max,
  step,
  unit,
  formatValue,
  disabled,
  onChange,
}: SingleSliderProps) {
  const displayValue = formatValue ? formatValue(value) : `${value} ${unit}`;

  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Tooltip content={tooltip} side="right">
          <span className="flex items-center gap-1.5 text-sm text-text-body">
            {icon}
            {label}
          </span>
        </Tooltip>
        <span className="text-sm font-medium tabular-nums text-text-heading">
          {disabled ? (
            "—"
          ) : formatValue ? (
            displayValue
          ) : (
            <>
              <AnimatedNumber value={value} /> {unit}
            </>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <StepButton
          direction="decrement"
          disabled={disabled || value <= min}
          onClick={decrement}
          label={`Decrease ${label}`}
        />
        <div className="flex-1">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onValueChange={(val) => {
              const next = Array.isArray(val) ? val[0] : val;
              onChange(next);
            }}
            aria-label={label}
          />
        </div>
        <StepButton
          direction="increment"
          disabled={disabled || value >= max}
          onClick={increment}
          label={`Increase ${label}`}
        />
      </div>
      {!disabled && (
        <div className="flex justify-between text-[11px] text-text-muted">
          <span>{formatValue ? formatValue(min) : `${min} ${unit}`}</span>
          <span>{formatValue ? formatValue(max) : `${max} ${unit}`}</span>
        </div>
      )}
    </div>
  );
}

export function ResourceSliders({
  plan,
  cpu,
  ram,
  storage,
  onCpuChange,
  onRamChange,
  onStorageChange,
}: ResourceSlidersProps) {
  const { resources } = plan;

  // Check if sliders would be effectively disabled (min === max)
  const cpuFixed = resources.cpu.min === resources.cpu.max;
  const ramFixed = resources.ram.min === resources.ram.max;
  const storageFixed = resources.storage.min === resources.storage.max;

  return (
    <div className="space-y-3">
      <SingleSlider
        icon={<IconCpu size={14} />}
        label="CPU"
        tooltip="Virtual CPUs per VM"
        value={cpu}
        min={resources.cpu.min}
        max={resources.cpu.max}
        step={1}
        unit="vCPU"
        disabled={cpuFixed}
        onChange={onCpuChange}
      />
      <SingleSlider
        icon={<IconDeviceDesktop size={14} />}
        label="RAM"
        tooltip="Memory per VM"
        value={ram}
        min={resources.ram.min}
        max={resources.ram.max}
        step={1}
        unit="GB"
        disabled={ramFixed}
        onChange={onRamChange}
      />
      <SingleSlider
        icon={<IconDatabase size={14} />}
        label="Storage"
        tooltip="Total cluster storage"
        value={storage}
        min={resources.storage.min}
        max={resources.storage.max}
        step={getSliderStep(resources.storage)}
        unit="GB"
        formatValue={formatStorage}
        disabled={storageFixed}
        onChange={onStorageChange}
      />
    </div>
  );
}
