export function pluralise(count, string) {
  if (count !== 1) {
    return `${string}s`
  }
  return string
}
