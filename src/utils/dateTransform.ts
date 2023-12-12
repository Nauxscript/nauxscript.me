
const monthArray = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '拾月', '拾壹月', '拾贰月']
const yearArray = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
const dayArray = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']

export function dateTransform(dateStr: string) {
  const date = new Date(dateStr)
  let year = '';
  let yearStr = date.getFullYear().toString();
  for (let i = 2; i < yearStr.length; i++) {
    year += yearArray[parseInt(yearStr.charAt(i))];
  }
  const month = monthArray[date.getMonth()];
  const day = dayArray[Math.floor(date.getDate() / 10)] + (date.getDate() % 10 === 0 ? '十' : dayArray[date.getDate() % 10]);
  return ` ${year}年${month}${day}日`
}