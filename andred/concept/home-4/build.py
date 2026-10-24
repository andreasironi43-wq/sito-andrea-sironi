# Genera index.html del concept 4 (archivio a provino).
# Uso: python3 build.py (dalla cartella home-4).
I = {  # chiave: (src, w, h, alt, didascalia, capo)
 'b-fronte':('peder/blu-fronte',1024,1280,'Peder blu a quadri, fronte','Peder, fronte','peder'),
 'b-retro':('peder/blu-retro',1024,1280,'Peder blu a quadri, retro','Peder, retro','peder'),
 'b-tenuta':('peder/blu-tenuta',1122,1402,'Peder blu indossata, in esterno','Peder, indossata','peder'),
 'b-portico':('home/peder-blu',1600,900,'Peder blu indossata, sotto un portico in cemento','Peder, portico','peder'),
 'b-caffe':('peder/blu-caffe',1122,1402,'Peder blu indossata, al caffè','Peder, caffè','peder'),
 'b-dett':('peder/blu-dettagli',1122,1402,'Dettagli di Peder blu: colletto con etichetta, bottoni, taschino','Peder, dettagli','peder'),
 'r-retro':('peder/rossa-retro',1200,1500,'Peder western rossa a quadri, retro','Peder western, retro','western'),
 'r-ranch':('peder/rossa-ranch',1122,1402,"Peder western rossa indossata, appoggiata a un'auto",'Peder western, auto','western'),
 'r-tram':('peder/rossa-tramonto',1122,1402,'Peder western rossa indossata, al tramonto','Peder western, tramonto','western'),
 'r-dett':('peder/rossa-dettagli',1122,1402,'Dettagli di Peder western rossa: carré, taschino, polsino','Peder western, dettagli','western'),
 'rain':('home/hero-rain',1024,1536,'Rain indossata, felpa grigia con punti blu su cappuccio e spalle','Rain, portico','rain'),
 'f-ritr':('artebecco/ritratto',1122,1402,'Felpa blu navy indossata, ritratto','Felpa, ritratto','felpa'),
 'f-sed':('artebecco/seduto',1122,1402,'Felpa blu navy indossata, seduto davanti a un edificio','Felpa, seduto','felpa'),
 'f-scale':('artebecco/scale',1122,1402,'Felpa blu navy indossata, su scale in pietra','Felpa, scale','felpa'),
 'f-museo':('artebecco/museo',1122,1402,'Felpa blu navy indossata, davanti a un museo','Felpa, museo','felpa'),
 'p-ric':('processo/ricerca',1536,1024,'Ricerca: schizzi e campioni sul tavolo','Processo, ricerca','processo'),
 'p-mat':('processo/materiali',1536,1024,'Flanelle a quadri e felpa grigia sovrapposte','Processo, tessuti','processo'),
 'p-camp':('processo/campionatura',1536,1024,'Mani che segnano la flanella con il gesso','Processo, campione','processo'),
 'p-prod':('processo/produzione',1536,1024,'Cucitura del carré a macchina','Processo, cucitura','processo'),
 'p-dett':('processo/dettaglio',1536,1024,'Etichetta tessuta ANDRED nel colletto','Processo, etichetta','processo'),
}
NAMES = {'peder':'Peder · Shirt 001, blu a quadri','western':'Peder · Shirt 001, western rossa','rain':'Rain · Sweatshirt 002','felpa':'Felpa · nome e codice da definire','processo':'Come nasce un capo'}
ANCH = {'peder':'#peder','western':'#western','rain':'#rain','felpa':'#felpa','processo':'#archivio'}
def img(k, cls='', lazy=True, alt=None):
    s,w,h,a,_,_ = I[k]
    return f'<img{(" class=%s" % chr(34)+cls+chr(34)) if cls else ""} src="img/{s}.webp" width="{w}" height="{h}" alt="{a if alt is None else alt}"{" loading=%slazy%s" % (chr(34),chr(34)) if lazy else ""}>'

ring_order = ['rain','b-fronte','p-mat','r-ranch','f-ritr','b-dett','p-camp','r-retro','b-tenuta','f-scale','rain','p-dett','b-retro','r-tram','f-museo','b-caffe','p-prod','r-dett']
ring = []
for n,k in enumerate(ring_order):
    cap = NAMES[I[k][5]]
    ring.append(f'<a class="ring__f{" ring__f--x" if n%3==2 else ""}" href="{ANCH[I[k][5]]}" data-name="{cap}">{img(k, lazy=False, alt="")}<span class="sr">{I[k][4]}</span></a>')

sheet_order = ['b-tenuta','f-sed','p-ric','rain','r-retro','b-dett','p-camp','f-museo','b-retro','r-ranch','p-dett','b-caffe','f-scale','r-dett','p-prod','b-fronte','r-tram','f-ritr','p-mat']
sheet = []
for k in sheet_order:
    sheet.append(f'<figure class="tile">{img(k)}<figcaption>{I[k][4]}</figcaption></figure>')

def strip(id_, title, cat, keys, facts):
    frames = ''.join(f'<figure class="slide">{img(k)}</figure>' for k in keys)
    f = ''.join(f'<p class="facts__c facts__c--{i}">{t}</p>' for i,t in enumerate(facts))
    return f'''
  <article class="garment" id="{id_}" aria-labelledby="{id_}-t">
    <div class="strip" tabindex="0" aria-label="Foto di {title}, scorri di lato">{frames}</div>
    <div class="facts">
      <div class="facts__name"><h3 id="{id_}-t">{title} <span class="soft">{cat}</span></h3><a class="arrow" href="#iscrizione">Avvisami <span aria-hidden="true">→</span></a></div>
      {f}
    </div>
  </article>'''

