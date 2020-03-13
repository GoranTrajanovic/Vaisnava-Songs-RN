const fs = require("fs");

const files = fs.readdirSync("../songs/all");

console.log(files);