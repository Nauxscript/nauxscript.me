
const monthArray = ['壹', '貳', '叄', '肆', '伍', '陸', '柒', '捌', '玖', '拾', '拾壹', '拾貳']
const yearArray = ['零', '壹', '貳', '叄', '肆', '伍', '陸', '柒', '捌', '玖']
const dayArray = ['', '壹', '貳', '叄', '肆', '伍', '陸', '柒', '捌', '玖', '拾']

export function dateTransform(dateStr: string): string 
export function dateTransform(dateStr: string, obj: true): {
  year: string
  month: string
  day: string
} 
export function dateTransform(dateStr: string, obj = false) {
  const date = new Date(dateStr)
  let year = '';
  let yearStr = date.getFullYear().toString();
  for (let i = 2; i < yearStr.length; i++) {
    year += yearArray[parseInt(yearStr.charAt(i))];
  }
  const month = monthArray[date.getMonth()];
  const day = (date.getDate() > 19 ? dayArray[Math.floor(date.getDate() / 10)] : '') + (date.getDate() > 10 ? '拾' : '') + dayArray[date.getDate() % 10];
  if (obj) {
    return {
      year: `${year}年`,
      month: `${month}月`,
      day: `${day}日`
    }
  }
  return ` ${year}年${month}月${day}日`
}
