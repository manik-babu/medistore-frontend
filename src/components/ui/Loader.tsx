import { Spinner } from "./spinner";

export function PageLoader({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex items-center justify-center min-h-100">
            <div className="flex flex-col items-center gap-2">
                <Spinner />
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
        </div>
    )
}