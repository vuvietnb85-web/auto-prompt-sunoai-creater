import { createFileRoute } from "@tanstack/react-router";
import { PhoApp } from "@/components/pho-app";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <PhoApp />;
}
