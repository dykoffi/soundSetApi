import express = require("express");
import HomeService from "./home.service";

const router: express.Router = require("express").Router();
const home = new HomeService()

router

    /**
    * @descr Test API endpoint
    * @route GET /
    * @access public
    */

     .get("/", async (req: express.Request, res: express.Response) => {

        home.Hello().then(data => {
            res.json(data)
        })
        
    })

export = router;
