import { API_URL } from "../../configs/constants";

describe("user routes tester", () => {

    const supertest = require("supertest")(API_URL);

    it("/POST Create new user", async () => {

        let res = await supertest
            .post(`/user`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET get all user", async () => {
        let res = await supertest
            .get(`/user`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/GET/id Show specify user", async () => {
        let res = await supertest
            .get(`/user/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/PUT/id Modify specify user", async () => {
        let res = await supertest
            .put(`/user/1`)
            .send({})
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

    it("/DELETE/id Delete specify user", async () => {
        let res = await supertest
            .del(`/user/1`)
            .expect("Content-Type", /json/)

        expect(res.status).not.toBe(500);
    });

});