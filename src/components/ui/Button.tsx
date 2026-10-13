import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

type Look = { variant?: "solid" | "line"; size?: "regular" | "small" };

export function buttonClass({ variant = "solid", size = "regular" }: Look = {}, extra?: string) {
  return cx("btn", variant === "line" && "line", size === "small" && "small", extra);
}

/** In-page link styled as a button. */
export function ButtonLink({ variant, size, className, ...rest }: Look & ComponentProps<"a">) {
  return <a className={buttonClass({ variant, size }, className)} {...rest} />;
}

export function Button({ variant, size, className, type = "button", ...rest }: Look & ComponentProps<"button">) {
  return <button type={type} className={buttonClass({ variant, size }, className)} {...rest} />;
}
