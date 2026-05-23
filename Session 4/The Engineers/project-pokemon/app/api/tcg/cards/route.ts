import { NextResponse } from 'next/server';

const TCG_API = 'https://api.tcgdex.net/v2/en';

const EXCLUDED_SET_IDS = new Set([
  'jumbo',
  'wp',
  'sp',
  'bog',
  'ex5.5',
  'exu',
  'rc',
  'xya',
  'xy0',
  'mfb',
  'sve',
  'mee',
  'si1',
  'ru1',
  'fut2020',
  'basep',
  'np',
  'dpp',
  'hgssp',
  'bwp',
  'xyp',
  'smp',
  'swshp',
  'svp',
  'mep',
  'P-A',
  'A1',
  'A1a',
  'A2',
  'A2a',
  'A2b',
  'A3',
  'A3a',
  'A3b',
  'A4',
  'A4a',
  'B1',
  'B1a',
  'B2',
  'B2a',
  'pop1',
  'pop2',
  'pop3',
  'pop4',
  'pop5',
  'pop6',
  'pop7',
  'pop8',
  'pop9',
  'tk-ex-latia',
  'tk-ex-latio',
  'tk-ex-p',
  'tk-ex-m',
  'tk-dp-l',
  'tk-dp-m',
  'tk-hs-g',
  'tk-hs-r',
  'tk-bw-e',
  'tk-bw-z',
  'tk-xy-n',
  'tk-xy-sy',
  'tk-xy-w',
  'tk-xy-b',
  'tk-xy-latio',
  'tk-xy-latia',
  'tk-xy-p',
  'tk-xy-su',
  'tk-sm-l',
  'tk-sm-r',
  '2011bw',
  '2012bw',
  '2014xy',
  '2015xy',
  '2016xy',
  '2017sm',
  '2018sm',
  '2019sm',
  '2021swsh',
  '2022swsh',
  '2023sv',
  '2024sv',
]);

const EXCLUDED_SET_NAMES = new Set([
  'Miscellaneous Cards & Products',
  'Blister Exclusives',
  'Deck Exclusives',
  'Prize Pack Series Cards',
  'League & Championship Cards',
  'Jumbo Cards',
  'Jumbo cards',
  'World Championship Decks',
  'Best of Promos',
  'Best of game',
  'W Promotional',
  'Sample',
  'Pok\u00e9 Card Creator Pack',
  'Pokémon Rumble',
  'Southern Islands',
  'Radiant Collection',
  'Yellow A Alternate',
  'Kalos Starter Set',
  'My First Battle',
  'Scarlet & Violet Energy',
  'Mega Evolution Energy',
  'Unseen Forces Unown Collection',
  'Pokémon Futsal 2020',
  'Nintendo Black Star Promos',
  'Promos-A',
  'Genetic Apex',
  'Mythical Island',
  'Space-Time Smackdown',
  'Triumphant Light',
  'Shining Revelry',
  'Celestial Guardians',
  'Extradimensional Crisis',
  'Eevee Grove',
  'Wisdom of Sea and Sky',
  'Secluded Springs',
  'Mega Rising',
  'Crimson Blaze',
  'Fantastical Parade',
  'Paldean Wonders',
]);

function isTrainerKit(name: string): boolean {
  return /trainer kit/i.test(name);
}

function isMcDonalds(name: string): boolean {
  return /mcdonald'?s collection/i.test(name);
}

function isBlackStarPromo(name: string): boolean {
  return /black star promos/i.test(name);
}

function isPopSeries(name: string): boolean {
  return /^POP Series \d+$/.test(name);
}

function isExcludedSet(setId: string, setName: string): boolean {
  if (EXCLUDED_SET_IDS.has(setId)) return true;
  if (EXCLUDED_SET_NAMES.has(setName)) return true;
  if (isTrainerKit(setName)) return true;
  if (isMcDonalds(setName)) return true;
  if (isBlackStarPromo(setName)) return true;
  if (isPopSeries(setName)) return true;
  return false;
}

