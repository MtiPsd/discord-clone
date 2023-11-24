"use client";

import { useParams, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";

import Image from "next/image";
import ActionTooltip from "@/src/components/ActionTooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

function NavigationItem({ id, imageUrl, name }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={() => {}} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 w-[4px] rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]",
            params?.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image
            fill
            src={imageUrl}
            alt="Channel"
            sizes="100vw"
            objectPosition="center"
            objectFit="cover"
          />
        </div>
      </button>
    </ActionTooltip>
  );
}

export default NavigationItem;
