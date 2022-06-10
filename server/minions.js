const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const nodemon = require("nodemon");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db.js");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send("minion not found brah");
  }
});

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  console.log("req body", newMinion);
  res.status(201).send(newMinion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedInstance = updateInstanceInDatabase("minions", req.body);
  res.status(202).send(updatedInstance);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);

  console.log("params", req.params);
  console.log("body", req.body);

  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
