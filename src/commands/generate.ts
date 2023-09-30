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
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
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
    const {args} = await this.parse(Generate)
    const isVueDir = await this.project.checkDir()
    if (!isVueDir) {
      this.log(`${pc.red('[Error]')} You are not in a vue project directory. Please run this command in your vitesse project directory.`)
    } else if (isVueDir && args.type) {
      this.log(`${pc.green('[Success]')} you won't to generate a ${args.type}`)
      switch (args.type) {
      case 'page': {
        const answers = await this.prompt.page()
        this.generator.page(answers.pageName, answers.layoutName, answers.path)
        
        break
      }

      case 'component': {
        const answers = await this.prompt.component()
        console.log(answers)

        break
      }

      case 'store': {
        const answers = await this.prompt.store()
        console.log(answers)

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
