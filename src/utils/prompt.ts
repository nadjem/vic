import {input, confirm, select} from '@inquirer/prompts'
import Project from './project'
import * as fs from 'node:fs'
export default class Prompt {
  async page(): Promise<{ pageName: string; layoutName: string | undefined; path: string; }> {
    const pageName = await input({message: 'Choose page name :'})
    const withLayout = await confirm({message: 'use an existing layout?'})

    let layoutName
    let layoutList: { name: string; value: string; }[] = []

    if (withLayout) {
      const project = new Project()
      layoutList = await project.getLayouts()
      layoutName = await select({message: 'Select your layout :', choices: layoutList})
    }

    const path = await input({message: 'Choose path to create this page (default src/page/{pageName}/) :', default: 'src/pages'})
    const answers = {
      pageName,
      layoutName,
      path,
    }
    return answers
  }

  async component(): Promise<{ componentName: string; path: string; }> {
    const componentName = await input({message: 'Choose component name :'})
    const path = await input({message: 'Choose path :', default: 'src/components'})
    const answers = {
      componentName,
      path,
    }
    return answers
  }

  async store(): Promise<{ storeName: string; path: string; }> {
    const storeName = await input({message: 'Choose store name :'})
    const path = await input({message: 'Choose path :', default: 'src/stores'})
    const answers = {
      storeName,
      path,
    }
    return answers
  }
}
