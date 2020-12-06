# TeamSolid Bot

Be ware!
This repository contains horrbile code.

## ToDo

* Better name for this bot.
* Better Avatar

* markov

* update install instructions
* config startup scripts
* document file structur

### Ideas

* olid: send image direct.
* oracle
* rekt
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
* https://discord.com/developers/applications

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
