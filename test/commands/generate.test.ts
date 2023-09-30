import {expect, test} from '@oclif/test'
import sinon from 'sinon'
import Project from '../../src/utils/project'
import Prompt from '../../src/utils/prompt'
import Generate from '../../src/commands/generate'
import Generator from '../../src/utils/generator'

describe('generate', () => {
  let projectMock: sinon.SinonStubbedInstance<Project>
  let promptMock: sinon.SinonStubbedInstance<Prompt>
  let checkDirStub: sinon.SinonStub

  beforeEach(() => {
    projectMock = sinon.createStubInstance(Project)
    promptMock = sinon.createStubInstance(Prompt)
    // eslint-disable-next-line no-negated-condition
    if (!checkDirStub) {
      checkDirStub = sinon.stub(Project.prototype, 'checkDir')
    } else {
      checkDirStub.reset()
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  test
  .stdout()
  .command(['generate'])
  .it('Display an error if not in Vue project directory', ctx => {
    checkDirStub.resolves(false)
    projectMock.checkDir.resolves(false)
    expect(ctx.stdout).to.contain('You are not in a vue project directory')
  })

  test
  .stdout()
  .command(['generate', 'page'])
  .it('generate page if type = "page"', async ctx => {
    const projectMock = sinon.createStubInstance(Project)
    const generatorMock = sinon.createStubInstance(Generator)

    setTimeout(async () => {
      projectMock.checkDir.resolves(true)
      promptMock.page.resolves({pageName: 'TestPage', layoutName: 'TestLayout', path: '/test'})

      const generate = new Generate([], {}, projectMock, promptMock, generatorMock)

      await generate.run()
      expect(ctx.stdout).to.contain('you won\'t to generate: page')
    })
  })
})
