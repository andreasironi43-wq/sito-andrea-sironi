/**
 * Interruttori dei blocchi che richiedono documenti da AL.SIL.
 * Attivare SOLO dopo aver ricevuto rapporti di prova e certificati, e compilato i dati sotto.
 */
export const features = {
  /** Blocco "Prove di corrosione" (es. nebbia salina). */
  proveCorrosione: false,
  /** Blocco "Prove e certificazioni". */
  proveCertificazioni: false,
};

export type ProvaCorrosione = {
  tipoProva: string; // es. "Nebbia salina neutra (NSS)"
  ore: number;
  norma: string; // es. "ISO 9227"
  laboratorio: string;
  data: string; // ISO yyyy-mm-dd
  esito: string; // testo esatto dal rapporto
  ciclo?: string; // ciclo/substrato provato
  rapportoUrl?: string; // PDF del rapporto, se pubblicabile
};

export type Certificazione = {
  nome: string; // es. "ISO 9001:2015"
  ente: string;
  numero?: string;
  scadenza?: string; // ISO yyyy-mm-dd
  documentoUrl?: string;
};

/** Da compilare con i dati dei rapporti forniti da AL.SIL. */
export const proveCorrosione: ProvaCorrosione[] = [];
export const certificazioni: Certificazione[] = [];
