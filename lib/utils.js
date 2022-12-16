const core = require('@actions/core');
const os = require('os');
const path = require('path');

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

function getDownloadObject(version) {
    const os_platform = os.platform();
    const mapped_platform = mapOS(os_platform);
    const os_arch = os.arch();
    const mapped_arch = mapArch(os_arch);
    const filename = `buildenv-${ mapped_platform }_${ mapped_arch }-${ version }`;
    const extension = 'tar.gz';
    const linux_bin_path = '/home/runner/bin/buildenv';
    const windows_bin_path = core.toWin32Path(linux_bin_path);
    const binPath = os_platform === 'win32' ? windows_bin_path : linux_bin_path;
    const toolPath = os_platform === 'win32' ? [windows_bin_path, 'buildenv.exe'].join(core.toWin32Path('/')) : [linux_bin_path, 'buildenv'].join('/');
    const url = `https://github.com/Comcast/Buildenv-Tool/releases/download/${ version }/${ filename }.${ extension }`;

    core.debug(`os_platform: ${ os_platform }`);
    core.debug(`mapped_platform: ${ mapped_platform }`)
    core.debug(`os_arch: ${ os_arch }`);
    core.debug(`mapped_arch: ${ mapped_arch }`)
    core.debug(`filename: ${ filename }`)
    core.debug(`binPath: ${ binPath }`)
    core.debug(`url: ${url}`)
    return {
        url,
        binPath,
        toolPath
    };
}

module.exports = { getDownloadObject }