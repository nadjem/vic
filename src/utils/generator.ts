
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

    console.log(pc.green(`generate page ${pageName} in ${path}`))
    fs.writeFile(pagePath, pageContent, err => {
      if (err) throw err
      console.log(pc.green(`generate page ${pageName} success`))
    })
  }
}
