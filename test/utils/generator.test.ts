import {expect} from 'chai'
import mockFs from 'mock-fs'
import sinon from 'sinon'
import Generator from '../../src/utils/generator' // Mettez à jour le chemin vers votre classe Generator

describe('Generator', () => {
  let generator: Generator
  let consoleLogSpy: sinon.SinonSpy

  beforeEach(() => {
    generator = new Generator()
    consoleLogSpy = sinon.spy(console, 'log')
  })

  afterEach(() => {
    mockFs.restore() // Restaure le système de fichiers à son état original
    sinon.restore()
  })

  it('should generate a new page', async () => {
    mockFs({
      '/path/to/pages': {},
    })

    await generator.page('MyPage', 'MainLayout', '/path/to/pages', false)

    // Vérifiez les appels de log pour s'assurer que la page a été créée
    expect(consoleLogSpy.calledWith(sinon.match('[Success] page MyPage created at /path/to/pages/mypage/index.vue'))).to.be.true
  })

  it('should generate a new component', async () => {
    mockFs({
      '/path/to/components': {},
    })

    await generator.component('MyComponent', '/path/to/components', false)

    // Vérifiez les appels de log pour s'assurer que le composant a été créé
    expect(consoleLogSpy.calledWith(sinon.match('[Success] component MyComponent created at /path/to/components/MyComponent.vue'))).to.be.true
  })

  it('should generate a new store', async () => {
    mockFs({
      '/path/to/stores': {},
    })

    await generator.store('MyStore', '/path/to/stores', false)

    // Vérifiez les appels de log pour s'assurer que le store a été créé
    expect(consoleLogSpy.calledWith(sinon.match('[Success] store MyStore created at /path/to/stores/mystore.ts'))).to.be.true
  })

  // ... Vous pouvez ajouter plus de cas de test selon vos besoins
})
