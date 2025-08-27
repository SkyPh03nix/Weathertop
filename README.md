# Weathertop

Weathertop ist eine Node.js/Express-Webanwendung zur Verwaltung von Wetterstationen und deren Messwerten.

## Voraussetzungen

- Node.js (empfohlen: Version 17+)
- npm
- [SQLite](https://www.sqlite.org/download.html)

## Installation

1. **Repository klonen**

   ```sh
   git clone <repo-url>
   cd Weathertop_new/Weathertop
   ```
2. **Abhängigkeiten installieren**

   ```sh
   npm install
   ```
3. **Datenbank anlegen**

   - Die Datei `weathertop.sqlite` wird beim ersten Start automatisch erstellt.
   - Alternativ kannst du sie manuell mit folgendem Befehl anlegen:
     ```sh
     sqlite3 weathertop.sqlite < sqlscript.txt
     ```
   - Die Tabellen werden beim Start der App automatisch erstellt, falls sie nicht existieren.
4. **Umgebungsvariablen**

   - Erstelle eine `.env`-Datei im Projektverzeichnis:
     ```
     PORT=3000
     ```
   - Passe den Port nach Bedarf an.

## Starten der Anwendung

```sh
node app.js
```

Die Anwendung läuft dann unter [http://localhost:3000](http://localhost:3000).

## Nutzung

- **Registrieren:** Über `/register` einen neuen Benutzer anlegen.
- **Login:** Über `/login` einloggen.
- **Dashboard:** Nach Login werden die eigenen Wetterstationen angezeigt.
- **Stationen & Messwerte:** Neue Stationen und Messwerte können hinzugefügt und gelöscht werden.

## Hinweise

- Die Datei `weathertop.sqlite` ist **nicht** im Repository enthalten. Sie wird beim ersten Start automatisch erstellt.
- Für einen frischen Start einfach die Anwendung starten und einen neuen Benutzer registrieren.
