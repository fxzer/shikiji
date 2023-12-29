# shikiji-cli

<Badges name="shikiji-cli" />

在命令行中使用 Shibiki。

## 用法

Shikiji CLI 用法类似 `cat` 命令，但是会对代码块进行高亮。

```bash
npx shikiji-cli README.md
```

## 安装

您也可以全局安装。命令别名 `shikiji-cli`, `shikiji`, `skat` 会被注册。

```bash
npm i -g shikiji-cli

skat src/index.ts
```

## 配置项

### `--theme`

指定主题。默认为 `vitesse-dark`。

```bash
npx shikiji-cli README.md --theme=nord
```

### `--lang`

语言会根据文件后缀自动推断。您可以使用 `--lang` 覆盖它。

```bash
npx shikiji-cli src/index.js --lang=ts
```
