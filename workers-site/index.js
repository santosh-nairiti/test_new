addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  let path = url.pathname

  // Determine content type based on the file extension
  let contentType = 'text/plain'
  if (path.endsWith('.css')) {
    contentType = 'text/css'
  } else if (path.endsWith('.js')) {
    contentType = 'application/javascript'
  }

  // Serve the file from the bucket
  try {
    const response = await fetch(`https://demo-bf3.pages.dev${path}`)
    if (response.ok) {
      // Clone the response to modify the headers
      const newHeaders = new Headers(response.headers)
      newHeaders.set('Content-Type', contentType)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      })
    } else {
      return new Response('File not found', { status: 404 })
    }
  } catch (e) {
    return new Response('Error fetching the file', { status: 500 })
  }
}
