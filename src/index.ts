/*
 * @Author: elmeet
 * @Date:   2020-12-10 19:19:13
 * @Last Modified by: elmeet
 * @Last Modified time: 2021-05-08 17:19:20
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Parameter<T extends (args: any) => any> = T extends (args: infer P) => any
    ? P
    : never

export type EventHandlerType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [str: string]: (...arg: any) => any
}

export type Handler<T extends EventHandlerType, K extends keyof T> = T[K]

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlerList<T extends EventHandlerType> = Array<Handler<T, keyof T>>

export type HandlerMap<T extends EventHandlerType> = Map<
    keyof T,
    HandlerList<T>
>

export interface Emitter<T extends EventHandlerType> {
    on<K extends keyof T>(type: K, handler: T[K]): void

    off<K extends keyof T>(type: K, handler: T[K]): void

    emit<K extends keyof T>(
        type: K,
        ...params: Parameter<Handler<T, K>>[]
    ): void
}

export default function emitter<T extends EventHandlerType>(
    all?: HandlerMap<T>
): Emitter<T> {
    type EventType = keyof T
    type Handler<K extends EventType> = T[K]

    const _all = all || new Map()
    return {
        on<P extends EventType>(type: P, handler: Handler<P>): void {
            const handlers = _all.get(type)
            const added = handlers && handlers.push(handler)
            if (!added) {
                _all.set(type, [handler])
            }
        },
        off<P extends EventType>(type: P, handler: Handler<P>): void {
            const handlers = _all.get(type)
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1)
            }
        },
        emit<P extends EventType>(
            type: P,
            ...params: Parameter<Handler<P>>[]
        ): void {
            const handlers = _all.get(type) as Handler<EventType>[]
            if (handlers) {
                for (const handler of handlers) {
                    handler(...params)
                }
            }
        },
    }
}
