const os = require('os');
const path = require('path');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
    const mappings = {
        x32: '386',
        x64: 'amd64',
        arm64: 'arm64'
    };
    return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
    const mappings = {
        darwin: 'macOS',
        win32: 'windows',
        linux: 'linux'
    };
    return mappings[os] || os;
}

function getDownloadObject(version) {
    const platform = os.platform();
    console.log(`platform: ${platform}`);
    console.log(`mapped platform: ${ mapOS(platform) }`)
    console.log(`arch: ${os.arch()}`);
    console.log(`mapped arch: ${ mapArch(os.arch()) }`)
    const filename = `buildenv-${ mapOS(platform) }__${ mapArch(os.arch()) }-${ version }`;
    const extension = 'tar.gz'; //platform === 'win32' ? 'zip' : 
    const binPath = platform === 'win32' ? 'bin' : path.join(filename, 'bin');
    const url = `https://github.com/Comcast/Buildenv-Tool/releases/download/${ version }/${ filename }.${ extension }`;
    console.log(`url: ${url}`)
    return {
        url,
        binPath
    };
}

module.exports = { getDownloadObject }