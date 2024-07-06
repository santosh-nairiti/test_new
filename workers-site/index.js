addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Replace 'YOUR_NAMESPACE_ID' with your actual Workers KV namespace ID
  const myKVNamespace = await KV.get('b46b49b26e5b4fc09913fd35b61ccb46');
  
  // Replace 'YOUR_KEY' with the actual key you want to fetch
  const key = 'css/style.min.24e03f9a96.css';
  
  // Fetch the value from KV store
  const value = await myKVNamespace.get(key, 'text');
  
  if (value === null) {
    return new Response('Key not found', { status: 404 });
  }
  
  // Return the response with the fetched value
  return new Response(value, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
