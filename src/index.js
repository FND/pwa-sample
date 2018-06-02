let sw = navigator.serviceWorker;
if(sw) {
	sw.register("sw.js");

	console.log("[service-worker]", sw.controller);
}
