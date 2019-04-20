# betterban

A moderation bot that implements tempban, tempmute and softbanning within the embedded interface of Discord; and not by using commands.

## How to use ?

### Tempban

When you tempban someone, ban normally, but put as reason `The actual reason - 30s`. **30s can be replaced by the actual delay you want** in the usual format that you probably already know; example :

```
30s
1m 30s
1d
5w
1mth 1w 3d 20m 2s

etc.
```

If you want the complete specification of what you can put, the module used under the hood to parse the delay is [timestring](https://www.npmjs.com/package/timestring).

If no delay is put, the bot assumes it's a parmanent ban.

### Softban

Similarly, if you want to softban a member, ban them normally but put as reason `The actual reason - softban`. *You can also use* `sb` *instead of* `softban`.

> A softban is when you kick someone, by banning them then immediately unbanning them under the hood, to delete their previous messages.

### Tempmute

For this, you have to set the nick of the person you want to mute to `mute 30s`. Like the tempban, of course, you can replace the 30s by the actual delay you want. The previous nick of the member will be reset automatically immediately. *You can also just type* `m` *instead of* `mute`.

> The member trying to mute another member has to have the Mute Members permission in order for it to work.

### Various commands

The bot doesn't have any prefix, the only way for it to respond to commands is by mentioning it before the command.

And for the actual commands, well, you're likely to not need to use any of them but here they are :

```
help - Shows the list of available commands.
version - Shows the commit number of the current running instance.
ping - Mostly a debug command, echoes back 'Pong'
```