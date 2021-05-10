#!/usr/bin/env node
"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
var shell = require('shelljs');
clear();
console.log(chalk.white(figlet.textSync('ex-cli', { horizontalLayout: 'full' })));
program
    .version('0.0.1')
    .description("express CLI")
    .parse(process.argv);
var args = program.args;
if (args.length != 2) {
    console.log('use : ex-cli <template-name> <set-name>');
    process.exit(0);
}
var options = program.opts();
var temp = {
    ejs: 'express-ejs--template.git'
};
var temp_name = args[0];
var set_name = args[1];
var url = temp[temp_name];
if (set_name === undefined || url === undefined) {
    console.error("arguments lack err");
    process.exit(1);
}
var cmd = 'git clone https://github.com/minsoo0715/' + url + ' ' + set_name;
shell.exec(cmd);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
