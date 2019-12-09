const Movie = require('../../models/Movie');
const { moviesCount } = require('../../middlewares/movies');

module.exports = (app) => {
  app.get('/api/v1/movies', moviesCount, (req, res, next) => {
    const { page } = req.query;
    const { moviesCount } = req.data;

    const plansPerPage = 10;
    const pageNum = page || 1;

    Movie.aggregate([
        {
          '$sort': {
            'createdAt': -1
          }
        },
        {
          '$skip': (pageNum - 1) * plansPerPage
        },
        {
          '$limit': plansPerPage
        },
        {
          '$project': {
            'createdAt': 0,
            'updatedAt': 0,
            '__v': 0
          }
        }
      ])
      .exec()
      .then((movies) => res.json({
        movies,
        isNext: moviesCount > pageNum * plansPerPage
      }))
      .catch((err) => next(err));
  });

  app.post('/api/v1/movies', function (req, res, next) {
    const { title, subtitle, description, rating } = req.body;
    const image = `data:${req.files.image.mimetype};base64,${Buffer.from(req.files.image.data).toString('base64')}`;

    const movie = new Movie({ title, subtitle, description, rating, image });

    movie.save()
      .then(() => res.json(movie))
      .catch((err) => next(err));
  });
};
