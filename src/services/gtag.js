export const GOOGLE_ANALYTICS_TRACKING_ID = 'G-9D8CDBSXRF';
export const GA_TRACKING_ID = 'AW-11140098875';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const track = (action, {sendTo, value, currency = 'BRL'}) => {
    window.gtag('event', action, {
        'send_to': sendTo,
        'value': value,
        'currency': currency
    });
}