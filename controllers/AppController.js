// app controller

const getHome = async (req, res) => {
  res.render('index.pug')
};

export default {
  getHome,
};
