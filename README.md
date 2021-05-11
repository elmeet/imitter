# imitter

> Functional event emitter / pubsub. 简易 typescript 事件发布订阅。

## install

```
$ npm install --save imitter
```

```javascript
// using ES6 modules
import imitter from "imitter"

// using CommonJS modules
var imitter = require("imitter")
```

## Useage

### Typescript

```ts
import imitter from "imitter"

// Definition type
type Channel = {
    foo: (arg: string) => Promise<boolean>
    bar: (arg: string) => void
}

const eventBus = imitter<Channel>()

// Use
const fooFunc = async (arg: string) => !!arg
eventBus.on("foo", fooFunc)
eventBus.emit("foo", "Hi imitter")
eventBus.off("foo", fooFunc)

// Automatic tips type
// emitter.on("foo
// on(type: "foo", handler: (arg: string) => Promise<boolean>): void

// The wrong type will throw an error
// Error: Argument of type '(arg: boolean) => Promise<boolean>' is not assignable to parameter of type '(arg: string) => Promise<boolean>'.ts(2345)
eventBus.on("foo", async (arg: boolean) => {
    return !arg
})

// Error: Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
eventBus.emit("foo", 123)
```
