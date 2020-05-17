const Discord = require("discord.js");
const {
    prefix,
    token,
    channel,
    meds
} = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();
client.login(token);

let connection;

client.once("ready", () => {
    client.user.setPresence({
        game: {
            name: "napyplace",
            type: "Cringing",
            url: "https://discord.gg/jWNkZ2"
        }
    });
    console.log("Ready.");
});

client.once("reconnecting", () => {
    console.log("Trying to reconnect.");
});

client.once("disconnect", () => {
    console.log("Disconnected.");
});

async function play(time, message) {
    const voiceChannel = message.member.voice;
    console.log(voiceChannel);
    if (!voiceChannel) message.channel.send("You must be in the meditation voice channel.");
    if (connection) {
        message.channel.send("Please wait for the meditation to finish uwu.");
        return;
    }
    if (time === 10) {
        try {
            connection = await voiceChannel.channel.join();
            const dispatcher = connection.play(ytdl(meds[0]))
                .on("end", () => {
                    connection = undefined;
                });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    } else if (time === 20) {
        try {
            connection = await voiceChannel.channel.join();
            const dispatcher = connection.play(ytdl(meds[1]))
                .on("end", () => {
                    connection = undefined;
                });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    } else if (time === 30) {
        try {
            connection = await voiceChannel.channel.join();
            const dispatcher = connection.play(ytdl(meds[2]))
                .on("end", () => {
                    connection = undefined;
                });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    }
}

client.on("message", async message => {
    console.log("here");
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!(message.member.voice.channelID == channel)) return;
    console.log(prefix);

    console.log(message.content);

    if (message.content.startsWith(`${prefix} 10`)) {
        console.log("pog");
        play(10, message);
        return;
    } else if (message.content.startsWith(`${prefix} 20`)) {
        play(20, message);
        return;
    } else if (message.content.startsWith(`${prefix} 30`)) {
        play(30, message);
        return;
    }
});