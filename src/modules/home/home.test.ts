import { API_URL } from "../../configs/constants";

describe("Home routes tester", () => {

    const supertest = require("supertest")(API_URL);

    it("/GET get test", async () => {

        let res = await supertest
            .get("/")
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);

    });
});