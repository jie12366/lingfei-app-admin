import defaultSettings from '@/settings'

const title = defaultSettings.title || '凌飞羽协'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
