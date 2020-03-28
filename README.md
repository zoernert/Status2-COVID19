# Status2 - COVID19 Edition (status2-covid19)
**WebApp zur Ermittlung einer Mannschaftsstärke und Verfügbarkeit der Helfer in einer Hilfsorganisation. Überarbeitet für COVID19-Lagen**
![GitHub issues](https://img.shields.io/github/issues/zoernert/Status2-COVID19)

Hilfsorganisationen haben es aktuell schwerer die Verfügbarkeit ihrer Helfer sicher zu ermitteln. Die einzelnen Krisenstäbe wünschen sich daher eine Möglichkeit einen Status sehr schnell zu ermitteln, ohne die meist ehrenamtlichen Helfer vor eine technische Herausforderung zu stellen. Angepasst auf die Besonderheiten bei einer Pandemie kann Status2 dies liefern.

- [Status2 - COVID19 Edition (status2-covid19)](#status2---covid19-edition--status2-covid19-)
    + [Testumgebung](#testumgebung)
    + [Status2 bietet](#status2-bietet)
    + [Status2 bietet nicht](#status2-bietet-nicht)
  * [Entwickler (lokale Installation)](#entwickler--lokale-installation-)
    + [Starten des Entwicklungsserver](#starten-des-entwicklungsserver)
    + [Code Hygiene](#code-hygiene)
    + [Erstellen einer neuen Version](#erstellen-einer-neuen-version)
  * [Hintergrund](#hintergrund)
    + [Motivation](#motivation)
    + [Zielgruppe](#zielgruppe)
    + [Intiatoren](#intiatoren)
  * [Mitwirken](#mitwirken)

### Testumgebung
https://status2.net/

### Status2 bietet
- einfachste Möglichkeit der Ermittlung von Bereitschaftsstärken
- keine Registrierung notwendig
- nutzbar ohne Helferschulung
- für alle Browser (inkl. Smartphones etc..)
- Open-Source und kostenloses Hosting

### Status2 bietet nicht
- Alarmierungssystem (Aussenden von Alarmrufen etc..)
- Verwalungsfunktionen (Material, Mitglieder, Schichten,...)
- Schnick oder Schnack (Funktionen, die kein Mensch braucht)

## Entwickler (lokale Installation)
```bash
git clone https://github.com/zoernert/Status2-COVID19.git
cd Status2-COVID19
npm install
```
### Starten des Entwicklungsserver
```bash
quasar dev
```

### Code Hygiene
```bash
npm run lint
```

### Erstellen einer neuen Version
```bash
quasar build
```
## Hintergrund
### Motivation
Helfer/Einsatzkräfte haben die Möglichkeit ihre Verfügbarkeit mittels eines einfachen Ampelsystems zu melden. Bei Ausbleiben dieser Meldung werden sie per Push-Nachricht erinnert.

Der Stab oder die Führungsgruppe kann aufgeschlüsselt nach Qualifikationen und Einsatzbereichen die Verfügbarkeit der Gruppe/Zug/Verband sehen.

Ziel des Projektes ist es ein möglichst einfaches Werkzeug für den Anwendungsfall zu schaffen, dass auf Basis von Qualifikationen und Einsatzbereichen die jeweils aktuelle Verfügbarkeit von Helfern und Einsatzkräften darstellt.

### Zielgruppe  

-   Einheiten im Bevölkerungsschutz der Hilfsorganisationen.
-   Gruppen und Einheiten die eine Einsatzbereitschaft herstellen müssen

Es ist denkbar, dass Status2 auch in Ambulanzen, Energieversorgern und anderen Bereichen zum Einsatz kommt, immer dort, wo der Überblick über die Verfügbarkeit zu einer Gruppe von Personen mit bestimmten Rollen sichergestellt werden muss.

### Intiatoren
Entwickelt und gepflegt wird Status2 durch Thorsten Zoerner und das Team seines Unternehmens STROMDAO. Thorsten ist selbst aktives Mitglied in mehreren Hilfsorganisationen, genauso wie viele seiner Teammitglieder. Satus2 ist gerade im Anbetracht der Tatsache, dass bei kleinen Unternehmen Aufgaben auf nur wenige Schultern verteilt werden, eine große Erleichterung. Sobald der Melder geht, wird geschaut, ob Termine oder Fristen verschoben werden können, sodass die Einsatzbereitschaft im Bevölkerungsschutz gewährleistet ist. Die Ausbildung läuft entweder über den Bildungsurlaub oder Freizeitausgleich. Bei Einsätzen in der Auslandshilfe, die länger als 14 Tage angesetzt werden, ist eine Freistellung nach nur einem Tag, der zur Übergabe des operativen Geschäfts genutzt wird, gewährleistet. Der hohe Anteil des Ehrenamts im Unternehmen spiegelt die grundlegenden Leitsätze des Unternehmens wieder, dessen langfristiges Hauptziel wie folgt festgelegt ist: _Good Governance: die Sicherung und Steigerung des Unternehmenswertes, aber nachhaltig, ethisch und moralisch korrekt und wertvoll und mit großem gesellschaftlichem Engagement_.

## Mitwirken
Bitte einen Pull-Request mit einem eigenen Branch machen. Der Branch wird automatisch als Sub-Domain von status2.net angelegt (via Netlify). Damit Pushbenachrichtigungen funktionieren, ist zusätzlich ein App-Key notwendig, der durch den Maintainer des Repository gesetzt wird.
