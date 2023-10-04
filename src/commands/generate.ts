import {Args, Command, Flags} from '@oclif/core'
import pc from 'picocolors'
import Project from '../utils/project'
import Prompt from '../utils/prompt'
import Generator from '../utils/generator'
export default class Generate extends Command {
  static description = 'generate component, page, pinia store'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print', default: ''}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    'skip-test': Flags.boolean({char: 's', description: 'skip test file', default: false}),
  }

  static args = {
    type: Args.string({description: 'type of thing to generate (component, page, store)'}),
  }

  project: Project;
  prompt: Prompt;
  generator: Generator;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, max-params
  constructor(argv: string[], config: any, project?: Project, prompt?: Prompt, generator?: Generator) {
    super(argv, config)
    this.project = project || new Project()
    this.prompt = prompt || new Prompt()
    this.generator = generator || new Generator()
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)
    console.log({flags})
    console.log({test: flags['skip-test']})
    const isVueDir = await this.project.checkDir()
    if (!isVueDir) {
      this.log(`${pc.red('[Error]')} You are not in a vue project directory. Please run this command in your vitesse project directory.`)
    } else if (isVueDir && args.type) {
      // this.log(`${pc.green('[Success]')} you won't to generate a ${args.type}`)
      switch (args.type) {
      case 'page': {
        const answers = await this.prompt.page(flags.name)
        this.generator.page(answers.pageName, answers.layoutName, answers.path, flags['skip-test'])

        break
      }

      case 'component': {
        const answers = await this.prompt.component(flags.name)
        this.generator.component(answers.componentName, answers.path, flags['skip-test'])

        break
      }

      case 'store': {
        const answers = await this.prompt.store(flags.nameme)
        this.generator.store(answers.storeName, answers.path, flags['skip-test'])

        break
      }

      default: {
        this.log(`${pc.red('[Error missing argument]')} You must specify a type of thing to generate (component, page, store)`)
        break
      }
      }
    } else if (isVueDir && !args.type) {
      this.log(`${pc.red('[Error missing argument]')} You must specify a type of thing to generate (component, page, store)`)
    }
  }
}
