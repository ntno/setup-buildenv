const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');
const io = require('@actions/io');

const { getDownloadObject } = require('./lib/utils');

async function setup() {
    try {
        // Get version of tool to be installed
        const version = core.getInput('version');
        console.log(`buildenv version to install: ${version}`);

        // Download the specific version of the tool, e.g. as a tarball/zipball
        const download = getDownloadObject(version);
        const pathToTarball = await tc.downloadTool(download.url);

        // Extract the tarball/zipball onto host runner
        const cli_directory_path = await tc.extractTar(pathToTarball, download.binPath);

        core.exportVariable('BUILDENV_CLI_PATH', download.toolPath);
        core.addPath(cli_directory_path);
    } catch (e) {
        core.setFailed(e);
    }
}

module.exports = setup

if (require.main === module) {
    setup();
}