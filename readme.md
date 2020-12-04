# TeamSolid Bot

Be ware!
This repository contains horrbile code.


## ToDo

* Better name for this bot.

* rekt
* save and load
  * Saving and loading quotes
  * logging messages to file
* oracle
* quote
* rekt
* markov
* config startup scripts
* rollupjs: bundle

* Inspirational Pictures
* rss-feed
* twitch-feed
* music
* soundboard
* roles by emoji-recation

* Splitting things into files
  * logging
  * commands


## Links

* https://discordjs.guide/
* https://discord.js.org/

## Config

~~~bash
cp src/node/config.ts.example src/node/config.ts
~~~

Then edit config.ts to your needs.

## Install with pipenv

* Requires node, and npm/yarn

~~~
yarn install
~~~

## Run

### Quick

~~~bash
yarn tsc && yarn start
~~~

### With tmux

~~~bash
tmux new-session -d -s tsb 'yarn tsc && yarn start'
~~~

or:

~~~bash
./teamsolid-bot
~~~


### Attach Session

~~~bash
# attach
tmux a -t tsb
~~~

Detatch: ^B^D
