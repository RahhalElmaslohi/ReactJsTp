import React from 'react';

function Produits(props) {
  const {
    produits,
    afficherFormulaireAjout,
    afficherFormulaireMiseAJour,
    nouveauProduit,
    produitEnCoursDeModification,
    handleAjouterProduit,
    handleAnnulerAjoutProduit,
    handleSauvegarderNouveauProduit,
    handleAnnulerMiseAJourProduit,
    handleSauvegarderMiseAJourProduit,
    mettreAJourProduit,
    supprimerProduit,
    setNouveauProduit,
    setProduitEnCoursDeModification,
  } = props;

  return(
    <div className="container">
      <h2 className="my-4">Liste des Produits</h2>
      <button
        className="btn btn-success mb-3"
        onClick={handleAjouterProduit}
      >
        Ajouter un produit
      </button>
      {/* Modal pour ajouter un produit */}
      <div className={`modal ${afficherFormulaireAjout ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: afficherFormulaireAjout ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un produit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleAnnulerAjoutProduit}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Formulaire pour ajouter un nouveau produit */}
              <div className="mb-3">
                <input
                  required
                  type="text"
                  name="nom"
                  className="form-control"
                  placeholder="Nom du produit"
                  value={nouveauProduit.nom}
                  onChange={(e) =>
                    setNouveauProduit({
                      ...nouveauProduit,
                      nom: e.target.value,
                    })
                  }
                />
              </div>
              <input
                required
                type="text"
                name="prix"
                className="form-control"
                placeholder="Prix du produit"
                value={nouveauProduit.prix}
                onChange={(e) =>
                  setNouveauProduit({
                    ...nouveauProduit,
                    prix: e.target.value,
                  })
                }
              />
              <input
                required
                type="text"
                name="description"
                className="form-control"
                placeholder="Description du produit"
                value={nouveauProduit.description}
                onChange={(e) =>
                  setNouveauProduit({
                    ...nouveauProduit,
                    description: e.target.value,
                  })
                }
              />
              <input
                required
                type="text"
                name="categorie"
                className="form-control"
                placeholder="Categorie du produit"
                value={nouveauProduit.categorie}
                onChange={(e) =>
                  setNouveauProduit({
                    ...nouveauProduit,
                    categorie: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleAnnulerAjoutProduit}>
                Annuler
              </button>
              <button type="button" className="btn btn-primary" onClick={() => handleSauvegarderNouveauProduit()}>
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour la mise à jour d'un produit */}
      <div className={`modal ${afficherFormulaireMiseAJour ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: afficherFormulaireMiseAJour ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mettre à jour un produit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleAnnulerMiseAJourProduit}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Formulaire pour mettre à jour un produit */}
              <div className="mb-3">
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Nouveau nom du produit"
                  value={produitEnCoursDeModification.nom}
                  onChange={(e) =>
                    setProduitEnCoursDeModification({
                      ...produitEnCoursDeModification,
                      nom: e.target.value,
                    })
                  }
                />
              </div>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Nouveau nom du produit"
                value={produitEnCoursDeModification.prix}
                onChange={(e) =>
                  setProduitEnCoursDeModification({
                    ...produitEnCoursDeModification,
                    prix: e.target.value,
                  })
                }
              />
              <input
                required
                type="text"
                className="form-control"
                placeholder="Nouveau nom du produit"
                value={produitEnCoursDeModification.description}
                onChange={(e) =>
                  setProduitEnCoursDeModification({
                    ...produitEnCoursDeModification,
                    description: e.target.value,
                  })
                }
              />
              <input
                required
                type="text"
                className="form-control"
                placeholder="Nouveau nom du produit"
                value={produitEnCoursDeModification.categorie}
                onChange={(e) =>
                  setProduitEnCoursDeModification({
                    ...produitEnCoursDeModification,
                    categorie: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleAnnulerMiseAJourProduit}>
                Annuler
              </button>
              <button type="button" className="btn btn-primary" onClick={() => handleSauvegarderMiseAJourProduit()}>
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className="list-group">
        {produits.map((produit) => (
          <li key={produit.id} className="list-group-item">
            <div className="row">
              <div className="col-md-4">
                <div className="produit-details">
                  <h5 className="card-title">Nom: {produit.nom}</h5>
                  <p className="card-text">Prix: {produit.prix} $</p>
                  <p className="card-text">Description: {produit.description}</p>
                  <p className="card-text">Catégorie: {produit.categorie}</p>
                </div>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => mettreAJourProduit(produit.id, produit)}
                >
                  Mettre à jour
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-danger btn-block"
                  onClick={() => supprimerProduit(produit.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produits;
