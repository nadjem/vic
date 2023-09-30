
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
}
