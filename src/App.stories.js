import React from 'react';
import App from './App';

export default {
    component: App,
    title: 'App'
};

export const myApp = () => <App name="Storybook" />

myApp.story = {
    name: 'Default'
};