# ParkPoint Špecifikácia

## Úvod

ParkPoint je mobilná a webová aplikácia, ktorá spája ľudí hľadajúcich krátkodobé parkovanie s ľuďmi, ktorí majú vlastné parkovacie miesto a chcú ho ponúknuť na prenájom, keď ho sami nevyužívajú. Jeden účet umožňuje obe strany: ten istý používateľ si môže miesto raz prenajať a inokedy prenajať svoje vlastné. Rezervácie sú okamžité, bez schvaľovania majiteľom, a platba prebieha cez Stripe pred vstupom na miesto.

## Režimy

Používateľ má jeden účet a dva režimy: režim zákazníka a režim majiteľa. Režim zákazníka je predvolený. Medzi režimami sa prepína v profile veľkým viditeľným slide buttonom umiestneným hore.

Režim zákazníka slúži na hľadanie, rezerváciu a platbu parkovania. Po registrácii je okamžite plne funkčný, platobnú metódu zákazník doplní pri prvej rezervácii alebo v profile.

Režim majiteľa slúži na ponúkanie vlastných miest, nastavenie ich podmienok, prijímanie rezervácií a výplaty. Pred prvým zverejnením miesta alebo prijatím platby je potrebná dodatočná registrácia majiteľa (postavenie, obchodné alebo osobné údaje, Stripe Connect, vyhlásenie poskytovateľa miesta). Dá sa preskočiť; nedokončená registrácia blokuje zverejnenie miesta a výplatu, ostatné funkcie zákazníka zostávajú dostupné.

## Navigácia

Spodná lišta má tri záložky v každom režime. Záložka v strede je hlavná a otvorí sa po prihlásení alebo prepnutí režimu.

Režim zákazníka zľava doprava: **Rezervácie, Mapa (hlavná), Profil**.

Režim majiteľa zľava doprava: **Moje miesta, Prehľad (hlavný), Profil**.

Profil je v oboch režimoch ten istý základ. V režime majiteľa sa k nemu pridávajú samostatné položky navyše (Platby a výplaty, Obchodné údaje, Vyhlásenie poskytovateľa miesta, Notifikácie majiteľa, Daňové nastavenia), ktoré sa zobrazujú priamo, bez obalovania pod jednu sekciu.

Predikcia dostupnosti parkovania nie je samostatná záložka. Je to vrstva mapy, ktorá sa zapína a vypína tlačidlom „Predikcia" priamo na mape.

## Zoznam obrazoviek

### 1. Úvodná obrazovka
Po stiahnutí aplikácie sa neotvorí hneď mapa, ale obrazovka s logom a možnosťami „Prihlásiť sa" a „Vytvoriť účet".

### 2. Prihlásenie
Prihlásenie pomocou e-mailu a hesla. Pri chybných údajoch zobraziť hlásenie. Umožniť prechod na registráciu a obnovu hesla. Po úspešnom prihlásení otvoriť hlavnú záložku aktuálneho režimu.

### 3. Registrácia
Vytvorenie účtu: meno, priezvisko, e-mail, heslo a jeho potvrdenie, dátum narodenia. Aplikácia overí vek aspoň 18 rokov. Potvrdenie podmienok používania a ochrany osobných údajov. Telefón a platobná metóda nie sú povinné a dajú sa doplniť neskôr. Po odoslaní pošle overovací e-mail a zobrazí obrazovku s informáciou o doručení a tlačidlom „Odoslať znova". Odkaz v e-maile aktivuje účet.

### 4. Zabudnuté heslo
Vyžiadať obnovu cez e-mail. Overiť odkaz alebo kód a nastaviť nové heslo. Zobraziť aj stav neplatného alebo vypršaného odkazu.

### 5. Povolenia aplikácie
Zobraziť stav prístupu k polohe, upozorneniam, kamere a fotografiám. Umožniť otvorenie príslušných nastavení telefónu. Bez povolenej polohy zachovať ručné vyhľadávanie adresy.

