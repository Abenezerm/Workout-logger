const router = require("express").Router();
const path = require("path");


router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
//for continue or new workout
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
});
//for dashboard
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
