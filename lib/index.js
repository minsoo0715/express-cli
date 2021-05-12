#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
var shell = require('shelljs');
var url_1 = require("./url");
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
var temp_name = args[0];
var set_name = args[1];
var url = url_1.template[temp_name];
var cmd = 'git clone https://github.com/minsoo0715/' + url + ' ' + set_name;
var a = shell.exec(cmd);
if (a == 0) {
    cmd = 'rm -rf ' + './' + set_name + '/.git';
    shell.exec(cmd);
}
if (process.argv.slice(2).length != 2) {
    program.outputHelp();
}
