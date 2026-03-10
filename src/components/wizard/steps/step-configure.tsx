"use client";

import { useEffect, useRef } from "react";
import { IconCheck, IconMinus, IconPlus } from "@tabler/icons-react";
import { InputField, Slider, Switch } from "@/components/aiven";
import { generateServiceName } from "@/lib/wizard-reducer";
import type { StepProps } from "../wizard-content";

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

export function StepConfigure({ state, dispatch }: StepProps) {
  const prevServiceIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (state.service && state.service.id !== prevServiceIdRef.current) {
      prevServiceIdRef.current = state.service.id;
      if (!state.config.serviceName) {
        dispatch({
          type: "SET_CONFIG",
          payload: { serviceName: generateServiceName(state.service.id) },
        });
      }
    }
  }, [state.service, state.config.serviceName, dispatch]);

  const nameValue = state.config.serviceName;
  const nameValid = nameValue ? /^[a-z][a-z0-9-]{2,62}$/.test(nameValue) : false;
  const nameError = nameValue && !nameValid
    ? "3\u201363 characters, lowercase letters, numbers, and hyphens only."
    : undefined;

  const diskValue = state.config.extraDiskGiB;
  const diskStep = 10;
  const diskMax = 1000;
  const diskMin = 0;

  function setDisk(value: number) {
    dispatch({
      type: "SET_CONFIG",
      payload: { extraDiskGiB: value },
    });
  }

  return (
    <div className="max-w-md space-y-8">
      <div>
        <InputField
          label="Service name"
          description="A unique name to identify your service."
          value={nameValue}
          error={nameError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "SET_CONFIG",
              payload: { serviceName: e.target.value },
            })
          }
        />
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {nameValue && nameValid && (
              <span className="flex items-center gap-1 text-xs text-aiven-success-60">
                <IconCheck size={12} />
                Valid
              </span>
            )}
          </div>
          <span className="text-xs text-text-muted tabular-nums">
            {nameValue.length}/63
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-heading">
            Additional disk space
          </label>
          <span className="text-sm font-medium text-text-heading tabular-nums">
            {diskValue} GiB
          </span>
        </div>
        <div className="flex items-center gap-2">
          <StepButton
            direction="decrement"
            disabled={diskValue <= diskMin}
            onClick={() => setDisk(Math.max(diskMin, diskValue - diskStep))}
            label="Decrease disk space"
          />
          <div className="flex-1">
            <Slider
              value={diskValue}
              min={diskMin}
              max={diskMax}
              step={diskStep}
              onValueChange={(value) =>
                setDisk(typeof value === "number" ? value : value[0])
              }
            />
          </div>
          <StepButton
            direction="increment"
            disabled={diskValue >= diskMax}
            onClick={() => setDisk(Math.min(diskMax, diskValue + diskStep))}
            label="Increase disk space"
          />
        </div>
        <div className="flex justify-between text-[11px] text-text-muted">
          <span>{diskMin} GiB</span>
          {diskValue > 0 && (
            <span>+${(diskValue * 0.12).toFixed(2)}/mo</span>
          )}
          <span>{diskMax} GiB</span>
        </div>
      </div>

      <Switch
        label="Enable notifications"
        checked={state.config.notifications}
        onCheckedChange={(checked: boolean) =>
          dispatch({
            type: "SET_CONFIG",
            payload: { notifications: checked },
          })
        }
      />
    </div>
  );
}
