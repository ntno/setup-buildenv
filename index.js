const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const { getDownloadObject } = require('./lib/utils');
const { execSync } = require('child_process');

async function setup() {
    try {
        // Get version of tool to be installed
        const version = core.getInput('version');
        console.log(`buildenv version to install: ${version}`);

        // Download the specific version of the tool, e.g. as a tarball/zipball
        const download = getDownloadObject(version);
        const pathToTarball = await tc.downloadTool(download.url);

        // Extract the tarball/zipball onto host runner
        const pathToCLI = await tc.extractTar(pathToTarball, download.binPath);

        // await io.cp('path/to/directory', , options);


        const command_to_execute_1 = `ls -ltra ${ pathToCLI }`
        const stdout_1 = execSync(command_to_execute_1);
        console.log(stdout_1)

        const command_to_execute_2 = `echo $PATH`
        const stdout_2 = execSync(command_to_execute_1);
        console.log(stdout_2)

        // Expose the tool by adding it to the PATH
        // core.addPath(path.join(pathToCLI, download.binPath));
    } catch (e) {
        core.setFailed(e);
    }
}

module.exports = setup

if (require.main === module) {
    setup();
}