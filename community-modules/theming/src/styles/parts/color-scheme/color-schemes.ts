import { createPart } from '../../../Part';

// prettier-ignore
export const colorSchemeLight =
    /*#__PURE__*/
    createPart('colorScheme', 'light');

const lightWarmParams = {
    foregroundColor: '#000000de',
    borderColor: '#60300026',
    chromeBackgroundColor: '#60300005',
} as const;

// prettier-ignore
export const colorSchemeLightWarm =
    /*#__PURE__*/
    createPart('colorScheme', 'lightWarm')
        .withParams(lightWarmParams);

const lightColdParams = {
    foregroundColor: '#000',
    backgroundColor: '#fff',
    chromeBackgroundColor: '#f3f8f8',
} as const;

// prettier-ignore
export const colorSchemeLightCold =
    /*#__PURE__*/
    createPart('colorScheme', 'lightCold')
        .withParams(lightColdParams);

const darkParams = {
    backgroundColor: 'hsl(217, 0%, 17%)',
    foregroundColor: '#FFF',
    chromeBackgroundColor: {
        ref: 'foregroundColor',
        mix: 0.05,
        onto: 'backgroundColor',
    },
    browserColorScheme: 'dark',
} as const;

// prettier-ignore
export const colorSchemeDark =
    /*#__PURE__*/
    createPart('colorScheme', 'dark')
        .withParams(darkParams);

const darkWarmParams = {
    backgroundColor: 'hsl(29, 10%, 17%)',
    foregroundColor: '#FFF',
    chromeBackgroundColor: {
        ref: 'foregroundColor',
        mix: 0.05,
        onto: 'backgroundColor',
    },
    browserColorScheme: 'dark',
} as const;

// prettier-ignore
export const colorSchemeDarkWarm =
    /*#__PURE__*/
    createPart('colorScheme', 'darkWarm')
        .withParams(darkWarmParams);

const darkBlueParams = {
    backgroundColor: '#1f2836',
    foregroundColor: '#FFF',
    chromeBackgroundColor: {
        ref: 'foregroundColor',
        mix: 0.07,
        onto: 'backgroundColor',
    },
    browserColorScheme: 'dark',
} as const;

// prettier-ignore
export const colorSchemeDarkBlue =
    /*#__PURE__*/
    createPart('colorScheme', 'darkBlue')
        .withParams(darkBlueParams);

// prettier-ignore
export const colorSchemeVariable =
    /*#__PURE__*/
    createPart('colorScheme', 'auto')
        .withParams(lightWarmParams, 'light-warm')
        .withParams(lightColdParams, 'light-cold')
        .withParams(darkParams, 'dark')
        .withParams(darkWarmParams, 'dark-warm')
        .withParams(darkBlueParams, 'dark-blue');
