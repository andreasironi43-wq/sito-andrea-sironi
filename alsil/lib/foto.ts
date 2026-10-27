/** Foto dell'impianto AL.SIL. (public/img/foto). I testi alternativi descrivono solo ciò che si vede. */
export const foto = {
  "linea-pezzi-grezzi": { src: "/img/foto/linea-pezzi-grezzi.jpg", w: 2400, h: 1600, alt: "Pezzi in alluminio pressofuso grezzi appesi ai telai della linea aerea", pos: "60% 50%" },
  "linea-carico": { src: "/img/foto/linea-carico.jpg", w: 1600, h: 2400, alt: "Linea aerea con pezzi appesi e operatori al carico dei telai", pos: "50% 40%" },
  "cabina-manuale": { src: "/img/foto/cabina-manuale.jpg", w: 2400, h: 1600, alt: "Applicazione manuale della polvere in cabina su un pezzo appeso al telaio", pos: "45% 50%" },
  "cabina-automatica": { src: "/img/foto/cabina-automatica.jpg", w: 1600, h: 2400, alt: "Cabina di verniciatura con pistole automatiche e pezzi appesi", pos: "50% 40%" },
  "pezzo-verniciato": { src: "/img/foto/pezzo-verniciato.jpg", w: 2400, h: 1600, alt: "Pezzo in pressofuso verniciato a polvere, appeso al telaio", pos: "50% 45%" },
  "pezzo-grezzo-telaio": { src: "/img/foto/pezzo-grezzo-telaio.jpg", w: 2400, h: 1600, alt: "Pezzo in pressofuso grezzo appeso al telaio, prima del pretrattamento", pos: "65% 50%" },
  "gancio-telaio": { src: "/img/foto/gancio-telaio.jpg", w: 1600, h: 2400, alt: "Dettaglio dell'aggancio di un pezzo grezzo al telaio", pos: "50% 40%" },
  "applicazione-polvere": { src: "/img/foto/applicazione-polvere.jpg", w: 1600, h: 2400, alt: "Polvere spruzzata su un pezzo in cabina di verniciatura", pos: "50% 45%" },
  "pezzi-finiti-rack": { src: "/img/foto/pezzi-finiti-rack.jpg", w: 1600, h: 2400, alt: "Pezzi verniciati in nero e grigio appesi al telaio", pos: "55% 45%" },
  "rivestimento-macro": { src: "/img/foto/rivestimento-macro.jpg", w: 2400, h: 1600, alt: "Macro del rivestimento a polvere su un pezzo con nervature e boss", pos: "60% 50%" },
  "operatore-pezzo": { src: "/img/foto/operatore-pezzo.jpg", w: 2400, h: 1600, alt: "Operatore con guanti che maneggia un pezzo in pressofuso grezzo", pos: "55% 50%" },
  "pezzi-neri-finiti": { src: "/img/foto/pezzi-neri-finiti.jpg", w: 1600, h: 2400, alt: "Pezzi cilindrici verniciati in nero opaco appesi al telaio", pos: "50% 45%" },
  "cabina-pezzi-grigi": { src: "/img/foto/cabina-pezzi-grigi.jpg", w: 1600, h: 2400, alt: "Pezzi verniciati in grigio all'interno della cabina", pos: "50% 40%" },
  "pezzi-grezzi-appesi": { src: "/img/foto/pezzi-grezzi-appesi.jpg", w: 1600, h: 2400, alt: "Pezzi grezzi appesi alla linea in attesa del pretrattamento", pos: "60% 45%" },
} as const;
export type FotoKey = keyof typeof foto;
