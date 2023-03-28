// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import logo from "./logo.png";

export default create({
  base: 'light',
  brandImage: logo,
  brandTarget: '_self',
});