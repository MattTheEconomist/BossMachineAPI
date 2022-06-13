const meetingsRouter = require("express").Router();

module.exports = meetingsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db.js");

meetingsRouter.param("meetingId", (req, res, next, id) => {
  const meeting = getFromDatabaseById("meetings", id);
  if (meeting) {
    req.meeting = meeting;
    next();
  } else {
    res.status(404).send("meet not found brah");
  }
});

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.get("/:meetingId", (req, res, next) => {
  res.send(req.meeting);
  // console.log(req.route);
  // console.log(req.params);
});
