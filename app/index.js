'use strict';

const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
  }

  /**
   * Prompt user for system configuration
   */
  prompting() {
    const prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.options.appname // Default to current folder name
    }, {
      type    : 'list',
      name    : 'controlSystemType',
      message : 'Which control system would you like to target?',
      choices: [{
        name: 'Crestron',
        value: 'Crestron'
      }, {
        name: 'AMX',
        value: 'AMX'
      }]
    },{
      type    : 'confirm',
      name    : 'dsp',
      message : 'Does your system include a DSP?'
    }];

    return this.prompt(prompts).then(answers => {
      this.appName = answers.name;
      this.controlSystem = answers.controlSystemType;
      this.hasDsp = answers.dsp;
    });
  }

  /**
   * Write content to job folder
   */
  writing() {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath(this.appName, '.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.appName, '.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('readme'),
      this.destinationPath(this.appName, 'README.md'),
      {
        title: this.appName,
        description: `This ${this.controlSystem} readme document was created on ${new Date().toLocaleString()} using Yoeman ${pkg.name} v${pkg.version}`
      }
    );

    // default folders
    const folders = ['Source Code', 'Documentation'];

    // add dsp folder and files
    if(this.hasDsp) {
      folders.push('Source Code/DSP');
    }

    // add AMX type folders and files
    if(this.controlSystem == 'AMX') {
      folders.push('Source Code/AMX/Include');
      folders.push('Source Code/AMX/IR');
      folders.push('Source Code/AMX/Module');
      folders.push('Source Code/AMX/Other');
      folders.push('Source Code/AMX/Source');
      folders.push('Source Code/AMX/User Interface');
    }

    // add Crestron type folders and files
    if(this.controlSystem == 'Crestron') {
      folders.push('Source Code/Crestron/Source');
      folders.push('Source Code/Crestron/User Interface');
      this.fs.copy(
        this.templatePath('address-book.xadr'),
        this.destinationPath(this.appName + '/Source Code/Crestron', this.appName + '.xadr')
      );
    }

    // loop through each item in the folder array and add to the project
    folders.forEach(e => {
      const folderName = e.split('/');
      mkdirp(`${this.appName}/${e}/`, (err) => {
        if(!err){
          fs.writeFileSync(`${this.appName}/${e}/README.md`, `# ${folderName[folderName.length - 1]}`, 'utf8');
        }
      });
    });
  }

  /**
   * Finish up by initialising the folder as a git repo
   */
  end() {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath(this.appName)
    });
  }
};