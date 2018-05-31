#!/usr/bin/env node
const fs = require('fs')

if (process.argv.length < 3) {
  console.log(`flux-gen [command] [options]: command not found`)
  return
}
const type = process.argv[2]

function fixName(str) {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace(/[-_](.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

function createAction(name, dispatcherPath) {
  dispatcherPath = dispatcherPath.slice(0,-3)
  name = fixName(name)
  const actionPath = `${process.cwd()}/${name}Actions.js`
  const actionTypePath = `${process.cwd()}/${name}ActionTypes.js`
  fs.writeFileSync(actionTypePath, `const ${name}ActionTypes = {}\nexport default ${name}ActionTypes\n`)
  fs.writeFileSync(actionPath, `import ${name}ActionTypes from './${name}ActionTypes'\nimport Dispatcher from '${dispatcherPath}'\nconst ${name}Actions = {}\nexport default ${name}Actions\n`)
}

function createStore(name, dispatcherPath) {
  dispatcherPath = dispatcherPath.slice(0,-3)
  name = fixName(name)
  const storePath = `${process.cwd()}/${name}Store.js`
  fs.writeFileSync(storePath, `import { ReduceStore } from 'flux/utils'\nimport Dispatcher from '${dispatcherPath}'\n\nclass ${name}Store extends ReduceStore {\n  constructor() {\n    super(Dispatcher)\n  }\n\n  getInitialState() {\n    return {}\n  }\n\n  reduce(state, action) {\n    switch (action.type) {\n      default:\n        break\n    }\n    return Object.assign({}, state)\n  }\n}\n\nexport default new ${name}Store()`)
}

function createDispatcher() {
  const dispatcherPath = `${process.cwd()}/Dispatcher.js`
  fs.writeFileSync(dispatcherPath, `import { Dispatcher } from 'flux'\nexport default new Dispatcher()`)
}

switch (type) {
  case "action":
    {
      if (process.argv.length < 5) {
        console.log(`flux-gen action [name] [dispatcherPath]: name or dispatcherPath not found`)
        break
      }
      const name = process.argv[3]
      const dispatcherPath = process.argv[4]
      createAction(name, dispatcherPath)
      break
    }
  case "store":
    {
      if (process.argv.length < 5) {
        console.log(`flux-gen store [name] [dispatcherPath]: name or dispatcherPath not found`)
        break
      }
      const name = process.argv[3]
      const dispatcherPath = process.argv[4]
      createStore(name, dispatcherPath)
      break
    }
  case "dispatcher":
    {
      createDispatcher()
      break
    }
  default:
    console.log(`${type}: command not found`)
}