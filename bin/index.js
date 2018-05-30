#!/usr/bin/env node
const fs = require('fs')

if (process.argv.length < 3){
  console.log(`flux-gen [command] [options]: command not found`)
  return
}
const type = process.argv[2]

function fixName(str){
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace(/[-_](.)/g, function(match, group1) {
      return group1.toUpperCase();
  });
}

function createAction(name){
  name = fixName(name)
  const actionPath = `${process.cwd()}/${name}Actions.js`
  const actionTypePath = `${process.cwd()}/${name}ActionTypes.js`

  fs.writeFile(actionTypePath, `const ${name}ActionTypes = {}\nexport default ${name}ActionTypes\n`)
  fs.writeFile(actionPath, `import ${name}ActionTypes from './${name}ActionTypes.js'\nconst ${name}Actions = {}\nexport default ${name}Actions\n`)
}

switch(type){
  case "action":
    if (process.argv.length < 4){
      console.log(`flux-gen action [actionname]: actionname not found`)
      break
    }
    const name = process.argv[3]
    createAction(name)
    break
  default:
    console.log(`${type}: command not found`)
}