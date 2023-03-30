const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
const sortByNameButton = document.getElementById('sortByName');
const sortByNumberButton = document.getElementById('sortByNumber');
const positionSelect = document.getElementById('positionSelect');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
            && (!positionSelect.value || character.position === positionSelect.value)
        );
    });

    if (filteredCharacters.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No players found';
        charactersList.innerHTML = '';
        charactersList.appendChild(message);
    } else {
        displayCharacters(filteredCharacters);
    }
});

sortByNameButton.addEventListener('click', () => {
    const sortedCharacters = hpCharacters.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    displayCharacters(sortedCharacters);
});

sortByNumberButton.addEventListener('click', () => {
    const sortedCharacters = hpCharacters.slice().sort((a, b) => {
        return a.number - b.number;
    });
    displayCharacters(sortedCharacters);
});

positionSelect.addEventListener('change', (e) => {
    const selectedPosition = e.target.value;

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            !selectedPosition || character.position === selectedPosition
        );
    });

    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('characters.json');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>Number: ${character.number}</p>
                
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
