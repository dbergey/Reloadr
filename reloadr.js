/*
TO USE: include reloadr.js and tell it what to check and how often:
	Reloadr.watch([
		'/js/main.js',
		'/css/layout.css'
	], 2000);
	
To watch server-side files, include a path like:
	'/reloadr.php?*.php,tests/*.php'

*/

var Reloadr = {
	frequency: 2000,
	req: new XMLHttpRequest(),
	watchedURLs: [],
	watch: function(urls, frequency) {
		for (i in urls)
			Reloadr.watchedURLs.push(urls[i]);
		if (frequency) Reloadr.frequency = frequency;
	},
	ajax: function(url, callback) {
		Reloadr.req.open("GET", url, false);
		Reloadr.req.setRequestHeader('If-Modified-Since', window.loadTime.toUTCString());
		Reloadr.req.send(null);
		if (Reloadr.req.status == 200)
			callback.call(
				Date.parse(
					Reloadr.req.getResponseHeader('Last-Modified')
				)
			);
	},
	go: function() {
		window.loadTime = new Date();
		setInterval(function() {
			for (i in Reloadr.watchedURLs)
				Reloadr.ajax(Reloadr.watchedURLs[i], function() {
					if (this > Date.parse(window.loadTime))
						location.reload();
				});
		}, Reloadr.frequency);
	}
};
Reloadr.go();