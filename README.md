# Generate Version File From Git Tags
Simple wrapper for lib [remote-git-tags](https://github.com/sindresorhus/remote-git-tags)

# Installation
```npm install generate-version-file-from-git-tags --save-dev```

# Usage
Params: 
```
--repository [--repo] - repository url
--fileOut [--fo] - file output path
--packageJson [--pkg] - path to package.json we will read [repository.url]
```

Generate command:
Insert this script to your ```package.json``` file
```
"script" : {
    generate : "generate-version-file-from-git-tags --repo=github.com/GediminasDov/generate-version-file-from-git-tags --fileOut=versions.json"
}
```

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
        describe: 'repository url'
    }
}).usage('Usage: $0 (-repo [rep url] | -pkg [package.json]) -fo [output path]');