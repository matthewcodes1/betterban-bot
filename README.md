# betterban

A bot that implements tempban, tempmute and softbanning within the embedded interface of Discord.

## How to use ?

### Tempban

When you tempban someone, put as reason `The actual reason - 30s`. **30s can be replaced by the actual delay you want** in the usual format that you probably already know :

```
30s
1m 30s
1d

etc.
```

### Softban

Similarly, when you softban someone, put as reason `The actual reason - softban`. *You can also use* `sb` *instead of* `softban`.

### Tempmute

For this, you have to rename the nick of the person you want to mute to `mute 30s`. Like the tempban, of course, you can replace the 30s by the actual delay you want. The previous nick of the person will be reset automatically. *You can also use* `m` *instead of* `mute`.