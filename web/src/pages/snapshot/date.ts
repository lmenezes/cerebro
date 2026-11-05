// angular date 过滤器 date:'yyyy-MM-dd HH:mm:ss Z' 的等价实现（本地时区）

const R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
const NUMBER_STRING = /^-?\d+$/;

// angular 的 jsonStringToDate：不是 ISO 8601 格式的字符串原样返回
function jsonStringToDate(string: string): Date | string {
  const match = string.match(R_ISO8601_STR);
  if (match) {
    const date = new Date(0);
    let tzHour = 0;
    let tzMin = 0;
    const dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
    const timeSetter = match[8] ? date.setUTCHours : date.setHours;
    if (match[9]) {
      tzHour = parseInt(match[9] + match[10], 10);
      tzMin = parseInt(match[9] + match[11], 10);
    }
    dateSetter.call(date, parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10));
    const h = parseInt(match[4] || '0', 10) - tzHour;
    const m = parseInt(match[5] || '0', 10) - tzMin;
    const s = parseInt(match[6] || '0', 10);
    const ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
    timeSetter.call(date, h, m, s, ms);
    return date;
  }
  return string;
}

function pad(num: number, digits: number): string {
  let neg = '';
  if (num < 0) {
    neg = '-';
    num = -num;
  }
  let s = '' + num;
  while (s.length < digits) {
    s = '0' + s;
  }
  return neg + s;
}

function timeZone(date: Date): string {
  const zone = -1 * date.getTimezoneOffset();
  let paddedZone = zone >= 0 ? '+' : '';
  paddedZone += pad(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + pad(Math.abs(zone % 60), 2);
  return paddedZone;
}

// 无法解析成日期时和 angular 一样原样返回（插值时 undefined/null 显示为空）
export function formatDate(value: unknown): unknown {
  let date: unknown = value;
  if (typeof date === 'string') {
    date = NUMBER_STRING.test(date) ? parseInt(date, 10) : jsonStringToDate(date);
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (!(date instanceof Date) || !isFinite(date.getTime())) {
    return date;
  }
  return pad(date.getFullYear(), 4) + '-' + pad(date.getMonth() + 1, 2) + '-' + pad(date.getDate(), 2) + ' ' +
    pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ':' + pad(date.getSeconds(), 2) + ' ' + timeZone(date);
}
