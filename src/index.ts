#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const shell = require('shelljs')
import {template} from './url';

clear();
console.log(
  chalk.white(
    figlet.textSync('ex-cli', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.1')
  .description("express CLI")
  .parse(process.argv);

let args:Array<string> = program.args;

if(args.length != 2) {
    console.log('use : ex-cli <template-name> <set-name>')
    process.exit(0)
}    

const options = program.opts();

let temp_name:string = args[0];
let set_name:string = args[1];
let url:string = template[temp_name];


    
    let cmd:string = 'git clone https://github.com/minsoo0715/'+url + ' ' + set_name
    let a = shell.exec(cmd);
    if(a.code == 0) {
      cmd = 'rm -rf ' + './' + set_name + '/.git'
      shell.exec(cmd);
    }


if (process.argv.slice(2).length != 2) {
  program.outputHelp();
} 