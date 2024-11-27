# 在任意位置运行ts

## 前言
在开发过程中，调试运行ts文件，通常需要在大型框架下启动运行；有时只是想测试一下简单的ts代码，启动大型框架显得有些繁琐，因此需要一种简单的方式运行ts代码。

## 解决方案

1. 使用tsc编译ts文件，然后使用node运行编译后的js文件
2. 使用ts-node直接运行ts文件

### tsc编译ts文件

首先需要先全局安装typescript

```bash
npm install -g typescript
```

然后使用tsc编译目录下的ts文件

```bash
tsc xxx.ts
```

编译完成后，会生成一个同名的js文件，然后使用node运行js文件即可

```bash
node xxx.js
```

### ts-node直接运行ts文件

同样的需要全局安装typescript，另外还需要全局安装ts-node
```bash
npm install -g typescript ts-node
```

安装之后，在配置一个tsconfig.json文件

```bash
tsc --init
```

这个命令会在当前目录下生成一个tsconfig.json文件，然后根据tsconfig.json文件中的配置，编译ts文件

最后使用ts-node运行ts文件即可

```bash
ts-node xxx.ts
```

## 示例
一个直接运行ts的示例

**目录结构**
```bash
├── index.ts
└── tsconfig.json
```

index.ts
```ts
const ico = ["♣","♦","♥","♠"] as const // as const 将数组中的元素变成字面量类型,此时ico的类型为["♣","♦","♥","♠"]而不是string[]
const num = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] as const

// 快速获取数组值的联合类型
type Ico = typeof ico[number]
type Num = typeof num[number]

// 利用笛卡尔积生成扑克牌
function pokers(color:typeof ico,value:typeof num){
  // flatMap 将返回值的数组元素展开添加进最终返回的数组中
  return Array.prototype.flatMap.call(color,(i)=>value.map((item)=>i+item))
}

// 手动生成扑克牌
function poker(ico:Ico,num:Num){
  return `${ico}${num}`
}

console.log( poker("♠","10"))
console.log( pokers(ico,num))


```

