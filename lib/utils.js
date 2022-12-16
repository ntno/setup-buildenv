const core = require('@actions/core');
const os = require('os');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(os_arch) {
    const mappings = {
        x32: '386',
        x64: 'amd64',
        arm64: 'arm64'
    };
    return mappings[os_arch] || os_arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os_platform) {
    const mappings = {
        darwin: 'darwin',
        win32: 'windows',
        linux: 'linux'
    };
    return mappings[os_platform] || os_platform;
}

function mapBinPath(os_platform) {
    const mappings = {
        darwin: '/Users/runner/bin/buildenv',
        win32: core.toWin32Path('/home/runner/bin/buildenv'),
        linux: '/home/runner/bin/buildenv'
    };
    return mappings[os_platform] || 'bin';
}

function getDownloadObject(version) {
    const os_platform = os.platform();
    const mapped_platform = mapOS(os_platform);
    const os_arch = os.arch();
    const mapped_arch = mapArch(os_arch);
    const filename = `buildenv-${ mapped_platform }_${ mapped_arch }-${ version }`;
    const extension = 'tar.gz';
    const binPath = mapBinPath(os_platform);
    const toolPath = os_platform === 'win32' ? [binPath, 'buildenv.exe'].join(core.toWin32Path('/')) : [binPath, 'buildenv'].join('/');
    const url = `https://github.com/Comcast/Buildenv-Tool/releases/download/${ version }/${ filename }.${ extension }`;

    core.debug(`os_platform: ${ os_platform }`);
    core.debug(`mapped_platform: ${ mapped_platform }`)
    core.debug(`os_arch: ${ os_arch }`);
    core.debug(`mapped_arch: ${ mapped_arch }`)
    core.debug(`filename: ${ filename }`)
    core.debug(`binPath: ${ binPath }`)
    core.debug(`toolPath: ${ toolPath }`)
    core.debug(`url: ${url}`)
    return {
        url,
        binPath,
        toolPath
    };
}

module.exports = { getDownloadObject }