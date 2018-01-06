import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css'
import Hera from './Hera/Hera';


render((
    <Hera/>
), document.getElementById('root'));

registerServiceWorker();

// --inspect-brk 
