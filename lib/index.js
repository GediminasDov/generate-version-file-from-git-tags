'use strict';

var argv = require('yargs').argv;
var remoteGitTags = require('remote-git-tags');
var fs = require('fs');

var repo = argv.repo || null;
var fileOut = argv.fileOut || null;

if (repo && fileOut) {
    remoteGitTags(repo, function (err, tags) {
        if (err) {
            console.log('Error: ' + err);
            process.exit(0);
        }
        fs.writeFileSync(fileOut, JSON.stringify(tags, null, '  '), 'utf8');
        console.log("Tags has been written to file: " + fileOut);
    });
}
if (!repo) {
    console.log("--repo=repository_url param must be included");
    process.exit(0);
}
if (!fileOut) {
    console.log("--fileOut=output_path param must be included");
    process.exit(0);
}