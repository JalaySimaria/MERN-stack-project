import React, { Component } from 'react';
import 'whatwg-fetch';

import CustomCard from './Card';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      currentPage: 0,
      isNext: true
    };

    this.getMovies = this.getMovies.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies() {
    const { movies, currentPage } = this.state;

    // TODO: move it under services.js
    fetch(`/api/v1/movies?page=${currentPage + 1}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          movies: [ ...movies, ...json.movies ],
          currentPage: currentPage + 1,
          isNext: json.isNext
        });
      });
  }

  render() {
    const { movies, isNext } = this.state;

    return (
      <>
        {
          movies.map((movie) => (
            <CustomCard 
              key={movie._id}
              image={movie.image} 
              title={movie.title} 
              subtitle={movie.subtitle} 
              description={movie.description} 
              rating={movie.rating}
            />
          ))
        }

        {
          isNext && <button onClick={this.getMovies}>Load More</button>
        }
      </>
    );
  }
}

export default Home;
