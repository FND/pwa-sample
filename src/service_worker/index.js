/* eslint-env serviceworker */

import onFetch from "./http";

// eslint-disable-next-line no-unused-vars
let VERSION = "0.0.1"; // fingerprint ensures changes are registered by browsers

self.addEventListener("install", ev => {
	self.skipWaiting(); // supplant existing service worker, if any
});

self.addEventListener("activate", ev => {
	self.clients.claim(); // supplant existing service worker, if any
});

self.addEventListener("fetch", onFetch);
