/* eslint-env serviceworker */

let CACHES = {
	html: "html",
	misc: "misc"
};
let FALLBACK = "/offline.html";

export default async function onFetch(ev) {
	let { request } = ev;
	if(request.method !== "GET") {
		ev.respondWith(netRequest(request));
		return;
	}

	let response;
	// NB: simplistic media-type matching should be sufficient
	let mediaType = request.headers.get("Accept") || "";
	if(mediaType.includes("text/html")) {
		response = retrieveNetFirst(request, {
			cacheName: CACHES.html,
			fallback: FALLBACK
		});
	} else {
		response = retrieveCacheFirst(request, { cacheName: CACHES.misc });
	}
	ev.respondWith(response);
}

// try network first, using cache as fallback
// if `cacheName` is provided, the network response will be cached there
// if `fallback` is provided, the corresponding cache entry will be used as a
// last resort
async function retrieveNetFirst(request, { cacheName, fallback }) {
	let response;
	try {
		response = await netRequest(request);
		if(cacheName) { // update cache in the background (i.e. without blocking)
			cache(response.clone(), request, cacheName);
		}
		return response;
	} catch(err) { // network error or unexpected status code
		response = await self.caches.match(request);
		if(!response && fallback) {
			response = await self.caches.match(fallback);
		}
	}
	return response;
}

// TODO: support for alternative fallback? (for consistency with `retrieveNetFirst`)
async function retrieveCacheFirst(request, { cacheName }) {
	// retrieve in parallel
	let cachedResponse = self.caches.match(request);
	let netResponse = netRequest(request);

	let response = await cachedResponse;
	if(!response) {
		response = await netResponse;
		if(cacheName) { // update cache in the background (i.e. without blocking)
			cache(response.clone(), request, cacheName);
		}
		return response;
	}

	if(cacheName) { // refresh cache in the background (i.e. without blocking)
		netResponse.
			then(response => {
				cache(response, request, cacheName);
			});
	}
	return response;
}

async function netRequest(request) {
	let response = await self.fetch(request);
	if(!response.ok) {
		throw new Error(`unexpected response at \`${request.url}\`: ${response.status}`);
	}
	return response;
}

async function cache(response, request, cacheName) {
	let cache = await self.caches.open(cacheName);
	return cache.put(request, response);
}