### 6. Hlavná mapa (hlavná záložka režimu zákazníka)
Statické rozloženie. Horná lišta: vyhľadávanie adresy, výber dátumu a času a tlačidlo filtre. Mapa vypĺňa zvyšok obrazovky s pevnou výškou, neposúva sa a nerolujú po nej žiadne spodné karty. Značky parkovacích miest pre zvolený termín. Kliknutím na značku sa otvorí karta miesta ako prekrytie zo spodu. Filtre (dátum a čas, cena, vonkajšie alebo kryté miesto, spôsob vstupu, výškový limit, kapacita) sa otvoria z hornej lišty a výsledky aktualizujú mapu. Tlačidlo „Použiť" uloží filtre, tlačidlo „Vymazať" obnoví základné nastavenie. Na mape je tlačidlo „Predikcia", ktoré zapne a vypne vrstvu farebných zón podľa dostupnosti.

### 7. Rezervácie (záložka režimu zákazníka)
Obsahuje tri podsekcie: aktívne (prebiehajúce a budúce rezervácie), história (ukončené a zrušené) a obľúbené miesta (vyberajú sa spomedzi predchádzajúcich rezervácií). Pri každej rezervácii miesto, termín, cena a skutočný stav. Tlačidlo „Zobraziť detail" otvorí konkrétnu rezerváciu. Umožniť vytvorenie novej rezervácie rovnakého miesta.

