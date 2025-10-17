document.addEventListener('DOMContentLoaded', () => {

    let allChararacters = [];
    let characterToGuess = null;

    const gameContainer = document.getElementById('game');
    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-guess');

    // INITIALISATION DU JEU
    async function initGame() {
        try {
            const response = await fetch('../Data/characters.json');
            const data = await response.json();

            allChararacters = [...data.pirates_au_chapeau_de_paille, ...data.pirates_de_shanks];

            const randomIndex = Math.floor(Math.random() * allChararacters.length);
            characterToGuess = allChararacters[randomIndex];
            
            console.log("Personnage à deviner :", characterToGuess.name);

        } catch (error) {
            console.error("Erreur lors du chargement des personnages :", error);
        }
    }

    initGame()

    // PROPOSITION DU JOUEUR 
    submitButton.addEventListener('click', handleGuess)
    guessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    });

    function handleGuess() {
        const guessName = guessInput.ariaValueMax.trim();

        if (!guessName) {
            alert("Veuillez entrer un nom de personnage. ");
            return;
        }

        guessInput.value = "";
    }

})