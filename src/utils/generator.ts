
import * as fs from 'node:fs'
// import * as path from 'node:path'
import pc from 'picocolors'

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
    const componentPath =  `${path}/${componentName.toLocaleLowerCase()}.vue`
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

    if (!fs.existsSync(`${path}/${componentName.toLocaleLowerCase()}`)) {
      fs.mkdirSync(`${path}/${componentName.toLocaleLowerCase()}`, 0o744)
    }

    fs.writeFile(componentPath, componentContent, err => {
      if (err) throw err
      console.log(pc.green(`[Success] component ${componentName} created`))
    })
  }
}
