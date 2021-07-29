$(".search-button").on("click", function () {
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=dca61bcc&s=${$(".input-keyword").val()}`,
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      // Tombol detail di klik
      $(".details").on("click", function () {
        let imdbID = $(this).data("imdbid");
        $.ajax({
          url: `http://www.omdbapi.com/?apikey=dca61bcc&i=${imdbID}`,
          success: (d) => {
            const movieDetails = showDetails(d);
            $(".modal-body").html(movieDetails);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCards(m) {
  return `<div class="col-md-4 my-3">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-primary details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid="${m.imdbID}">Show Details</a>
            </div>
          </div>`;
}

function showDetails(d) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
              <img src="${d.Poster}" class="img-fluid" />
              </div>
              <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><h4>${d.Title} (${d.Year})</h4></li>
                <li class="list-group-item"><strong>Director: </strong>${d.Director}</li>
                <li class="list-group-item"><strong>Actors: </strong>${d.Actors}</li>
                <li class="list-group-item"><strong>Writer: </strong>${d.Writer}</li>
                <li class="list-group-item">
                <strong>Plot: </strong> <br /> ${d.Plot}
                </li>
              </ul>
              </div>
            </div>
          </div>`;
}
