require("dotenv").config({ path: require("path").resolve(process.cwd(), ".info.env") });

export const API_URL = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`
