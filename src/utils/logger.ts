/* eslint-disable no-console */
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m",
        gray: "\x1b[90m",
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m",
    },
};

export const log = (message: string, { type = "p", date = false } = {}) => {
    let color = colors.fg.white;
    switch (type) {
        case "error":
            color = colors.fg.red;
            break;
        case "warn":
            color = colors.fg.yellow;
            break;
        case "info":
            color = colors.fg.blue;
            break;
        case "success":
            color = colors.fg.green;
            break;
        default:
            color = colors.fg.white;
            break;
    }

    if (date) {
        console.log(
            `${colors.fg.gray}${new Date().toISOString()}${
                colors.reset
            } - ${color}${message}${colors.reset}`
        );
    } else {
        console.log(`${color}${message}${colors.reset}`);
    }
};

export const error = (message: string) => log(message, { type: "error" });