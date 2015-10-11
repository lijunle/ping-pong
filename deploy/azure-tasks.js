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

gulp.task('azure-tasks', () => generateServer());