const SET_RELEASE_DATES: Record<string, string> = {
  base1: '1999-01-09', base2: '1999-06-16', base3: '1999-10-10', base4: '2000-02-24', base5: '2000-04-24',
  gym1: '2000-08-14', gym2: '2000-10-16', neo1: '2000-12-01', neo2: '2001-04-01', neo3: '2001-09-01',
  neo4: '2002-02-01', lc: '2002-05-24', ecard1: '2002-09-15', ecard2: '2003-01-15', ecard3: '2003-05-12',
  ex1: '2003-07-18', ex2: '2003-09-18', ex3: '2003-11-17', ex4: '2004-03-17', ex5: '2004-06-16',
  ex6: '2004-09-14', ex7: '2004-11-10', ex8: '2005-02-07', ex9: '2005-05-16', ex10: '2005-08-22',
  ex11: '2005-11-21', ex12: '2006-03-20', ex13: '2006-05-15', ex14: '2006-08-01', ex15: '2006-10-30',
  ex16: '2007-02-14', dp1: '2007-05-23', dp2: '2007-08-08', dp3: '2007-11-07', dp4: '2008-02-13',
  dp5: '2008-05-14', dp6: '2008-08-13', dp7: '2008-11-05', pl1: '2009-02-11', pl2: '2009-05-13',
  pl3: '2009-08-19', pl4: '2009-11-11', hgss1: '2010-02-10', hgss2: '2010-05-12', hgss3: '2010-08-18',
  hgss4: '2010-11-10', col1: '2011-02-09', bw1: '2011-04-25', bw2: '2011-08-31', bw3: '2011-11-16',
  bw4: '2012-02-08', bw5: '2012-05-16', bw6: '2012-08-15', dv1: '2012-10-10', bw7: '2012-11-07',
  bw8: '2013-02-06', bw9: '2013-05-08', bw10: '2013-08-14', bw11: '2013-11-06',
  xy0: '2013-12-01', xy1: '2014-02-05', xy2: '2014-05-07', xy3: '2014-08-13', xy4: '2014-11-05',
  xy5: '2015-02-04', dc1: '2015-03-25', xy6: '2015-05-06', xy7: '2015-08-12', xy8: '2015-11-04',
  xy9: '2015-12-30', g1: '2016-02-22', xy10: '2016-05-04', xy11: '2016-08-03', xy12: '2016-11-02',
  sm1: '2017-02-03', sm2: '2017-05-05', sm3: '2017-08-04', sm35: '2017-09-22', sm4: '2017-11-03',
  sm5: '2018-02-02', sm6: '2018-05-04', sm7: '2018-08-03', sm75: '2018-09-21', sm8: '2018-11-02',
  sm9: '2019-01-25', det1: '2019-03-29', sm10: '2019-05-03', sm11: '2019-08-02', sma: '2019-08-23',
  sm115: '2019-08-23', sm12: '2019-11-01',
  swsh1: '2019-11-15', swsh2: '2020-04-03', swsh3: '2020-08-14', swsh35: '2020-09-25',
  swsh4: '2020-11-13', swsh45: '2021-02-19', swsh5: '2021-03-19', swsh6: '2021-06-18',
  swsh7: '2021-08-27', cel25: '2021-10-08', swsh8: '2021-11-12', swsh9: '2022-02-25',
  swsh10: '2022-05-27', swsh105: '2022-07-01', swsh11: '2022-09-09', swsh12: '2022-11-11',
  swsh125: '2023-01-20',
  sv01: '2023-03-31', sv02: '2023-06-09', sv03: '2023-08-11', sv035: '2023-09-22',
  sv04: '2023-11-03', sv045: '2024-01-26', sv05: '2024-03-22', sv06: '2024-05-24',
  sv065: '2024-08-02', sv07: '2024-09-20', sv08: '2024-11-15', sv085: '2025-01-17',
  sv09: '2025-03-28', sv10: '2025-05-30', sv105w: '2025-08-22', sv105b: '2025-08-22',
  me01: '2025-06-27', me02: '2025-09-26', 'me02.5': '2026-01-30', me03: '2026-03-27',
};

