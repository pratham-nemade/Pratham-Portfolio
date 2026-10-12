export const PROJECT_HASH = "#project-"

export function openProject(slug: string) {
  window.history.replaceState(null, "", `${PROJECT_HASH}${slug}`)
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}
