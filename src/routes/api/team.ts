import express, { Request, Response } from "express";
import { ENDPOINT } from "../../endpoint";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(400).json({
    message: "error",
    code: 400,
    error: "Specify the team id in the URL like /team/<teamId>",
  });
  return;
});


router.get("/:id", async (req: Request, res: Response) => {
  console.log(req.params);
  const teamId = req.params;

  if (Object.keys(teamId).length === 0) {
    res.status(400).json({
      message: "error",
      code: 400,
      error: "Specify the team id in the url" ,
    });
    return;
  }

  try {
    const data = await fetch(`${ENDPOINT}/teams/${teamId.id}`);    
    const body = await data.json();


    if (!data) { // Not working properly yet
      res.status(400).json({
        message: "error",
        code: 400,
        error: "Sorry that is an invalid team ID",
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
