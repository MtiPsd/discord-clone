"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useModal } from "@/src/hooks/useModalStore";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useOrigin } from "@/src/hooks/useOrigin";
import { useState } from "react";
import axios from "axios";

function InviteModal() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, type, onClose, onOpen, data } = useModal();
  const origin = useOrigin();

  const { server } = data;
  const isModalOpen = isOpen && type === "invite";
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  function onCopy() {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  async function onGenerate() {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/inviteCode`,
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} size="icon" onClick={onCopy}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={onGenerate}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="mt-4 text-sm text-zinc-500"
          >
            Generate a new link
            <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