strips = ''.join([
 strip('peder','Peder','Shirt 001, blu a quadri',['b-tenuta','b-fronte','b-retro','b-portico','b-caffe','b-dett'],['Prezzo indicativo €180–200, da confermare','100 pezzi per modello, ipotesi','Origine Brianza*, da confermare con la produzione reale']),
 strip('western','Peder','Shirt 001, western rossa',['r-ranch','r-retro','r-tram','r-dett'],['Prezzo indicativo €180–200, da confermare','100 pezzi per modello, ipotesi','Taglie da definire']),
 strip('rain','Rain','Sweatshirt 002',['rain','p-mat'],['Prezzo da definire','Felpa a grammatura alta','Gocce: piccoli punti tondi su cappuccio e spalle']),
 strip('felpa','Felpa','nome e codice da definire',['f-ritr','f-sed','f-scale','f-museo'],['Prezzo da definire','Blu navy, stampa sul petto','Edizione da definire']),
])

html = f'''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>ANDRED — label di abbigliamento indipendente</title>
<meta name="description" content="ANDRED: label di abbigliamento indipendente. Pochi capi, in edizioni limitate. Peder, Rain e una felpa.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<!-- 1. APERTURA: un anello di foto attorno al titolo -->
<header class="hero" id="top">
  <div class="bar">
    <a class="bar__mark" href="#top">ANDRED</a>
    <nav aria-label="Principale"><ul role="list">
      <li><a href="#archivio">Archivio</a></li>
      <li><a href="#capi">Capi</a></li>
      <li><a href="#iscrizione">Iscrizione</a></li>
    </ul></nav>
  </div>
  <div class="ring" aria-label="Foto dei capi">
    {''.join(ring)}
  </div>
  <div class="core">
    <h1 class="core__t"><span class="mask"><span>Pochi capi,</span></span> <span class="mask"><span>tutte le foto.</span></span></h1>
    <p class="core__line" aria-live="polite">ANDRED è una label di abbigliamento indipendente. Tre capi, in edizioni limitate.</p>
    <a class="btn" href="#iscrizione">Avvisami al prossimo drop</a>
  </div>
</header>

<main>

<!-- 2. ARCHIVIO: il provino, tutto insieme -->
<section class="sheet" id="archivio" aria-labelledby="sheet-t">
  <h2 id="sheet-t" class="sheet__t">Tutto quello che c'è, finora: tre capi, il loro processo, venti foto.</h2>
  <figure class="tile tile--feature">{img('b-portico')}<figcaption>Peder, portico</figcaption></figure>
  <div class="sheet__cols">
    {''.join(sheet)}
  </div>
</section>

<!-- 3. INTRO: colonna stretta, campo vuoto -->
<section class="intro" aria-labelledby="intro-t">
  <p class="intro__n" aria-hidden="true">100</p>
  <p class="intro__cap"><strong>100 pezzi per modello.</strong> Un'ipotesi, non una promessa.</p>
  <h2 id="intro-t" class="head">Come lavoriamo</h2>
  <div class="intro__text">
    <p class="intro__first rv">Forme che conosci, viste da un'altra parte. Nessuna stagione da inseguire.</p>
    <p class="rv">Un capo esce quando è pronto: prima il campione, poi la produzione, in piccole quantità. I laboratori sono ancora da definire.</p>
    <p class="rv">Il numero si dice prima: 100 pezzi per modello. È un'ipotesi, non una promessa. Dipende dal campione, dai minimi dei fornitori, dal margine e da quante persone lo vogliono.</p>
    <p class="rv">Nessun conto alla rovescia, nessun "ultimi pezzi". <a href="#iscrizione">Una email quando un capo è pronto</a></p>
  </div>
</section>

<!-- 4. CAPI: una foto al centro, le vicine ai lati -->
<section class="garments" id="capi" aria-labelledby="capi-t">
  <h2 id="capi-t" class="head garments__t">I capi</h2>
  {strips}
  <p class="garments__note soft">* Da confermare con la produzione reale.</p>
</section>

<!-- 5. UNA FRASE, UN'AZIONE -->
<section class="cta" id="iscrizione" aria-labelledby="cta-t">
  <h2 id="cta-t" class="cta__t">Ti scriviamo quando un capo è pronto, e basta.</h2>
  <form class="signup" novalidate>
    <label for="email">Email</label>
    <div class="signup__row">
      <input id="email" name="email" type="email" autocomplete="email" placeholder="nome@dominio.it" required>
      <button class="btn" type="submit">Iscriviti</button>
    </div>
    <label class="consent"><input id="consent" name="consent" type="checkbox" required> <span>Ho letto l'informativa privacy <span class="token">[LINK PRIVACY]</span> e accetto di ricevere email sui drop.</span></label>
    <p class="signup__status" role="status" aria-live="polite"></p>
  </form>
</section>

</main>

<!-- 6. FOOTER: una riga -->
<footer class="foot">
  <p class="soft">ANDRED, label indipendente</p>
  <ul role="list">
    <li><a href="#archivio">Archivio</a></li>
    <li><a href="#capi">Capi</a></li>
    <li><span class="token">[EMAIL]</span></li>
    <li class="soft">Spedizioni e resi: da definire</li>
  </ul>
  <p class="soft">© 2026 · <span class="token">[RAGIONE SOCIALE · P.IVA]</span> · Privacy <span class="token">[LINK]</span></p>
</footer>

<script src="app.js"></script>
</body>
</html>
'''
open(__import__('os').path.join(__import__('os').path.dirname(__file__),'index.html'),'w').write(html)
print(len(sheet_order)+1,'foto nel provino')
