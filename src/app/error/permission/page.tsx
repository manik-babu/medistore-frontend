import { ErrorPage } from "@/components/ErrorPage";

export default function Permission() {
    return (
        <ErrorPage message={"You do not have permission to access this page."} statusCode={403} />
    );
}