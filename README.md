# AnomalieDetection

---

## Description

**AnomalieDetection** est une plateforme complète et innovante dédiée à la détection d'anomalies géospatiales, notamment des crimes, en utilisant des algorithmes avancés de Machine Learning. Ce projet combine plusieurs technologies pour offrir des solutions robustes et intuitives à deux niveaux :

1. **CrimeDetectionModel-web** : Une application web conçue avec React pour analyser et visualiser les anomalies détectées.
2. **AnomalieDetection-mobile** : Une application mobile Flutter permettant une détection en temps réel sur smartphone.

L'objectif principal de ce projet est de fournir un outil performant et accessible pour comprendre, visualiser et prédire les anomalies dans un contexte géographique précis.

---

## Fonctionnalités principales

### 1. **Carte interactive pour la visualisation des crimes**
L'application web intègre une carte interactive qui affiche les anomalies détectées sous forme de marqueurs. Les utilisateurs peuvent :
- Filtrer les données par type de crime (par exemple, "Vol", "Assaut").
- Filtrer par date pour visualiser les incidents récents ou historiques.
- Cliquer sur un marqueur pour obtenir des détails supplémentaires sur l'anomalie.

**Exemple :**
![Carte interactive](screenshots/crimeFiltersOverview.png)

---

### 2. **Analyse des crimes par région**
Les anomalies sont regroupées par zones géographiques afin d'identifier les tendances et les types de crimes les plus fréquents dans chaque région. Ce module est essentiel pour les décideurs et les forces de l'ordre.

**Exemple d'analyse régionale :**
![Analyse régionale](screenshots/AreasWithMostCrimes.png)

---

### 3. **Statistiques détaillées**
Une analyse statistique approfondie est proposée pour explorer des données clés :
- Répartition des crimes par catégories (par exemple, crimes violents, crimes contre les biens).
- Analyse des caractéristiques des victimes : âge, sexe, etc.
- Statistiques sur les types d'armes les plus utilisés dans les crimes.

**Exemple d'analyse statistique :**
![Statistiques des crimes](screenshots/CrimeDistribution.png)

---

### 4. **Prédiction basée sur les itinéraires**
L'application propose un module permettant d'obtenir des prédictions spécifiques pour un itinéraire donné. En saisissant un point de départ et une destination, les utilisateurs peuvent :
- Recevoir des informations sur les types de crimes potentiels sur le trajet.
- Visualiser la probabilité associée à chaque prédiction.

**Exemple d'une prédiction pour un itinéraire :**
![Prédiction avec itinéraire](screenshots/crimePredictionWithItinerary.png)

---

### 5. **Prédictions via API Flask**
L'API Flask intégrée permet d'envoyer des requêtes en temps réel pour obtenir des prédictions sur des coordonnées GPS spécifiques. Les réponses incluent :
- Le type de crime attendu.
- La probabilité associée à la prédiction.

**Exemple de requête POST via Postman :**
![Requête POST](screenshots/postReq.png)

---

## Structure du projet

### CrimeDetectionModel-web
- **backend/** : Contient le code Python pour l'API Flask, utilisée pour traiter les prédictions et les données.
- **frontDetection/** : Application React pour la visualisation des anomalies.
- **notebooks/** : Jupyter Notebooks pour l'analyse des données et l'entraînement des modèles de Machine Learning.
- **screenshots/** : Dossier contenant les captures d'écran utilisées dans ce document.

### AnomalieDetection-mobile
- **flutter_anomalie_detection/** : Code source de l'application mobile Flutter.

---

## Installation

### Prérequis
Avant d'installer le projet, assurez-vous que votre environnement est correctement configuré avec les outils suivants :
- **Python 3.7+** pour exécuter le backend et les notebooks Jupyter.
- **Node.js et npm** pour le frontend React.
- **Flutter** pour l'application mobile.

---

### Étapes d'installation

#### Installation de CrimeDetectionModel-web

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/CrimeDetectionModel-web.git
    cd CrimeDetectionModel-web
    ```

2. Configurez le backend Flask :
    - Installez les dépendances Python :
      ```bash
      cd backend
      pip install -r requirements.txt
      ```
    - Lancez le serveur Flask :
      ```bash
      python app.py
      ```

3. Configurez le frontend React :
    - Installez les dépendances Node.js :
      ```bash
      cd frontDetection
      npm install
      ```
    - Lancez l'application React :
      ```bash
      npm start
      ```

4. Lancez les notebooks Jupyter (optionnel) pour explorer ou entraîner les modèles :
    ```bash
    cd notebooks
    pip install -r requirements.txt
    jupyter notebook
    ```

---

#### Installation de AnomalieDetection-mobile

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/AnomalieDetection-mobile.git
    cd flutter_anomalie_detection
    ```

2. Installez les dépendances Flutter :
    ```bash
    flutter pub get
    ```

3. Lancez l'application mobile Flutter sur un émulateur ou un appareil connecté :
    ```bash
    flutter run
    ```

---

## Remerciements

Nous souhaitons exprimer notre gratitude envers :
- Les communautés open-source derrière **React**, **Flutter**, **Flask**, et **Jupyter**, pour leurs outils incroyablement utiles.
- Les contributeurs du projet pour leurs efforts constants et leur collaboration.

---

## Licence

Ce projet est distribué sous licence MIT. Veuillez consulter le fichier `LICENSE` pour plus de détails.

---

### Contact
Pour toute question ou suggestion, veuillez nous contacter à l'adresse suivante : **detectionanomaly11@gmail.com**.
