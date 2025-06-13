// Script to convert imperial units to metric on a webpage
(function() {
  const unicodeFractions = {
    '½': 0.5,
    '⅓': 1/3,
    '⅔': 2/3,
    '¼': 0.25,
    '¾': 0.75,
    '⅕': 0.2,
    '⅖': 0.4,
    '⅗': 0.6,
    '⅘': 0.8,
    '⅙': 1/6,
    '⅚': 5/6,
    '⅐': 1/7,
    '⅛': 0.125,
    '⅜': 0.375,
    '⅝': 0.625,
    '⅞': 0.875,
    '⅑': 1/9,
    '⅒': 0.1
  };
  // Simple units (miles, oz, lb, yards, etc.)
  const conversions = [
    // Decimal numbers with comma (e.g. 1,5)
    { regex: /(\d+),(\d+)/g, custom: (m, int, frac) => `${int}.${frac}` },
    // Unicode fractions (e.g. ½, ⅓, 1½)
    { regex: new RegExp('([0-9]*)\s*(' + Object.keys(unicodeFractions).map(f => `\\u${f.charCodeAt(0).toString(16).padStart(4,'0')}`).join('|') + ")", 'g'), custom: (m, whole, frac) => {
      let val = (parseInt(whole || '0', 10) + unicodeFractions[frac]) || unicodeFractions[frac];
      return val.toString();
    }},
    // Mixed fractions (e.g. 3 1/2)
    { regex: /(\d+)\s+(\d+)\/(\d+)/g, custom: (m, whole, num, denom) => (+whole + (+num / +denom)).toString() },
    // Simple fractions (e.g. 1/2)
    { regex: /\b(\d+)\/(\d+)\b/g, custom: (m, num, denom) => (+num / +denom).toString() },
    // Ranges (e.g. 1-2, 3 - 7, 1.5-2,5), but not fractions
    { regex: /\b(\d+[\.,]?\d*)\s*[-–—]\s*(\d+[\.,]?\d*)\b/g, custom: (m, a, b) => `${a.replace(',', '.')}-${b.replace(',', '.')}` },
    // Simple units (miles, oz, lb, yards, etc.)
    { regex: /(\d+(\.\d+)?)[ ]?(mi|mile|miles)\b/gi, factor: 1.60934, unit: 'km' },
    { regex: /(\d+(\.\d+)?)[ ]?(oz)\b/gi, factor: 28.3495, unit: 'g' },
    { regex: /(\d+(\.\d+)?)[ ]?(fl\. oz|fl oz|floz)\b/gi, factor: 29.5735, unit: 'ml' },
    { regex: /(\d+(\.\d+)?)[ ]?(lb|pound|pounds)\b/gi, factor: 0.453592, unit: 'kg' },
    { regex: /(\d+(\.\d+)?)[ ]?(yd|yard|yards)\b/gi, factor: 0.9144, unit: 'm' },
    // Feet and inches: 3'5", 3’5”, 3′5″, 3 feet 5 inches, 3 foot 5 inch
    { regex: /(\d+)\s*(?:'|’|′|\s?ft|\s?feets?|\s?foots?)[\s]*([\d]+)(?:"|”|″|\s?inches?|\s?inch|\s?in)\b/gi, custom: (m, f, i) => {
      let meters = (+f * 0.3048) + (+i * 0.0254);
      let metric = meters < 1 ? (meters * 100).toFixed(2) + ' cm' : meters.toFixed(2) + ' m';
      return metric + ` (${m.trim()})`;
    }},
    // Only feet: 5', 5.5', 5’, 5′, 5 ft, 5 feet, 5 foot
    { regex: /(\d+[\.,]?\d*)\s*(?:'|’|′|\s?ft|\s?feets?|\s?foots?)\b/gi, custom: (m, f) => {
      let meters = parseFloat(f.replace(',', '.')) * 0.3048;
      let metric = meters < 1 ? (meters * 100).toFixed(2) + ' cm' : meters.toFixed(2) + ' m';
      return metric + ` (${m.trim()})`;
    }},
    // Only inches: 7", 7.5", 7”, 7″, 7 inch(es), 7 in
    { regex: /(\d+[\.,]?\d*)\s*(?:"|”|″|\s?inches?|\s?inch|\s?in)(?=\s|$)/gi, custom: (m, i) => ((parseFloat(i.replace(',', '.')) * 2.54).toFixed(2) + ' cm (' + m.trim() + ')') },
  ];

  function convertText(text) {
    let newText = text;
    conversions.forEach(conv => {
      if (conv.custom) {
        newText = newText.replace(conv.regex, conv.custom);
      } else {
        newText = newText.replace(conv.regex, (m, n) => {
          let val = (parseFloat(n) * conv.factor);
          let metric;
          if (conv.unit === 'm' && val < 1) metric = (val * 100).toFixed(2) + ' cm';
          else if (conv.unit === 'kg' && val < 1) metric = (val * 1000).toFixed(2) + ' g';
          else if (conv.unit === 'km' && val < 1) metric = (val * 1000).toFixed(2) + ' m';
          else if (conv.unit === 'ml' && val < 1) metric = (val * 1000).toFixed(2) + ' μl';
          else metric = val.toFixed(2) + ' ' + conv.unit;
          return metric + ' (' + m.trim() + ')';
        });
      }
    });
    return newText;
  }

  function walk(node) {
    if (node.nodeType === 3) { // text node
      let newText = convertText(node.nodeValue);
      if (newText !== node.nodeValue) node.nodeValue = newText;
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) walk(node.childNodes[i]);
    }
  }

  walk(document.body);
  alert('Imperial units converted to metric!');
})();
