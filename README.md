# setup-buildenv
GitHub Action to install Comcast's [buildenv tool](https://github.com/Comcast/Buildenv-Tool) on GitHub's hosted runners, using JavaScript 

## Usage

Setup the `buildenv` CLI:

```yaml
steps:
- uses: ntno/setup-buildenv@v1
```

A specific version of the `buildenv` CLI can be installed:

```yaml
steps:
- uses: ntno/setup-buildenv@v1
  with:
    version:
      0.5.7
```

## Inputs
The action supports the following inputs:

- `version`: The version of `buildenv` to install, defaulting to `0.5.7`
  - *__Note__* `0.5.7` is the earliest version that can be installed with this tool.  [previous versions](https://github.com/Comcast/Buildenv-Tool/tags) followed a different artifact schema which is not supported.
  
## Development
to build distribution locally, ensure docker is installed, then run:  

```
make build-dist
```  

## References
- [metadata-syntax-for-github-actions](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)  
- [dockerfile-support-for-github-actions](https://docs.github.com/en/actions/creating-actions/dockerfile-support-for-github-actions)  
- [repo: example cli action](https://github.com/github-developer/example-setup-gh)  
- [creating-a-javascript-action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) . 
- [repo: example javascript action](https://github.com/actions/javascript-action)  
- [core](https://github.com/actions/toolkit/tree/main/packages/core)