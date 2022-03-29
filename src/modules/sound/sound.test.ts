import { API_URL } from "../../configs/constants";

describe("sound routes tester", () => {

    const supertest = require("supertest")(API_URL);

    it("/POST Create new sound", async () => {

        let res = await supertest
            .post(`/sound`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET get all sound", async () => {
        let res = await supertest
            .get(`/sound`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET/id Show specify sound", async () => {
        let res = await supertest
            .get(`/sound/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/PUT/id Modify specify sound", async () => {
        let res = await supertest
            .put(`/sound/1`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/DELETE/id Delete specify sound", async () => {
        let res = await supertest
            .del(`/sound/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

});