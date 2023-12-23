"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/src/components/modals/CreateServerModal";
import InviteModal from "@/src/components/modals/InviteModal";
import EditServerModal from "@/src/components/modals/EditServerModal";
import MembersModal from "@/src/components/modals/MembersModal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent this component to be rendered on the server side
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </>
  );
}

export default ModalProvider;
