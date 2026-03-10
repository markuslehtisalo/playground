"use client";

import { Button } from "@/components/aiven/button";
import { Badge } from "@/components/aiven/badge";
import { Card } from "@/components/aiven/card";
import { InputField } from "@/components/aiven/input";
import { Switch } from "@/components/aiven/switch";
import { Select } from "@/components/aiven/select";
import { Dialog } from "@/components/aiven/dialog";
import { Avatar } from "@/components/aiven/avatar";
import { Separator } from "@/components/aiven/separator";
import { IconRocket } from "@tabler/icons-react";

export function MarketingComposition() {
  return (
    <div className="rounded-2xl border border-aiven-grey-10 bg-white p-8 shadow-xl dark:border-aiven-grey-80 dark:bg-aiven-grey-90">
      <div className="space-y-8">
        <Badge variant="primary">New</Badge>
        <div className="space-y-4">
          <p className="text-4xl font-semibold tracking-tight text-text-heading">
            Cloud databases,
            <br />
            zero ops.
          </p>
          <p className="max-w-md text-lg text-text-body">
            Deploy PostgreSQL, Kafka, and Redis in minutes. Focus on your
            product while we handle the infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="lg">
            <IconRocket size={18} />
            Start free trial
          </Button>
          <Button variant="ghost" size="lg">
            View pricing
          </Button>
        </div>
        <Separator />
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <Avatar fallback="S" size="sm" />
            <Avatar fallback="K" size="sm" />
            <Avatar fallback="R" size="sm" />
          </div>
          <p className="text-sm text-text-muted">
            Trusted by 10,000+ developers
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductComposition() {
  return (
    <Card className="rounded-2xl border-aiven-grey-10 bg-white shadow-xl dark:border-aiven-grey-80 dark:bg-aiven-grey-90">
        <Card.Header>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-text-heading">
              Service settings
            </h3>
            <Badge variant="success">Running</Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <InputField
              label="Service name"
              defaultValue="pg-production-01"
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-heading">
                Cloud region
              </label>
              <Select defaultValue="eu-west-1">
                <Select.Trigger aria-label="Cloud region">
                  <Select.Value />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Popup>
                    <Select.Item value="eu-west-1">
                      EU West 1 (Ireland)
                    </Select.Item>
                    <Select.Item value="us-east-1">
                      US East 1 (Virginia)
                    </Select.Item>
                    <Select.Item value="ap-south-1">
                      AP South 1 (Mumbai)
                    </Select.Item>
                  </Select.Popup>
                </Select.Portal>
              </Select>
            </div>
            <Separator />
            <Switch label="High availability" defaultChecked />
            <Switch label="Connection pooling" />
          </div>
        </Card.Body>
        <Card.Footer>
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
                  This will permanently delete pg-production-01 and all data.
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
          <Button size="sm">Save changes</Button>
        </Card.Footer>
      </Card>
  );
}
