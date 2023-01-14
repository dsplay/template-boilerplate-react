import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.sass';
import './fonts.sass';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
