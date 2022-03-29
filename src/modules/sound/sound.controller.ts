import express from "express";
import multer from "multer";
import { join } from "path";
import { cwd } from "process";
import PTypes from "../../configs/db/types"
import soundService from "./sound.service"

const router: express.Router = require("express").Router();
const sound = new soundService();

type PError = PTypes.PrismaClientKnownRequestError | Error

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let pathFile = join(cwd(), "uploads")
        cb(null, pathFile)
    },
    filename: function (req, file, cb) {
        const fileHash = file.originalname + ".mp3"
        cb(null, `${fileHash}`)
    }
})

const upload = multer({ storage: storage })

router

    /**
     * @descr Create new sound
     * @route POST /sound
     * @access public
     */

    .post("/send", upload.single("audio"), async (req: express.Request, res: express.Response) => {

        sound.saveSound(Number(req.body.soundId), req.file?.destination)
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

        sound.getAll({ where: { recorded: true } })
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
