import { RemixBrowser } from '@remix-run/react';
import { hydrate } from 'react-dom';
import { ClientProvider } from '@mantine/remix';
import reportWebVitals from './analytics/reportWebVitals'
import { sendToVercelAnalytics } from './analytics/vitals'

hydrate(
  <ClientProvider>
    <RemixBrowser />
  </ClientProvider>,
  document
);
reportWebVitals(sendToVercelAnalytics)
