#!/usr/bin/env python3

import datetime
import pickle
from random import choice
from random import randint

import discord
import markovify

from config import key
from config import data_path


latest_markov_use = datetime.date.min
bot = discord.Client()

@bot.event
async def on_ready():
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')

@bot.event
async def on_message(message):
    c = message.content

    print(c)

    if not c.startswith("!") and message.author != bot.user:
        try:
            with open(data_path + message.channel.name + ".log", "a") as f:
                f.write(c+"\n")
        except (OSError, IOError, EOFError):
            pass

    if c.startswith('!m') or c.startswith('!markov'):
        global latest_markov_use
        if latest_markov_use != datetime.date.today():
            latest_markov_use = datetime.date.today()
            await markov(message)
        else:
            await message.channel.send("Nur einmal am Tag!")

    
    if "good bot" in c.lower() or "guter bot" in c.lower():
        await message.add_reaction('\N{GRINNING FACE WITH SMILING EYES}')
    if "bad bot" in c.lower() or "böser bot" in c.lower():
        await message.add_reaction('\N{POUTING FACE}')
    if (message.author != bot.user and 
            ("olid" in c.lower().replace(' ', '') or 
            "dilo" in c.lower().replace(' ', '') or
            "olaf" in c.lower().replace(' ', ''))):
        await message.add_reaction('\N{WAVING HAND SIGN}')
    if c.startswith('!olid') or c.startswith('!o'):
        await olid(message)
    if c.startswith('!rekt') or c.startswith('!r'):
        ms = message.content.split()
        await rekt(message, ms[1], int(ms[2]), int(ms[3]))
    if c.startswith('!zitat') or c.startswith('!z'):
        cs = c.split(" ", 1)
        if len(cs) == 1:
            await citation(message, "quotes.pickle")
        elif len(cs) > 1:
            await citation(message, "quotes.pickle", cs[1])
    if c.startswith('!hellsicht') or c.startswith('!h'):
        cs = c.split(" ", 1)
        if len(cs) == 1:
            await citation(message, "orakel.pickle")
        elif len(cs) > 1:
            await citation(message, "orakel.pickle", cs[1])

async def markov(message):
    try:
        with open(data_path + message.channel.name + ".log", "r") as f:
            text = f.read()
            text_model = markovify.NewlineText(text)
            await message.channel.send(text_model.make_sentence(tries=100))

    except (OSError, IOError, EOFError):
        pass

async def olid(message):
    olidlist = [
        "Olid!",
        "OLID!",
        "O L I D",
        "O L I D!",
        "olid",
        "olaf",
        "OLID",
        '*Olid*',
        '**olid**',
        '***OlId***',
        "```\n" + 
        rektangle("OLID", randint(2,6), randint(2,6))+ 
        "```\n",
        '__olid__',
        'https://i.imgur.com/JW6YLy9.jpg',
    ]
    await message.channel.send(choice(olidlist))

async def rekt(message, r : str, x : int, y : int):
    await message.channel.send("```\n" + 
                  rektangle(r, width=x, height=y) +
                  "```\n")

async def citation(message, filename, *quote):
    """Print, Add, and Delete Quotes."""
    # send quote:
    if quote == ():
        try:
            with open(data_path + filename, "rb") as f:
                quotes = pickle.load(f)
        except (OSError, IOError, EOFError):
            await message.channel.send("Zitate laden schlug fehl. :(")
        if quotes == []:
            await message.channel.send("Leider keine Zitate vorhanden.")
        else:
            await message.channel.send(choice(quotes))
    # add or delete quote:
    else:
        quote = quote[0]
        try:
            with open(data_path + filename, "rb") as f:
                quotes = pickle.load(f)
                if quote in quotes:
                    quotes.remove(quote)
                    await message.channel.send(f"Lösche: {quote}")
                else:
                    quotes.append(quote)
                    await message.channel.send(f"Speichere: {quote}")
        except (OSError, IOError, EOFError):
            pass
        with open(data_path + filename, "wb") as f:
            print(quotes)
            pickle.dump(quotes, f)


def rektangle(text, width=1, height=1):
    result = [' '.join(['{}'.format(i) for i in text])]
    for i in range(1, len(text) - 1):
        result.append(text[i] + ' ' * ((len(text) - 2) * 2 + 1) + text[len(text) - i - 1])
    result.append(' '.join(['{}'.format(i) for i in text[::-1]]))
    for _ in range(1, width):
        result = [line + line[-2:-2 * len(text):-1] for line in result]
    for _ in range(1, height):
        result.extend(result[-2:-len(text) - 1:-1])
    result = '\n'.join(result)
    return result.format(*list(text))

bot.run(key)
