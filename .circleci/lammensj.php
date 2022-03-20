<?php

/**
 * @file
 * Deploy personal site.
 */

declare(strict_types = 1);

namespace Deployer;

use Symfony\Component\Console\Input\InputOption;

localhost();

set('deploy_path', sprintf('%s/..', __DIR__));

option('github-token', NULL, InputOption::VALUE_REQUIRED, 'Specify the Github token.');
option('target-repo', NULL, InputOption::VALUE_REQUIRED, 'Specify the target repo.');
option('target-branch', NULL, InputOption::VALUE_REQUIRED, 'Specify the destination branch.');

// Setup GH
task('github:setup', static function () {
  run('git config credential.helper \'cache --timeout=120\'');
  run('git config --global user.email "builds@circleci.com"');
  run('git config --global user.name "CircleCI"');
});

// Clone the repo.
task('github:clone', static function () {
  $branch = input()->getOption('target-branch');
  $repo = input()->getOption('target-repo');
  run(sprintf('git clone --branch=%s git@github.com:%s.git {{deploy_path}}/%s', $branch, $repo, $branch));
});

// Move artifact from build-dir to destination.
task('app:rsync', static function () {
  cd(sprintf('{{deploy_path}}/%s', input()->getOption('target-branch')));
  run('rsync -r --exclude=.git --delete {{deploy_path}}/htdocs/out/ ./');
  run('touch .nojekyll');
  run('cp {{deploy_path}}/README.md ./');
});

// Commit files.
task('app:commit', static function () {
  cd(sprintf('{{deploy_path}}/%s', input()->getOption('target-branch')));
  run('git add -f .');
});

// Push commit quietly, to prevent leaking the access token.
task('app:push', static function () {
  cd(sprintf('{{deploy_path}}/%s', input()->getOption('target-branch')));
  if (run('git commit -m "CircleCI build $CIRCLE_BUILD_NUM pushed to Github Pages"')) {
    run('git push -q');
  }
  else {
    warning('no changes detected');
  }
});

task('app:setup', [
  'github:setup',
  'github:clone',
]);

task('app:deploy', [
  'app:rsync',
  'app:commit',
  'app:push',
]);
