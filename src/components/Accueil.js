import React from 'react';

const Accueil = () => {
  return (
    <div className="container">
      <h1 className="display-4">Bienvenue chez [Nom de l'Entreprise]</h1>
      <p className="lead">
        Nous sommes fiers de vous proposer une large gamme de produits de qualité, y compris des vêtements tendance,
        de l'électronique de pointe et des produits alimentaires savoureux.
      </p>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <img src="/vetements.jpg" alt="Vêtements" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Vêtements</h5>
              <p className="card-text">Découvrez notre collection de vêtements élégants et confortables.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <img src="/electronique.jpg" alt="Électronique" className="card-img-top img-fluid" />
            <div className="card-body">
              <h5 className="card-title">Électronique</h5>
              <p className="card-text">Explorez notre sélection d'appareils électroniques de haute technologie.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <img src="/alimentation.jpg" alt="Alimentation" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Alimentation</h5>
              <p className="card-text">Savourez nos produits alimentaires de qualité supérieure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
