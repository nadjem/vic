
import * as fs from 'node:fs'
import * as path from 'node:path'

export default class Project {
  async checkDir(): Promise<boolean> {
    const dirContents = fs.readdirSync('./')
    if (!dirContents.includes('package.json')) {
      return false
    }

    const fileContents = fs.readFileSync(
      path.join('.', 'package.json'),
      {
        encoding: 'utf-8',
      },
    )
    const data = JSON.parse(fileContents)

    if (data.dependencies.vue && data.devDependencies.vite && data.devDependencies['vite-plugin-pages']) {
      return true
    }

    return false
  }

  async getLayouts(): Promise<{ name: string; value: string; }[]> {
    const dirContents = fs.readdirSync('./src/layouts')
    const layoutList = []
    for (const dirContent of dirContents) {
      if (dirContent.includes('.vue')) {
        layoutList.push({
          value: dirContent.replace('.vue', ''),
          name: dirContent.replace('.vue', ''),
        })
      }
    }

    return layoutList
  }
}
