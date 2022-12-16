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
        console.log(`pathToTarball: ${ pathToTarball }`)

        // Extract the tarball/zipball onto host runner

        const cli_directory_path = await tc.extractTar(pathToTarball, download.binPath);

        core.exportVariable('BUILDENV_CLI_PATH', download.toolPath);

        // await io.cp('path/to/directory', , options);
        // const binPath: string = '/home/runner/bin';
        // await io.mkdirP(binPath);

        // await exec.exec('chmod', ['+x', download.binPath]);
        // await io.mv(downloadPath, path.join(binPath, 'minikube'));

        core.addPath(cli_directory_path);

        // const command_to_execute_1 = `ls -ltra ${ pathToCLI }`
        // const stdout_1 = execSync(command_to_execute_1);
        // console.log(stdout_1)

        // const command_to_execute_2 = `echo $PATH`
        // const stdout_2 = execSync(command_to_execute_2);
        // console.log(stdout_2)

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