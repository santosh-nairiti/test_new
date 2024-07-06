addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const response = await fetch(request)

  if (url.pathname.endsWith('.css')) {
    return new Response(response.body, {
      ...response,
      headers: {
        ...response.headers,
        'Content-Type': 'text/css'
      }
    })
  }

  if (url.pathname.endsWith('.js')) {
    return new Response(response.body, {
      ...response,
      headers: {
        ...response.headers,
        'Content-Type': 'application/javascript'
      }
    })
  }

  return response
}
