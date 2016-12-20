'use strict';

var yargs = require('yargs').options({
    'fileOut': {
        alias: 'fo',
        demand: true,
        default: 'versions.json',
        describe: 'file path where to put list of tags from repository'
    },
    'packageJson': {
        alias: 'pkg',
        demand: false,
        describe: 'package.json file with [repository.url] included'
    },
    'repository': {
        alias: 'repo',
        demand: false,
        describe: 'repository url'
    }
}).usage('Usage: $0 (-repo [rep url] | -pkg [package.json]) -fo [output path]');
var argv = yargs.argv;
var remoteGitTags = require('remote-git-tags');
var fs = require('fs');

var repo = argv.repo || null;
var pkg = argv.pkg || null;
var fileOut = argv.fileOut || null;

var repoUrl = null;

if (pkg) {
    packageJson = JSON.parse(fs.readFileSync(pkg, 'utf8'));
    repoUrl = packageJson.repository.url;
} else if (repo) {
    repoUrl = repo;
}

if (repoUrl && fileOut) {
    remoteGitTags(repoUrl, function (err, tags) {
        if (err) {
            console.log('Error: ' + err);
        }
        fs.writeFileSync(fileOut, JSON.stringify(tags, null, '  '), 'utf8');
        console.log("Tags has been written to file: " + fileOut);
    });
} else {
    yargs.showHelp();
}