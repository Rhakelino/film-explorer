// $('.btn-search').on('click', function() {
//     $.ajax({
//       url: "http://www.omdbapi.com/?apikey=893ab491&s=" + $('.input-keyword').val(),
//       success: (result) => {
//         const movies = result.Search;
//         let cards = "";
//         movies.forEach((m) => {
//           cards += showCard(m)
//         })
//         $(".container-movie").html(cards);
//         $('.detail-btn').on('click', function() {
//             $.ajax({
//                 url: 'http://www.omdbapi.com/?apikey=893ab491&i=' + $(this).data('imdid'),
//                 success: (e) => {
//                     const detailMov = showDetailCard(e)
//                   $('.modal-body').html(detailMov);
//                 }
//             })
//             console.log($(this).data('imdid'))
//         })
//       },
//       error: (e) => {
//         console.log(e.responseText);
//       },
//     });
// })

const searchBtn = document.querySelector(".btn-search");
const inputKey = document.querySelector(".input-keyword");
const body = document.body;
inputKey.focus();
searchBtn.addEventListener("click", function () {
  search();
});

inputKey.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    search();
  }
});
body.addEventListener("keyup", function (e) {
  if (e.keyCode === 82) {
    inputKey.focus();
  }
});
function search() {
  fetch("http://www.omdbapi.com/?apikey=893ab491&s=" + inputKey.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";
      movies.forEach((movie) => (cards += showCard(movie)));
      const containerMovie = document.querySelector(".container-movie");
      containerMovie.innerHTML = cards;
      inputKey.value = "";
      inputKey.focus();
      // ketika tombol detail di klik
      const btnDetail = document.querySelectorAll(".detail-btn");

      btnDetail.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdid;
          fetch("http://www.omdbapi.com/?apikey=893ab491&i=" + imdbid)
            .then((response) => response.json())
            .then((response) => {
              const detailMov = showDetailCard(response);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = detailMov;
            });
        });
      });
    });
}

function showCard(m) {
  return `<div class="col-lg-3 mt-5">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary detail-btn" data-bs-toggle="modal" data-bs-target="#detailModal" data-imdid="${m.imdbID}">Show Detail</a>
        </div>
      </div>
</div>
`;
}

function showDetailCard(e) {
  return `<div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${e.Poster}" class="img-fluid">
                        </div>
                        <div class="col">
                            <ul class="list-group">
                                <li class="list-group-item"><h4>${e.Title}</h4></li>
                                <li class="list-group-item"><strong>Released: </strong>${e.Year}</li>
                                <li class="list-group-item"><strong>Genre: </strong>${e.Genre}</li>
                                <li class="list-group-item"><strong>Duration: </strong>${e.Runtime}</li>
                                <li class="list-group-item"><strong>Synopsis: </strong>${e.Plot}</li>
                              </ul>
                        </div>
                    </div>
                  </div>
                  `;
}
