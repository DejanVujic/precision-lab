# Precision Lab

Ein interaktiver Maßtoleranz-Checker: mein Hintergrund in der Feinwerktechnik trifft auf Webentwicklung.

## Was macht die Anwendung?

Nennmaß, unteres und oberes Abmaß sowie gemessenes Istmaß eingeben. Die Anwendung berechnet Mindestmaß, Höchstmaß und Toleranzbreite, bewertet das Istmaß und visualisiert seine Lage. Drei Beispiele zeigen einen zulässigen Wert, einen Grenzfall und eine Überschreitung.

## Lokal starten

`index.html` im Browser öffnen. Keine Installation und kein Build notwendig.

## Technologien

- Semantisches HTML
- Responsives CSS ohne Framework
- JavaScript: Formulare, Eingabeprüfung, DOM-Manipulation und Berechnungen
- SVG-freie Visualisierung über CSS

## Projektstruktur

- `index.html`: Inhalt und Formular
- `style.css`: Farben, Layout und responsive Darstellung
- `app.js`: Zahleneingabe, Berechnung und Benutzeroberfläche
- `test.cjs`: Tests der Berechnungslogik; ausführen mit `node test.cjs`

## Wie funktioniert die Rechnung?

Mindestmaß = Nennmaß + unteres Abmaß.
Höchstmaß = Nennmaß + oberes Abmaß.
Toleranzbreite = Höchstmaß − Mindestmaß.
Ein Istmaß innerhalb dieser Grenzen ist einschließlich der Grenzwerte zulässig.

Die Anwendung akzeptiert Punkt oder Komma und maximal drei Nachkommastellen in mm. Intern rechnet sie mit ganzzahligen Mikrometern, damit Dezimal-Rundungsfehler die Grenzprüfung nicht verfälschen. Beträge der einzelnen Eingaben sind auf 1.000.000 mm begrenzt.

Die Skala zeigt den Toleranzbereich zwischen 20 % und 80 %. Weit außerhalb liegende Messwerte werden am Skalenrand dargestellt und entsprechend gekennzeichnet.

## Auf GitHub veröffentlichen

1. Ein neues öffentliches Repository namens `precision-lab` erstellen.
2. Die Dateien aus diesem Ordner direkt in das Hauptverzeichnis hochladen und committen.
3. In Settings → Pages die Veröffentlichung aus dem Branch `main` und dem Ordner `/ (root)` einstellen.
4. Nach erfolgreicher Veröffentlichung ist die Demo normalerweise unter https://dejanvujic.github.io/precision-lab/ erreichbar. Die tatsächliche URL zeigt GitHub unter Pages an.

## Herkunft und Lernziel

Dieses Projekt wurde mit Unterstützung von OpenAI Codex erstellt. Es dient als Ausgangspunkt für mein Lernen und meine eigenen Erweiterungen. Ich möchte insbesondere die Eingabevalidierung, die Berechnung und die DOM-Aktualisierung verstehen und selbst weiterentwickeln.

## Ideen für eigene Erweiterungen

- Prüfungen als Verlauf speichern
- CSV-Export ergänzen
- Umschaltung zwischen mm und µm
- Eigene Beispiel-Werkstücke und Beschreibungen hinzufügen

## Grenzen

Lern-Demo mit frei eingegebenen Abmaßen, kein ISO-Passungsrechner. Messunsicherheit, Messmittel und normgerechte Prüfentscheidungen werden nicht berücksichtigt. Es werden keine Daten übertragen oder dauerhaft gespeichert.
