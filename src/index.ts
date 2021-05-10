#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const shell = require('shelljs')

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

interface temp_interface {
    [key:string]: string;
}

const options = program.opts();
const temp: temp_interface = {
    ejs : 'express-ejs--template.git'
};
let temp_name:string = args[0];
let set_name:string = args[1];
let url:string = temp[temp_name];

if(set_name === undefined || url === undefined) {
    console.error("arguments lack err")
    process.exit(1);
}
    
    const cmd:string = 'git clone https://github.com/minsoo0715/'+url + ' ' + set_name
    shell.exec(cmd);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}