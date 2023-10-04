import {expect} from 'chai'
import sinon from 'sinon'
import * as inquirer from '@inquirer/prompts'
import Project from '../../src/utils/project' // Mettez à jour le chemin vers votre classe Project
import Prompt from '../../src/utils/prompt' // Mettez à jour le chemin vers votre classe Prompt

describe('Prompt', () => {
  let prompt: Prompt
  let inputStub: sinon.SinonStub
  let confirmStub: sinon.SinonStub
  let selectStub: sinon.SinonStub
  let getLayoutsStub: sinon.SinonStub

  beforeEach(() => {
    prompt = new Prompt()
    inputStub = sinon.stub(inquirer, 'input')
    confirmStub = sinon.stub(inquirer, 'confirm')
    selectStub = sinon.stub(inquirer, 'select')
    getLayoutsStub = sinon.stub(Project.prototype, 'getLayouts') // Stubbing the getLayouts method
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should handle page prompts correctly', async () => {
    inputStub.onFirstCall().resolves('TestPage')
    inputStub.onSecondCall().resolves('/path/to/pages')
    confirmStub.resolves(true)
    getLayoutsStub.resolves([{name: 'Layout1', value: 'layout1'}])
    selectStub.resolves('layout1')

    const result = await prompt.page('')

    expect(result).to.deep.equal({
      pageName: 'TestPage',
      layoutName: 'layout1',
      path: '/path/to/pages',
    })
  })

  it('should handle component prompts correctly', async () => {
    inputStub.onFirstCall().resolves('TestComponent')
    inputStub.onSecondCall().resolves('/path/to/components')

    const result = await prompt.component('')

    expect(result).to.deep.equal({
      componentName: 'TestComponent',
      path: '/path/to/components',
    })
  })

  it('should handle store prompts correctly', async () => {
    inputStub.onFirstCall().resolves('TestStore')
    inputStub.onSecondCall().resolves('/path/to/stores')

    const result = await prompt.store('')

    expect(result).to.deep.equal({
      storeName: 'TestStore',
      path: '/path/to/stores',
    })
  })
})
