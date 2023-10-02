
import {test} from '@oclif/test'
import sinon from 'sinon'
import Project from '../../src/utils/project'
import Prompt from '../../src/utils/prompt'
import Generate from '../../src/commands/generate'
import Generator from '../../src/utils/generator'

describe('Generate Command', () => {
  let projectMock: sinon.SinonStubbedInstance<Project>
  let promptMock: sinon.SinonStubbedInstance<Prompt>
  let generatorMock: sinon.SinonStubbedInstance<Generator>

  beforeEach(() => {
    projectMock = sinon.createStubInstance(Project)
    promptMock = sinon.createStubInstance(Prompt)
    generatorMock = sinon.createStubInstance(Generator)
  })

  // Test constructor
  test.it('should initialize Project, Prompt, and Generator instances', () => {
    const command = new Generate([], {}, projectMock, promptMock, generatorMock)
    sinon.assert.match(command.project, projectMock)
    sinon.assert.match(command.prompt, promptMock)
    sinon.assert.match(command.generator, generatorMock)
  })

  // Test when not in a Vue project directory
  test.it('should show an error if not in a Vue project directory', async () => {
    projectMock.checkDir.resolves(false)
    const command = new Generate([], {}, projectMock, promptMock, generatorMock)

    // Spy on the log method
    sinon.spy(command, 'log')

    await command.run()

    // Check that the log method was called and includes the right message
    const logArgs = (command.log as sinon.SinonSpy).getCall(0).args[0]
    sinon.assert.match(logArgs, /You are not in a vue project directory/)
  })

  // Test for generating 'page'
  test.it('should generate a page when type is "page"', async () => {
    projectMock.checkDir.resolves(true)
    promptMock.page.resolves({pageName: 'TestPage', layoutName: 'TestLayout', path: '/test'})
    const command = new Generate(['page'], {}, projectMock, promptMock, generatorMock)
    await command.run()
    sinon.assert.calledWith(generatorMock.page, 'TestPage', 'TestLayout', '/test')
  })

  // Test for generating 'component'
  test.it('should generate a component when type is "component"', async () => {
    projectMock.checkDir.resolves(true)
    promptMock.component.resolves({componentName: 'TestComponent', path: '/components'})
    const command = new Generate(['component'], {}, projectMock, promptMock, generatorMock)
    await command.run()
    sinon.assert.calledWith(generatorMock.component, 'TestComponent', '/components')
  })

  // Test for generating 'store'
  test.it('should generate a store when type is "store"', async () => {
    projectMock.checkDir.resolves(true)
    promptMock.store.resolves({storeName: 'TestStore', path: '/store'})
    const command = new Generate(['store'], {}, projectMock, promptMock, generatorMock)
    await command.run()
    sinon.assert.calledWith(generatorMock.store, 'TestStore', '/store')
  })

  // Test for missing type argument
  test.it('should show an error if type is missing', async () => {
    projectMock.checkDir.resolves(true)
    const command = new Generate([], {}, projectMock, promptMock, generatorMock)

    // Spy on the log method
    sinon.spy(command, 'log')

    await command.run()

    // Check that the log method was called and includes the right message
    const logArgs = (command.log as sinon.SinonSpy).getCall(0).args[0]
    sinon.assert.match(logArgs.replace(/\\x1B\\[\d;[]*[A-Za-z]/g, ''), /You must specify a type of thing to generate \(component, page, store\)/)
  })
})
