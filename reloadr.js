/*
TO USE: include reloadr.js and tell it what to check and how often:
	Reloadr.watch([
		'/include/css/cloud/cloud.css',
		'/include/css/control_panel/common.css'
	], 2000);
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
		Reloadr.req.send(null);
		if (Reloadr.req.status == 200)
			callback.call(
				Date.parse(
					Reloadr.req.getResponseHeader('Last-Modified')
				)
			);
	},
	go: function() {
		window.loadTime = Date.parse(Date());
		setInterval(function() {
			for (i in Reloadr.watchedURLs)
				Reloadr.ajax(Reloadr.watchedURLs[i], function() {
					if (this > window.loadTime)
						location.reload();
				});
		}, Reloadr.frequency);
	}
};
Reloadr.go();