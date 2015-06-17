publish:
	./ghp-import _site -r gitcafe -b gitcafe-pages -p -m 'Willin Auto Publisher'
	./ghp-import _site -r origin -b master -p -m 'Willin Auto Publisher'