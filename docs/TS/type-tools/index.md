# 常用的 TS 类型工具

--- 

介绍一些常用的 TS 类型工具。

## Record

`Record<K extends 'string' | 'number' | 'symbol', T>` 返回一个对象类型，其键为 `K`，值为 `T`。

:::warning 注意
参数Keys的类型必须兼容 `string|number|symbol`
:::

```ts
type T = Record<"a" | "b", number>;
// { a: number, b: number }
// { a: number, b: number }
type T = Record<"string",any>;
// 一个对象，其键为字符串，值为any。常用来表示任意的普通对象
```

## Omit

`Omit<T, K>` 返回一个 T 排除了 K 属性以外的属性，组成的新对象类型。

```ts
type T = Omit<{ a: number, b: string, c: boolean }, "b">;
// { a: number, c: boolean }
type T = Omit<{ a: number, b: string, c: boolean }, "b" | "c">;
// { a: number }
```

## Pick

`Pick<T, K>` 返回一个 T 中包含 K 的属性，组成的新对象类型。

```ts
type T = Pick<{ a: number, b: string, c: boolean }, "a" | "c">;
// { a: number, c: boolean }
type T = Pick<{ a: number, b: string, c: boolean }, "a">;
// { a: number }
```

## Readonly

`Readonly<T>` 返回一个 T 的所有属性都为只读的类型。

```ts
type T = Readonly<{ a: number, b: string, c: boolean }>;
// { readonly a: number, readonly b: string, readonly c: boolean }
```

## Required

`Required<T>` 返回一个 T 的所有属性都为必选的类型。

```ts
type T = Required<{ a?: number, b?: string, c: boolean }>;
// { a: number, b: string, c: boolean }
```
## Awaited

`Awaited<T>` 返回一个 T 的 promise 的返回值的类型。
:::tip 说明
支持嵌套的 promise，非 promise 类型会直接返回本身。
:::

```ts
type T = Awaited<Promise<number>>;
// number
type T = Awaited<Promise<Promise<number>>>;
// number
type T = Awaited<number>;
// number
```