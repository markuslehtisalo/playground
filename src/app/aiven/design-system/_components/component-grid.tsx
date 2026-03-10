"use client";

import { Button } from "@/components/aiven/button";
import { Badge } from "@/components/aiven/badge";
import { InputField } from "@/components/aiven/input";
import { Switch } from "@/components/aiven/switch";
import { Tabs } from "@/components/aiven/tabs";
import { Select } from "@/components/aiven/select";
import { Dialog } from "@/components/aiven/dialog";
import { Avatar } from "@/components/aiven/avatar";
import { Separator } from "@/components/aiven/separator";
import { Checkbox } from "@/components/aiven/checkbox";
import { Progress } from "@/components/aiven/progress";
import { Tooltip } from "@/components/aiven/tooltip";
import { Toggle } from "@/components/aiven/toggle";
import { IconBold, IconItalic, IconRocket } from "@tabler/icons-react";
import { StaggerContainer, StaggerItem } from "./scroll-reveal";

function Specimen({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-30 flex-1 items-center justify-center rounded-xl border border-aiven-grey-10 bg-white p-5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100">
        {children}
      </div>
      <p className="mt-2.5 text-center font-mono text-xs text-text-muted">
        {label}
      </p>
    </div>
  );
}

export function ComponentGrid() {
  return (
    <StaggerContainer
      className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      stagger={0.04}
    >
      {/* Button */}
      <StaggerItem>
        <Specimen label="Button">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button size="sm">
              <IconRocket size={14} />
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
          </div>
        </Specimen>
      </StaggerItem>

      {/* Badge */}
      <StaggerItem>
        <Specimen label="Badge">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="primary">New</Badge>
            <Badge variant="success">Running</Badge>
            <Badge variant="warning">Pending</Badge>
          </div>
        </Specimen>
      </StaggerItem>

      {/* Avatar */}
      <StaggerItem>
        <Specimen label="Avatar">
          <div className="flex items-center -space-x-2">
            <Avatar fallback="ML" size="md" />
            <Avatar fallback="KR" size="md" />
            <Avatar fallback="JS" size="md" />
          </div>
        </Specimen>
      </StaggerItem>

      {/* Switch */}
      <StaggerItem>
        <Specimen label="Switch">
          <Switch label="Enabled" defaultChecked />
        </Specimen>
      </StaggerItem>

      {/* InputField */}
      <StaggerItem>
        <Specimen label="InputField">
          <div className="w-full max-w-55">
            <InputField
              label="Service name"
              placeholder="pg-production-01"
            />
          </div>
        </Specimen>
      </StaggerItem>

      {/* Select */}
      <StaggerItem>
        <Specimen label="Select">
          <div className="w-full max-w-55 space-y-1">
            <label className="text-sm font-medium text-text-heading">
              Cloud region
            </label>
            <Select defaultValue="eu-west-1">
              <Select.Trigger aria-label="Cloud region">
                <Select.Value />
              </Select.Trigger>
              <Select.Portal>
                <Select.Popup>
                  <Select.Item value="eu-west-1">EU West 1 (Ireland)</Select.Item>
                  <Select.Item value="us-east-1">US East 1 (Virginia)</Select.Item>
                  <Select.Item value="ap-south-1">AP South 1 (Mumbai)</Select.Item>
                </Select.Popup>
              </Select.Portal>
            </Select>
          </div>
        </Specimen>
      </StaggerItem>

      {/* Checkbox */}
      <StaggerItem>
        <Specimen label="Checkbox">
          <div className="space-y-3">
            <Checkbox label="Accept terms" defaultChecked />
            <Checkbox label="Subscribe" />
          </div>
        </Specimen>
      </StaggerItem>

      {/* Toggle */}
      <StaggerItem>
        <Specimen label="Toggle">
          <div className="flex items-center gap-1">
            <Toggle size="sm" defaultPressed>
              <IconBold size={14} />
            </Toggle>
            <Toggle size="sm">
              <IconItalic size={14} />
            </Toggle>
          </div>
        </Specimen>
      </StaggerItem>

      {/* Tabs */}
      <StaggerItem>
        <Specimen label="Tabs">
          <div className="w-full overflow-hidden">
            <Tabs.Root defaultValue="overview">
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
                <Tabs.Tab value="logs">Logs</Tabs.Tab>
                <Tabs.Indicator />
              </Tabs.List>
            </Tabs.Root>
          </div>
        </Specimen>
      </StaggerItem>

      {/* Progress */}
      <StaggerItem>
        <Specimen label="Progress">
          <div className="w-full max-w-45 space-y-3">
            <Progress value={72} variant="primary" size="md" />
            <Progress value={45} variant="success" size="sm" />
          </div>
        </Specimen>
      </StaggerItem>

      {/* Separator */}
      <StaggerItem>
        <Specimen label="Separator">
          <div className="w-full max-w-45 space-y-3">
            <p className="text-sm text-text-body">Section A</p>
            <Separator />
            <p className="text-sm text-text-body">Section B</p>
          </div>
        </Specimen>
      </StaggerItem>

      {/* Tooltip */}
      <StaggerItem>
        <Specimen label="Tooltip">
          <Tooltip content="Service status: healthy">
            <Button variant="secondary" size="sm">
              Hover me
            </Button>
          </Tooltip>
        </Specimen>
      </StaggerItem>

      {/* Dialog */}
      <StaggerItem>
        <Specimen label="Dialog">
          <Dialog>
            <Dialog.Trigger render={<Button variant="destructive" size="sm" />}>
              Delete
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Close />
                <Dialog.Title>Delete service?</Dialog.Title>
                <Dialog.Description>
                  This action cannot be undone.
                </Dialog.Description>
                <div className="mt-6 flex gap-2">
                  <Dialog.Close className="static size-auto" render={<Button variant="secondary" size="sm" />}>
                    Cancel
                  </Dialog.Close>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog>
        </Specimen>
      </StaggerItem>
    </StaggerContainer>
  );
}
