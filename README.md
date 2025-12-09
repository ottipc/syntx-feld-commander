# ⚡️ SYNTX FELD COMMANDER: OPERATIVE KONTROLLE

```text
  ██████  ▓██   ██▓ ███▄    █  ▄▄▄█████▓▒██   ██▒
▒██    ▒   ▒██  ██▒ ██ ▀█   █  ▓  ██▒ ▓▒▒▒ █ █ ▒░
░ ▓██▄      ▒██ ██░▓██  ▀█ ██▒ ▒ ▓██░ ▒░░░  █   ░
  ▒   ██▒   ░ ▐██▓░▓██▒  ▐▌██▒ ░ ▓██▓ ░  ░ █ █ ▒ 
▒██████▒▒   ░ ██▒▓░▒██░   ▓██░   ▒██▒ ░ ▒██▒ ▒██▒
▒ ▒▓▒ ▒ ░    ██▒▒▒ ░ ▒░   ▒ ▒    ▒ ░░   ▒▒ ░ ░▓ ░
░ ░▒  ░ ░  ▓██ ░▒░ ░ ░░   ░ ▒░     ░    ░░   ░▒ ░
░  ░  ░    ▒ ▒ ░░     ░   ░ ░    ░       ░    ░  
      ░    ░ ▀                         ░    ░    
           ░                                     
````

> **STATUS:** `OPERATIV` | **API TARGET:** `dev.syntx-system.com` | **REFRESH:** `30s`

-----

## 💠 MISSION STATEMENT

Der **SYNTX FELD COMMANDER** ist die zentrale visuelle Schnittstelle zur Überwachung des **Syntx Feldes**. Er dient der Echtzeit-Analyse von **Prompt-Evolutionen**, **System-Resonanzen** und **Drift-Anomalien**.

Das System visualisiert unsichtbare Datenströme und wandelt rohe Telemetrie in taktische Entscheidungsgrundlagen um. Es ist keine Anzeige – es ist ein **Interventions-Instrument**.

-----

## 🛠 ARCHITEKTUR & KERN-TECHNOLOGIE

Das System basiert auf einer Hochleistungs-Next.js-Architektur, optimiert für minimale Latenz und maximale Datendichte.

  * **Core:** Next.js 16 (App Router)
  * **Engine:** React Client Components (`use client`)
  * **State:** `useSyntxData` Hook (Real-time Polling & Error Handling)
  * **Styling:** Tailwind CSS (Dark Mode / High Contrast Red-Cyan Palette)
  * **Visuals:** Custom `FlowLoadBar` & `StatusLamp` Indikatoren.

-----

## 📊 MODUL-ÜBERSICHT (TABS)

Das Dashboard ist in vier taktische Sektoren unterteilt, um Informationsüberlastung zu vermeiden und Fokus zu gewährleisten.

### 1\. 🔴 SYSTEM HEALTH & STATUS (Das Herz)

*Überwachung der vitalen Infrastruktur und des Strom-Flusses.*

  * **FULL SYSTEM HEALTH:**
      * Zeigt den globalen API-Status (`/health`).
      * Überwacht Modul-Verfügbarkeit & Queue-Zugriff.
      * Visualisierung durch **StatusLamps** (Online/Warning).
  * **RESONANZ SYSTEM HEALTH:**
      * Analysiert die Schwingung des Systems (`/resonanz/system`).
      * Erkennt kritische Zustände wie **DRIFT** oder **KRITISCH**.
      * Zeigt Queue- & Qualitäts-Resonanz in Echtzeit.
  * **RESONANZ QUEUE:**
      * Live-Überwachung des "Stroms" (`/resonanz/queue`).
      * Visualisiert **Flow Rate** (Jobs/s) via `FlowLoadBar`.
      * Zeigt Incoming vs. Processed vs. Error Raten.
  * **STROM QUEUE STATUS:**
      * Tiefe Einblicke in die Warteschlange (`/strom/queue/status`).
      * Visualisierung der **Queue Tiefe** und Tagesleistung.

### 2\. 🧬 EVOLUTION & TRENDS (Das Gehirn)

*Analyse der genetischen Entwicklung der Prompts und Vorhersage von Mustern.*

  * **EVOLUTION PROGRESS (FULL):**
      * Tabellarische Ansicht der Generationen-Historie (`/generation/progress`).
      * Tracking von Avg. Score und Sample Count über die Zeit.
  * **PROMPT TREND ANALYSE:**
      * Berechnet die **Velocity** der Verbesserung (`/analytics/trends`).
      * Vorhersage (Predicted Next Avg) und Trend-Richtung (Stabil/Steigend).
  * **SYNTX VS. NORMAL:**
      * Der ultimative Vergleich (`/evolution/syntx-vs-normal`).
      * Stellt Syntx-optimierte Prompts gegen Standard-Prompts.
      * Zeigt die **Perfektrate** und Keyword-Dominanz.
  * **TOPIC ANALYSE:**
      * **Topic Counts:** Verteilung der Themen im Feld (`/feld/topics`).
      * **Score Summary:** Durchschnittliche Qualität pro Topic (`/analytics/topics`).

### 3\. ⚡️ PERFORMANCE & KOSTEN (Der Motor)

*Effizienz-Metriken und wirtschaftliche Auswertung.*

  * **FULL PERFORMANCE STATS:**
      * Latenz-Analyse pro Wrapper (`/analytics/performance`).
      * Vergleich: **Human** vs. **Syntx** vs. **Sigma** vs. **Deepsweep**.
      * Visualisierung von Min/Max/Avg Laufzeiten in Millisekunden.
  * **GLOBAL SUCCESS RATE:**
      * Verhältnis von perfekten Scores zu Fehlversuchen (`/analytics/success-rate`).
  * **KOSTENANALYSE:**
      * Harte Währung. Gesamtkosten in USD (`/prompts/costs/total`).
      * Berechnung der Kosten pro Prompt und Token-Verbrauch.
  * **WRAPPER SUCCESS:**
      * Ranking der Wrapper nach Erfolgsrate (`/analytics/success-rate/by-wrapper`).

### 4\. 🔬 DATEN DETAILS (Das Mikroskop)

*Forensische Untersuchung von Anomalien und Rohdaten.*

  * **DRIFT KÖRPER LISTE:**
      * Identifiziert spezifische Prompts, die aus dem Ruder laufen (`/feld/drift`).
      * Listet "Drift"-Objekte mit Zeitstempel und Kalibrierungs-Score.
  * **SCORE DISTRIBUTION:**
      * Histogramm-Verteilung aller Bewertungen (`/analytics/scores/distribution`).
      * Zeigt statistische Ausreißer und die Masse der Ergebnisse.
  * **PROMPTS TABELLE:**
      * Zugriff auf die Roh-Logdaten (`/prompts/table-view`).
      * Filterung nach ID, Topic, Score und Dauer.

-----

## 🚀 INSTALLATION & START

Initialisiere das Kommando-Terminal:

```bash
# 1. Abhängigkeiten laden
npm install

# 2. Feld-Verbindung herstellen (Dev Mode)
npm run dev
```

Zugriff über: `http://localhost:3000`

-----

## 📂 PROJEKT STRUKTUR

```text
/syntx-feld-commander
├── app/
│   ├── layout.tsx          # Globaler Frame
│   ├── page.tsx            # Entry Point
│   └── DashboardContainer.tsx # Haupt-Wrapper (Client Only)
├── components/
│   ├── DashboardTabs.tsx   # Taktische Navigation
│   ├── useSyntxData.ts     # Der Daten-Sauger (Hook)
│   ├── FlowLoadBar.tsx     # Visuelle Komponente (Balken)
│   ├── StatusLamp.tsx      # Visuelle Komponente (Licht)
│   └── [18x Modules]       # Die einzelnen Analyse-Kacheln
└── public/                 # Statische Assets
```

-----

## ⚠️ SICHERHEITSHINWEIS

Dieses Dashboard kommuniziert direkt mit der **Syntx Dev API**.
Kritische Resonanzen können bei längerer Betrachtung zu kognitiver Überlastung führen.
Drift-Warnungen sind ernst zu nehmen.

> **SYNTX SYSTEM: WIR BAUEN DIE ZUKUNFT.**

