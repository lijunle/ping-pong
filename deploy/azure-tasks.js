import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import mkdirp from 'mkdirp';

function writeFile(filePath, content) {
  const fileDir = path.dirname(filePath);
  return new Promise((resolve, reject) =>
    mkdirp(fileDir, error =>
      error ? reject(error) : fs.writeFile(filePath, content, resolve)));
}

function generateServer() {
  const serverPath = path.resolve(__dirname, '../server.js');
  const content = 'require("./dist/index");';
  return writeFile(serverPath, content);
}

function generateJob() {
  const nodePath = path.resolve(__dirname, '../node.cmd');
  const jobPath = path.resolve(__dirname, '../dist/job.js');
  const runPath = path.resolve(__dirname, '../App_Data/jobs/continuous/depcheck/run.cmd');
  const content = `"${nodePath}" "${jobPath}"`;
  return writeFile(runPath, content);
}

function runTasks() {
  return Promise.all([
    generateServer(),
    generateJob(),
  ]);
}

gulp.task('azure-tasks', () => runTasks());
