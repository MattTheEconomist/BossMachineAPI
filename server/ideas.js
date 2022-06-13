const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db.js");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send("not found brah");
  }
});

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
  //   console.log(req.route);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  console.log(req.idea);
  res.send(req.idea);
  //   console.log(req.route);
});

ideasRouter.post("/", (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updatedInstance = updateInstanceInDatabase("ideas", req.body);
  res.status(202).send(updatedInstance);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  console.log("deleted", req.params.ideaId);
  res.send();
});
