import {expect} from 'chai'
import mockFs from 'mock-fs'
import Project from '../../src/utils/project' // Mettez à jour le chemin vers votre classe Project

describe('Project', () => {
  let project: Project

  beforeEach(() => {
    project = new Project()
  })

  afterEach(() => {
    mockFs.restore() // Restaure le système de fichiers à son état original
  })

  it('should return true if the directory is a Vue project', async () => {
    // Simuler un environnement de projet Vue
    mockFs({
      './package.json': JSON.stringify({
        dependencies: {vue: 'version'},
        devDependencies: {vite: 'version', 'vite-plugin-pages': 'version'},
      }),
    })

    const result = await project.checkDir()
    expect(result).to.be.true
  })

  it('should return false if the directory is not a Vue project', async () => {
    // Simuler un environnement qui n'est pas un projet Vue
    mockFs({
      './package.json': JSON.stringify({
        dependencies: {},
        devDependencies: {},
      }),
    })

    const result = await project.checkDir()
    expect(result).to.be.false
  })

  it('should list layouts', async () => {
    // Simuler un répertoire de layouts
    mockFs({
      './src/layouts': {
        'MainLayout.vue': 'some content',
        'OtherLayout.vue': 'some content',
      },
    })

    const layouts = await project.getLayouts()
    expect(layouts).to.deep.equal([
      {name: 'MainLayout', value: 'MainLayout'},
      {name: 'OtherLayout', value: 'OtherLayout'},
    ])
  })
})
