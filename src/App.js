import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Accueil from './components/Accueil';
import Produits from './components/Produits';

function App(props) {
  // État pour stocker la liste des produits
  const [produits, setProduits] = useState([]);
  // État pour afficher le formulaire d'ajout
  const [afficherFormulaireAjout, setAfficherFormulaireAjout] = useState(false);
  // État pour afficher le formulaire de mise à jour
  const [afficherFormulaireMiseAJour, setAfficherFormulaireMiseAJour] = useState(false);
  // État pour le nouveau produit
  const [nouveauProduit, setNouveauProduit] = useState({
    id: '',
    nom: '',
    description: '',
    prix: 0,
    categorie: '',
  });
  // État pour le produit en cours de modification
  const [produitEnCoursDeModification, setProduitEnCoursDeModification] = useState({
    id: '',
    nom: '',
    description: '',
    prix: 0,
    categorie: '',
  });

  // Utilisation de useEffect pour charger la liste des produits au chargement de l'application
  useEffect(() => {
    actualiserListeProduits();
  }, []);

  // Fonction pour récupérer la liste des produits depuis le serveur
  const actualiserListeProduits = async () => {
    try {
      const response = await fetch('http://localhost:5000/produits');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la liste des produits');
      }

      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des produits :', error);
    }
  };

  // Fonction pour afficher le formulaire d'ajout de produit
  const handleAjouterProduit = () => {
    setAfficherFormulaireAjout(true);
  };

  // Fonction pour annuler l'ajout de produit
  const handleAnnulerAjoutProduit = () => {
    setAfficherFormulaireAjout(false);
  };

  // Fonction pour sauvegarder un nouveau produit
  const handleSauvegarderNouveauProduit = async () => {
    if (!nouveauProduit.nom || !nouveauProduit.description || !nouveauProduit.prix || !nouveauProduit.categorie) {
      console.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/produits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouveauProduit),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit sur le serveur");
      }
  
      const responseData = await response.json();
      console.log('Produit ajouté avec succès sur le serveur:', responseData);
  
      setProduits([...produits, responseData]);
      setAfficherFormulaireAjout(false);
      setNouveauProduit({
        id: '',
        nom: '',
        description: '',
        prix: 0,
        categorie: '',
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit sur le serveur :", error);
    }
  };
  
  // Fonction pour mettre à jour un produit
  const mettreAJourProduit = (id, produit) => {
    setProduitEnCoursDeModification(produit);
    setAfficherFormulaireMiseAJour(true);
  };
  
  // Fonction pour annuler la mise à jour d'un produit
  const handleAnnulerMiseAJourProduit = () => {
    setAfficherFormulaireMiseAJour(false);
  };

  // Fonction pour sauvegarder la mise à jour d'un produit
  const handleSauvegarderMiseAJourProduit = async () => {
    if (!produitEnCoursDeModification.id) {
      console.error("L'ID du produit en cours de modification est manquant.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/produits/${produitEnCoursDeModification.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produitEnCoursDeModification),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du produit sur le serveur");
      }
  
      const responseData = await response.json();
      console.log('Produit mis à jour avec succès sur le serveur:', responseData);
  
      setProduits(prevProduits =>
        prevProduits.map(produit =>
          produit.id === produitEnCoursDeModification.id ? produitEnCoursDeModification : produit
        )
      );
  
      setAfficherFormulaireMiseAJour(false);
      setProduitEnCoursDeModification({
        id: '',
        nom: '',
        description: '',
        prix: 0,
        categorie: '',
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit sur le serveur :", error);
    }
  };

  // Fonction pour supprimer un produit
  const supprimerProduit = async (produitId) => {
    try {
      const response = await fetch(`http://localhost:5000/produits/${produitId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit sur le serveur');
      }

      console.log('Produit supprimé avec succès sur le serveur:', await response.json());

      setProduits(produits.filter(produit => produit.id !== produitId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit sur le serveur :', error);
    }
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route
          path="/produits"
          element={
            <Produits
              produits={produits}
              afficherFormulaireAjout={afficherFormulaireAjout}
              afficherFormulaireMiseAJour={afficherFormulaireMiseAJour}
              nouveauProduit={nouveauProduit}
              produitEnCoursDeModification={produitEnCoursDeModification}
              actualiserListeProduits={actualiserListeProduits}
              handleAjouterProduit={handleAjouterProduit}
              handleAnnulerAjoutProduit={handleAnnulerAjoutProduit}
              handleSauvegarderNouveauProduit={handleSauvegarderNouveauProduit}
              handleAnnulerMiseAJourProduit={handleAnnulerMiseAJourProduit}
              handleSauvegarderMiseAJourProduit={handleSauvegarderMiseAJourProduit}
              supprimerProduit={supprimerProduit}
              mettreAJourProduit={mettreAJourProduit}
              setNouveauProduit={setNouveauProduit}
              setProduitEnCoursDeModification={setProduitEnCoursDeModification} 
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
