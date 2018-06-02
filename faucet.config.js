"use strict";

module.exports = {
	js: [{
		source: "./src/index.js",
		target: "./dist/bundle.js"
	}, {
		source: "./src/service_worker/index.js",
		target: "./dist/sw.js"
	}],
	static: [{
		source: "./",
		target: "./dist",
		filter: file => file === "index.html" || file.startsWith("img/")
	}]
};
