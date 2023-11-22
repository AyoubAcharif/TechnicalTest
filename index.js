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
    let rendu = [];

    for (const billet of billets) {
        while (montant >= billet) {
            montant -= billet;
            rendu.push(billet);
        }
    }

    if (montant === 0) {
        return rendu;
    } else {
        // Réinitialiser montant et rendu pour réessayer avec une nouvelle approche
        montant += rendu.pop();
        rendu = [];

        const reverseBillets = billets.slice().reverse(); // Copie du tableau billets + inversion

        for (const billet of reverseBillets) {
            while (montant >= billet) {
                montant -= billet;
                rendu.push(billet);
            }
        }

        return montant === 0 ? rendu : null;    // Si montant = 0 alors on retourne rendu sinon on retourne null
    }
}

/** Parti Affichage et Ecriture */

rl.question('Entrez le montant à rendre : ', (montantSaisi) => {
    const montantARendre = parseInt(montantSaisi);

    if (isNaN(montantARendre) || montantARendre <= 0) { // Si l'entré au clavier != un nombre OU = négatif Alors ....
        console.log('Veuillez entrer un montant valide supérieur à zéro.');
        rl.close();
    } else {
        const solutionOptimale = rendreMonnaie(montantARendre);

        console.log(`Montant à rendre : ${montantARendre}$`);
        console.log('Solution optimale :');

        if (solutionOptimale === null) {
            console.log('Aucune solution');
        } else {
            for (let i = 0; i < solutionOptimale.length; i++) {
                console.log(` ${solutionOptimale[i]}$`);
            }
        }

        rl.close();
    }
});
