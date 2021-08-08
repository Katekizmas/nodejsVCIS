--@(#) script.ddl

DROP TABLE IF EXISTS Autentifikacija, Skiepas, Specialistas_Paslauga, Istorija, Seimininkas, Paslauga, Rusis, Gyvunas, Specialistas, Vizitas, Zinute CASCADE;

CREATE TABLE Autentifikacija
(
	id_Autentifikacija varchar (255) NOT NULL,
	fk_seimininkas integer,
	fk_specialistas integer,
	pastas varchar (255),
	role varchar (255),
	galiojimoLaikas date,
	PRIMARY KEY(id_Autentifikacija)
);

CREATE TABLE Paslauga
(
	pavadinimas varchar (255),
	aprasymas varchar (255),
	kaina decimal (8,2),
	id_Paslauga SERIAL NOT NULL,
	PRIMARY KEY(id_Paslauga)
);

CREATE TABLE Rusis
(
	pavadinimas varchar (255),
	id_Rusis SERIAL NOT NULL,
	PRIMARY KEY(id_Rusis)
);

CREATE TABLE Seimininkas
(
	vardas varchar (255),
	pavarde varchar (255),
	pastas varchar (255),
	telnr varchar (255),
	slaptazodis varchar (255),
	id_Seimininkas SERIAL NOT NULL,
	PRIMARY KEY(id_Seimininkas)
);

CREATE TABLE Gyvunas
(
	vardas varchar (255),
	gimimoMetai varchar (10),
	veisle varchar (255),
	lytis varchar (255),
	cipas varchar (255),
	id_Gyvunas SERIAL NOT NULL,
	fk_Rusis integer NOT NULL,
	fk_Seimininkas integer NOT NULL,
	PRIMARY KEY(id_Gyvunas),
	CONSTRAINT turi1 FOREIGN KEY(fk_Rusis) REFERENCES Rusis (id_Rusis),
	CONSTRAINT augina FOREIGN KEY(fk_Seimininkas) REFERENCES Seimininkas (id_Seimininkas)
);

CREATE TABLE Specialistas
(
	pareigos varchar (255),
	role varchar (255),
	darboLaikasNuo varchar (16),
	darboLaikasIki varchar (16),
	pastabos varchar (255),
	id_Specialistas SERIAL NOT NULL,
	fk_Seimininkas integer NOT NULL,
	PRIMARY KEY(id_Specialistas),
	UNIQUE(fk_Seimininkas),
	CONSTRAINT dirba FOREIGN KEY(fk_Seimininkas) REFERENCES Seimininkas (id_Seimininkas)
);

CREATE TABLE Vizitas
(
	diena varchar (10),
	pradzia varchar (16),
	pabaiga varchar (16),
	pastabos varchar (255),
	busena varchar (255),
	id_Vizitas SERIAL NOT NULL,
	fk_Seimininkas integer NOT NULL,
	fk_Specialistas integer,
	fk_Paslauga integer NOT NULL,
	fk_Gyvunas integer NOT NULL,
	PRIMARY KEY(id_Vizitas),
	CONSTRAINT rezevuoja FOREIGN KEY(fk_Seimininkas) REFERENCES Seimininkas (id_Seimininkas),
	CONSTRAINT kontroliuoja FOREIGN KEY(fk_Specialistas) REFERENCES Specialistas (id_Specialistas),
	CONSTRAINT priklauso FOREIGN KEY(fk_Paslauga) REFERENCES Paslauga (id_Paslauga),
	CONSTRAINT veda FOREIGN KEY(fk_Gyvunas) REFERENCES Gyvunas (id_Gyvunas)
);

CREATE TABLE Istorija
(
	svoris float,
	savijauta varchar (255),
	nustatyta varchar (255),
	komentarai varchar (255),
	paskirtasGydymas varchar (255),
	laikas varchar (16),
	id_Istorija SERIAL NOT NULL,
	fk_Gyvunas integer NOT NULL,
	fk_Vizitas integer NOT NULL,
	PRIMARY KEY(id_Istorija),
	UNIQUE(fk_Vizitas),
	CONSTRAINT kaupia FOREIGN KEY(fk_Gyvunas) REFERENCES Gyvunas (id_Gyvunas),
	CONSTRAINT pildo420 FOREIGN KEY(fk_Vizitas) REFERENCES Vizitas (id_Vizitas)
);

CREATE TABLE Skiepas
(
	pavadinimas varchar (255),
	laikas varchar (16),
	id_Skiepas SERIAL NOT NULL,
	fk_Gyvunas integer NOT NULL,
	fk_Vizitas integer NOT NULL,
	PRIMARY KEY(id_Skiepas),
	UNIQUE(fk_Vizitas),
	CONSTRAINT turi2 FOREIGN KEY(fk_Gyvunas) REFERENCES Gyvunas (id_Gyvunas),
	CONSTRAINT pildo69 FOREIGN KEY(fk_Vizitas) REFERENCES Vizitas (id_Vizitas)
);

CREATE TABLE Specialistas_Paslauga
(
	fk_Paslauga integer NOT NULL,
	fk_Specialistas integer NOT NULL,
	PRIMARY KEY(fk_Paslauga, fk_Specialistas),
	CONSTRAINT atlieka FOREIGN KEY(fk_Paslauga) REFERENCES Paslauga (id_Paslauga)
);

CREATE TABLE Zinute
(
	zinute varchar (255),
	laikas varchar (16),
	busena varchar (255),
	fk_Siuntejas integer NOT NULL,
	fk_Gavejas integer NOT NULL,
	id_Zinute SERIAL NOT NULL,
	fk_Vizitas integer NOT NULL,
	PRIMARY KEY(id_Zinute),
	CONSTRAINT turi3 FOREIGN KEY(fk_Vizitas) REFERENCES Vizitas (id_Vizitas)
);
