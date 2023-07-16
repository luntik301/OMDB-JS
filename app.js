document.addEventListener('DOMContentLoaded', function () {
    var apiKey = '8eb18548';

    document.getElementById('search-button').addEventListener('click', function () {
        var searchQuery = document.getElementById('search-input').value;
        var apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&s=' + searchQuery;

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                if (data.Response === 'True') {
                    var movie = data.Search[0];
                    displayMovieDetails(movie.imdbID);
                } else {
                    document.getElementById('movie-details').innerHTML = '<h2>Movie not found</h2>';
                }
            })
            .catch(function (error) {
                document.getElementById('movie-details').innerHTML = '<h2>' + error.message + '</h2>';
            });
    });

    function displayMovieDetails(imdbId) {
        var apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&i=' + imdbId;

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                if (data.Response === 'True') {
                    var movieDetails = '<div class="movie-details-container">';
                    movieDetails += '<h2>' + data.Title + ' (' + data.Year + ')</h2>';
                    movieDetails += '<p><strong>Director:</strong> ' + data.Director + '</p>';
                    movieDetails += '<p><strong>Actors:</strong> ' + data.Actors + '</p>';
                    movieDetails += '<p><strong>Description:</strong> ' + data.Plot + '</p>';
                    movieDetails += '<p><strong>Rating:</strong> ' + data.imdbRating + '/10</p>';
                    movieDetails += '</div>';
                    movieDetails += '<div class="poster-container"><img src="' + data.Poster + '" alt="film poster"></div>';

                    document.getElementById('movie-details').innerHTML = movieDetails;
                } else {
                    document.getElementById('movie-details').innerHTML = '<h2>Movie not found</h2>';
                }
            })
            .catch(function (error) {
                document.getElementById('movie-details').innerHTML = '<h2>' + error.message + '</h2>';
            });
    }

    var colorPicker = document.getElementById('color-picker');
    colorPicker.value = '#6fa8dc';
    document.body.style.backgroundColor = colorPicker.value;

    colorPicker.addEventListener('change', function () {
        var color = colorPicker.value;
        document.body.style.backgroundColor = color;
    });

    var slider = document.querySelector('.slider');
    var sliderCircle = document.querySelector('.slider-circle');
    var buttons = document.querySelectorAll('button');
    var isActive = false;

    slider.addEventListener('click', function () {
        isActive = !isActive;

        if (isActive) {
            slider.classList.add('active');
            buttons.forEach(function (button) {
                button.style.borderRadius = '0';
            });
            sliderCircle.style.marginLeft = 'calc(100% - 37px)';
        } else {
            slider.classList.remove('active');
            buttons.forEach(function (button) {
                button.style.borderRadius = '15px';
            });
            sliderCircle.style.marginLeft = '2%';
        }
    });
});
