import React, { useState } from 'react';
import styles from './icons-panel.module.scss';

const icons = [
    'aggregation', 'arrows', 'asc', 'cancel', 'chart',
    'checkbox-checked', 'checkbox-indeterminate',
    'checkbox-unchecked', 'color-picker',
    'columns', 'contracted', 'copy', 'cross',
    'desc', 'expanded', 'eye-slash', 'eye', 'filter', 'first',
    'grip', 'group', 'last', 'left', 'linked',
    'loading', 'maximize', 'menu', 'minimize', 'next',
    'none', 'not-allowed', 'paste', 'pin', 'pivot',
    'previous', 'radio-button-off', 'radio-button-on', 'right',
    'save', 'small-down', 'small-left', 'small-right', 'small-up',
    'tick', 'tree-closed', 'tree-indeterminate', 'tree-open', 'unlinked'
];

const capitalizeName = (name) => `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;

const themes = ['alpine', 'balham', 'material', 'base'];

const onTabClick = (e, setActiveTheme, theme) => {
    e.preventDefault();
    setActiveTheme(theme);
}

const PanelTabs = ({ activeTheme, setActiveTheme }) => (
    <ul className={styles.iconsPanel__container}>
        {themes.map(theme => (
            <li key={`${theme}-tab`}>
                <button className={`${styles.iconsPanel__navLink} ${theme === activeTheme ? styles.iconsPanel__navLink__active: ''}`} data-toggle="tab" role="tab" onClick={(e) => onTabClick(e, setActiveTheme, theme)} aria-controls={theme} aria-selected={theme === activeTheme ? 'true' : 'false'}>{`${capitalizeName(theme)} Icons`}</button>
            </li>
        ))}
    </ul>
)

const IconsList = ({ theme }) => (
    <div className={styles.iconsPanel__iconList}>
        {icons.map(icon => (
            <div className={styles.iconsPanel__iconTile}>
                <img src={ `/theme-icons/${theme}/${icon}.svg` } alt={ icon } title={ icon }></img>
                <p>{ icon }</p>
            </div>
        ))}
    </div>
);

const PanelWrapper = ({ theme }) => (
    <div className={styles.iconsPanel__wrapper}>
        <div className={styles.iconsPanel__body} role="tabpanel" aria-labelledby={`${theme}-tab`}>
            <IconsList theme={theme} />
        </div>
    </div>
)

const BottomBar = ({ theme }) => (
    <div className={styles.iconsPanel__download}><a href={`/theme-icons/${theme}/${theme}-icons.zip`}>Download All</a></div>
);

const IconsPanel = () => {
    const [activeTheme, setActiveTheme] = useState('alpine');

    return (
        <div className="icons-panel">
            <PanelTabs activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
            <PanelWrapper theme={activeTheme} />
            <BottomBar theme={activeTheme} />
        </div>
    )
};


export default IconsPanel;