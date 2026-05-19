-- 1. CRÉATION DES TABLES

-- Création de la table Proprietaire
CREATE TABLE Proprietaire (
    id_proprietaire INT PRIMARY KEY,
    nom             VARCHAR(100) NOT NULL,
    courriel        VARCHAR(150) NOT NULL,
    telephone       VARCHAR(20)
);

-- Création de la table Veterinaire
CREATE TABLE Veterinaire (
    id_veterinaire INT PRIMARY KEY,
    nom            VARCHAR(100) NOT NULL,
    specialite     VARCHAR(100)
);

-- Création de la table Animal
CREATE TABLE Animal (
    id_animal       INT PRIMARY KEY,
    nom             VARCHAR(100) NOT NULL,
    espece          VARCHAR(50)  NOT NULL,
    race            VARCHAR(50),
    date_naissance  DATE,
    id_proprietaire INT NOT NULL,
    CONSTRAINT fk_animal_proprietaire FOREIGN KEY (id_proprietaire) REFERENCES Proprietaire(id_proprietaire)
    CONSTRAINT fk_consultation_veterinaire FOREIGN KEY (id_veterinaire) REFERENCES Veterinaire(id_veterinaire)
);

-- Création de la table Consultation
CREATE TABLE Consultation (
    id_consultation   INT PRIMARY KEY,
    date_consultation DATE         NOT NULL,
    motif             VARCHAR(200) NOT NULL,
    diagnostic        VARCHAR(500),
    id_animal         INT NOT NULL,
    CONSTRAINT fk_consultation_animal      FOREIGN KEY (id_animal)      REFERENCES Animal(id_animal),
);

-- Création de la table Traitement
CREATE TABLE Traitement (
    id_traitement   INT PRIMARY KEY,
    nom             VARCHAR(100) NOT NULL,
    description     VARCHAR(300),
    dose            VARCHAR(100),
    id_consultation INT NOT NULL,
    CONSTRAINT fk_traitement_consultation FOREIGN KEY (id_consultation) REFERENCES Consultation(id_consultation)
);

-- 2. INSERTION DES DONNÉES DE BASE

-- Insertion dans Proprietaire
INSERT INTO Proprietaire (id_proprietaire, nom, courriel, telephone) VALUES (1, 'Marie Tremblay', 'marie@email.com', '514-555-0101');
INSERT INTO Proprietaire (id_proprietaire, nom, courriel, telephone) VALUES (2, 'Jean Mico',    'jean@email.com',  '514-555-0202');
INSERT INTO Proprietaire (id_proprietaire, nom, courriel, telephone) VALUES (3, 'Sophie Elle',  'sophie@email.com','438-555-0303');

-- Insertion dans Veterinaire
INSERT INTO Veterinaire (id_veterinaire, nom, specialite) VALUES (1, 'Dr. Lefebvre', 'Médecine générale');
INSERT INTO Veterinaire (id_veterinaire, nom, specialite) VALUES (2, 'Dr. Isba',   'Chirurgie');
INSERT INTO Veterinaire (id_veterinaire, nom, specialite) VALUES (3, 'Dr. Côté',     'Dermatologie');

-- Insertion dans Animal
INSERT INTO Animal (id_animal, nom, espece, race, date_naissance, id_proprietaire) VALUES (1, 'Bob', 'Chien', 'Labrador', '2019-03-12', 1);
INSERT INTO Animal (id_animal, nom, espece, race, date_naissance, id_proprietaire) VALUES (2, 'Luna', 'Chat',  'Siamois',  '2021-07-05', 2);
INSERT INTO Animal (id_animal, nom, espece, race, date_naissance, id_proprietaire) VALUES (3, 'Tommy',  'Chien', 'Berger',   '2020-11-20', 3);

-- Insertion dans Consultation
INSERT INTO Consultation (id_consultation, date_consultation, motif, diagnostic, id_animal, id_veterinaire) VALUES (1, '2026-01-02', 'Vaccin annuel',  'Rage',            1, 1);
INSERT INTO Consultation (id_consultation, date_consultation, motif, diagnostic, id_animal, id_veterinaire) VALUES (2, '2026-04-10', 'Boiterie',       'Entorse légère', 1, 1);
INSERT INTO Consultation (id_consultation, date_consultation, motif, diagnostic, id_animal, id_veterinaire) VALUES (3, '2026-03-15', 'Perte de poils', 'Allergie',       2, 3);

-- Insertion dans Traitement
INSERT INTO Traitement (id_traitement, nom, description, dose, id_consultation) VALUES (1, 'Repos',      'Repos complet 1 semaine', '0',           2);
INSERT INTO Traitement (id_traitement, nom, description, dose, id_consultation) VALUES (2, 'Cortisol', 'Anti-inflammatoire',      '100mg 2x/jour', 2);
INSERT INTO Traitement (id_traitement, nom, description, dose, id_consultation) VALUES (3, 'Cortisone',  'Crème anti-allergique',   'Appliquer 1x/j',3);