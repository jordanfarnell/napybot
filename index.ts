import { Message, VoiceConnection } from "discord.js";
import * as Discord from "discord.js";
import { prefix, token, channel, meds } from "./config.json";
import * as ytdl from "ytdl-core";

const client = new Discord.Client();
client.login(token);

let connection: VoiceConnection;

client.once("ready", () => {
    client.user.setPresence({
        activity: {
            name: "discord.gg/jWNkZ2"
        }
    });
    console.log("Ready.");
});

client.once("disconnect", () => {
    console.log("Disconnected.");
});

client.on("message", async (message: Message) => {
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

const play = async (time: number, message: Message) => {
    const voiceChannel = message.member.voice;
    console.log(voiceChannel);
    if (!voiceChannel)
        message.channel.send("You must be in the meditation voice channel.");
    if (connection) {
        message.channel.send("Please wait for the meditation to finish.");
        return;
    }
    if (time === 10) {
        try {
            connection = await voiceChannel.channel.join();
            message.channel.send("Starting 10 minute meditation.");
            const dispatcher = connection.play(ytdl(meds[0])).on("end", () => {
                connection = undefined;
            });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    } else if (time === 20) {
        try {
            connection = await voiceChannel.channel.join();
            message.channel.send("Starting 20 minute meditation.");
            const dispatcher = connection.play(ytdl(meds[1])).on("end", () => {
                connection = undefined;
            });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    } else if (time === 30) {
        try {
            connection = await voiceChannel.channel.join();
            message.channel.send("Starting 30 minute meditation.");
            const dispatcher = connection.play(ytdl(meds[2])).on("end", () => {
                connection = undefined;
            });
            dispatcher.setVolumeLogarithmic(0.5);
        } catch (err) {
            console.log(err);
        }
    }
};
