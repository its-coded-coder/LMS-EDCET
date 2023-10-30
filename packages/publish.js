const path = require('path');
const execSync = require('child_process').execSync;
const versionTools = require('./kolibri-tools/lib/version');

/*
 * Step 1 - Set the version of the kolibri package by the current Kolibri version
 */

const version = versionTools.setVersion(
  path.resolve(__dirname, 'kolibri-core-for-export/package.json')
);

/*
 * Step 2 - Set the version of the kolibri-tools package by the current Kolibri version
 */

versionTools.setVersion(path.resolve(__dirname, 'kolibri-tools/package.json'), version);

/*
 * Step 3 - Set the version of the eslint-plugin-kolibri package by the current Kolibri version
 */

versionTools.setVersion(path.resolve(__dirname, 'eslint-plugin-kolibri/package.json'), version);

/*
 * Step 4 - Set version of the browserslist-config-kolibri package by the current Kolibri version
 */

versionTools.setVersion(
  path.resolve(__dirname, 'browserslist-config-kolibri/package.json'),
  version
);

/*
 * Step 5 - Set version of kolibri-tools' kolibri dependency, eslint-plugin-kolibri dependency,
 * and browserslist-config-kolibri dependency
 */

versionTools.setDependencyVersion(
  'kolibri',
  path.resolve(__dirname, 'kolibri-tools/package.json'),
  version
);
versionTools.setDependencyVersion(
  'eslint-plugin-kolibri',
  path.resolve(__dirname, 'kolibri-tools/package.json'),
  version
);

versionTools.setDependencyVersion(
  'browserslist-config-kolibri',
  path.resolve(__dirname, 'kolibri-tools/package.json'),
  version
);

/*
 * Step 6 - Set the version of hashi's browserslist-config-kolibri dependency
 */
versionTools.setDependencyVersion(
  'browserslist-config-kolibri',
  path.resolve(__dirname, 'hashi/package.json'),
  version
);

// If the version is a prerelease use the 'next' tag to prevent auto upgrades, otherwise use latest.
const tag = versionTools.isPrerelease(version) ? 'next' : 'latest';

const currentCwd = process.cwd();

process.chdir(path.resolve(__dirname, '..'));

function publishCommand(workspace) {
  execSync(`yarn workspace ${workspace} publish --new-version ${version} --tag ${tag}`, {
    stdio: 'inherit',
  });
}

['browserslist-config-kolibri', 'eslint-plugin-kolibri', 'kolibri', 'kolibri-tools'].forEach(
  publishCommand
);

process.chdir(currentCwd);
