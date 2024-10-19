export default defineNuxtRouteMiddleware((to, from) => {
  const basePath = to.path.split("/")[1]; // Get the base path segment (e.g., 'docs')
  const secondPath = to.path.split("/")[2]; // Get the second path segment (e.g., 'en')
  const thirdPath = to.path.split("/")[3];

  const userLocale =
    typeof window !== "undefined"
      ? localStorage.getItem("page-locale") || "en"
      : "en";

  // Check if the path is exactly '/docs' or '/docs/en'
  if (
    basePath === "docs" &&
    (secondPath === undefined || thirdPath === undefined)
  ) {
    // Redirect to '/docs/user-locale/getting-started'
    return navigateTo(`/docs/${userLocale}/${thirdPath || "getting-started"}`);
  }
});
