import imitter from "../src/index"

type Channel = {
    foo: (arg: string) => Promise<boolean>
    bar: (arg: string) => void
}

const eventBus = imitter<Channel>()

// test1
const fooFunc = async (arg: string) => !!arg
eventBus.on("foo", fooFunc)
eventBus.emit("foo", "Hi imitter")
eventBus.off("foo", fooFunc)

// test1
const barFunc = async (arg: string) => arg + "123"
eventBus.on("bar", barFunc)
eventBus.emit("bar", "Hi imitter")
eventBus.off("bar", barFunc)

// eventBus.on("foo", async (arg: boolean) => {
//     return !arg
// })

// eventBus.emit("foo", 123)
