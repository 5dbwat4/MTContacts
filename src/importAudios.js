// This script will generate audioFiles.js in the same directory.
// audioFiles will import all the audio files in the audio directory.

const fs = require("fs");
const path = require("path");

const audioDir = path.resolve(__dirname, "audios");
const outputFile = path.resolve(__dirname, "audioMap.js");

const files = fs.readdirSync(audioDir);

let imports = "";
let exp = "const audioMap = {\n";

files.forEach((file) => {
  const variableName = `MP3_${file
    .replace(".mp3", "")
    .replace(/[^a-zA-Z0-9]/g, "_")}`;
  imports += `import ${variableName} from './audios/${file}';\n`;
  exp += `  '${file}': ${variableName},\n`;
});

exp += "};\n\nexport default audioMap;\n";

fs.writeFileSync(outputFile, imports + "\n" + exp);

console.log("audioMap.js has been generated.");
