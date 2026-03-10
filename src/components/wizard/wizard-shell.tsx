"use client";

import { useReducer } from "react";
import { wizardReducer, INITIAL_STATE } from "@/lib/wizard-reducer";
import { WizardHeader } from "./wizard-header";
import { WizardSidebar } from "./wizard-sidebar";
import { WizardMobileBar } from "./wizard-mobile-bar";
import { WizardContent } from "./wizard-content";

export function WizardShell() {
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_STATE);

  return (
    <div className="grid h-dvh grid-rows-[56px_auto_1fr] lg:grid-rows-[56px_1fr] grid-cols-1 lg:grid-cols-[320px_1fr]">
      <div className="col-span-full">
        <WizardHeader />
      </div>

      <WizardMobileBar
        state={state}
        onGoToStep={(step) => dispatch({ type: "GO_TO_STEP", payload: step })}
      />

      <div className="hidden lg:block overflow-y-auto">
        <WizardSidebar
          state={state}
          onGoToStep={(step) => dispatch({ type: "GO_TO_STEP", payload: step })}
        />
      </div>

      <div className="min-h-0">
        <WizardContent state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
