"use client";

import ActionTooltip from "@/src/components/ActionTooltip";
import { useModal } from "@/src/hooks/useModalStore";
import { Plus } from "lucide-react";

function NavigationAction() {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div
            className="mx-3 flex h-[48px] w-[48px] items-center justify-center 
            overflow-hidden rounded-[24px] bg-background transition-all 
            group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700"
          >
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}

export default NavigationAction;
