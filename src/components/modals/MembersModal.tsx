"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { ScrollArea } from "@/src/components/ui/scroll-area";

import { useModal } from "@/src/hooks/useModalStore";
import { ServerWithMembersWithProfiles } from "@/types";
import UserAvatar from "@/src/components/UserAvatar";

function MembersModal() {
  const { isOpen, type, onClose, onOpen, data } = useModal();

  const { server } = data as { server: ServerWithMembersWithProfiles };
  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default MembersModal;
