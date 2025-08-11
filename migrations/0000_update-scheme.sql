-- Migration number: 0000 	 2024-01-07T15:36:17.423Z
DROP TABLE IF EXISTS vehicles;
CREATE TABLE IF NOT EXISTS vehicles
(
	id          INTEGER PRIMARY KEY AUTOINCREMENT,
	plate       STRING  NOT NULL,
    type      INTEGER NOT NULL DEFAULT 1,
	date_added  STRING,
	date_expire STRING,
	building    STRING,
	flat        STRING,
	phone       STRING,
	phone2      STRING
);
CREATE UNIQUE INDEX idx_vehicles_plate ON vehicles(plate, type);