tsconfig.json中常用的几个字段有：
- target：编译成哪个版本的js，例如这里的例子使用的ES2022,因为flaMap是比较新的方法，旧的版本不兼容，运行时会产生错误
- module：编译成哪个模块化规范，commonjs,AMD,ES2022等,不过这里并不需要编译ts
具体配置可以参考[官方文档](https://www.typescriptlang.org/tsconfig)

:::details tsconfig.json
```json{2,14,28,81,83,86,109}
{
  "compilerOptions": {
/* 访问 https://aka.ms/tsconfig 了解更多关于该文件的信息 */

    /* 项目 */
    // "incremental": true,                              /* 保存 .tsbuildinfo 文件以实现项目的增量编译。 */
    // "composite": true,                                /* 启用约束，允许将 TypeScript 项目与项目引用一起使用。 */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* 指定 .tsbuildinfo 增量编译文件的路径。 */
    // "disableSourceOfProjectReferenceRedirect": true,  /* 在引用复合项目时禁用优先使用源文件而不是声明文件。 */
    // "disableSolutionSearching": true,                 /* 在编辑时取消多项目引用检查中的某个项目。 */
    // "disableReferencedProjectLoad": true,             /* 减少 TypeScript 自动加载的项目数量。 */

    /* 语言和环境 */
    "target": "ES2022",                                  /* 设置生成的 JavaScript 的 JavaScript 语言版本，并包含兼容的库声明。 */
    // "lib": [],                                        /* 指定一组捆绑的库声明文件，描述目标运行时环境。 */
    // "jsx": "preserve",                                /* 指定生成的 JSX 代码。 */
    // "experimentalDecorators": true,                   /* 启用对传统实验性装饰器的实验性支持。 */
    // "emitDecoratorMetadata": true,                    /* 在源文件中为装饰的声明发出设计类型元数据。 */
    // "jsxFactory": "",                                 /* 指定在目标为 React JSX 时使用的 JSX 工厂函数，例如 'React.createElement' 或 'h'。 */
    // "jsxFragmentFactory": "",                         /* 指定在目标为 React JSX 时用于片段的 JSX Fragment 引用，例如 'React.Fragment' 或 'Fragment'。 */
    // "jsxImportSource": "",                            /* 指定在使用 'jsx: react-jsx*' 时导入 JSX 工厂函数的模块规范符号。 */
    // "reactNamespace": "",                             /* 指定为 'createElement' 调用的对象。仅适用于目标为 'react' JSX 发出。 */
    // "noLib": true,                                    /* 禁用包括任何库文件，包括默认的 lib.d.ts。 */
    // "useDefineForClassFields": true,                  /* 发出符合 ECMAScript 标准的类字段。 */
    // "moduleDetection": "auto",                        /* 控制检测模块格式的方法。 */

    /* 模块 */
    "module": "commonjs",                                /* 指定生成的模块代码。 */
    // "rootDir": "./",                                  /* 指定源文件的根文件夹。 */
    // "moduleResolution": "node10",                     /* 指定 TypeScript 如何从给定的模块规范符号查找文件。 */
    // "baseUrl": "./",                                  /* 指定用于解析非相对模块名称的基本目录。 */
    // "paths": {},                                      /* 指定一组重新映射导入到其他查找位置的条目。 */
    // "rootDirs": [],                                   /* 允许将多个文件夹视为一个文件夹来解析模块。 */
    // "typeRoots": [],                                  /* 指定多个文件夹，它们的行为类似于 './node_modules/@types'。 */
    // "types": [],                                      /* 指定要包含的类型包名称，而不在源文件中引用。 */
    // "allowUmdGlobalAccess": true,                     /* 允许从模块访问 UMD 全局变量。 */
    // "moduleSuffixes": [],                             /* 解析模块时要搜索的文件名后缀列表。 */
    // "allowImportingTsExtensions": true,               /* 允许导入包含 TypeScript 文件扩展名的文件。需要设置 '--moduleResolution bundler'，并且要么设置 '--noEmit'，要么设置 '--emitDeclarationOnly'。 */
    // "rewriteRelativeImportExtensions": true,          /* 将相对导入路径中的 '.ts'、'.tsx'、'.mts' 和 '.cts' 文件扩展名重写为输出文件中的 JavaScript 等效项。 */
    // "resolvePackageJsonExports": true,                /* 在解析包导入时使用 package.json 的 'exports' 字段。 */
    // "resolvePackageJsonImports": true,                /* 在解析导入时使用 package.json 的 'imports' 字段。 */
    // "customConditions": [],                           /* 在解析导入时设置的条件，除了解析器特定的默认条件。 */
    // "noUncheckedSideEffectImports": true,             /* 检查副作用导入。 */
    // "resolveJsonModule": true,                        /* 启用导入 .json 文件。 */
    // "allowArbitraryExtensions": true,                 /* 启用导入具有任何扩展名的文件，前提是存在声明文件。 */
    // "noResolve": true,                                /* 禁止 'import'、'require' 或 '<reference>' 扩展 TypeScript 应该添加到项目中的文件数量。 */

    /* JavaScript 支持 */
    // "allowJs": true,                                  /* 允许 JavaScript 文件成为程序的一部分。使用 'checkJS' 选项从这些文件中获取错误。 */
    // "checkJs": true,                                  /* 在类型检查的 JavaScript 文件中启用错误报告。 */
    // "maxNodeModuleJsDepth": 1,                        /* 指定用于检查 'node_modules' 中的 JavaScript 文件的最大文件夹深度。仅适用于 'allowJs'。 */

    /* 发出 */
    // "declaration": true,                              /* 从 TypeScript 和 JavaScript 文件生成 .d.ts 文件。 */
    // "declarationMap": true,                           /* 为 d.ts 文件创建源映射。 */
    // "emitDeclarationOnly": true,                      /* 仅输出 d.ts 文件，而不输出 JavaScript 文件。 */
    // "sourceMap": true,                                /* 为生成的 JavaScript 文件创建源映射文件。 */
    // "inlineSourceMap": true,                          /* 在生成的 JavaScript 内部包含源映射文件。 */
    // "noEmit": true,                                   /* 禁止从编译中输出文件。 */
    // "outFile": "./",                                  /* 指定将所有输出捆绑到一个 JavaScript 文件中。如果 'declaration' 为 true，则还指定将所有 .d.ts 输出捆绑到一个文件中。 */
    // "outDir": "./",                                   /* 指定所有输出文件的输出文件夹。 */
    // "removeComments": true,                           /* 禁止发出注释。 */
    // "importHelpers": true,                            /* 允许每个项目从 tslib 导入帮助函数，而不是每个文件都包含它们。 */
    // "downlevelIteration": true,                       /* 为迭代发出更符合规范但更冗长且性能较差的 JavaScript。 */
    // "sourceRoot": "",                                 /* 指定调试器查找引用源代码的根路径。 */
    // "mapRoot": "",                                    /* 指定调试器应该在哪里定位映射文件，而不是生成的位置。 */
    // "inlineSources": true,                            /* 在生成的 JavaScript 中包含源代码的源映射。 */
    // "emitBOM": true,                                  /* 在输出文件的开头发出一个 UTF-8 字节顺序标记 (BOM)。 */
    // "newLine": "crlf",                                /* 设置用于发出文件的换行符字符。 */
    // "stripInternal": true,                            /* 禁止发出带有 '@internal' 的声明的声明。 */
    // "noEmitHelpers": true,                            /* 禁止在编译输出中生成自定义帮助函数，如 '__extends'。 */
    // "noEmitOnError": true,                            /* 如果报告了任何类型检查错误，则禁止发出文件。 */
    // "preserveConstEnums": true,                       /* 禁止在生成的代码中擦除 'const enum' 声明。 */
    // "declarationDir": "./",                           /* 指定生成的声明文件的输出目录。 */

    /* 互操作性约束 */
    // "isolatedModules": true,                          /* 确保每个文件都可以安全地进行转译，而不依赖其他导入。 */
    // "verbatimModuleSyntax": true,                     /* 不转换或省略任何未标记为仅类型的导入或导出，确保它们按照 'module' 设置基于输出文件的格式编写。 */
    // "isolatedDeclarations": true,                     /* 要求对导出进行足够的注释，以便其他工具可以轻松生成声明文件。 */
    // "allowSyntheticDefaultImports": true,             /* 允许在模块没有默认导出时使用 'import x from y'。 */
    "esModuleInterop": true,                             /* 发出额外的 JavaScript 以便支持导入 CommonJS 模块。这启用了 'allowSyntheticDefaultImports' 以实现类型兼容性。 */
    // "preserveSymlinks": true,                         /* 禁止解析符号链接为其真实路径。这与 node 中的相同标志相关联。 */
    "forceConsistentCasingInFileNames": true,            /* 确保导入的大小写正确。 */

    /* 类型检查 */
    "strict": true,                                      /* 启用所有严格的类型检查选项。 */
    // "noImplicitAny": true,                            /* 对具有隐含 'any' 类型的表达式和声明启用错误报告。 */
    // "strictNullChecks": true,                         /* 在类型检查时考虑 'null' 和 'undefined'。 */
    // "strictFunctionTypes": true,                      /* 在分配函数时，检查参数和返回值是否是子类型兼容的。 */
    // "strictBindCallApply": true,                      /* 检查 'bind'、'call' 和 'apply' 方法的参数是否与原始函数匹配。 */
    // "strictPropertyInitialization": true,             /* 检查在构造函数中声明但未设置的类属性。 */
    // "strictBuiltinIteratorReturn": true,              /* 使用 'undefined' 而不是 'any' 实例化内置迭代器的 'TReturn' 类型。 */
    // "noImplicitThis": true,                           /* 当 'this' 给定类型 'any' 时启用错误报告。 */
    // "useUnknownInCatchVariables": true,               /* 默认情况下，将 catch 子句变量视为 'unknown'，而不是 'any'。 */
    // "alwaysStrict": true,                             /* 确保始终发出 'use strict'。 */
    // "noUnusedLocals": true,                           /* 启用未使用的局部变量的错误报告。 */
    // "noUnusedParameters": true,                       /* 当函数参数未使用时引发错误。 */
    // "exactOptionalPropertyTypes": true,               /* 将可选属性类型解释为编写的类型，而不是添加 'undefined'。 */
    // "noImplicitReturns": true,                        /* 对函数中没有显式返回的代码路径启用错误报告。 */
    // "noFallthroughCasesInSwitch": true,               /* 对 switch 语句中的穿透情况启用错误报告。 */
    // "noUncheckedIndexedAccess": true,                 /* 使用索引访问时，将 'undefined' 添加到类型中。 */
    // "noImplicitOverride": true,                       /* 确保派生类中的重写成员标记为 override。 */
    // "noPropertyAccessFromIndexSignature": true,       /* 强制使用索引访问器来访问使用索引类型声明的键。 */
    // "allowUnusedLabels": true,                        /* 禁用未使用标签的错误报告。 */
    // "allowUnreachableCode": true,                     /* 禁用无法访问的代码的错误报告。 */

    /* 完整性 */
    // "skipDefaultLibCheck": true,                      /* 跳过 TypeScript 包含的 .d.ts 文件的类型检查。 */
    "skipLibCheck": true                                 /* 跳过对所有 .d.ts 文件的类型检查。 */
  }
}

```
:::

