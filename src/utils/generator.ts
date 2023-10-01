import * as fs from 'node:fs'
// import * as path from 'node:path'
import pc from 'picocolors'
const toCamelCase = function (str:string) {
  return str.replace(/\b(\w)/g, function (match, capture) {
    return capture.toUpperCase()
  }).replace(/\s+/g, '')
}

export default class Generator {
  async page(pageName: string, layoutName: string | undefined, path: string): Promise<void> {
    const pagePath =  `${path}/${pageName.toLocaleLowerCase()}/index.vue`
    const pageContent = `
<script setup lang="ts">

</script>

<template>
    <div>
        <h1>${pageName.toLocaleUpperCase()} Page</h1>
    </div>
</template>

${layoutName ? `<route lang="yaml">
meta:
  layout: ${layoutName.toLocaleLowerCase()}
</route>
` : ''}`

    if (!fs.existsSync(`${path}`)) {
      console.log(pc.red(`[Error] path ${path} not exist`))
      return
    }

    if (!fs.existsSync(`${path}/${pageName.toLocaleLowerCase()}`)) {
      fs.mkdirSync(`${path}/${pageName.toLocaleLowerCase()}`, 0o744)
    }

    fs.writeFile(pagePath, pageContent, err => {
      if (err) throw err
      console.log(pc.green(`[Success] page ${pageName} created`))
    })
  }

  async component(componentName: string, path: string): Promise<void> {
    const componentPath =  `${path}/${toCamelCase(componentName)}.vue`
    const componentContent = `
<script setup lang="ts">
</script>

<template>
    <div>
        <h1>${componentName.toLocaleUpperCase()} Component</h1>
    </div>
</template>

<style scoped lang="scss">

</style>
`
    if (!fs.existsSync(`${path}`)) {
      console.log(pc.red(`[Error] path ${path} not exist`))
    }

    fs.writeFile(componentPath, componentContent, err => {
      if (err) throw err
      console.log(pc.green(`[Success] component ${componentName} created`))
    })
  }

  async store(storeName: string, path: string): Promise<void> {
    const storePath =  `${path}/${storeName.toLocaleLowerCase()}.ts`
    const storeContent = `
import { acceptHMRUpdate, defineStore } from 'pinia';

export const use${toCamelCase(storeName)}Store = defineStore(('${storeName.toLowerCase()}'),{

  state: () => ({
    // votre état initial ici
  }),

  getters: {
    // vos getters ici
  },

  actions: {
    // vos actions ici
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(use${toCamelCase(storeName)}Store, import.meta.hot))
        `
    if (!fs.existsSync(`${path}`)) {
      console.log(pc.red(`[Error] path ${path} not exist`))
    }

    fs.writeFile(storePath, storeContent, err => {
      if (err) throw err
      console.log(pc.green(`[Success] store ${storeName} created`))
    })
  }
}
