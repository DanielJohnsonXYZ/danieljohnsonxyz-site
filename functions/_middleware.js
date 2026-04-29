export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.danieljohnson.xyz") {
    url.hostname = "danieljohnson.xyz";
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
