import { useRouter } from "next/router";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";
import { PageGuardProps } from "@/types/pageGuard";
import NotFound from "./NotFound";

export default function PageGuard({
  error,
  isValid,
  // notFoundMessage = "Content not found",
  children,
}: PageGuardProps) {
  console.log(isValid);
  const router = useRouter();
  if (router.isFallback) return <Loader />;
  if (error) return <ErrorAlert error={error} />;
  if (!isValid) return <NotFound />;
  return <>{children}</>;
}
