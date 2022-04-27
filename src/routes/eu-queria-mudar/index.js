function task({res, path}) {
  res.sendFile(`${path}/eu-queria-mudar.mp4`);
}

module.exports = task;