function getSetReleaseDate(setId: string): string {
  if (SET_RELEASE_DATES[setId]) return SET_RELEASE_DATES[setId];
  if (setId.startsWith('sv10')) return '2025-08-01';
  if (setId.startsWith('sv09')) return '2025-03-01';
  if (setId.startsWith('sv08')) return '2024-11-01';
  if (setId.startsWith('sv07')) return '2024-09-01';
  if (setId.startsWith('sv06')) return '2024-05-01';
  if (setId.startsWith('sv05')) return '2024-03-01';
  if (setId.startsWith('sv04')) return '2023-11-01';
  if (setId.startsWith('sv03')) return '2023-08-01';
  if (setId.startsWith('sv02')) return '2023-06-01';
  if (setId.startsWith('sv01')) return '2023-03-01';
  if (setId.startsWith('me0')) return '2025-06-01';
  if (setId.startsWith('swsh12')) return '2022-11-01';
  if (setId.startsWith('swsh11')) return '2022-09-01';
  if (setId.startsWith('swsh10')) return '2022-05-01';
  if (setId.startsWith('swsh9')) return '2022-02-01';
  if (setId.startsWith('swsh8')) return '2021-11-01';
  if (setId.startsWith('swsh7')) return '2021-08-01';
  if (setId.startsWith('swsh6')) return '2021-06-01';
  if (setId.startsWith('swsh5')) return '2021-03-01';
  if (setId.startsWith('swsh4')) return '2020-11-01';
  if (setId.startsWith('swsh3')) return '2020-08-01';
  if (setId.startsWith('swsh2')) return '2020-04-01';
  if (setId.startsWith('swsh1')) return '2019-11-01';
  if (setId.startsWith('sm12')) return '2019-11-01';
  if (setId.startsWith('sm11')) return '2019-08-01';
  if (setId.startsWith('sm10')) return '2019-05-01';
  if (setId.startsWith('sm9')) return '2019-01-01';
  if (setId.startsWith('sm8')) return '2018-11-01';
  if (setId.startsWith('sm7')) return '2018-08-01';
  if (setId.startsWith('sm6')) return '2018-05-01';
  if (setId.startsWith('sm5')) return '2018-02-01';
  if (setId.startsWith('sm4')) return '2017-11-01';
  if (setId.startsWith('sm3')) return '2017-08-01';
  if (setId.startsWith('sm2')) return '2017-05-01';
  if (setId.startsWith('sm1')) return '2017-02-01';
  return '2000-01-01';
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || searchParams.get('q') || '';

  if (name.length < 2) {
    return NextResponse.json({ data: [], sets: [] });
  }

  try {
    const [cardsRes, setsRes] = await Promise.all([
      fetch(`${TCG_API}/cards?name=${encodeURIComponent(name)}`, {
        headers: { Accept: 'application/json' },
      }),
      fetch(`${TCG_API}/sets`, {
        headers: { Accept: 'application/json' },
      }),
    ]);

    if (!cardsRes.ok || !setsRes.ok) {
      return NextResponse.json({ data: [], sets: [] });
    }

    const [rawCards, allSets] = await Promise.all([
      cardsRes.json(),
      setsRes.json(),
    ]);

    if (!Array.isArray(rawCards) || rawCards.length === 0) {
      return NextResponse.json({ data: [], sets: [] });
    }

    const setMap = new Map<string, { id: string; name: string; releaseDate: string }>();
    for (const s of allSets) {
      if (s.id && s.name && !isExcludedSet(s.id, s.name)) {
        const releaseDate = s.releaseDate || getSetReleaseDate(s.id);
        setMap.set(s.id, {
          id: s.id,
          name: s.name,
          releaseDate,
        });
      }
    }

    const cards: any[] = [];
    const seenIds = new Set<string>();

    for (const card of rawCards) {
      const id: string = card.id || '';
      const dashIdx = id.lastIndexOf('-');
      const setId = dashIdx > 0 ? id.substring(0, dashIdx) : '';

      if (!setId || EXCLUDED_SET_IDS.has(setId)) continue;

      const setInfo = setMap.get(setId);
      if (!setInfo) continue;

      if (seenIds.has(id)) continue;
      seenIds.add(id);

      const isExact = card.name?.toLowerCase() === name.toLowerCase();
      const imageUrl = card.image ? `${card.image}/high.webp` : null;
      cards.push({
        id,
        name: card.name,
        setId,
        setName: setInfo.name,
        releaseDate: setInfo.releaseDate,
        rarity: card.rarity || null,
        images: {
          small: imageUrl,
          large: imageUrl,
        },
        _exact: isExact ? 0 : 1,
        _releaseDate: setInfo.releaseDate,
      });
    }

    cards.sort((a, b) => {
      if (a._exact !== b._exact) return a._exact - b._exact;
      return b._releaseDate.localeCompare(a._releaseDate);
    });

    const data = cards.slice(0, 100).map(({ _exact, _releaseDate, ...rest }) => rest);

    const uniqueSets = new Map<string, { id: string; name: string; releaseDate: string }>();
    for (const card of data) {
      if (!uniqueSets.has(card.setId)) {
        uniqueSets.set(card.setId, {
          id: card.setId,
          name: card.setName,
          releaseDate: card.releaseDate,
        });
      }
    }
    const sets = Array.from(uniqueSets.values()).sort((a, b) =>
      b.releaseDate.localeCompare(a.releaseDate)
    );

    return NextResponse.json({ data, sets });
  } catch {
    return NextResponse.json({ data: [], sets: [] });
  }
}
