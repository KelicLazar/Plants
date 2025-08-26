export default function extractErrorMessage(error: any): string {
  // Handle different error structures
  const possibleMessages = [
    error?.data?.message,
    error?.data?.statusMessage,
    error?.message,
    error?.statusMessage,
    error?.data?.error?.message,
  ];

  return possibleMessages.find(msg => typeof msg === "string" && msg.length > 0)
    || "An unexpected error occurred";
};
