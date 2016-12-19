# Generate Version File From Git Tags
Simple wrapper for lib [remote-git-tags](https://github.com/sindresorhus/remote-git-tags)

# Installation
```npm install generate-version-file-from-git-tags --save-dev```

# Usage
Params: 
```
repo - repository url
fileOut - file output path
```

Generate command:
Insert this script to your ```package.json``` file
```
"script" : {
    generate : "generate-version-file-from-git-tags --repo=github.com/GediminasDov/generate-version-file-from-git-tags --fileOut=version.json"
}
```