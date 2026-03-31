// ─── Evenementen datalaag ─────────────────────────────────────────────────────
// Elk object hier is één evenement. De app past straks alleen dit bestand aan.

export const evenementenData = {
  'proeverij-herfstsmaken': {
    slug: 'proeverij-herfstsmaken',
    naam: 'Proewerij: Herfstsmaken',
    tagline: 'Ontdek de fijnste smaken van het seizoen in de warme sfeer van Bergsma Easterein.',
    datum: 'Zondag 15 oktober 2025',
    starttijd: '15:00',
    eindtijd: '19:00',
    leeftijd: '18+',
    prijs: '€22,50 p.p.',
    dresscode: null,
    heroImage: '/images/feest-hero.png',
    infoImage: '/images/feest-info.png',
    intro: `Bergsma Easterein nodigt je uit voor een smaakvolle middag vol herfstinspiratie.
Tijdens deze proewerij nemen wij je mee door een zorgvuldig samengestelde selectie van seizoensgebonden smaken — van rijpe herfstwijnen tot bijzondere borrelhapjes die perfect bij het seizoen passen.

Onze gastheer begeleidt je door elke gang en vertelt het verhaal achter elk product.
Of je nu een ervaren proever bent of gewoon nieuwsgierig: deze middag is voor iedereen die houdt van eten, drinken en gezelligheid.`,
    faq: [
      {
        q: 'Is reserveren verplicht?',
        a: 'Ja, vanwege het beperkte aantal plekken is reserveren verplicht. Gebruik de knop op deze pagina om je plek vast te leggen.',
      },
      {
        q: 'Wat is inbegrepen in de prijs?',
        a: 'De prijs is inclusief alle proewerij-porties, bijpassende hapjes en begeleiding door onze gastheer. Drankjes buiten het programma zijn op eigen kosten.',
      },
      {
        q: 'Is er parkeergelegenheid?',
        a: 'Ja, er is gratis parkeergelegenheid beschikbaar op loopafstand van Bergsma Easterein.',
      },
      {
        q: 'Kan ik met een groep komen?',
        a: 'Zeker! Voor groepen van 8 personen of meer adviseren wij om vooraf contact op te nemen zodat we een passende opstelling kunnen regelen.',
      },
    ],
  },

  'kerstdiner-special': {
    slug: 'kerstdiner-special',
    naam: 'Kerstdiner Special',
    tagline: 'Sluit het jaar feestelijk af aan tafel bij Bergsma Easterein.',
    datum: 'Zaterdag 20 december 2025',
    starttijd: '18:00',
    eindtijd: '23:00',
    leeftijd: 'Alle leeftijden',
    prijs: '€49,50 p.p.',
    dresscode: 'Feestelijk',
    heroImage: '/images/feest-hero.png',
    infoImage: '/images/feest-info.png',
    intro: `Het jaar eindigt zoals het hoort: aan een mooi gedekte tafel, omringd door mensen die je lief zijn.
Bergsma Easterein zet voor de jaarlijkse Kerstdiner Special zijn deuren open voor een avond vol warmte, sfeer en uitzonderlijk eten.

Ons keukenteam bereidt een meergangenmenu met de beste seizoensproducten. Live muziek zorgt voor de perfecte kerstsfeer.
Geniet van een avond waarbij elk detail klopt — van de eerste amuse tot het laatste glaasje.`,
    faq: [
      {
        q: 'Is het een vast menu of kan ik kiezen?',
        a: 'Het is een vastgesteld meergangenmenu afgestemd op het seizoen. Dieetwensen en allergieën kun je opgeven bij je reservering.',
      },
      {
        q: 'Zijn kinderen welkom?',
        a: 'Ja, kinderen zijn van harte welkom. Voor kinderen tot 12 jaar is er een apart kindermenu beschikbaar.',
      },
      {
        q: 'Moet ik reserveren?',
        a: 'Ja, reserveren is verplicht. Het Kerstdiner is historisch snel volgeboekt — reserveer dus op tijd.',
      },
      {
        q: 'Is er live muziek?',
        a: 'Ja, tijdens het diner verzorgen live muzikanten de sfeer. Details over de artiesten worden näher bekendgemaakt.',
      },
    ],
  },

  'wijnproewerij': {
    slug: 'wijnproewerij',
    naam: 'Wijnproewerij',
    tagline: 'De gezelligste wijnmiddag van Easterein — dit jaar nog mooier.',
    datum: 'Zaterdag 15 maart 2025',
    starttijd: '16:00',
    eindtijd: '21:00',
    leeftijd: '18+',
    prijs: '€28,50 p.p.',
    dresscode: null,
    heroImage: '/images/feest-hero.png',
    infoImage: '/images/feest-info.png',
    intro: `Onze wijnproewerij is al jaren één van de meest geliefde evenementen van Bergsma Easterein.
Een curatieve selectie wijnen, vakkundig uitgelegd door onze sommelier, gecombineerd met hapjes die elk glas perfect ondersteunen.

Van lichte zomerse whites tot volle, complexe rode wijnen — deze avond leer je proeven op een manier die je bijblijft.
Kom alleen, met je partner of met vrienden: de wijnproewerij is gezellig voor iedereen.`,
    faq: [
      {
        q: 'Hoeveel wijnen worden er geproefd?',
        a: 'Tijdens de proewerij proef je gemiddeld 8 tot 10 verschillende wijnen, elk begeleid door een passende hapje.',
      },
      {
        q: 'Is er ook non-alcoholisch aanbod?',
        a: 'Ja, op aanvraag bieden wij een non-alcoholische variant aan met bijzondere sappen en mocktails die passen bij de gerechten.',
      },
      {
        q: 'Is reserveren verplicht?',
        a: 'Ja, het aantal plaatsen is beperkt. Reserveer via de knop op deze pagina.',
      },
    ],
  },

  'easterein-live': {
    slug: 'easterein-live',
    naam: 'Easterein LIVE',
    tagline: 'Live muziek in de sfeervolle setting van Bergsma — een avond om niet te missen.',
    datum: 'Vrijdag 7 november 2025',
    starttijd: '20:30',
    eindtijd: '23:00',
    leeftijd: 'Alle leeftijden',
    prijs: '€8,50 p.p.',
    dresscode: null,
    heroImage: '/images/feest-hero.png',
    infoImage: '/images/feest-info.png',
    intro: `Easterein LIVE brengt de beste lokale en regionale muzikanten naar het podium van Bergsma.
Een avond vol live muziek in een intieme setting — precies zoals muziek gehoord moet worden.

Kom vroeg voor een goede plek, bestel je favoriete drankje en laat je meenemen door de klanken van de avond.
Easterein LIVE is laagdrempelig, gezellig en altijd een verrassing.`,
    faq: [
      {
        q: 'Wie treedt er op?',
        a: 'De artiesten worden vooraf bekendgemaakt via onze social media en website. Volg ons voor de laatste updates.',
      },
      {
        q: 'Moet ik reserveren?',
        a: 'Reserveren wordt aangeraden maar is niet verplicht. Op drukke avonden kan de capaciteit beperkt zijn.',
      },
      {
        q: 'Is er eten beschikbaar?',
        a: 'Ja, de keuken is open tot 22:00. Je kunt gewoon dineren terwijl je geniet van de muziek.',
      },
    ],
  },

  'the-legendary-blues': {
    slug: 'the-legendary-blues',
    naam: 'The Legendary Blues',
    tagline: 'Authentieke blues op zijn allerbest — recht uit het hart, recht in de ziel.',
    datum: 'Zaterdag 22 november 2025',
    starttijd: '16:00',
    eindtijd: '21:00',
    leeftijd: 'Alle leeftijden',
    prijs: '€10,00 p.p.',
    dresscode: null,
    heroImage: '/images/feest-hero.png',
    infoImage: '/images/feest-info.png',
    intro: `Bergsma Easterein verwelkomt The Legendary Blues voor een onvergetelijke middagavond.
Rauw, eerlijk en vol gevoel — dit is blues zoals het bedoeld is. Geen poespas, gewoon muziek die je raakt.

De intieme sfeer van Bergsma past perfect bij dit genre. Sluit je ogen, voel de muziek en laat je meenemen.
The Legendary Blues is een evenement voor iedereen die houdt van echte muziek met karakter.`,
    faq: [
      {
        q: 'Voor wie is dit evenement geschikt?',
        a: 'Voor iedereen die houdt van live muziek en een fijne middagavond. Blues-kennis is absoluut niet vereist.',
      },
      {
        q: 'Kan ik ook alleen komen?',
        a: 'Zeker! Veel bezoekers komen solo en gaan naar huis met nieuwe bekenden. De sfeer bij Bergsma zorgt daarvoor.',
      },
      {
        q: 'Is er eten beschikbaar?',
        a: 'Ja, de keuken is de hele avond open. Wij adviseren om vooraf een tafel te reserveren als je wilt dineren.',
      },
    ],
  },

  'tack-blaak-frank': {
    slug: 'tack-blaak-frank',
    naam: 'Tack, Blaak & Frank',
    tagline: 'Een uniek optreden van een bijzonder trio — muziek die je nergens anders hoort.',
    datum: 'Zondag 30 november 2025',
    starttijd: '11:00',
    eindtijd: '21:00',
    leeftijd: 'Alle leeftijden',
    prijs: '€12,50 p.p.',
    dresscode: null,
    heroImage: '/images/feest-hero.png',
    infoImage: '/images/feest-info.png',
    intro: `Tack, Blaak & Frank brengen een dag vol bijzondere muziek naar Bergsma Easterein.
Dit trio heeft een eigen geluid dat moeilijk in een hokje te plaatsen is — verrassend, meeslepend en altijd boeiend.

Van rustige akoestische klanken overdag tot een energiek slot in de avond: deze dag heeft een eigen ritme.
Kom wanneer je wilt, blijf zo lang als je wilt en geniet van muziek die je bijblijft.`,
    faq: [
      {
        q: 'Duurt het écht de hele dag?',
        a: 'Ja, Tack, Blaak & Frank spelen meerdere sets verspreid over de dag. Je kunt dus op elk moment binnenkomen en vertrekken.',
      },
      {
        q: 'Is de prijs per set of voor de hele dag?',
        a: 'De prijs geldt voor de volledige dag. Je kunt komen en gaan zoals je wilt.',
      },
      {
        q: 'Is reserveren verplicht?',
        a: 'Reserveren is aan te raden voor de avondsets, overdag is het wat rustiger en kun je ook gewoon binnenlopen.',
      },
    ],
  },
}
