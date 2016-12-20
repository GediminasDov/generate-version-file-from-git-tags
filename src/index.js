const yargs = require('yargs').options({
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
        describe: 'repository urls'
    }
}).usage('Usage: $0 (-repo [rep url] | -pkg [package.json]) -fo [output path]');
const argv = yargs.argv;
const remoteGitTags = require('remote-git-tags');
const fs = require('fs');

const repo = argv.repo || null;
const pkg = argv.pkg || null;
const fileOut = argv.fileOut || null;


let repoUrl = null;

if (pkg) {
    let packageJson = JSON.parse(fs.readFileSync(pkg, 'utf8'));
    repoUrl = packageJson.repository.url;
} else if (repo) {
    repoUrl = repo;
}

if (repoUrl && fileOut) {
    remoteGitTags(repoUrl, (err, tags) => {
        if (err) {
            console.log('Error: ' + err);
        }
        fs.writeFileSync(fileOut, JSON.stringify(tags, null, '  '), 'utf8');
        console.log("Tags has been written to file: " + fileOut);
    });
} else {
    yargs.showHelp();
}
