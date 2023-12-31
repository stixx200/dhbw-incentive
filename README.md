# Incentive Projekt

## Einleitung

Sie arbeiten in einem IT Unternehmen, welches ein Incentive Projekt anbietet.
Allerdings ist das aktuelle Frontend schon etwas in die Jahre gekommen und die Geschäftsleitung möchte ein neues Entwicklerteam ins Leben rufen, welches
sich um die Neuentwicklung des Frontends kümmert.
Das Backend kann aus der alten Software weiter verwendet werden.

In dem Incentive-System können Vorgesetzte ihren Mitarbeitern sogenannte Incentive-Punkte vergeben.
Ein Punkt entspricht einem Geldwert von 5€ und kann vom Mitarbeiter dann in eine Prämie eingetauscht werden.
Der System Administrator füllt die Vergabekonten der Vorgesetzten jährlich auf 100 Punkte auf.

## Backend

Das bestehende Backend wird über eine REST API angesprochen. Um die Dokumentation abzurufen, müssen Sie den Backend Server starten und die URL `http://127.0.0.1:4500/api-docs` aufrufen.
Das Backend kann über den Befehl `nx serve api` gestartet werden.

Es gibt folgende Benutzergruppen:
* Anwender/User: Er kann Incentive-Punkte empfangen, sammeln und diese gegen eine Prämie einlösen
* Teamleiter: Er besitzt ein Vergabekonto und kann die darin enthaltenen Incentive-Punkte an Anwender weitergeben. Er selbst kann auch Anwender sein.
* Administrator: Er kann Vergabekonten und Vergabeberechtigte-Anwender-Beziehungen verwalten. Er ist selbst aber kein Anwender oder Teamleiter.

### Quick-Start
1. Download mongodb (als Docker image oder von hier: https://www.mongodb.com/try/download/community)
2. `npm install`
3. `npm install -g nx`
4. `nx serve api`

### Initial Admin Benutzer
Beim Hochfahren des Backends wird überprüft, ob es einen `admin@local` Benutzer gibt. Wenn nicht, wird dieser wie folgt angelegt:
* `email: 'admin@local'`
* `password: 'admin'`

### MongoDB
In der [.env](.env) wird definiert, welche Datenbank verbunden wird.
Um lokal eine MongoDB zu installieren, kann diese von der [MongoDB Homepage](https://www.mongodb.com/try/download/community) heruntergeladen werden.
Alternativ kann auch ein Docker image über die [docker-compose-yml](docker-compose.yml) gestartet werden.

## Frontend

Das neue Frontend soll folgende Anforderungen erfüllen:

* Als Anwender möchte ich mich mit Benutzernamen und Passwort einloggen können, um meine persönlichen Incentive Daten anzeigen zu lassen.
* Als Administrator möchte ich die Vergabekonten von Vergabeberechtigten verwalten können, um neue Incentive-Punkte freizugeben.
* Als Teamleiter möchte ich Incentive-Punkte an mir zugeteilte Anwender vergeben können, um diese für besondere Bemühungen zu belohnen.
* Als Anwender möchte ich meine Incentive-Punkte einlösen, um eine Prämie zu erhalten.
* Als Administrator möchte ich einen Nutzer zu einem Vergabeberechtigten machen, dass dieser Incentive-Punkte an Anwender vergeben kann.
* Als Administrator möchte ich einstellen können, welcher Vergabeberechtigte welchen Anwendern Incentive-Punkte vergeben kann, um die Organisationsstrukturen im Incentive-System abbilden zu können.
* Als Anwender möchte ich sehen, wann und von wem ich Incentive-Punkte bekommen habe um mein Kontostand nachprüfen zu können.
* Als Anwender möchte ich beim Einlösen einer Prämie sofort eine PDF Datei mit einem Einlösecode erhalten, um Prämien im Onlineshop kaufen zu können.
* Als Anwender möchte ich eine Hilfeseite aufrufen können, um nachlesen zu können, welche Prämien es gibt und wie das Incentive-System funktioniert.
* Als Teamleiter möchte ich sehen können, an welche Anwender Incentive-Punkte vergeben werden können, um keine falsche Buchung durchzuführen.
* Als Anwender/Teamleiter/Administrator möchte ich ein interaktives Product-Onboarding System beim ersten Login haben, um schnell die wichtigsten Funktionen der Seite kennen zu lernen
* Als Administrator möchte ich einstellen können, wann Vergabekonten wie hoch automatisiert gefüllt werden, um mir bei dem manuellen Vorgang Zeit zu sparen.
* Als Geschäftsführer möchte ich eine Auswertung der Incentive-Punktevergabe abrufen können, um sehen zu können, welcher Vergabeberechtigte viel oder wenig Incentive-Punkte vergibt.

### Quick-Start
2. `npm install`
3. `nx run-many --target=serve --projects="api,incentive"`

# Further information

* List of Material Icons: https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
