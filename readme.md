# TeamSolid Bot

Be ware!
This repository contains horrbile code.

## Links

* [https://discordpy.readthedocs.io/en/latest/index.html](https://discordpy.readthedocs.io/en/latest/index.html)

## Config

~~~bash
cp config.py.example config.py
~~~

Then edit config.py to your needs.

## Install with pipenv

Requires `pipenv` and `pyenv`.

```bash
pipenv install
```

## Run

### Quick

~~~bash
pipenv run python3 teamsolid-bot.py
~~~

### With tmux

~~~bash
tmux new-session -d -s tsb 'pipenv run python3 teamsolid-bot.py'
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
