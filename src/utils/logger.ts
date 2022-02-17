import logger from "pino";
import dayjs from "dayjs";

const loggerInstance = logger({
    name: "app",
    level: "debug",
    prettyPrint: true,
    base: {
        pid: false,
        hostname: false,
    },
    timestamp: () => `, 'time:' ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`,
});

export default loggerInstance;