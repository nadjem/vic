[![TEST CI](https://github.com/nadjem/vic/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/nadjem/vic/actions/workflows/test.yml)
# vic 
### Vue Interactive Cli version 0.0.7β
A vitesse/nuxt/vue 3 cli for generating some stuff.


## Installation

Install vic globally with npm

```bash
 $ npm install vic-generator -g
```

    
## Usage/Examples

generate page

```bash
$ vic generate page
? Choose page name ?
? Use an existing layout ?
? which layout use :
? Choose path to create this page (default src/page/{pageName}/) ?
```

generate component

```bash
$ vic generate component
? Choose component name ?
? Choose path to create this component (default src/component/{componentName}/) ? 
```

generate store

```bash
$ vic generate store (pinia)
? Choose store name ?
? Choose path to create this store (default src/store/{storeName}/) ? 
```
options : 
> --name=someName  

set page, component, store name

>--skip-test  

create page, component, store without test file
## Authors

[Nadjem](https://www.github.com/nadjem)


## License




[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
