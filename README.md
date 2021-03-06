# flux-gen[WIP]
flux component generator

This generator generates some templates for [facebook/flux](https://github.com/facebook/flux) component.

## Installation

```
$ npm install -g https://github.com/shoponpon/flux-gen.git
```

## How to use
### Generate templetes of Actions.js and ActionTypes.js
```
$ flux-gen action [actionname] [dispatcherPath]
```

### Generate a templete of Dispatcher.js
```
$ flux-gen dispatcher
```

### Generate a templete of Store.js
```
$ flux-gen action [storename] [dispatcherPath]
```

## Examples
### Actions.js and ActionTypes.js
#### command
```
$ flux-gen action image ./Dispatcher.js
```
#### output

- ImageActions.js

```
import ImageActionTypes from './ImageActionTypes'
import Dispatcher from './Dispatcher'
const ImageActions = {}
export default ImageActions
```

 - ImageActionTypes.js

```
const ImageActionTypes = {}
export default ImageActionTypes
```

### Store.js
#### command
```
$ flux-gen store image ./Dispatcher.js
```
#### output

- ImageStore.js

```
import { ReduceStore } from 'flux/utils'
import Dispatcher from './Dispatcher'

class ImageStore extends ReduceStore {
  constructor() {
    super(Dispatcher)
  }

  getInitialState() {
    return {}
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        break
    }
    return Object.assign({}, state)
  }
}

export default new ImageStore()
```

### Dispatcher.js
#### command
```
$ flux-gen dispatcher
```

#### output
- Dispatcher.js
```
import { Dispatcher } from 'flux'
export default new Dispatcher()
```

## ToDo
- [x] Action Generator
- [x] Store Generator
- [x] Dispatcher Generator
- [ ] Container Generator
- [ ] Refactoring