/** Concatène des classes CSS en ignorant les valeurs falsy. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
