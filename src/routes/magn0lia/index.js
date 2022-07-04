function task({res, path}) {
  res.sendFile(`${path}/magn0lia.mp4`);
}

module.exports = task;
