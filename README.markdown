# Reloadr

## The Problem

For development, I usually run a complete web stack locally on my MacBook. The web applications I develop must be tested across at least five different browsers and platforms. It's a pain to make a code change, and then have to switch to each browser (and virtual machine) in turn, and trigger each browser and platform's equivalent of a reload command.

Wouldn't it be easier if the browsers just knew to reload themselves when you made a change?

With **Reloadr**, you can tell the browsers which files are important enough to trigger a reload when you save them.

## Client-Side Assets

Just include the following in your web application's <HEAD> tag:
	
	<script src="/reloadr.js"></script>
	<script>
		Reloadr.watch([
			'/js/my_javascript_file.js',
			'/css/my_css_file.css'
		]);
	</script>
	
By default, the script will poll each of the specified files every two seconds. The If-Modified-Since HTTP header is used to minimize traffic and request size, so if your file has not been updated since the last time it was checked, it won't be transferred. If your file *has* been updated, the browser will reload the entire page.

If you want to limit polling to, say, every 10 seconds, pass that value (in milliseconds) as a second parameter to Reloadr.watch(), like so:

	Reloadr.watch([
		'/js/my_javascript_file.js',
		'/css/my_css_file.css'
	], 10000); // 10 seconds

## Server-Side Assets

Not everyone works on client-side code all the time (myself included). Since your PHP files aren't directly accessible via HTTP, you can use the reloadr.php file to aggregate the modification dates of your PHP files like this:

	Reloadr.watch([
		'reloadr.php?*.php,tests/*.php'
	]);

## Potential Future Features

This is kind of a quick and dirty hack. I'd like to add some features to make usage easier, but still keep it simple. Here are some ideas:

- Scan the document's HEAD to find CSS and JS urls to poll.