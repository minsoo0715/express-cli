#!/usr/bin/env ts-node
import chalk from "chalk";
import program from "commander";
import { OptionValues } from "commander";
import url from "./url";
import path from "path";

import shell from "shelljs";
const clear = require("clear");
const figlet = require("figlet");

clear();
console.log(
  chalk.white(figlet.textSync("ex-cli", { horizontalLayout: "full" }))
);
program
  .version("2.0.0")
  .usage("[template-name] [own-name] [option]")
  .description("express CLI")
  .option("-l --language <lan>", "set language mode(js/ts)")
  .parse(process.argv);

let args: Array<string> = program.args;

if (args.length != 2) {
  console.log("use : ex-cli <template-name> <set-name>");
  process.exit(0);
}

const options: OptionValues = program.opts();
let lang: string = "";
if (options.language == "js" || options.language == undefined) {
  lang = "js";
} else if (options.language == "ts") {
  lang = "ts";
} else {
  program.outputHelp();
  process.exit(1);
}

let temp_name: string = args[0];
let set_name: string = args[1];
shell.exec(`mkdir ${set_name}`, (code, stdout, stderr) => {
  if (code != 0) {
    console.error("error : ", stderr);
    return;
  }
  shell.cd(set_name)
  shell.exec(
    `git init && git config core.sparseCheckout true`,
    (code, stdout, stderr) => {
      if (code != 0) {
        console.error("error : ", stderr);
        return;
      }
      shell.exec(
        `git remote add -f origin ${url}`,
        (code, stdout, stderr) => {
          if (code != 0) {
            console.error("error : ", stderr);
            return;
          }
          shell.exec(
            `echo "${temp_name}/${lang}"> .git/info/sparse-checkout`,
            (code, stdout, stderr) => {
              if (code != 0) {
                console.error("error : ", stderr);
                return;
              }
              shell.exec(`git pull origin master`, (code, stdout, stderr) => {
                if (code != 0) {
                  console.error("error : ", stderr);
                  return;
                }
                shell.cd("../")
                shell.exec(`mv ./${set_name}/${temp_name}/${lang}/* ./${set_name} && rm -rf ./${set_name}/${temp_name} ./${set_name}/.git`, (code, stdout, stderr) => {
                  return;
                })
              });
            }
          );
        }
      );
    }
  );
});
