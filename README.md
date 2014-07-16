# grunt-restart-vagrant

> Restarts a vagrant isntance based on environment configuration.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vagrant-commands --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-restart-vagrant');
```

## Your Environment

The plugin knows how to get to your vagrant install based on your `.npmrc` file. This file holds configuration for NPM, but since it's so easy to configure, we can make use of it to store our vagrant information.

`npmcofig` looks first for project specific config, then user specific config, then finally globally. This means you can configure a different vagrant for your project by creating a vagrant specififc `.npmrc` file.

The path to the vagrant file should be stored with the `vagrantPath` key:

```shell
npm config set vagrantPath /path/to/Vagrantfile
```

You can opt to store it globally with the `--global` flag, but this will affect all user accoundt on the machine, which is probably not what you want.

## The "vagrant_commands" task

### Overview
In your project's Gruntfile, add a section named `vagrant_commands` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  vagrant_commands: {
    your_commands: {
      commands: [
        // each command in this array as an array arguments.
      ]
    },
  },
})
```

### Options

#### options.rd
Type: `String`
Default value: `null`

This option allows you to load a custom .npmrc file from wherever you would like on your system.

### Usage Examples

#### Default Options
In this example, the we use the default `.npmrc` to trigger a `vagrant halt` followed by a `vagrant up --provision`.

```js
grunt.initConfig({
  vagrant_commands: {
    vvv: {
      commands: [
        ['halt'],
        ['up', '--provision']
      ]
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

### 0.0.3
- Minor bug fix

### 0.0.2
 - If no dir is present in config, try running in currend directory

### 0.0.1
 - The first release

## License
Copyright (c) 2014 Luke Woodward. Licensed under the MIT license.