### 8. Prehľad (hlavná záložka režimu majiteľa)
Prvá obrazovka po prepnutí do režimu majiteľa. Obsahuje súhrn príjmov (dnes, tento týždeň, tento mesiac) s malým grafom, aktuálne obsadené miesta (ktoré vozidlo, dokedy), dnešné nadchádzajúce rezervácie, počet otvorených prípadov s odkazom na zoznam a upozornenia s nedokončenými úlohami (napríklad „Dokončite registráciu majiteľa", „Stripe Connect nedokončený", „Miesto bez fotografií"). Ak dodatočná registrácia nie je dokončená, zobrazuje baner „Dokončite registráciu majiteľa".

### 9. Moje miesta (záložka režimu majiteľa)
Vlastné ponuky s fotografiou, adresou, cenou a aktuálnym stavom (aktívne, pozastavené, čakajúce na doplnenie). Pridávanie, úprava a odstraňovanie inzerátov. Dočasné pozastavenie ponuky. Pri rozkliknutí konkrétneho miesta prehľad jeho rezervácií (budúce, prebiehajúce, história), zárobky z tohto miesta a tlačidlo „Nahlásiť prekročenie času" pri aktuálnej alebo nedávnej rezervácii. Ak dodatočná registrácia nie je dokončená, zobrazuje baner „Dokončite registráciu majiteľa".

### 10. Môj profil
Zobraziť meno, fotografiu, e-mail a telefón (ak je doplnený). Hore veľký viditeľný slide button na prepínanie medzi režimom zákazníka a režimom majiteľa. Spoločné položky profilu (v oboch režimoch): upraviť profil, moje vozidlá, platobné metódy, nastavenia a bezpečnosť, zoznam prípadov, notifikácie, pomoc a reklamácia, podmienky používania, ochrana osobných údajov, o aplikácii, odhlásiť sa. V režime majiteľa sa k nim pridávajú samostatné položky navyše, priamo viditeľné bez obalovania: platby a výplaty, obchodné údaje, vyhlásenie poskytovateľa miesta (posledná prijatá verzia a dátum), notifikácie majiteľa (nastavenie samostatné od zákazníckych) a daňové nastavenia.

### 11. Karta miesta na mape
Vyskakovacie prekrytie zo spodu na hlavnej mape. Obsahuje fotografiu, okruh adresy (približná poloha v okruhu 100 m, aby sa predišlo parkovaniu bez zaplatenia), cenu, vzdialenosť a odhad chôdze. Tlačidlá: pridať do obľúbených, otvoriť detail, rezervovať.

### 12. Detailné informácie o mieste
Fotografie, približná poloha v okruhu 100 m s informáciou, že presná poloha sa sprístupní po zaplatení a potvrdení rezervácie, popis, cena, dostupnosť, rozmery a obmedzenia vozidla, spôsob vstupu, výškový limit a prípadný uzavretý areál. Poskytovateľ a jeho postavenie (obchodník alebo súkromná osoba). Tlačidlo „Rezervovať miesto" otvorí výber termínu. Pri ponuke je tlačidlo „Nahlásiť inzerát".

### 13. Rezervovať miesto
Výber dátumu, začiatku a konca parkovania. Termín zostáva podľa filtra, dá sa upraviť. Vybrať vozidlo z vozidiel uložených v profile alebo pridať nové. Priebežne počítať celkovú cenu vrátane poplatkov. Umožniť vybrať iba dostupný termín. Po potvrdení prejsť na súhrn a platbu.

### 14. Súhrn a platba
Zobrazenie miesta, poskytovateľa a jeho postavenia, približnej polohy s informáciou o sprístupnení presnej polohy po zaplatení, termínu, EČV, konečnej ceny s rozpisom poplatkov (cena miesta, poplatok ParkPoint, dane), podmienok storna, pravidiel predĺženia a prekročenia času a informácie o odstúpení od zmluvy. Pred platbou tri samostatné, vopred nezaškrtnuté súhlasy: s podmienkami používania, so zmluvnou pokutou 10 EUR za prekročenie rezervácie o viac ako 15 minút a so skorším začatím služby spolu s poučením o strate práva na odstúpenie po úplnom poskytnutí služby. Bez nich sa v objednávke nedá pokračovať. Vybrať platobnú metódu (prípadne pridať novú cez Stripe) a potvrdiť objednávku tlačidlom „Objednávka s povinnosťou platby". Po úspešnom dokončení zobraziť potvrdenie s číslom rezervácie a odoslať ho aj e-mailom. Pri chybe umožniť opakovanie platby bez vytvorenia duplicitnej rezervácie.

### 15. Detail rezervácie
Zobrazí sa po zaplatení. Obsahuje fotografiu, presnú adresu, termín, vozidlo, zaplatenú sumu, stav a pokyny na vstup. Prípadný vstupný kód, ak ho majiteľ zadal; pri jeho zmene sa kód aktualizuje a zákazník dostane upozornenie. Tlačidlo „Navigovať na miesto" otvorí navigáciu. Tlačidlo „Upraviť" najprv overí dostupnosť a prípadnú zmenu ceny. Prístup k dokladu. Možnosť predĺženia rezervácie, ak je termín ešte voľný; pred predĺžením sa zobrazí doplatok a vyžiada sa výslovné potvrdenie. V spodnej časti detailu sú tri samostatné tlačidlá: „Stornovať rezerváciu" (od potvrdenia najneskôr do 5 minút po dohodnutom začiatku), „Odstúpiť od zmluvy" (zákonné 14-dňové právo) a „Reklamácia / Nahlásiť problém" (vytvorí prípad).

### 16. Storno rezervácie
Pred stornom okno s potvrdením: zostávajúci čas na bezplatné storno a výška vrátenej sumy (celá uhradená suma vrátane poplatku ParkPoint do 14 dní). Tlačidlá „Stornovať rezerváciu" a „Späť". Po uplynutí lehoty rezervácia pokračuje; samostatné odstúpenie a reklamácia sú dostupné cez samostatné tlačidlá.

### 17. Odstúpenie od zmluvy
Formulár zobrazený v spodnej časti detailu rezervácie, oddelený od storna a reklamácie. Rovnaký formulár je dostupný aj v nastaveniach účtu pre zmluvu o používaní účtu. Umožňuje uviesť alebo potvrdiť meno a priezvisko, identifikovať zmluvu a zadať e-mail na potvrdenie. Tlačidlo „Potvrdiť odstúpenie od zmluvy". Po odoslaní potvrdenie e-mailom.

### 18. Notifikácie
Zobrazovať potvrdenie rezervácie, výsledok platby, pripomienky parkovania, zmenu stavu prípadu a ďalšie správy. Rozlišovať prečítané a neprečítané. Kliknutím otvoriť súvisiacu rezerváciu alebo informáciu. Umožniť označiť všetko ako prečítané.

### 19. Upraviť profil
Upraviť meno, priezvisko, e-mail a telefón. Skontrolovať správnosť údajov a uložiť zmeny. Pri zmene kontaktného údaja vyžiadať jeho overenie. Prechod na zmenu profilovej fotografie.

### 20. Zmeniť fotografiu
Vybrať fotografiu z galérie alebo odfotiť. Náhľad, uloženie alebo odstránenie aktuálnej fotografie. Pri odmietnutí prístupu ku kamere či galérii vysvetliť ďalší postup.

### 21. Moje vozidlá
Zobraziť uložené vozidlá a označiť predvolené. Pridať vozidlo. Menu troch bodiek ponúkne úpravu, odstránenie a nastavenie predvoleného vozidla. Zmena vozidla v profile nesmie automaticky prepísať vozidlo v existujúcej rezervácii.

### 22. Pridať alebo upraviť vozidlo
Značka, model, EČV, farba, rok výroby a fotografia. Skontrolovať údaje a uložiť vozidlo pre ďalšie rezervácie.

### 23. Platobné metódy
Uložené metódy s maskovaným číslom karty a označením predvolenej metódy. Pridanie, odstránenie a zmena predvolenej metódy.

### 24. Pridať platobnú metódu
Pridať kartu cez platobnú bránu Stripe a zobraziť výsledok overenia. Google Pay a Apple Pay podľa skutočnej podpory. Údaje o karte spracúva platobný poskytovateľ.

### 25. Nastavenia a bezpečnosť
Otvorenie zmeny hesla, dvojfaktorového overenia, ochrany údajov, povolení aplikácie, podmienok používania a informácií o aplikácii. Funkcia „Odstúpiť od zmluvy" pre zmluvu o používaní účtu. Tlačidlo „Odhlásiť sa" ukončí prihlásenie a otvorí úvodnú obrazovku.

### 26. Zmeniť heslo
Aktuálne heslo, nové heslo a jeho potvrdenie. Overiť správnosť a zhodu údajov. Po úspešnej zmene zobraziť potvrdenie.

### 27. Dvojfaktorové overenie
Zobraziť, či je zapnuté. Umožniť jeho nastavenie, overenie kódom a bezpečné vypnutie. Konkrétny spôsob overovania treba vybrať pred realizáciou.

### 28. Ochrana osobných údajov
Zobraziť informácie o spracúvaní údajov. Umožniť správu voliteľných súhlasov a odoslanie žiadosti týkajúcej sa osobných údajov alebo zrušenia účtu.

### 29. Podmienky používania
Otvoria sa VOP s dátumom účinnosti a možnosťou ich uloženia. Z rezervácie sprístupniť verziu podmienok platnú pri jej vytvorení.

### 30. O aplikácii ParkPoint
Stručný opis aplikácie, jej verzia, prevádzkovateľ a kontakt na podporu.

### 31. Pomoc a reklamácia
Vybrať rezerváciu, typ problému, doplniť opis a fotografie. Odoslať požiadavku, potvrdiť jej prijatie a zobrazovať stav riešenia. Pri obsadenom alebo neprístupnom mieste ponúknuť rýchly kontakt na podporu. Podanie z detailu rezervácie („Reklamácia / Nahlásiť problém") vytvorí prípad.

### 32. Pridať parkovacie miesto
Adresa a presná poloha (dočasná mapa v rámci formulára), fotografie (miesto, jeho označenie, vjazd, dopravné značky, prípadné dodatkové tabuľky), typ miesta (kryté alebo vonkajšie), spôsob vstupu z pevného zoznamu (voľný vstup, vstup na kód, cez vrátnika alebo recepciu, závora, kľúč alebo čip, rozpoznávanie EČV, registrácia návštevy), časové a technické obmedzenia prístupu, kapacita, hodinová cena a dostupnosť. Aplikácia navrhne cenu ±20 % oproti mestskému parkovaniu v okolí; majiteľ si cenu môže vždy sám upraviť. Pri dostupnosti uviesť čas, keď je miesto voľné, s možnosťou nastaviť napríklad každý pracovný deň. Pri vstupe na kód zadať kód do samostatného neverejného poľa; kód sa zákazníkovi zobrazí až po zaplatení v detaile rezervácie. Pri ostatných spôsoboch vstupu okrem voľného vstupu doplniť pokyny na vstup a výjazd. Pred zverejnením zobraziť províziu ParkPoint, poplatok platobného partnera a čistú sumu pre majiteľa. Potvrdiť vyhlásenie poskytovateľa miesta a uviesť jeho postavenie (obchodník alebo súkromná osoba). Po odoslaní sa ponuka zverejní okamžite, bez schvaľovania.

### 33. Upraviť parkovacie miesto
Načítať existujúce údaje a umožniť zmenu fotografie, opisu, ceny a dostupnosti. Pri uložení skontrolovať kolízie s rezerváciami. Zmeny nesmú automaticky meniť cenu ani podmienky už potvrdených rezervácií. Pri zmene vstupného kódu sa kód aktualizuje v potvrdených rezerváciách miesta a dotknutí zákazníci dostanú upozornenie.

### 34. Dodatočná registrácia majiteľa (sprievodca)
Otvorí sa pri prvom prepnutí do režimu majiteľa alebo z banera „Dokončite registráciu majiteľa" v Prehľade a v Moje miesta. Kroky: (1) postavenie, teda súkromná osoba alebo obchodník; (2) údaje podľa postavenia, teda pre obchodníka obchodné meno, IČO, DIČ, IČ DPH ak pridelené a sídlo, pre súkromnú osobu adresa trvalého pobytu; (3) telefón, ak nie je v profile; (4) Stripe Connect s overením totožnosti a platobných údajov (externý flow, dá sa dokončiť neskôr); (5) všeobecné prijatie vyhlásenia poskytovateľa miesta. Každý krok sa dá preskočiť a doplniť neskôr v profile. Nedokončená registrácia blokuje zverejnenie miesta a výplatu, ostatné funkcie zákazníka zostávajú dostupné. Pri pridávaní každého miesta sa vyhlásenie potvrdzuje znova s konkrétnymi údajmi daného miesta.

### 35. Platby a výplaty
Prístupné z Prehľadu a z Profilu. Stav Stripe Connect (prepojený, nedokončené overenie, pozastavený), zoznam výplat (dátum, suma, stav), zoznam transakcií (jednotlivé rezervácie s províziou a čistou sumou), odkaz na externý dashboard Stripe. Výplata sa zadá do siedmich pracovných dní po skončení parkovania.

### 36. Zoznam prípadov
Prístupný z profilu v oboch režimoch. Filter: otvorené, čaká na odpoveď, uzavreté. Pri každom prípade typ (reklamácia, prekročenie času), rezervácia, druhá strana, dátum založenia a stav.

### 37. Detail prípadu
Rezervácia, ku ktorej sa prípad viaže. Opis a prílohy (fotografie). Stav. Výmena správ medzi stranami v chronologickom poradí s možnosťou pridať správu a fotografiu. Pri nahlásenom prekročení času má zákazník najmenej 14 dní od doručenia rozpisu nároku na vyjadrenie; pokuta sa nestiahne z karty bez jeho osobitnej autorizácie.

### 38. Nahlásiť prekročenie času
Dialóg vyvolaný z detailu konkrétnej rezervácie v Moje miesta. Opis situácie, čas zistenia, fotografia vozidla na mieste, prípadne skutočný čas odchodu, ak je známy. Neznámy čas odchodu sa nesmie uvádzať ako preukázaný. Odoslanie založí prípad.

## Spoločné fungovanie aplikácie

- Každá obrazovka musí počítať so stavom načítavania, prázdnym obsahom, chybou a výpadkom internetu.
- Formuláre musia vysvetliť, ktoré údaje chýbajú alebo sú nesprávne.
- Dostupnosť a cena sa znova overia pred dokončením rezervácie. Systém nikdy nepotvrdí viac rezervácií, než je kapacita miesta.
- Potvrdená budúca rezervácia, práve prebiehajúce parkovanie, ukončená rezervácia a storno musia mať odlišné stavy a vlastný text.
- Potvrdenia a zmluvné oznámenia sa doručujú e-mailom; upozornenia v aplikácii a push notifikácie sú doplnkové a nenahrádzajú e-mail.
- Vstupné pokyny, kód a kontakty v detaile potvrdenej rezervácie musia byť dostupné a čitateľné aj bez pripojenia.
- Jazyk aplikácie je slovenský, časové pásmo Europe/Bratislava vrátane sezónnej zmeny času.
- Cena sa vždy zobrazuje s DPH, s rozpisom poplatkov pred platbou.
- Pri každej ponuke zákazník pred objednaním vidí, či je poskytovateľ obchodník alebo súkromná osoba.
- Prepínač medzi režimom zákazníka a režimom majiteľa je vždy prístupný v profile hore.

## User flow

### Scenár 1: Zákazník si nájde a rezervuje parkovacie miesto

**Cieľ:** nájsť dostupné parkovanie, zaplatiť rezerváciu a dostať sa na miesto.

**Základný priebeh:** Otvorenie aplikácie, prihlásenie alebo registrácia, režim zákazníka, vyhľadanie miesta, výber ponuky, rezervácia, platba, potvrdenie, detail rezervácie, navigácia, parkovanie.

1. Zákazník sa prihlási alebo si vytvorí účet. Po vytvorení profilu aplikácia požiada o povolenia. Ak nepovolí polohu, môže adresu zadať ručne.
2. Na hlavnej mape zadá lokalitu, dátum a čas parkovania. Podľa potreby použije filtre. Na mape tlačidlom môže zapnúť vrstvu Predikcia a pozrieť si, v ktorých lokalitách je viac voľných miest.
3. Klikne na značku na mape. Otvorí sa karta s fotografiou, okruhom adresy (100 m, aby sa predišlo parkovaniu bez zaplatenia), cenou a vzdialenosťou. Môže si pozrieť detailné informácie alebo miesto uložiť medzi obľúbené.
4. Klikne na „Rezervovať miesto". Skontroluje termín prevzatý z filtra, prípadne ho upraví. Vyberie uložené vozidlo alebo zadá nové. Aplikácia overí dostupnosť a vypočíta cenu.
5. Na obrazovke súhrnu skontroluje miesto, termín, EČV, konečnú cenu a podmienky storna. Zaškrtne tri samostatné súhlasy (s VOP, so zmluvnou pokutou a so skorším začatím služby). Vyberie platobnú metódu a potvrdí objednávku tlačidlom „Objednávka s povinnosťou platby".
6. Po úspešnom dokončení sa zobrazí potvrdenie. Rezervácia bude dostupná v záložke Rezervácie a potvrdenie príde e-mailom.
7. V detaile rezervácie si pozrie presnú adresu, pokyny na vstup a prípadný vstupný kód. Kliknutím na „Navigovať na miesto" otvorí navigáciu.
8. Počas parkovania vidí v záložke Rezervácie svoju aktuálnu rezerváciu a jej platnosť. Po skončení ju nájde v histórii.

**Alternatívne vetvy:**
- Termín nie je dostupný: zákazník vyberie iný termín alebo miesto.
- Platba zlyhá: môže ju zopakovať bez vytvorenia duplicitnej rezervácie.
- Storno od potvrdenia najneskôr do 5 minút po začiatku rezervácie: otvorí detail, zvolí „Stornovať rezerváciu" a potvrdí. Vráti sa mu celá zaplatená suma.
- Zákazník chce zrušiť po uplynutí lehoty na bezplatné storno: v detaile rezervácie zvolí „Odstúpiť od zmluvy" (zákonné 14-dňové právo).
- Miesto je obsadené alebo neprístupné: zákazník otvorí „Reklamácia / Nahlásiť problém" a založí prípad.
- Majiteľ zmení vstupný kód: zákazník dostane upozornenie a nový kód vidí v detaile rezervácie.
- Zákazník chce parkovať dlhšie: v detaile rezervácie zvolí predĺženie, ak je termín voľný; skontroluje doplatok a výslovne ho potvrdí.

### Scenár 2: Majiteľ pridá parkovacie miesto a spravuje jeho prenájom

**Cieľ:** ponúknuť vlastné parkovacie miesto, nastaviť jeho podmienky a sledovať rezervácie a zárobky.

**Základný priebeh:** Otvorenie aplikácie, prihlásenie alebo registrácia, režim majiteľa, Moje miesta, pridanie miesta, nastavenie ceny a dostupnosti, zverejnenie ponuky, správa rezervácií.

1. Majiteľ sa prihlási alebo si vytvorí účet. Rovnaký účet môže používať aj ako zákazník.
2. V profile prepne aplikáciu do režimu majiteľa. V spodnej navigácii sa zobrazia záložky Moje miesta, Prehľad a Profil.
3. Ak ešte nedokončil dodatočnú registráciu majiteľa, aplikácia mu krátko vysvetlí, o čo ide, a ponúkne sprievodcu. Môže ho preskočiť a dostane sa na Prehľad; baner „Dokončite registráciu majiteľa" zostane viditeľný v Prehľade a v Moje miesta.
4. V Moje miesta zvolí „Pridať miesto". Zadá adresu a polohu na dočasnej mape, pridá fotografie, vyberie typ miesta, spôsob vstupu a kapacitu. Pri vstupe na kód zadá kód do neverejného poľa, pri ostatných spôsoboch vstupu okrem voľného vstupu doplní pokyny na vstup a výjazd. Uvedie postavenie poskytovateľa (obchodník alebo súkromná osoba).
5. Vyplní hodinovú cenu. Aplikácia navrhne cenu ±20 % oproti mestskému parkovaniu v okolí; majiteľ si navrhnutú cenu môže upraviť.
6. Určí, kedy je miesto voľné. Môže nastaviť aj opakovanie, napríklad dostupnosť každý pracovný deň.
7. Pred zverejnením vidí províziu ParkPoint, poplatok platobného partnera a čistú sumu, ktorú dostane. Potvrdí vyhlásenie poskytovateľa miesta a odošle ponuku. Ponuka sa zverejní okamžite, bez schvaľovania.
8. Keď si niekto miesto rezervuje, majiteľ dostane upozornenie. V Prehľade vidí dnešné rezervácie, aktuálne obsadené miesta a súhrn príjmov.
9. V Moje miesta môže miesto upraviť, dočasne pozastaviť alebo vymazať. Pri rozkliknutí konkrétneho miesta vidí prehľad jeho rezervácií a zárobky.
10. Pre vyplatenie odmeny má pripojený účet cez Stripe Connect s overenou totožnosťou a platobnými údajmi. Výplatu dostane do siedmich pracovných dní po skončení parkovania.

**Alternatívne vetvy:**
- Chýbajú alebo sú nesprávne údaje: formulár označí problém a majiteľ údaje opraví.
- Úprava koliduje s rezerváciou: aplikácia kolíziu skontroluje. Zmena nesmie automaticky meniť cenu ani podmienky už potvrdených rezervácií.
- Zákazník prekročí čas rezervácie o viac ako 15 minút: majiteľ pri príslušnej rezervácii nahlási prekročenie a priloží fotografiu vozidla. Otvorí sa prípad; zákazník má najmenej 14 dní na vyjadrenie a pokuta sa z karty nestiahne bez jeho osobitnej autorizácie.
- Majiteľ zmení vstupný kód: zmenu zadá v úprave miesta a potvrdené rezervácie dostanú nový kód.

## Otvorené body

1. **Čas zverejnenia presnej polohy a vstupného kódu.** VOP ich sprístupnia ihneď po zaplatení, ale bezplatné storno trvá do 5 minút po začiatku rezervácie. Zákazník tak môže zaplatiť, zistiť kód, stornovať a dostať peniaze späť.
2. **Výška provízie ParkPoint.** Potrebná pre rozpis ceny zákazníka aj pre prehľad majiteľa pred zverejnením.
3. **Či vôbec majú byť na hlavnej mape zoznamy alebo tlačidlá „Najbližšie" a „Najlepší pomer ceny a vzdialenosti".** Ak áno, kde a v akej forme.
4. **Predikcia.** Definícia zón (mestské časti alebo mriežka) a zdroj cien mestského parkovania pre výpočet ±20 %.
5. **Spôsob dvojfaktorového overenia** (TOTP, SMS alebo iný).
