# betterban

A moderation bot that implements tempban, tempmute and softbanning within the embedded interface of Discord; and not by using commands.

You specify the tempban delay through the banning reason field, and the tempmute delay through the nickhame changing form **and the bot will automatically unmute or unban when the delay is passed**! Isn't that wonderful?

This bot is open-source and developped in my free time. If you wish to donate, you can [become a Patreon](https://www.patreon.com/aosync) to help me cover the costs and to motivate me to continue developping bots! Any tip would be appreciated.

## Usage

### Tempban

If you were to tempban someone, ban with reason `reason - time`, **where the time can be replaced by the actual delay you want** in the usual format that you probably already know; example :

```
Rude - 1d
Being an asshole - 2w
Toxic - 2mth 2w 3d

etc.
```

When the delay is due, the member automatically gets unbanned.

If you want the complete specification of what you can put, the module used under the hood to parse the delay is [timestring](https://www.npmjs.com/package/timestring).

If no delay is put, the bot assumes it's a parmanent ban.

### Softban

> A softban is when you kick someone, by banning them then immediately unbanning them under the hood, to delete their previous messages.

Similarly, if you want to softban a member, ban them normally but put as reason `reason - softban`. *You can also use* `sb` *instead of* `softban`.

The bot will automatically unban the member just after to complete the softban.

Examples:

```
Userbot - softban
A bit too spammy - sb
Edgy photos - sb
```

### Tempmute

For this, you have to set the nick of the person you want to mute to `mute delay`. Like the tempban, of course, you can replace the delay by the actual delay you want. The previous nick of the member will be reset automatically immediately. *You can also just type* `m` *instead of* `mute`.

> The member trying to mute another member has to have the Mute Members permission in order for it to work.

Examples:

```
mute 10h
m 2d 5h
m 5m
```

> The Muted role will be created automatically.

Likewise, when the delay is due, the bot will automatically unmute the member.

### Various commands

The prefix of the bot **is its mention**.

And as for the actual commands, well, you're likely to not need to use any of them but here they are :

```
help - Shows the list of available commands.

temps - Shows the currently tempbanned and tempmuted members and their remaining time in seconds (Ban Members permission needed by the user that issues the command).

version - Shows the commit number of the current running instance.

ping - Mostly a debug command, echoes back 'Pong'
```