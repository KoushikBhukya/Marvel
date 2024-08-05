document.addEventListener('DOMContentLoaded', () => {
    const characters = [
        'Spider-Man',
        'Iron Man',
        'Captain America',
        'Ant-Man',
        'Wolverine',
        'Wasp',
        'Thor',
        'Shang-chi',
        'Silver-Surfer',
        'Thanos',
       
        'Hulk',
        'Black Panther',
        
        
        'Deadpool',
        'Black Widow',
        'Doctor Strange',
        'Star Lord',
    ];

    const characterButtons = document.getElementById('character-buttons');
    const bioSection = document.getElementById('character-bio');
    const bioContent = document.getElementById('bio-content');
    const movieDetails = document.getElementById('movie-details');

    // Generate character buttons
    characters.forEach(character => {
        const button = document.createElement('button');
        button.textContent = character;
        button.addEventListener('click', () => {
            fetchCharacterBio(character);
        });
        characterButtons.appendChild(button);
    });

    // Fetch character bio
    async function fetchCharacterBio(character) {
        const response = await fetch(`assets/data/${character.toLowerCase().replace(/ /g, '-')}.json`);
        const data = await response.json();

        bioContent.innerHTML = `
            <img src="assets/images/${data.image}" alt="${character}">
            <h3>${data.name}</h3>
            <p><strong>Origin:</strong> ${data.origin}</p>
            <p><strong>Powers:</strong> ${data.powers}</p>
            <p><strong>Significant Events:</strong> ${data.events}</p>
            <p><strong>Allies:</strong> ${data.allies}</p>
            <p><strong>Enemies:</strong> ${data.enemies}</p>
        `;
        bioSection.style.display = 'block';
    }

    // Fetch movie information from JSON file
    document.getElementById('fetch-movie-info').addEventListener('click', async () => {
        const movieName = document.getElementById('movie-name').value.toLowerCase();
        const response = await fetch('assets/data/movies.json');
        const movies = await response.json();
        const movie = movies.find(m => m.title.toLowerCase() === movieName);

        if (movie) {
            movieDetails.innerHTML = `
                <h3>${movie.title}</h3>
                <p><strong>Plot:</strong> ${movie.plot}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
            `;
        } else {
            movieDetails.innerHTML = `<p>Movie not found. Please try another title.</p>`;
        }
    });
});
