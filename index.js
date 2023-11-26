// Date: 26/11

/*  By Acharif Ayoub*/

/**
 * Déclaration pour le canal d'entré (=> écriture au clavier)
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 
 * Fonction Maitresse
 *
 */

function rendreMonnaie(montant) {
    const billets = [10, 5, 2];
    let meilleureSolution = null;

    function recursiveRendreMonnaie(index, restant, solutionTempo) {
        if (restant === 0) {
            // La solution partielle est valide
            if (meilleureSolution === null || solutionTempo.length < meilleureSolution.length) {
                meilleureSolution = solutionTempo.slice();
            }
            return;
        }

        if (index < billets.length) {
            // Essayer d'utiliser le billet actuel
            if (restant >= billets[index]) {
                solutionTempo.push(billets[index]);
                recursiveRendreMonnaie(index, restant - billets[index], solutionTempo);
                solutionTempo.pop(); // Retirer le dernier billet pour essayer d'autres possibilités
            }

            // Passer au billet suivant
            recursiveRendreMonnaie(index + 1, restant, solutionTempo);
        }
    }

    recursiveRendreMonnaie(0, montant, []);

    return meilleureSolution;
}

rl.question('Entrez le montant à rendre : ', (montantSaisi) => {
    const montantARendre = parseInt(montantSaisi);

    if (isNaN(montantARendre) || montantARendre <= 0) { // Si l'entré au clavier != un nombre OU = négatif Alors ....
        console.log('Veuillez entrer un montant valide supérieur à zéro.');
        rl.close();
    } else {
        const solutionOptimale = rendreMonnaie(montantARendre);

        console.log(`Montant à rendre : ${montantARendre}$`);
        console.log('Solution optimale :');

        if (solutionOptimale === null || solutionOptimale.length === 0) {
            console.log('Aucune solution');
        } else {
            for (let i = 0; i < solutionOptimale.length; i++) {
                console.log(` ${solutionOptimale[i]}$`);
            }
        }

        rl.close();
    }
});
