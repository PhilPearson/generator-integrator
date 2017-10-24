# generator-integrator

> Quickly create your integrator control system folder structure.
> A generator for [Yeoman](http://yeoman.io).

To install [generator-integrator](https://bitbucket.org/philpearson/generator-integrator.git) locallay run:

```bash
$ git clone https://github.com/PhilPearson/generator-integrator.git
$ cd generator-integrator
$ npm link
```

Finally, initiate the generator:

```bash
$ yo integrator
```
### Crestron
The following files and folders will be created to suit a Crestron based project:
```
ProjectName/
├───.gitattributes
├───.gitignore
├───README.md
├───Documentation/
│     └───README.md
└───Source Code/
      ├───README.md
      └───Crestron/
            ├───Source/
            │   ├───ProjectName.xadr
            │   └───README.md
            └───User Interface/
                └───README.md
```

### AMX
The following files and folders will be created to suit an AMX based project:
```
ProjectName/
├───.gitattributes
├───.gitignore
├───README.md
├───Documentation/
│     └───README.md
└───Source Code/
      ├───README.md
      └───AMX/
          ├───Include/
          │   └───README.md
          ├───IR/
          │   └───README.md
          ├───Module/
          │   └───README.md
          ├───Other/
          │   └───README.md
          ├───Source/
          │   └───README.md
          └───User Interface/
              └───README.md
```

### DSP
Enabling DSP will add a DSP folder under Source Code
```
ProjectName/
└───Source Code/
      └───DSP/
          └───README.md
```