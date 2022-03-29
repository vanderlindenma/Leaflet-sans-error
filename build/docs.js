console.log('Building Leaflet documentation with Leafdoc ...');

var runs = {
	'api-docs': 'reference.html',
	'graphviz-uml-bare': 'class-diagram-bare.dot',
	'graphviz-uml-full': 'class-diagram-full.dot'
};

Object.entries(runs).forEach(function (run) {

	var LeafDoc = require('leafdoc');
	var doc = new LeafDoc({
		templateDir: 'build/leafdoc-templates/' + run[0] + '/',
		showInheritancesWhenEmpty: true,
		leadingCharacter: '@'
	});

	// Leaflet uses a couple of non-standard documentable things. They are not
	// important enough to be classes/namespaces of their own, and should
	// just be listed in a table like the rest of documentables:
	doc.registerDocumentable('pane', 'Map panes');
	doc.registerDocumentable('projection', 'Defined projections');
	doc.registerDocumentable('crs', 'Defined CRSs');

	doc.addFile('build/docs-index.leafdoc', false);
	doc.addDir('src');
	doc.addFile('build/docs-misc.leafdoc', false);

	var out = doc.outputStr();
	var path = 'docs/' + run[1];

	var fs = require('fs');

	fs.writeFileSync(path, out);
	console.log('Successfully built ' + path);

});
