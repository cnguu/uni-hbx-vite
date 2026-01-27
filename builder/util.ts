import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
import type { ProxyOptions } from 'vite'

import fs from 'node:fs'
import { URL, fileURLToPath } from 'node:url'

import { PageContext } from '@uni-helper/vite-plugin-uni-pages'
import chalk from 'chalk'
import consola from 'consola'
import ora from 'ora'
import prettier from 'prettier'

export const getMode = (): string => {
  let ret = process.argv.includes('build') ? 'production' : 'development'
  const modeIndex = process.argv.findIndex((arg) => arg === '--mode')
  if (modeIndex > -1) {
    const mode = process.argv[modeIndex + 1]
    if (mode) {
      ret = mode
    }
  }
  consola.info(`【MODE】${ret}`)
  return ret
}

export const getServerProxy = (list: [string, string][]) => {
  const ret: Record<string, string | ProxyOptions> = {}
  for (const [prefix, target] of list) {
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(/^https:\/\//.test(target) ? { secure: false } : {}),
    }
  }
  return ret
}

export function beautifyJson(obj: any, indent = 2) {
  const styles = {
    key: chalk.cyan.bold,
    string: chalk.green,
    number: chalk.yellow,
    boolean: chalk.magenta.bold,
    null: chalk.gray.italic,
    brace: chalk.white,
    bracket: chalk.white,
    comma: chalk.white,
    colon: chalk.white,
  }

  function processValue(value: any, currentIndent: number) {
    const type = typeof value
    if (value === null) {
      return styles.null('null')
    }
    if (type === 'string') {
      return `${styles.string('"')}${styles.string(value)}${styles.string('"')}`
    }
    if (type === 'number' || type === 'boolean') {
      return type === 'number' ? styles.number(value) : styles.boolean(value)
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${styles.bracket('[')}${styles.bracket(']')}`
      }
      const innerIndent = currentIndent + indent
      const indentStr = ' '.repeat(innerIndent)
      const closingIndent = ' '.repeat(currentIndent)
      const elements = value
        .map((item: any, index: number): string => {
          const isLast = index === value.length - 1
          return `${indentStr}${processValue(item, innerIndent)}${isLast ? '' : styles.comma(',')}`
        })
        .join('\n')
      return `${styles.bracket('[\n')}${elements}\n${closingIndent}${styles.bracket(']')}`
    }
    if (type === 'object') {
      const keys = Object.keys(value)
      if (keys.length === 0) {
        return `${styles.brace('{')}${styles.brace('}')}`
      }
      const innerIndent = currentIndent + indent
      const indentStr = ' '.repeat(innerIndent)
      const closingIndent = ' '.repeat(currentIndent)
      const entries = keys
        .map((key: string, index: number): string => {
          const isLast = index === keys.length - 1
          return `${indentStr}${styles.key('"')}${styles.key(key)}${styles.key('"')}${styles.colon(
            ': ',
          )}${processValue(value[key], innerIndent)}${isLast ? '' : styles.comma(',')}`
        })
        .join('\n')
      return `${styles.brace('{\n')}${entries}\n${closingIndent}${styles.brace('}')}`
    }
    return String(value)
  }

  return processValue(obj, 0)
}

export function scanPageFilter(ctx: PageContext, inKey: 'pages' | 'subPages') {
  // 页面文件结尾
  const pageFlag = '-page.vue'
  if (inKey === 'pages') {
    const keysToRemove: string[] = []
    for (const key of ctx[inKey].keys()) {
      if (!key.endsWith(pageFlag)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => ctx[inKey].delete(key))
  } else if (inKey === 'subPages') {
    for (const subPageMap of ctx[inKey].values()) {
      const keysToRemove: string[] = []
      for (const key of subPageMap.keys()) {
        if (!key.endsWith(pageFlag)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((key) => subPageMap.delete(key))
    }
  }
}

export function handlePageName(ctx: PageContext, inKey: 'pageMetaData' | 'subPageMetaData') {
  const nameRegExp = /[/.-]/g
  if (inKey === 'subPageMetaData') {
    ctx[inKey].forEach((sub) => {
      sub.pages.forEach((page) => {
        if (page.name) return
        page.name = `${sub.root}/${page.path}`.replace(nameRegExp, '_').toUpperCase()
      })
    })
    return
  }
  ctx[inKey].forEach((page) => {
    if (page.name) return
    page.name = page.path.replace(nameRegExp, '_').toUpperCase()
  })
}

export async function writePageConst(ctx: PageContext) {
  const spinner = ora({
    text: chalk.cyan('页面路径常量文件: 正在生成...'),
    spinner: 'dots',
  }).start()
  const pageConstEntries = (
    [
      ...ctx.pageMetaData,
      ...ctx.subPageMetaData
        .map((sub) =>
          sub.pages.map((page) => ({
            ...page,
            path: `${sub.root}/${page.path}`,
          })),
        )
        .flat(),
    ] as PageMetaDatum[]
  ).map((page) => {
    const comment = `/** ${page.style?.navigationBarTitleText || ''} */`
    return `${comment}\n${page.name}: '/${page.path}',\n`
  })
  try {
    const fileContent = `
    /*******************************
     * 此文件由脚本自动生成，请勿手动修改 *
     *******************************/

    /** 页面路径常量 */
    export const PageUrlConst = {\n${pageConstEntries.join('\n')}\n} as const
    `
    const filepath = fileURLToPath(new URL('../constant/pageConst.ts', import.meta.url))
    spinner.text = chalk.cyan('页面路径常量文件: 正在格式化...')
    const prettierConfig = (await prettier.resolveConfig(filepath)) || {}
    const formattedContent = await prettier.format(fileContent, {
      ...prettierConfig,
      parser: 'typescript',
      filepath,
      plugins: [],
    })
    fs.writeFileSync(filepath, formattedContent, {
      encoding: 'utf-8',
    })
    spinner.succeed(
      chalk.green('页面路径常量文件: 生成成功 ') + chalk.blueBright.underline(filepath),
    )
    consola.info(`共 ${chalk.yellow(pageConstEntries.length)} 个页面`)
  } catch (error) {
    spinner.fail(chalk.red('页面路径常量文件: 生成失败'))
    consola.error(error)
    process.exit(1)
  }
}
