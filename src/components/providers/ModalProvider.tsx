"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/src/components/modals/CreateServerModal";
import InviteModal from "@/src/components/modals/InviteModal";

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
    </>
  );
}

export default ModalProvider;
