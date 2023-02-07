let movies = [];
let currentMovie;

fetch("http://localhost:4000/movies")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    movies = data;
    renderMovieDetails(movies[0]);

    movies.forEach((movie) => {
      // console.log(movie);
      let image = document.createElement("img");
      image.src = movie.image;

      image.addEventListener("click", () => {
        renderMovieDetails(movie);
      });

      document.querySelector("#movie-list").append(image);
    });
  });

let image = document.querySelector("#detail-image");
let title = document.querySelector("#title");
let year = document.querySelector("#year-released");
let description = document.querySelector("#description");
let watched = document.querySelector("#watched");
let blood_amount = document.querySelector("#amount");

const renderMovieDetails = (movie) => {
  console.log(movie);
  currentMovie = movie;
  image.src = movie.image;
  title.textContent = movie.title;
  year.textContent = movie.release_year;
  description.textContent = movie.description;

  if (movie.watched) {
    watched.textContent = "Watched";
  } else {
    watched.textContent = "Unwatched";
  }

  blood_amount.textContent = movie.blood_amount;
};

watched.addEventListener("click", () => {
  console.log(currentMovie);
  movies[currentMovie.id - 1].watched = !movies[currentMovie.id - 1].watched;
  console.log(movies[currentMovie.id - 1].watched);

  if (movies[currentMovie.id - 1].watched) {
    watched.textContent = "Watched";
  } else {
    watched.textContent = "Unwatched";
  }
});

let form = document.querySelector("#blood-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let input = document.querySelector("#blood-amount");

  movies[currentMovie.id - 1].blood_amount += parseInt(input.value);

  blood_amount.textContent = movies[currentMovie.id - 1].blood_amount;

  console.log(typeof input.value);
});
