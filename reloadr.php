<?php

$filename_lists = array_map('glob', explode(',', $_SERVER['QUERY_STRING']));

$files = array();

foreach( $filename_lists as $filename_list )
	$files = array_merge($files, $filename_list);
	
foreach ( $files as &$file )
	$file = filemtime($file);
	
header('Last-Modified: '. date('r', @max($files)));
?>
