addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Replace 'YOUR_NAMESPACE_ID' with your actual Workers KV namespace ID
  const myKVNamespace = await KV.get('b46b49b26e5b4fc09913fd35b61ccb46')
  
  // Determine which file to fetch based on request path
  let key, contentType;
  if (request.url.endsWith('/scripts.min.js')) {
    key = 'js/scripts.min.9be8381057.js';
    contentType = 'application/javascript';
  } else if (request.url.endsWith('/style.min.css')) {
    key = 'css/style.min.24e03f9a96.css';
    contentType = 'text/css';
  } else {
    // Handle other files or return 404 if not found
    return new Response('File not found', { status: 404 });
  }
  
  // Fetch the value from KV store
  const value = await myKVNamespace.get(key, 'text')
  
  // Return the response with the content and appropriate headers
  return new Response(value, {
    headers: {
      'Content-Type': contentType,
    },
  })
}
