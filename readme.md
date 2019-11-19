# TeamSolid Bot

Be ware!
This repository contains horrbile code.

## Links

* [http://discordpy.readthedocs.io/en/rewrite/](http://discordpy.readthedocs.io/en/rewrite/)
* [https://github.com/Rapptz/discord.py/tree/rewrite](https://github.com/Rapptz/discord.py/tree/rewrite)
* [https://boostlog.io/@junp1234/how-to-write-a-discord-bot-in-python-5a8e73aca7e5b7008ae1da8b](https://boostlog.io/@junp1234/how-to-write-a-discord-bot-in-python-5a8e73aca7e5b7008ae1da8b)

## Config

~~~bash
cp config.py.example config.py
~~~

Then edit config.py to your needs.

## Install with pipenv

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
