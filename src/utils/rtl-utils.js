// Source: https://en.wikipedia.org/wiki/Bi-directional_text and http://www.unicode.org/Public/6.0.0/ucd/UnicodeData.txt
// 3 types of strong direction characters: L (strong left-to-right), R(strong right-to-left, Hebrew) and AL(strong right-to-left, Arabic language)
const rangesOfLChars =
  '[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u02BB-\u02C1\u02D0-\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376-\u037D\u0386\u0388-\u03F5\u03F7-\u0482\u048A-\u0589\u0903-\u0939\u093B\u093D-\u0940\u0949-\u094C\u094E-\u0950\u0958-\u0961\u0964-\u097F\u0982-\u09B9\u09BD-\u09C0\u09C7-\u09CC\u09CE-\u09E1\u09E6-\u09F1\u09F4-\u09FA\u0A03-\u0A39\u0A3E-\u0A40\u0A59-\u0A6F\u0A72-\u0A74\u0A83-\u0AB9\u0ABD-\u0AC0\u0AC9-\u0ACC\u0AD0-\u0AE1\u0AE6-\u0AEF\u0B02-\u0B39\u0B3D-\u0B3E\u0B40\u0B47-\u0B4C\u0B57-\u0B61\u0B66-\u0B77\u0B83-\u0BBF\u0BC1-\u0BCC\u0BD0-\u0BF2\u0C01-\u0C3D\u0C41-\u0C44\u0C58-\u0C61\u0C66-\u0C6F\u0C7F-\u0CB9\u0CBD-\u0CCB\u0CD5-\u0CE1\u0CE6-\u0D40\u0D46-\u0D4C\u0D4E-\u0D61\u0D66-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E4F-\u0EB0\u0EB2-\u0EB3\u0EBD-\u0EC6\u0ED0-\u0F17\u0F1A-\u0F34\u0F36\u0F38\u0F3E-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C\u0FBE-\u0FC5\u0FC7-\u102C\u1031\u1038\u103B-\u103C\u103F-\u1057\u105A-\u105D\u1061-\u1070\u1075-\u1081\u1083-\u1084\u1087-\u108C\u108E-\u109C\u109E-\u135A\u1360-\u138F\u13A0-\u13F4\u1401-\u167F\u1681-\u169A\u16A0-\u1711\u1720-\u1731\u1735-\u1751\u1760-\u1770\u1780-\u17B6\u17BE-\u17C5\u17C7-\u17C8\u17D4-\u17DA\u17DC\u17E0-\u17E9\u1810-\u18A8\u18AA-\u191C\u1923-\u1926\u1929-\u1931\u1933-\u1938\u1946-\u19DA\u1A00-\u1A16\u1A19-\u1A55\u1A57\u1A61\u1A63-\u1A64\u1A6D-\u1A72\u1A80-\u1AAD\u1B04-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B6A\u1B74-\u1B7C\u1B82-\u1BA1\u1BA6-\u1BA7\u1BAA-\u1BE5\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2-\u1C2B\u1C34-\u1C35\u1C3B-\u1C7F\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1DBF\u1E00-\u1FBC\u1FBE\u1FC2-\u1FCC\u1FD0-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FFC\u200E\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E-\u214F\u2160-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF\u2C00-\u2CE4\u2CEB-\u2CEE\u2D00-\u2D70\u2D80-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u31BA\u31F0-\u321C\u3220-\u324F\u3260-\u327B\u327F-\u32B0\u32C0-\u32CB\u32D0-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5\u4E00-\uA48C\uA4D0-\uA60C\uA610-\uA66E\uA680-\uA6EF\uA6F2-\uA6F7\uA722-\uA787\uA789-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA824\uA827\uA830-\uA837\uA840-\uA873\uA880-\uA8C3\uA8CE-\uA8D9\uA8F2-\uA925\uA92E-\uA946\uA952-\uA97C\uA983-\uA9B2\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uAA28\uAA2F-\uAA30\uAA33-\uAA34\uAA40-\uAA42\uAA44-\uAA4B\uAA4D-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2-\uABE4\uABE6-\uABE7\uABE9-\uABEC\uABF0-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFDC]';
const rangesOfRChars =
  '[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u07C0-\u07EA\u07F4-\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB4F]';
const rangesOfALChars =
  '[\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u070D\u0710\u0712-\u072F\u074D-\u07A5\u07B1\uFB50-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]';
const rangesOfLRgExp = new RegExp(rangesOfLChars); // eslint-disable-line
const rangesOfRRgExp = new RegExp(rangesOfRChars);
const rangesOfALRgExp = new RegExp(rangesOfALChars);

const rtlUtils = {
  lrm: String.fromCharCode(8206), // left-to-right marker
  rlm: String.fromCharCode(8207), // right-to-left marker

  isLtrChar(c) {
    return rangesOfLRgExp.test(c);
  },

  isRtlChar(c) {
    return rangesOfRRgExp.test(c) || rangesOfALRgExp.test(c);
  },

  detectTextDirection(s) {
    const n = s ? s.length : 0;
    let i;
    let c;
    for (i = 0; i < n; i++) {
      c = s[i];
      if (rtlUtils.isLtrChar(c)) {
        return 'ltr';
      }
      if (rtlUtils.isRtlChar(c)) {
        return 'rtl';
      }
    }
    return 'ltr';
  },
};

export default rtlUtils;