#!/usr/bin/env node

const yargs = require("yargs");
const { execSync } = require("child_process");
const commandResultHandler = require("./handle-command-result");

const start = () => {
    yargs
        .command(
            "create <type>",
            "Create a new module",
            (yargs) => {
                yargs.positional("type", {
                    describe:
                        "Type of module (bm for Backend, fm for Frontend)",
                    choices: ["bm", "fm"],
                });
            },
            (argv) => {
                commandResultHandler.handleCreateModuleCommand(argv);
            }
        )
        .command(
            "delete <type>",
            "Delete a module",
            (yargs) => {
                yargs.positional("type", {
                    describe:
                        "Type of module (bm for Backend, fm for Frontend)",
                    choices: ["bm", "fm"],
                });
            },
            (argv) => {
                commandResultHandler.handleDeleteModuleCommand(argv);
            }
        )
        .help().argv;
};

start();
