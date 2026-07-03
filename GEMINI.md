# Maron Nodes - Riassunto del Progetto per Gemini

Questo file serve come contesto di alto livello per l'assistente AI Gemini, riassumendo gli aspetti chiave del progetto Maron Nodes.

## 🎯 Obiettivo del Progetto

L'obiettivo è sviluppare **Maron Nodes**, una piattaforma SaaS (Software-as-a-Service) per il deployment e la gestione automatizzata di nodi blockchain. L'ispirazione principale del modello di business e delle funzionalità è `easy-node.xyz`.

Il progetto mira a semplificare l'hosting di nodi, permettendo agli utenti di avviare nodi validatori su vari network blockchain con pochi click, senza necessità di competenze DevOps.

## 🏗️ Architettura e Stack Tecnologico

Il progetto è strutturato come un **monorepo** gestito con `pnpm` workspaces.

### Struttura delle Directory Principali:

-   `apps/web`: Applicazione **frontend** basata su **Next.js 15** (App Router), TypeScript, e TailwindCSS. Utilizza `shadcn/ui` per i componenti.
-   `apps/api`: Applicazione **backend** basata su **Spring Boot 3.4** e Java 21. Gestisce la logica di business, le API REST, le WebSocket per aggiornamenti in tempo reale e l'interazione con la coda di messaggi.
-   `infra/`: Codice per l'**infrastruttura** (Infrastructure as Code).
    -   `terraform/`: Per il provisioning delle risorse cloud (Hetzner, Contabo, Akamai).
    -   `ansible/`: Per la configurazione dei server e il deployment dei nodi blockchain.
-   `packages/`: Contiene codice e configurazioni condivise tra le applicazioni del monorepo (es. componenti UI, tipi TypeScript, configurazioni di linting).

### Stack Tecnologico Dettagliato:

-   **Frontend**: Next.js, React, TypeScript, TailwindCSS, `shadcn/ui`, TanStack Query, Zustand, NextAuth.js.
-   **Backend**: Spring Boot, Java 21, PostgreSQL, RabbitMQ, Spring Security (JWT).
-   **Infrastruttura**: Terraform, Ansible, Hetzner Cloud, Contabo, Akamai, HCP Vault (per i segreti).
-   **Build System**: `pnpm` + `Turborepo`.

## 📈 Modello di Business e Analisi Finanziaria

L'analisi di mercato e dei margini suggerisce un modello di business basato su **abbonamenti mensili** con diversi tier (es. Starter, Pro, Enterprise), differenziati per numero di nodi e risorse.

-   **Target di Break-Even**: Raggiungere circa **48-50 clienti** per coprire i costi operativi fissi e variabili.
-   **Pricing**: Il piano "Starter" è previsto a €9.99/mese. I margini di profitto sono sottili all'inizio ma diventano sani (13%+) superati i 100 clienti.
-   **Strategia**: La priorità è lo sviluppo di un **frontend user-friendly** e di un processo di **onboarding semplice**, che sono i principali differenziatori rispetto alla concorrenza.

## 📍 Stato Attuale e Prossimi Passi

-   **Stato Attuale**: Le fondamenta del backend e dell'infrastruttura sono parzialmente complete. Il **frontend è l'area critica e prioritaria** da sviluppare.
-   **Obiettivo Immediato**: **Creare la dashboard del frontend**.

### Roadmap per il Frontend (MVP):

1.  **Setup del Progetto**: Già esistente.
2.  **Autenticazione**: Implementare il flusso di registrazione e login.
3.  **Dashboard Principale**: Creare la UI per visualizzare e gestire i nodi.
4.  **Flusso di Deployment**: Costruire il form "one-click" per avviare nuovi nodi.
5.  **Integrazione Pagamenti**: Collegare Stripe per la gestione degli abbonamenti.

L'utente vuole iniziare a lavorare sulla **dashboard**. I primi passi saranno definire la struttura della pagina, i componenti necessari e collegarsi (anche con dati mock all'inizio) ai servizi del backend.
