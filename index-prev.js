#!/usr/bin/env node

const yargs = require("yargs");
const inquirer = require("inquirer");

const { argv } = yargs(process.argv);

console.log(argv);

const printFiveModes = async (pokemonName) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();

    const fiveModes = data.moves.map((move) => move.move.name).slice(0, 5);
    console.log(fiveModes);
};

const prompt = inquirer.createPromptModule();

prompt([
    {
        type: "input",
        name: "pokemonName",
        message: "Enter the name of a pokemon:",
    },
]).then((answers) => {
    const pokemonName = answers.pokemonName;
    printFiveModes(pokemonName);
});
