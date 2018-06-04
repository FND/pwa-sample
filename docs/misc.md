General Observations
--------------------

* juggling all those async operations is surprisingly tricky/tedious (though
  some of that might have been exacerbated by Chrome's bugginess; see below)
* `await` doesn't necessarily make things easier, sometimes even the opposite
* a declarative mechanism using `<link rel="serviceworker">` appears to
  have been deprecated, for now anyway:
  https://github.com/whatwg/html/pull/3233
  https://github.com/w3c/ServiceWorker/pull/1207
* explicit `version` not actually necessary? (significant maintenance burden due
  to manual updates)


Browsers
--------

* Safari appears to have the best debugging tools (separate Web Inspector
  dialog, functional breakpoints etc.)
* Firefox privacy settings currently block service worker caching:
  https://bugzilla.mozilla.org/show_bug.cgi?id=1429714
* Chrome is misleadingly buggy (still/again), which was frustrating:
  https://stackoverflow.com/a/49719964


Life Cycle
----------

* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Basic_architecture
* https://bitsofco.de/the-service-worker-lifecycle/
* https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle


Response Manipulation
---------------------

https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
this should make it possible to inject something like
`data-source="local-cache"` into the HTML stream?
cf. https://jakearchibald.com/2016/streams-ftw/


Misc. Resources
---------------

* https://jakearchibald.github.io/isserviceworkerready/
  also provides a good API overview (cf.
  https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#Interfaces)
* https://github.com/w3c/ServiceWorker/blob/master/explainer.md
  includes rationale, e.g. WRT declarative approaches
* https://www.smashingmagazine.com/2016/02/making-a-service-worker/
* https://jakearchibald.com/2014/offline-cookbook/
* https://pinboard.in/u:FND/t:pwa/
* PWA Builder (manifest and service worker, image formats)
  https://preview.pwabuilder.com
