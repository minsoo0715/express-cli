#!/usr/bin/env ts-node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const shell = require('shelljs')
import { OptionValues } from 'commander';
import {template} from './url';

clear();
console.log(
  chalk.white(
    figlet.textSync('ex-cli', { horizontalLayout: 'full' })
  )
);

program
  .version('1.0.0')
  .usage('[template-name] [own-name] [option]')
  .description("express CLI")
  .option('-l --language <lan>', 'set language mode(js/ts)')
  .parse(process.argv);

let args:Array<string> = program.args;

if(args.length != 2) {
    console.log('use : ex-cli <template-name> <set-name>')
    process.exit(0)
}    

const options:OptionValues = program.opts();
let lang:string = '';
if(options.language  == 'js' || options.language == undefined) {
  lang = 'js';
}else if(options.language == 'ts') {
  lang = 'ts';
}else {
  program.outputHelp();
  process.exit(1);
}

let temp_name:string = args[0];
let set_name:string = args[1];  
let url:string = template[temp_name][lang];


    
    let cmd:string = 'git clone https://github.com/minsoo0715/'+url + ' ' + set_name
    let execute = shell.exec(cmd);
    if(execute.code == 0) {
      cmd = 'rm -rf ' + './' + set_name + '/.git'
      execute = shell.exec(cmd);
      if(execute.code != 0) {
        console.error('error : ', execute.stderr);
      }
    }

 
