// const colors = ['#e74c3c','#8e44ad','#3498db','#e67e22','#2ecc71'];
// const container = document.getElementById('container');



// function randomColor(){
//     return colors[Math.floor(Math.random() * colors.length)];
// }

// function setColor(e){
//     const color = randomColor();
//     e.style.background = color;
//     e.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
// }

// function removeColor(e){
//     e.style.background = '#1d1d1d';
//     e.style.boxShadow = '0 0 2px #000';
// }


// for (let i = 0; i <= 99; i++)
// {
//     const divSquare = document.createElement('div');
//     divSquare.classList.add('square');
//     divSquare.addEventListener('mouseover', function(){
//         setColor(this);
//     });
//     divSquare.addEventListener('mouseout', ()=>removeColor(divSquare));
//     container.appendChild(divSquare);
// }


//BAI 2
// var text = document.getElementById('text').innerText;
// var Arr = [];
// var objWord = text.split('');
// objWord.forEach(e => {
//     Arr.push(e);
// });

// Arr.forEach(e => {
//     text.innerText = e;
// });
// const textEl = document.getElementById('text');
// const speedEl = document.getElementById('speed');

// const text = 'OI GIOI OI';
// let idx = 1;
// let speed = 300 / speedEl.value;


// speedEl.addEventListener('input', function(e){
//     speed = 300 / e.target.value;
// })

// writeText();

// function writeText(){
//     textEl.innerText = text.slice(0,idx);
//     idx++;
//     if(idx > text.length){
//         idx = 1;
//     }

//     setTimeout(writeText,speed);
// }






//BAI3
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.dir(data.results);
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML= '';
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span>${vote_average}</span>
        </div>
        <div class="overview">
            <h3>${overview}</h3>
        </div>`

        main.appendChild(movieEl);
    });
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }else{
        window.location.reload();
    }
})
