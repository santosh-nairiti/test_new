addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  let key = url.pathname.slice(1) // Remove leading slash

  // Adjust key if necessary to match your KV storage keys
  if (key === 'css/styles.min.css') {
    key = 'styles.min.css.gz'
  } else if (key === 'js/scripts.min.js') {
    key = 'scripts.min.js.gz'
  }

  // Fetch the file from KV storage
  const value = await MY_KV_NAMESPACE.get(key, 'arrayBuffer')
  if (value === null) {
    return new Response('File not found', { status: 404 })
  }

  // Decompress the gzipped file
  const decompressed = new Uint8Array(await ungzip(new Uint8Array(value)))
  const responseHeaders = new Headers()

  // Set appropriate content type based on file extension
  if (key.endsWith('.css.gz')) {
    responseHeaders.set('Content-Type', 'text/css')
  } else if (key.endsWith('.js.gz')) {
    responseHeaders.set('Content-Type', 'application/javascript')
  }

  // Return the decompressed file
  return new Response(decompressed, {
    headers: responseHeaders
  })
}

// Simple ungzip function using pako
async function ungzip(input) {
  // Using pako.js library to ungzip
  return pako.ungzip(input)
}
