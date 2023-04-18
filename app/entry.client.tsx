import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client'
import { ClientProvider } from '@mantine/remix';
import reportWebVitals from './analytics/reportWebVitals'
import { sendToVercelAnalytics } from './analytics/vitals'

hydrateRoot(
 document,
  <ClientProvider>
    <RemixBrowser />
  </ClientProvider>

);
reportWebVitals(sendToVercelAnalytics)
