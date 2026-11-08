// 도트 그림: 문자열 한 글자가 한 픽셀이다. '.'은 투명.
export type Palette = Record<string, string>;
export interface SpriteDef {
  pal: Palette;
  rows: string[];
}

export const INK = '#262139';

export const sprites = {
  keyboard: {
    pal: { k: INK, a: '#c9c4d6', w: '#ffffff' },
    rows: [
      'kkkkkkkkkkkkkkkkkkkkkkkkkk',
      'kwawawawawawawawawawawawak',
      'kawawawawawawawawawawawawk',
      'kaaaawwwwwwwwwwwwwwwwaaaak',
      'kkkkkkkkkkkkkkkkkkkkkkkkkk',
    ],
  },
  mouse: {
    pal: { k: INK, a: '#e4e0ef' },
    rows: ['...k...', '...k...', '.kkkkk.', 'kaakaak', 'kaakaak', 'kaaaaak', 'kaaaaak', 'kaaaaak', '.kkkkk.'],
  },
  // 김이 나는 커피 머그. 김은 mugSteamRows와 번갈아 그려 움직인다.
  mug: {
    pal: { k: INK, s: '#ffffff', w: '#f7f5fc', W: '#d9d4e8', t: '#3157e8', c: '#6b4a3a' },
    rows: [
      '...s...s...s....',
      '....s...s...s...',
      '...s...s...s....',
      '....s...s...s...',
      '................',
      '.kkkkkkkkkkkk...',
      '.kccccccccccckk.',
      '.kwwwwwwwwwwkkWk',
      '.kwwwwwwwwwwk.Wk',
      '.kttttttttttk.Wk',
      '.kwwwwwwwwwwkkWk',
      '.kwwwwwwwwwWkkk.',
      '.kwwwwwwwwWWk...',
      '..kkkkkkkkkk....',
    ],
  },
  // 러버덕: 막히면 오리한테 코드를 설명하는 '러버덕 디버깅'에서. 왼쪽(모니터)을 본다.
  duck: {
    pal: { k: INK, y: '#ffd96a', Y: '#f0b84a', o: '#ff9f45', e: INK },
    rows: [
      '.....kkkk.......',
      '....kyyyyk......',
      '...kyyyyyyk.....',
      '...kyekyyyk.....',
      '.kkkyyyyyyk.....',
      'koooyyyyyk......',
      '.kkkyyyyyk...kk.',
      '...kyyyyyyk.kyk.',
      '..kyyyyyyyykkyk.',
      '.kyyyyyyyyyyyyk.',
      '.kyyYyyyyyyyyyk.',
      '.kyyYYyyyyyyyYk.',
      '..kyyYYYYYYYYk..',
      '...kkkkkkkkkk...',
    ],
  },
  // 이니셜 K 키캡
  keycap: {
    pal: { k: INK, w: '#f7f5fc', W: '#d9d4e8', V: '#aaa3c2', K: '#3157e8' },
    rows: [
      '.kkkkkkkkkkkkkk.',
      'kWWWWWWWWWWWWWWk',
      'kWwwwwwwwwwwwwWk',
      'kWwwwwwwwwwwwwWk',
      'kWwwKwwwwwKwwwWk',
      'kWwwKwwwwKwwwwWk',
      'kWwwKwwwKwwwwwWk',
      'kWwwKKKKwwwwwwWk',
      'kWwwKwwwKwwwwwWk',
      'kWwwKwwwwKwwwwWk',
      'kWwwKwwwwwKwwwWk',
      'kWwwwwwwwwwwwwWk',
      'kVWWWWWWWWWWWWVk',
      'kVVVVVVVVVVVVVVk',
      '.kkkkkkkkkkkkkk.',
    ],
  },
  // 창틀 화분
  plant: {
    pal: { k: INK, L: '#7cc47f', l: '#55a05c', P: '#d9926a', p: '#b8714d', r: '#e8ab84' },
    rows: [
      '.....kkk......',
      '....kLLLk.....',
      '...kLLlLLk.kk.',
      '...kLlLLLkkLLk',
      '..kk.kLLkkLlLk',
      '.kLLkkkLkLLLk.',
      'kLlLLLklkkkk..',
      'kLLLLlklk.....',
      '.kkkkkklk.....',
      '......klk.....',
      '..kkkkkkkkkk..',
      '..krrrrrrrrk..',
      '...kPPPPPPk...',
      '...kPPPPPpk...',
      '...kPPPPPpk...',
      '....kkkkkk....',
    ],
  },
  // 로고·파비콘: 화면에 '>_'가 뜬 작은 모니터(16×16). 파비콘은 index.html에 같은 그림을 넣었다.
  logo: {
    pal: { k: INK, w: '#ebe8f3', W: '#c8c3da', b: '#1d1a33', a: '#eef1ff', c: '#7c97ff' },
    rows: [
      '.kkkkkkkkkkkkkk.',
      'kwwwwwwwwwwwwwwk',
      'kwbbbbbbbbbbbbwk',
      'kwbabbbbbbbbbbwk',
      'kwbbabbbbbbbbbwk',
      'kwbbbabbbbbbbbwk',
      'kwbbabbbbbbbbbwk',
      'kwbabbbcccbbbbwk',
      'kwbbbbbbbbbbbbwk',
      'kwwwwwwwwwwwwwwk',
      '.kkkkkkkkkkkkkk.',
      '......kWWk......',
      '......kWWk......',
      '...kkkkkkkkkk...',
      '...kWWWWWWWWk...',
      '...kkkkkkkkkk...',
    ],
  },
  cloud: {
    pal: { w: '#ffffff', c: '#d6e8f8' },
    rows: ['.....wwwww......', '...wwwwwwwww....', '.wwwwwwwwwwwwww.', 'wwwwwwwwwwwwwwww', '.cccccccccccccc.'],
  },
  sun: {
    pal: { y: '#ffd23f', Y: '#ffae1f' },
    rows: ['..yyyy..', '.yyyyyy.', 'yyyyyyyy', 'yyyyyyyY', 'yyyyyyYY', 'yyyyyYYY', '.yyYYYY.', '..YYYY..'],
  },
  moon: {
    pal: { m: '#fff3c4' },
    rows: ['..mmm...', '.mmm....', 'mmm.....', 'mmm.....', 'mmm.....', 'mmmm....', '.mmmmmm.', '..mmmm..'],
  },
  heart: {
    pal: { k: INK, r: '#ff6b8b' },
    rows: ['.kk.kk.', 'krrkrrk', 'krrrrrk', '.krrrk.', '..krk..', '...k...'],
  },
  trophy: {
    pal: { k: INK, y: '#ffc93c', w: '#fff6cf' },
    rows: ['kkkkkkk', 'kyyyyyk', 'kywyyyk', '.kyyyk.', '..kyk..', '.kkkkk.', '.kyyyk.', '.kkkkk.'],
  },
  flag: {
    pal: { k: INK, r: '#ff6b8b' },
    rows: ['kkkkk..', 'krrrrk.', 'krrrrrk', 'krrrrk.', 'kkkkk..', 'k......', 'k......', 'k......'],
  },
  scroll: {
    pal: { k: INK, w: '#fff6e0', l: '#9e97b8' },
    rows: ['kkkkkkk', 'kwwwwwk', 'kwllwwk', 'kwwwwwk', 'kwlllwk', 'kwwwwwk', 'kkkkkkk'],
  },
  chest: {
    pal: { k: INK, o: '#c07a3e', y: '#ffc93c' },
    rows: ['.kkkkkk.', 'kooooook', 'kkkkkkkk', 'kooyyook', 'kooooook', 'kkkkkkkk'],
  },
} satisfies Record<string, SpriteDef>;

export type SpriteName = keyof typeof sprites;

// 머그 김의 두 번째 장면: 김 줄을 한 칸씩 옆으로 민다.
export const mugSteamRows = sprites.mug.rows.map((row, i) => (i < 4 ? (i % 2 ? row.replace(/^\.(.*)$/, '$1.') : '.' + row.slice(0, -1)) : row));

// 헤더 로고는 커서를 따로 깜빡이게 그리므로, 커서 칸을 화면 색으로 지운 그림을 쓴다.
export const logoBlankRows = sprites.logo.rows.map((row) => row.replace(/c/g, 'b'));

// 같은 색이 이어지는 칸은 rect 하나로 합쳐 SVG 문자열을 만든다.
export function renderSprite({ pal, rows }: SpriteDef, scale: number): string {
  const width = Math.max(...rows.map((r) => r.length));
  let rects = '';
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      const color = pal[row[x]];
      if (!color) {
        x++;
        continue;
      }
      let run = 1;
      while (row[x + run] === row[x]) run++;
      rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${color}"/>`;
      x += run;
    }
  });
  return `<svg viewBox="0 0 ${width} ${rows.length}" width="${width * scale}" height="${rows.length * scale}" shape-rendering="crispEdges">${rects}</svg>`;
}
