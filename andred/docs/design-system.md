# Design system ANDRED

Fonte unica dei valori: `app/globals.css` (token in `@theme`, utility `wrap`, `grid-12`, `mono`, `display`). Questo file li riassume; se c'è differenza, vale il CSS.

## Colore
| Token | Valore | Uso |
|---|---|---|
| `paper` | #F4F5F1 | fondo |
| `ink` | #14171A | testo, bordi, fondo delle sezioni scure, pulsante principale |
| `stone` | #D0D3D0 | bordi interni, fondi dei segnaposto |
| `muted` | #50565B | testo secondario su carta (7:1) |
| `stone-dim` | #A9AEAB | testo secondario su inchiostro (8:1) |
| `signal` | #3B58E8 | accenti, stati attivi, focus su carta (5,1:1) — 3–7% della superficie |
| `signal-light` | #8196F2 | lo stesso ruolo su fondo inchiostro (AA) |
| errore | #B3261E | solo messaggi di errore dei form |

## Tipografia
| Ruolo | Carattere | Misura |
|---|---|---|
| Display | Inter Tight 700, maiuscolo, `-0.045em`, interlinea 0.86 | wordmark e titoli di sezione con `clamp()` (vedi skill `andred-typography`) |
| Heading | Inter Tight 700, maiuscolo | 24px … `clamp(2rem,4.5vw,5rem)` |
| Body | Inter Tight 400/500 | 16–20px, interlinea 1.3–1.5, 38–65 caratteri |
| Caption | IBM Plex Mono 400, maiuscolo, `0.04em` | 12px, solo dati e annotazioni |

## Spaziatura
Scala Tailwind (unità 4px): 4 · 8 · 12 · 16 · 24 · 32 · 40 · 64 · 96 · 144.
- Margine laterale `--gutter`: 16 / 24 / 40px.
- Tra sezioni: 96px telefono, 144px da 768px.
- Target touch minimo 44px; pulsanti principali 56px.

## Forma
- **Raggio: 0.** Nessun angolo arrotondato (unica eccezione: nessuna). Bordi 1px.
- Nessuna ombra, nessun gradiente, nessuna trasparenza sfocata.

## Componenti
| Componente | Dove | Regola |
|---|---|---|
| Pulsante principale | `bg-ink text-paper h-14 uppercase font-bold`, hover `bg-signal` | uno per schermo |
| Pulsante secondario | bordo 1px `border-ink`, hover bordo e testo `signal` | |
| Link testuale | sottolineato, hover `signal` | |
| Campo email | solo bordo inferiore 2px, focus `signal`, errore rosso + messaggio mono | `components/sections/SignupForm.tsx` |
| Checkbox | quadrato 20px, selezionato pieno `signal` | |
| Navigazione | wordmark, 3–4 link, un'azione; menu a schermo pieno su telefono | `Header.tsx`, `MobileMenu.tsx` |
| Apertura sezione | `SectionHead`: bordo 1px, etichetta mono, indice calcolato | `components/SectionHead.tsx` |
| Stato | quadratino + testo mono (`StatusTag`) | blu solo se "In vendita" |
| Dati tecnici | righe `dl` mono con bordo `stone` | |
| Immagine mancante | `Placeholder` con rapporto fisso e "Immagine da inserire" | 4:5, 3:2, 16:9 |
| Dato mancante | `Token`: testo mono in cornice tratteggiata | `[PREZZO]`, `[EMAIL]` |

Card, modali e badge arrotondati non fanno parte del sistema.
