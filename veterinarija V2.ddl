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
	fk_Rusis integer,
	fk_Seimininkas integer NOT NULL,
	PRIMARY KEY(id_Gyvunas),
	CONSTRAINT turi FOREIGN KEY(fk_Rusis) REFERENCES Rusis (id_Rusis) ON DELETE SET NULL,
	CONSTRAINT augina FOREIGN KEY(fk_Seimininkas) REFERENCES Seimininkas (id_Seimininkas) ON DELETE CASCADE
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
	CONSTRAINT dirba FOREIGN KEY(fk_Seimininkas) REFERENCES Seimininkas (id_Seimininkas) ON DELETE CASCADE
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
	fk_Paslauga integer,
	fk_Gyvunas integer NOT NULL,
	PRIMARY KEY(id_Vizitas),
	CONSTRAINT rezervuoja FOREIGN KEY(fk_Seimininkas) REFERENCES Seimininkas (id_Seimininkas) ON DELETE CASCADE,
	CONSTRAINT kontroliuoja FOREIGN KEY(fk_Specialistas) REFERENCES Specialistas (id_Specialistas) ON DELETE SET NULL,
	CONSTRAINT suteikia FOREIGN KEY(fk_Paslauga) REFERENCES Paslauga (id_Paslauga) ON DELETE SET NULL,
	CONSTRAINT priklauso FOREIGN KEY(fk_Gyvunas) REFERENCES Gyvunas (id_Gyvunas) ON DELETE CASCADE
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
	fk_Vizitas integer NOT NULL,
	PRIMARY KEY(id_Istorija),
	UNIQUE(fk_Vizitas),
	CONSTRAINT pildo FOREIGN KEY(fk_Vizitas) REFERENCES Vizitas (id_Vizitas) ON DELETE CASCADE
);

CREATE TABLE Skiepas
(
	pavadinimas varchar (255),
	laikas varchar (16),
	id_Skiepas SERIAL NOT NULL,
	fk_Vizitas integer NOT NULL,
	PRIMARY KEY(id_Skiepas),
	UNIQUE(fk_Vizitas),
	CONSTRAINT kaupia FOREIGN KEY(fk_Vizitas) REFERENCES Vizitas (id_Vizitas) ON DELETE CASCADE
);

CREATE TABLE Specialistas_Paslauga
(
	fk_Paslauga integer NOT NULL,
	fk_Specialistas integer NOT NULL,
	PRIMARY KEY(fk_Paslauga, fk_Specialistas),
	CONSTRAINT atlieka FOREIGN KEY(fk_Paslauga) REFERENCES Paslauga (id_Paslauga) ON DELETE CASCADE
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
	CONSTRAINT siuncia FOREIGN KEY(fk_Vizitas) REFERENCES Vizitas (id_Vizitas) ON DELETE CASCADE
);

-- Slaptazodis: adminas123, specialistas123, seimininkas123

INSERT INTO Seimininkas (vardas, pavarde, telnr, pastas, slaptazodis) VALUES
('Paulius', 'Administratorius', '+37062861793', 'adminas@adminas.lt', '$2b$10$DVPtkpDg.yBIbc/nAcKUzOm5qIRzBrUNS1Hr6cjBQtb9XYIC/yjX.'),
('Tomas', 'Specialistas', '+37068246917', 'specialistas@specialistas.lt', '$2b$10$VDgOt7WLMkdB6Cinb3Q48u5nq3ki7IgXXI9W45oQu.DwVW2XxpnZq'),
('Skaistė', 'Šeimininkė', '+37064569514', 'seimininkas@seimininkas.lt', '$2b$10$IPemy34wr2Ur2BVnVcw71.5/fbB0hEz7c2VEg9jR.d8xKH5EdQ6AK');

INSERT INTO Specialistas(fk_seimininkas, pareigos, role, darboLaikasNuo, darboLaikasIki, pastabos) VALUES
(1, 'Vadovas', 'ADMIN', '07:00', '20:00', ''),
(2, 'Padėjėjas', 'MODERATOR', '08:00', '17:00', '');

INSERT INTO Rusis (pavadinimas) VALUES 
('Šuo'),
('Katė'),
('Karvė'),
('Avis'),
('Arklys'),
('Ožka'),
('Kiaulė'),
('Sausumos vėžlys'),
('Vandens vėžlys'),
('Šinšila'),
('Žiurkėnas'),
('Japoniškas peliukas'),
('Jūrų kiaulytė'),
('Banguotoji papūgėlė'),
('Žako papūga'),
('Balandis'),
('Kakadu'),
('Iguana'),
('Gekonas'),
('Ežys'),
('Šeškas'),
('Triušis');

INSERT INTO Paslauga (pavadinimas, aprasymas, kaina) VALUES
('Onkologija', 'Gydymo būdai: chirurginis ir chemoterapinis.', '1.5'),
('Gyvūnų rentgeno tyrimai', 'Skaitmeninis rentgeno ištyrimas.', '2.1'),
('Veterinarinė ortopedija', 'Veterinarinės ortopedinės procedūros ir  chirurginės operacijos.', '3.1'),
('Stacionaro skyrius', 'Klinikoje gyvūnai priimami į stacionaro skyrių.', '4.4'),
('Veterinarijos gydytojas į namus', 'Jūsų mieste atvykstame į namus', '5.7'),
('Veterinarinė ginekologija', 'Reprodukcija, Šlapimo sistemos tyrimai.', '6.8'),
('Echoskopiniai tyrimai', 'Ultragarsiniai tyrimai atliekami diagnozuojant vidaus ligas.', '7.9'),
('Veterinarinė chirurgija', 'Įvairios chirurginės operacijos pasitelkiant modernią narkozę.', '8.5'),
('Laparoskopija', 'Minimalios intervencijos operavimo metodas.', '9.2'),
('Endoskopiniai ir Bronchoskopiniai tyrimai', 'Kvėpavimo takų ir skrandžio vertinimas vaizdo kamera.', '10.8'),
('Odontologija', 'Dantų kanalu taisymas, plombavimas, taisome sugedusius dantis.', '11.4'),
('Gyvūnų Dermatologija', 'Odos susirgimų diagnostika ir gydymas.', '12.5'),
('Kraujo tyrimai', 'Diagnostiniai tyrimai gyvūnams modernioje laboratorijoje.', '13.6'),
('Širdies ligų gydymas', 'Kardiologinių susirgimų diagnostika ir gydymas.', '14.3'),
('Akių ligų gydymas', 'Veterinarinė oftalmologija.', '15.5'),
('Egzotinių gyvūnų gydymas', 'Gyvatės Driežai Nariuotakojai Varliagyviai. Konsultacijos dėl priežiūros, maitinimo, laikymo.', '16.4');