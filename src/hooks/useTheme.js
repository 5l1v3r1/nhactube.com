import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { themeSelector } from '../store/selectors';
import { toggleTheme } from '../store/actions/theme';
import { themesMode } from '../store/constants';
import dark from '../variables/theme-dark';
import light from '../variables/theme-light';

const mapTheme = Object.freeze({
  [themesMode.DARK]: dark,
  [themesMode.light]: light,
});

export default () => {
  const name = useSelector(themeSelector);
  const dispatch = useDispatch();
  const actions = useMemo(() => bindActionCreators({ toggleTheme }, dispatch), [dispatch]);

  const theme = useMemo(() =>  mapTheme[name] || light, [name]);

  return useMemo(() => ({
    name,
    theme,
    actions,
    isDark: name === themesMode.DARK,
  }), [name, actions, theme]);
};
