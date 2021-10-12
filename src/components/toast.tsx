import { useToast } from "@chakra-ui/react"

export default function CToast(data: {
  description: string,
  status: "info" | "warning" | "success" | "error",
  position?: "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const toast = useToast({
    description: data.description,
    status: data.status,
    position: data.position ? data.position : "bottom"
  });
  return toast;
}