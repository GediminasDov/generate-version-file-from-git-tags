const argv = require('yargs').argv;
const remoteGitTags = require('remote-git-tags');
const fs = require('fs');

const repo = argv.repo || null;
const fileOut = argv.fileOut || null;

if (repo && fileOut) {
    remoteGitTags(repo, (err, tags) => {
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