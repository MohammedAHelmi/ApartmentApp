import { JSX } from "react";

export default function DataLoader({ data, fallback, children }: {data: unknown, fallback:  JSX.Element, children: JSX.Element}) {
    if (data == null) return fallback;
    return children;
}
  