# TeamSolid Bot

## ToDo

### Ideas

* markov: improve markov chain library
* olid: send image direct.
* roles by emoji-recation
* dice
* oracle
* rekt
* Inspirational Pictures
* rss-feed
* twitch-feed
  * configure streams to display manualy
* music
* soundboard
* generate a tiny sprite sheet https://codepen.io/KilledByAPixel/pen/ZEWyRwO?editors=0010
* make fancy output

## Links

* https://discordjs.guide/
* https://discord.js.org/
* https://discord.com/developers/applications

## Install

* Install Node.js for example with [nvm](https://github.com/nvm-sh/nvm).
  * Install nvm
  * Update node (optional): `nvm install node`
  * Update npm (optional): `nvm install-latest-npm`
* Install and update Yarn.
  * [yarn](https://yarnpkg.com/getting-started/install)
  * Install Yarn: `npm install -g yarn`
  * Update Yarn: `yarn set version latest`
* `git clone ...`
* Install dependencies: `yarn install --dev`
* yarn tsc
* `chmod 755 teamsolid-bot`

## Config

~~~bash
cp settings.json.example settings.json
~~~

Then edit `settings.json` to your needs.

## Run

### Quick

~~~bash
node dist/main.js
~~~

### With tmux

~~~bash
tmux new-session -d -s tsb 'node dist/main.js'
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
