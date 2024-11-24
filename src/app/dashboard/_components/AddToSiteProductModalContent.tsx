"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/data/env/client";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { CopyCheckIcon, CopyIcon, CopyXIcon } from "lucide-react";



type CopyState = "idle" | "copied" | "error";

export default function AddToSiteProductModalContent({ id }: { id: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const code = `<script src="${env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}/banner"></script>`;
  const Icon = getCopyIcon(copyState);
  return (
    <>
      <DialogContent className="max-w-max">
        <DialogHeader>
          <DialogTitle className="text-2xl "> Start Earning Arcbot</DialogTitle>
          <DialogDescription>
            {" "}
            All u need to do is copy the below script into your site and your
            customer will start seeing Arcbot discount
          </DialogDescription>
        </DialogHeader>
        <pre className="mb-4 overflow-x-auto p-4 bg-secondary rounded max-w-screen-xl text-secondary-foreground">
          {" "}
          <code> {code}</code>
        </pre>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigator.clipboard
                .writeText(code)
                .then(() => {
                  setCopyState("copied");
                  setTimeout(() => setCopyState("idle"), 2000);
                })
                .catch(() => {
                  setCopyState("error");
                  setTimeout(() => setCopyState("idle"), 2000);
                });
            }}
          >
            {" "}
            {<Icon className="size-4 mr-2" />}
            {getChildren(copyState)}
          </Button>

          <DialogClose>
          <Button variant="outline">Close</Button>
        </DialogClose>
        </div>
      </DialogContent>
    </>
  );
}

function getCopyIcon(copyState: CopyState) {
  switch (copyState) {
    case "idle":
      return CopyIcon;
    case "copied":
      return CopyCheckIcon;
    case "error":
      return CopyXIcon;
  }
}

function getChildren(copyState: CopyState) {
  switch (copyState) {
    case "idle":
      return "Copy Code";
    case "copied":
      return "Copied!";
    case "error":
      return "Error";
  }
}
