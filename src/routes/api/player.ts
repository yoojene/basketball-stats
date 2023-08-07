import express, {  Request, Response } from "express";
import { ENDPOINT } from "../../endpoint";

const router = express.Router();

interface Player {
  name: string
}

router.get("/", async (req: Request, res: Response) => {

  const player: Player = req.body;

  if (!player.name) {
    res.status(400).json({
      message: "error",
      code: 400,
      data: { error: "Specify the player name body as {'name': 'NAME'} "}
    })
    return
  }

  try {
    const data = await fetch(`${ENDPOINT}/players?search=${player.name}`);
    const body = await data.json();

    res.json({
      message: "Success",
      code: 200,
      data: body.data,
      meta: body.meta

    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      code: 500,
      data: `There was an error ${err}`
    })
  }
});

module.exports = router;
