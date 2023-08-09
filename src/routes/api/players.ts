import express, {  Request, Response } from "express";
import { ENDPOINT } from "../../endpoint";

const router = express.Router();

interface Player {
  name: string
}

router.get("/", async (req: Request, res: Response) => {
  const player: Player = req.body;

 let url = `${ENDPOINT}/players`;

 // Search by player name
  if (player && player.name === undefined) {
    res.status(400).json({
      message: "error",
      code: 400,
      data: { error: "Specify the player name in the body in the format {'name': 'NAME'} " },
    });
    return;
  } else {
     url = `${ENDPOINT}/players?search=${player.name}`;
  }

  // Pass per_page query params etc

  if (Object.keys(req.query).length > 0 ) {
    url = `${ENDPOINT}/players?${Object.keys(req.query)[0]}=${Object.values(req.query)[0]}`;
  }
    try {
      const data = await fetch(url);
      const body = await data.json();

      res.json({
        message: "Success",
        code: 200,
        data: body.data,
        meta: body.meta,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error",
        code: 500,
        data: `There was an error ${err}`,
      });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
  console.log(req.params);
  const playerId = req.params;

  if (Object.keys(playerId).length === 0) {
    res.status(400).json({
      message: "error",
      code: 400,
      error: "Specify the player id in the url",
    });
    return;
  }

  try {
    const data = await fetch(`${ENDPOINT}/players/${playerId.id}`);
    const body = await data.json();

    if (!data) {
      // Not working properly yet JSON error
      res.status(400).json({
        message: "error",
        code: 400,
        error: "Sorry that is an invalid player ID",
      });
    }
    res.json({
      message: "Success",
      code: 200,
      data: body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error",
      code: 500,
      data: `There was an error ${err}`,
    });
  }
});



module.exports = router;
