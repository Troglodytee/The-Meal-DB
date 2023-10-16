# Projet ReactJS : TheMealDB par Thomas Baricault

Ce projet est une application ReactJS qui utilise l'API "TheMealDB" pour permettre à l'utilisateur de rechercher des recettes de plats ou de simuler la création d'une recette en utilisant le LocalStorage.

## Installation

Pour installer ce projet il faut avoir npm et ReactJS d'installé. Ensuite dans un terminal de commande créez un nouveau projet react avec la commande :
```
npx create-react-app nom_du_projet
```
Puis vous rendre dans le dossier créé avec :
```
cd nom_du_projet
```
Ensuite il vous faut installer toutes les librairie nécessaires :
```
npm i axios
npm i react-router-dom
```
Et enfin vous copiez tous les fichiers et dossier du projet dans le dossier ```src``` en ayant prélablement supprimé tout ce qui s'y trouvait

## Démarrer le programme

Pour démarrer le programme il faut ouvrir un invite de commande sur le dossier du projet et utiliser la commande :
```
npm start
```
Un onglet de navigateur va alors s'ouvrir automatiquement.

## Utilisation

### Page d'accueil

Sur la page d'accueil sont affichés une sélection de 25 plats choisis aléatoirement et vous pouvez rechercher un plat précit en utilisant la barre de recherche.

Vous pouvez aussi cliquer sur un plat pour voir ses détails.

### Page de détails

Sur la page de détails vous pouvez voir la recette du plat avec la liste des ingrédients ainsi que la source de la recette s'il y en a une.

Si vous êtes connecté vous pouvez également mettre le plat en favori en cliquant sur l'étoile à côté de son nom.

### Connexion

En cliquant sur "Se connecter" dans le header vous aurez accès à un formulaire de connexion. Comme l'application est une application d'essai il suffit d'entrer un email correct ainsi qu'un mot de passe d'au moins 1 caractère.

Un fois connecté vous aurez accès à 2 nouveaux liens dans le header :

- La page des favoris
- La page des recettes personnalisées

### Déconnexion

En cliquant sur "Se déconnecter" dans le header lorsque vous êtes connecté, vous serez déconnecté mais les favoris et recettes enregistrées sont sauvegardées et peuvent être retrouvées en se reconnectant.

### Page des favoris

Sur cette page vous pourrez voir la liste de tous les plats que vous avez mis en favori et en cliquant dessus vous aurez leurs détails et vous pourrez les retirer des favoris et recliquant sur l'étoile à côté du nom du plat.

### Page des recettes

Sur cette page vous pourrez voir la liste des recettes que vous avez ajouté et en cliquant sur "Ajouter une recette" vous pouvez en créer de nouvelles. Si vous cliquez sur une recette vous accèderez à ses détails ainsi qu'à un bouton permettant de la supprimer.

### Ajout de recette

Sur cette page vous avez accès à un formulaire permettant de renseigner les détails d'une recette que vous pouvez ensuite ajouter à votre liste.

En cliquant sur les boutons "+" et "-" sous le tableau des ingrédients vous pouvez ajouter jusqu'à 20 ingrédients différents ou en supprimer 1.

Seuls le nom, la catégorie et la zone de la recette sont requis pour l'ajouter.

Les catégories et zones proposées sont récupérer via une requête à l'API afin d'avoir les mêmes que celle-ci.