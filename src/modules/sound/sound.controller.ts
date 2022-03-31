import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import PTypes from "../../configs/db/types"
import soundService from "./sound.service"
import AWS from "aws-sdk"

const router: express.Router = require("express").Router();
const sound = new soundService();

type PError = PTypes.PrismaClientKnownRequestError | Error

let s3 = new AWS.S3({ apiVersion: '2006-03-01', accessKeyId: "AKIAVE5OQIXAXP7N2UOM", secretAccessKey: "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" });
AWS.config.update({ region: 'eu-west-3' });

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'audioset-recoder',
        acl: 'public-read',

        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname + ".mp3")
        }
    })
})

router

    /**
     * @descr Create new sound
     * @route POST /sound
     * @access public
     */


    .use("/send", upload.single("audio"))
    .post("/send", async (req: express.Request, res: express.Response) => {

        let dataFile: any = req.file
        
        sound.saveSound(Number(req.body.soundId), dataFile.location, Number(req.body.userId))
            .then((data) => { res.status(201).json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr get all sound
    * @route GET /sound
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        sound.getAll({ where: req.query, take: 1000, orderBy: { id_: "asc" }, select: { id_: true, ref: true, fr: true, bci: true, isRecording: true } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })


    .get("/begin/:userId", async (req: express.Request, res: express.Response) => {

        sound.beginRecord(Number(req.params.userId))
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr get all sound which are recorded by one user
    * @route GET /sound/notrecorded/count
    * @access public
    */

    .get("/count/recorded/:userId", async (req: express.Request, res: express.Response) => {

        sound.count({ recorded: true, UserId_: Number(req.params.userId) })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
  * @descr get all sound which are not recorded
  * @route GET /sound/notrecorded/count
  * @access public
  */

    .get("/count/unrecorded", async (req: express.Request, res: express.Response) => {

        sound.count({ recorded: false })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    .get("/recorded", async (req: express.Request, res: express.Response) => {

        sound.getAll({ where: { recorded: true }, include: { User_: true } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })


    /**
    * @descr Show specify sound identified by id
    * @route GET /sound/id
    * @access public
    */

    .get("/:id", async (req: express.Request, res: express.Response) => {

        sound.getById(Number(req.params.id))
            .then((data) => {
                res.status(data === null ? 404 : 200).json(data);
            })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Modify specify sound identified by id
    * @route PUT /sound/id
    * @access public
    */

    .put("/:id", async (req: express.Request, res: express.Response) => {

        sound.updateById(Number(req.params.id), req.body)
            .then((data) => {
                res.status(201).json({ data, message: "object sound updated successfully" });
            })
            .catch((error: PError) => {

                console.error(error);
                if ("code" in error && error.code === "P2025") {
                    res.status(404).json({ error: "NotFound", message: error.meta });
                } else {
                    res.status(500).json({ error: "InternalError", message: "Something wrong" });
                }

            });

    })

    /**
    * @descr Delete specify sound identified by id
    * @route DELETE /sound/id
    * @access public
    */

    .delete("/:id", async (req: express.Request, res: express.Response) => {

        sound.deleteById(Number(req.params.id))
            .then((data) => {
                res.status(201).json({ data, message: "object sound deleted successfully" });
            })
            .catch((error: PError) => {
                console.error(error);
                if ("code" in error && error.code === "P2025") {
                    res.status(404).json({ error: error.name, message: error.meta });
                } else {
                    res.status(500).json({ error: "InternalError", message: "Something wrong" });
                }
            });
    });

export = router;
