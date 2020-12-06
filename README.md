# TeamSolid Bot

Be ware!
This repository contains horrbile code.

## ToDo

* rekt
* logging messages to file
* oracle
* markov
* olid: load the list from JSON
* organize which data should be in the git repository
* update install instructions
* config startup scripts

### Ideas

* Better name for this bot.
* Better Avatar
* Inspirational Pictures
* rss-feed
* twitch-feed
* music
* soundboard
* roles by emoji-recation
* generate a tiny sprite sheet https://codepen.io/KilledByAPixel/pen/ZEWyRwO?editors=0010
* make fancy output

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
