/**
 * All functions will be stored here.
 */

const { EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")

module.exports = {
    loopCommands: loopCommands,
    randomNumber: randomNumber,
    booleanToTrad: booleanToTrad,
    betterJoin: betterJoin,
    permEmbed: permEmbed,
    invalidCompUser: invalidCompUser,
    permBitfieldToString: permBitfieldToString,
    getFullTimeTextFromMS: getFullTimeTextFromMS,
}

/**
 * Get all of the commands.
 * @returns The commands
 */
function loopCommands() {
    const loopCommandsObj = []

    const commandFolders = fs.readdirSync("./src/commands")
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"))
        for (const file of commandFiles) {
            const push = `${folder};${file}`
            loopCommandsObj.push(push)
        }
    }
    return loopCommandsObj
}

/**
 * Gets a random number from 1 to a custom amount.
 * @param {Number} min The lowest number you want to generate.
 * @param {Number} max The highest number you want to generate.
 * @returns {Number} The random number.
 */

function randomNumber(min, max) {
    const rand = Math.floor(Math.random()*(max-min+1))+min
    console.log(rand)
    return rand
}

/**
 * Convert a boolean to a simple "Yes" or "No".
 * @param {Boolean} bool 
 * @param {Boolean} capital 
 */

function booleanToTrad(bool, capital) {
    /** @type {String} */
    let returnBool

    if (bool) returnBool = "yes"
    else if (!bool) returnBool = "no"

    // Capitilize
    if (capital) {
        const low = returnBool.toLowerCase()
        return returnBool[0].toUpperCase + low.slice(1)

    } else {return returnBool}
}

/**
 * "Joins" the object with a custom string. For example: "obj 1, obj 2"
 * @param {Object|Array} obj The object you want to join.
 * @param {String} char The charater you want to connect the object.
 * @returns {String} The final joined object.
 */
function betterJoin(obj, char) {
    return `${obj.join(char)}`
}

/**
 * Sends an embed with the permission error.
 * @param {String} perm The permission to display.
 * @returns {EmbedBuilder} The embed.
 */
function permEmbed(perm) {
    const permErr = new EmbedBuilder()
        .setColor("Red").setTitle("No Permission!")
        .setDescription(`Sorry, but you don't have permission to use this command.\nYou need \`${perm}\` permission to use this command.\nIf you are sure you have this permission, contact your server's administrator.`)
    return permErr
}

/**
 * Returns an embed for when an invalid user uses a component.
 * @param {String} comp The component type, either button or select menu.
 * @returns {EmbedBuilder} The embed.
 */
function invalidCompUser(comp) {
    const embed = new EmbedBuilder().setColor("Red").setDescription(`This is not your ${comp}!`)
    return embed
}

/**
 * Converts a permission bitfield to a readible permission name.
 * @param {Number} bitfield The bitfield
 * @returns {String} The permission name.
 */
function permBitfieldToString(bitfield) {
    switch (bitfield) {
        case 1:
            return "Create Instant Invite";
        case 2:
            return "Kick Members"
        case 4:
            return "Ban Members"
        case 8:
            return "Administrator"
        case 16:
            return "Manage Channels"
        case 32:
            return "Manage Server"
        case 64:
            return "Add Reactions"
        case 128:
            return "View Audit Log"
        case 256:
            return "Priority Speaker"
        case 1024:
            return "View Channel / Read Messages"
        case 2048:
            return "Send Messages"
        case 4096:
            return "Send Messages with Text-to-Speech"
        case 8192:
            return "Manage Messages"
        case 16384:
            return "Embed Links"
        case 32768:
            return "Attach Files"
        case 65536:
            return "Read Message History"
        case 131072:
            return "Mention Everyone"
        case 262144:
            return "Use External Emojis"
        case 1048576:
            return "Connect"
        case 2097152:
            return "Speak"
        case 4194304:
            return "Mute Members"
        case 8388608:
            return "Deafen Members"
        case 16777216:
            return "Move Members"
        case 33554432:
            return "Use VAD"
        case 67108864:
            return "Change Nickname"
        case 134217728:
            return "Manage Nicknames"
        case 268435456:
            return "Manage Roles & Permissions"
        case 536870912:
            return "Manage Webhooks"
        case 1073741824:
            return "Manage Emojis"
    
        default:
            return "Invalid Bitfield."

    }
}

/**
 * Convert milliseconds into a seperate time.
 * @param {Number} t The time in milliseconds.
 * @returns {String} The full time
 */
function getFullTimeTextFromMS(t){
    var textList = []
    let ms = t / 1000
    let days = Math.floor(ms / 86400)
    ms %= 86400
    let hours = Math.floor(ms / 3600)
    ms %= 3600
    let minutes = Math.floor(ms / 60)
    let seconds = Math.floor(ms % 60)
    if (days){textList.push(`${days} days`)}
    if (hours){textList.push(`${hours} hours`)}
    if (minutes){textList.push(`${minutes} minutes`)}
    if (seconds){textList.push(`${seconds} seconds`)}
    return textList.join(", ")
}