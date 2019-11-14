
// 8. --- create one method to create projet directory ---

let fs = require('fs');
let path = require('path');

class CreateProject {
  constructor(rootPath, projectName) {
    this.rootPath  = rootPath;
    this.projectName = projectName;
    this.subFiles = ['images', 'css', 'js', 'index.html']
  }
  initProject() {
    // create directory
    let projectPath = path.join(this.rootPath, this.projectName);
    console.log(projectPath);
    fs.mkdirSync(projectPath);
    // create subfiles sub directories
    this.subFiles.forEach((fileName) => {
      // console.log(fileName);
      // console.log(path.extname(fileName));
      if('' === path.extname(fileName)) {
        let dirPath = path.join(projectPath, fileName);
        fs.mkdirSync(dirPath);
      } else {
        let filePath = path.join(projectPath, fileName);
        fs.writeFileSync(filePath, '');
      }
    })
  }
}

let cp = new CreateProject(__dirname, 'rick');
cp.initProject();