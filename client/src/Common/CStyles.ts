import { getTheme,mergeStyleSets } from "@fluentui/react";

const borderRadius = 4;
const height = 30;
const heightSm = 26;

const theme = getTheme();

// BkDataTable Stylesheet
export const DataTableStye = {
  iconFontSize: 14,
};


export const CColors = {
  orignalBg:'#19171D',
  black: '#333333',
  white: '#FFFFFF',
  lighterGray: '#F8F8F8',
  lightGray: '#E5E6Eb',
  gray: '#CBCBCB',
  darkGray: '#ABB2BE',
  darkerGray: '#9EA6B3',
  darkestGray: '#787878',
  backgroundLight: '#FAFAFC',
  CadetGray: '#9FA7B4',
  background: '#F7F8FA',
  pickerItem: '#E2EBFF',
  pickerCross: '#CFDEFF',
  text: '#0B308E',
  midText: '#235CD7',
  lightText: '#3988FF',
  lighterText: '#dbd8ff',
  red: '#FF4752',
  errorRed: '#a4262c',
  // red: '#EF7178 ',
  lightRed: '#FFF1F3',
  penGray: '#616161',
  disableGray: '#BEBEBE',
  disableBackground: '#F3F3F3',
  disableBorder: '#DBDBDB',
  green: '#0EB13F',
  //green: '#2CA01C',
  lightGreen: '#E0F8DD',
  selectBlue: '#106EBE',
  backgroundBlue: '#EFF5FF',
  // themePrimary: `${theme.palette.themePrimary}99`,
  // Bootstrap
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  primaryHover: '#0069d9',
  secondaryHover: '#5a6268',
  successHover: '#218838',
  dangerHover: '#c82333',
  warningHover: '#e0a800',
  infoHover: '#138496',
  lightHover: '#e2e6ea',
  darkHover: '#23272b',
  lightBlack: '#212529',
};

export const CStyles = mergeStyleSets({
  // Selects
  select: {
    selectors: {
      '.ms-Label': {
        fontSize: 14,
        color: CColors.darkestGray,
        fontWeight: 400,
        padding: '0 0 0 1px',
      },
      '.rs-control': {
        height: heightSm,
        borderRadius,
        border: 'none',
        background: CColors.lighterGray,
      },
      '.rs-control:hover': {
        borderRadius,
        background: CColors.disableBackground,
        cursor: 'text',
      },
      '.rs-indicator-separator': {
        display: 'none',
      },
      '.rs-indicators-container': {
        width: 'fit-content',
        padding: '0 2px 0 0',
      },
      '.dropdown-indicator': {
        width: 20,
        padding: 0,
      },
      '.dropdown-indicator > svg': {
        height: 20,
        width: 20,
        color: CColors.darkGray,
        cursor: 'pointer',
      },
      '.dropdown-indicator > svg:hover': {
        color: CColors.darkGray,
      },
      '.rs-single-value': { textOverflow: 'clip' },
      '.control--is-disabled': { border: `1px solid ${CColors.disableBorder}`, backgroundColor: CColors.disableBackground, height: heightSm - 2 },
      '.single-value--is-disabled': { color: CColors.disableGray },
      '.control--is-disabled svg': { color: CColors.disableGray },
    },
  },
  selectRaw: {
    selectors: {
      '.rs-control': {
        height: heightSm,
        border: 'none',
        background: 'inherit',
      },
      '.rs-control:hover': {
        border: 'none',
      },
      '.rs-indicator-separator': {
        display: 'none',
      },
      '.rs-indicators-container': {
        width: 'fit-content',
        padding: '0 2px 0 0',
      },
      '.dropdown-indicator': {
        display: 'none',
      },
      '.rs-loading-indicator': {
        display: 'none',
      },
      '.dropdown-indicator > svg': {
        height: 15,
        width: 15,
        color: CColors.darkGray,
        cursor: 'pointer',
      },
      '.dropdown-indicator > svg:hover': {
        color: CColors.darkGray,
      },
      '.control--is-disabled': { backgroundColor: CColors.disableBackground },
      '.single-value--is-disabled': { color: CColors.disableGray },
      '.control--is-disabled svg': { color: CColors.disableGray },
    },
  },

  // Inputs
  input: {
    selectors: {
      '.ms-Label': {
        color: CColors.darkestGray,
        fontWeight: 400,
        padding: '0 0 0 1px',
      },
      '.ms-TextField-fieldGroup': {
        fontSize: 14,
        height: heightSm,
        border: 'none',
        borderRadius,
      },
      '.ms-TextField-fieldGroup::after': {
        fontSize: 14,
        border: 'none',
        borderRadius,
      },
      '.ms-TextField-field': {
        fontSize: 14,
        border: `1px solid ${CColors.lighterGray}`,
        borderRadius,
        background: CColors.lighterGray,
      },
      '.ms-TextField-field:focus': {
        fontSize: 14,
        border: `1px solid ${theme.palette.themePrimary}99`,
        borderRadius,
        background: 'white',
        boxShadow: `0px 0px 3px 0px ${theme.palette.themePrimary}50`,
      },
      '.ms-TextField-field:not([disabled]):not(:focus):hover': {
        border: `1px solid ${CColors.disableBackground}`,
        background: CColors.disableBackground,
      },
      '.ms-TextField-field::placeholder': {
        fontStyle: 'normal',
      },
      'input[disabled]': {
        border: `1px solid ${CColors.disableBorder}`,
        background: CColors.disableBackground,
        color: CColors.disableGray,
      },
    },
  },
  inputRaw: {
    padding: 0,
    selectors: {
      '.ms-Label': {
        display: 'none',
      },
      '.ms-TextField-fieldGroup': {
        height: heightSm - 2,
        border: 'none',
        borderRadius,
        background: 'inherit',
      },
      '.ms-TextField-fieldGroup::after': {
        border: 'none',
      },
      '.ms-TextField-field': {
        padding: 0,
        fontSize: 14,
        border: `none`,
        borderRadius,
        background: 'inherit',
      },
      '.ms-TextField-field:focus': {
        border: `none !important`,
        background: 'inherit',
      },
      '.ms-TextField-field:not([disabled]):not(:focus):hover': {
        background: 'inherit',
      },
      '.ms-TextField-field::placeholder': {
        fontStyle: 'normal',
      },
      'input[disabled]': {
        background: 'inherit',
        color: CColors.disableGray,
      },
    },
  },
  multiInput: {
    selectors: {
      '.ms-TextField-fieldGroup': {
        minHeight: 'auto',
        border: 'none',
        borderRadius,
      },
      '.ms-TextField-fieldGroup > textarea': {
        height: heightSm,
        padding: '2px 8px',
        lineHeight: 20,
        border: `none`,
        background: CColors.lighterGray,
        borderRadius,
      },
      '.ms-TextField-fieldGroup > textarea:focus': {
        height: heightSm,
        padding: '2px 7px',
        lineHeight: 18,
        border: `1px solid ${theme.palette.themePrimary}99`,
        background: 'white',
        boxShadow: `0px 0px 3px 0px ${theme.palette.themePrimary}50`,
        borderRadius,
      },
      '.ms-TextField-fieldGroup > textarea:not([disabled]):not(:focus):hover': {
        border: `none`,
        background: CColors.disableBackground,
      },
      '.ms-TextField-fieldGroup > textarea::placeholder': {
        fontStyle: 'normal',
      },
      '.ms-TextField-fieldGroup::after': {
        border: 'none',
        borderRadius,
      },
      'textarea[disabled]': {
        border: `1px solid ${CColors.disableBorder}`,
        background: CColors.disableBackground,
        color: CColors.disableGray,
      },
    },
  },

  commandBar: {
    selectors: {
      '.ms-CommandBar': {
        borderBottom: 'none !important',
        padding: '0px 4px',
        height: heightSm,
      },
      '.ms-CommandBar-primaryCommand': {
        gap: 8,
      },
      '.ms-OverflowSet-item > div > span > span': {
        display: 'none',
      },
      '.ms-CommandBar-primaryCommand div:nth-child(1)': {
        height: heightSm,
        selectors: {
          '.ms-Button.ms-Button--commandBar': {
            padding: 10,
            borderRadius,
            backgroundColor: `${theme.palette.themePrimary}`,
            color: `${theme.palette.white}`,
            selectors: {
              '.ms-Icon': {
                margin: 3,
                fontSize: 12,
                color: `${theme.palette.white}`,
              },
            },
          },
          'button:nth-child(2)': {
            width: 'fit-content',
            backgroundColor: CColors.white,
            padding: 8,
            selectors: {
              '.ms-Icon': {
                margin: 0,
                fontSize: 9,
                fontWeight: 700,
                color: CColors.darkGray,
              },
            },
          },
        },
      },
      '.ms-CommandBar-primaryCommand div:nth-child(n+2)': {
        height: heightSm,
        selectors: {
          '.ms-Button.ms-Button--commandBar': {
            padding: 10,
            borderRadius,
            backgroundColor: `${CColors.backgroundBlue}`,
            color: `${theme.palette.blue}`,
            selectors: {
              '.ms-Icon': {
                margin: 3,
                fontSize: 12,
                color: `${theme.palette.blue}`,
              },
            },
          },
          'button:nth-child(2)': {
            width: 'fit-content',
            backgroundColor: CColors.backgroundBlue,
            padding: 8,
            paddingLeft: 1,
            selectors: {
              '.ms-Icon': {
                margin: 0,
                fontSize: 9,
                fontWeight: 700,
                color: theme.palette.blue,
              },
            },
          },
        },
      },
      '.ms-SearchBox': {
        border: 'none',
        flexDirection: 'row-reverse',
        background: CColors.lighterGray,
        borderRadius,
        height: heightSm,
        width: 200,
        selectors: {
          '.ms-SearchBox-field': {
            paddingLeft: 5,
          },
          '.ms-SearchBox-clearButton': { display: 'none' },
          '.ms-SearchBox-icon': { color: CColors.gray },
          '.ms-SearchBox-field::placeholder': {
            fontStyle: 'normal',
          },
          '::after': {
            border: `1px solid ${theme.palette.themePrimary}99`,
            borderRadius,
            boxShadow: `0px 0px 3px 0px ${theme.palette.themePrimary}50`,
          },
        },
      },
      '.filter-pill': {
        height: heightSm,
        margin: 0,
        borderRadius,
      },
      '.pill-content': {
        display: 'flex',
        alignContent: 'center',
      },
    },
  },

  // Buttons
  button: {
    border: `1px solid ${CColors.lightGray}`,
    backgroundColor: CColors.background,
    color: 'black',
    height: heightSm,
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid ${CColors.lightGray}`,
      backgroundColor: CColors.disableBackground,
      color: 'black',
    },
    ':active': {
      border: `1px solid ${CColors.lightGray}`,
      backgroundColor: CColors.lightGray,
      color: CColors.black,
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13, color: 'black' },
    },
  },
  buttonDefault: {
    border: `1px solid ${CColors.gray}`,
    backgroundColor: CColors.white,
    color: theme.palette.themeDarkAlt,
    height: heightSm,
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid ${CColors.lightGray}`,
      backgroundColor: CColors.lighterGray,
      color: theme.palette.themeDarkAlt,
    },
    ':active': {
      border: `1px solid ${CColors.lightGray}`,
      backgroundColor: CColors.lightGray,
      color: theme.palette.themeDarker,
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 500 },
      '.ms-Icon': { fontSize: 13, color: theme.palette.themeDarkAlt, fontWeight: 500 },
    },
  },
  buttonDarker: {
    border: 'none',
    backgroundColor: CColors.darkerGray,
    height: heightSm,
    padding: 4,
    borderRadius,
    color: 'white',
    ':hover': {
      backgroundColor: CColors.darkerGray,
      color: 'white',
      border: 'none',
    },
    ':active': {
      backgroundColor: CColors.darkerGray,
      color: 'white',
      border: 'none',
    },
    '::after': { color: 'white', borderRadius },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13, color: 'white' },
    },
  },
  buttonPrimary: {
    height: heightSm,
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid ${theme.palette.themeDarkAlt}`,
      backgroundColor: theme.palette.themeDarkAlt,
      color: 'white',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      border: `1px solid ${theme.palette.themePrimary}90`,
      backgroundColor: `${theme.palette.themePrimary}90`,
      color: CColors.white,
      '.ms-Icon': { color: CColors.white },
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonSecondary: {
    height: heightSm,
    border: `1px solid #6c757d`,
    backgroundColor: '#6c757d',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #5a6268`,
      backgroundColor: '#5a6268',
      color: 'white',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonSuccess: {
    height: heightSm,
    border: `1px solid #28a745`,
    backgroundColor: '#28a745',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #218838`,
      backgroundColor: '#218838',
      color: 'white',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonDanger: {
    height: heightSm,
    border: `1px solid #dc3545`,
    backgroundColor: '#dc3545',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #c82333`,
      backgroundColor: '#c82333',
      color: 'white',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonWarning: {
    height: heightSm,
    border: `1px solid #ffc107`,
    backgroundColor: '#ffc107',
    color: '#212529',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #e0a800`,
      backgroundColor: '#e0a800',
      color: '#212529',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonInfo: {
    height: heightSm,
    border: `1px solid #17a2b8`,
    backgroundColor: '#17a2b8',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #138496`,
      backgroundColor: '#138496',
      color: 'white',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonLight: {
    height: heightSm,
    border: `1px solid #f8f9fa`,
    backgroundColor: '#f8f9fa',
    color: '#212529',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #e2e6ea`,
      backgroundColor: '#e2e6ea',
      color: '#212529',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonDark: {
    height: heightSm,
    border: `1px solid #343a40`,
    backgroundColor: '#343a40',
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid #23272b`,
      backgroundColor: '#23272b',
      color: 'white',
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13 },
    },
  },
  buttonAction: {
    border: `1px solid ${CColors.backgroundBlue}`,
    backgroundColor: CColors.backgroundBlue,
    color: CColors.lightText,
    height: heightSm,
    padding: 4,
    borderRadius,
    ':hover': {
      border: `1px solid ${CColors.backgroundBlue}`,
      backgroundColor: CColors.backgroundBlue,
      color: CColors.lightText,
    },
    ':active': {
      backgroundColor: CColors.pickerItem,
      color: CColors.lightText,
      border: `1px solid ${CColors.pickerItem}`,
    },
    '::after': {
      borderRadius,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-Button-textContainer': { flexGrow: 0 },
      '.ms-Button-label': { fontWeight: 400 },
      '.ms-Icon': { fontSize: 13, color: 'black' },
    },
  },
  commandButton: {
    backgroundColor: CColors.lighterGray,
    padding: 5,
    borderRadius: 4,
    height: heightSm,
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
      '.ms-Icon': { color: CColors.disableGray },
      'svg > path': { stroke: CColors.disableGray },
    },
    ':hover': {
      backgroundColor: CColors.disableBackground,
      selectors: {
        '.ms-Button-menuIcon': {
          color: CColors.darkGray,
        },
        '.ms-Button-menuIcon.is-expanded': {
          backgroundColor: CColors.disableBackground,
          color: CColors.darkGray,
        },
      },
    },
    selectors: {
      '.ms-Button-label': { color: 'black', fontWeight: 400 },
      '.ms-Button-flexContainer': { alignItems: 'flex-start', justifyContent: 'space-between' },
      '.ms-Icon': { width: 13, height: 13, color: CColors.darkestGray, fontSize: 13 },
      ':hover .ms-Icon': { color: CColors.darkestGray },
      ':hover .ms-Button-menuIcon': {
        color: CColors.darkGray,
      },
      '.ms-Button-menuIcon': {
        fontSize: 12,
        color: CColors.darkGray,
        margin: '0 2px',
      },
      '.ms-Button-menuIcon.is-expanded': {
        fontSize: 12,
        color: CColors.darkGray,
      },
      '.ms-layer': { display: 'none' },
    },
  },

  commandButtonBorder: {
    backgroundColor: CColors.white,
    padding: 5,
    borderRadius: 4,
    height: heightSm,
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      color: CColors.disableGray,
      border: `1px solid ${CColors.disableBorder}`,
      '.ms-Icon': { color: CColors.disableGray },
      'svg > path': { stroke: CColors.disableGray },
    },
    ':hover': {
      backgroundColor: CColors.disableBackground,
      selectors: {
        '.ms-Button-menuIcon': {
          color: CColors.darkGray,
        },
        '.ms-Button-menuIcon.is-expanded': {
          backgroundColor: CColors.disableBackground,
          color: CColors.darkGray,
        },
      },
    },
    selectors: {
      '.ms-Button-label': { color: 'black', fontWeight: 400 },
      '.ms-Button-flexContainer': { alignItems: 'flex-start', justifyContent: 'space-between' },
      '.ms-Icon': { width: 13, height: 13, color: CColors.darkestGray, fontSize: 13 },
      ':hover .ms-Icon': { color: CColors.darkestGray },
      ':hover .ms-Button-menuIcon': {
        color: CColors.darkGray,
      },
      '.ms-Button-menuIcon': {
        fontSize: 12,
        color: CColors.darkGray,
        margin: '0 2px',
      },
      '.ms-Button-menuIcon.is-expanded': {
        fontSize: 12,
        color: CColors.darkGray,
      },
      '.ms-layer': { display: 'none' },
    },
  },

  iconButton: {
    height: heightSm,
    width: heightSm,
    backgroundColor: CColors.lighterGray,
    borderRadius: 4,
    selectors: {
      '.ms-Icon': { color: CColors.darkGray },
      // '.ms-Icon > svg': { width: 16, height: 16 },
      // '.ms-Icon > svg > path': { stroke: `${theme.palette.themePrimary}`, strokeWidth: '1.5px' },
    },
    ':hover': {
      backgroundColor: CColors.disableBackground,
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      border: `1px solid ${CColors.disableBorder}`,
      selectors: {
        '.ms-Icon': { color: CColors.disableGray },
        '.ms-Icon > svg > path': { stroke: CColors.disableGray },
      },
    },
  },

  iconButtonBlue: {
    height: heightSm,
    width: heightSm,
    backgroundColor: CColors.white,
    borderRadius: 4,
    color: CColors.white,
    ':focus': {
      backgroundColor: CColors.lighterGray,
      '.ms-Icon': { color: theme.palette.blue },
      '.ms-Icon > svg': { width: 14, height: 14 },
      '.ms-Icon > svg > path': { stroke: theme.palette.blue },
    },
    '.ms-Icon': { color: CColors.gray },
    '.ms-Icon > svg': { width: 14, height: 14 },
    '.ms-Icon > svg > path': { stroke: CColors.gray },
    ':hover': {
      backgroundColor: CColors.lighterGray,
      '.ms-Icon': { color: theme.palette.blue },
      '.ms-Icon > svg': { width: 14, height: 14 },
      '.ms-Icon > svg > path': { stroke: theme.palette.blue },
    },
    ':disabled': {
      backgroundColor: CColors.disableBackground,
      border: `1px solid ${CColors.disableBorder}`,
      selectors: {
        '.ms-Icon': { color: CColors.disableGray },
        '.ms-Icon > svg > path': { stroke: CColors.disableGray },
      },
    },
  },

  // Labels and texts
  badgePrimary: {
    color: 'white',
    backgroundColor: CColors.primary,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeSecondary: {
    color: 'white',
    backgroundColor: CColors.secondary,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeSuccess: {
    color: 'white',
    backgroundColor: CColors.success,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeDanger: {
    color: 'white',
    backgroundColor: CColors.danger,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeWarning: {
    color: '#212529',
    backgroundColor: CColors.warning,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeInfo: {
    backgroundColor: `${CColors.info}15`,
    color: CColors.infoHover,
    display: 'inline-block',
    padding: '3px 10px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeLight: {
    color: '#212529',
    backgroundColor: CColors.light,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  badgeDark: {
    color: 'white',
    backgroundColor: CColors.dark,
    display: 'inline-block',
    padding: '.25em .4em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
  },
  error: {
    color: theme.palette.redDark,
    fontSize: 12,
  },
  label: {
    color: CColors.text,
    fontWeight: 500,
  },
  labelLarge: {
    fontSize: 16,
    color: CColors.text,
  },
  labelXXL: {
    fontSize: 35,
    color: CColors.text,
    fontWeight: 400,
  },
  labelDark: {
    color: CColors.darkestGray,
    fontWeight: 400,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  fontIcon: {
    padding: 0,
    margin: 0,
    height: 13,
    width: 13,
    color: CColors.darkGray,
    ':hover': {
      color: CColors.darkGray,
      background: 'inherit',
    },
    selectors: {
      '.ms-Icon': {
        fontSize: 13,
        height: 13,
        width: 13,
        padding: 0,
        margin: 0,
      },
    },
  },
  // Date pickers
  datePicker: {
    height: heightSm,
    background: CColors.lighterGray,
    borderRadius,
    ':hover': {
      background: CColors.disableBackground,
      '.ms-TextField-field': { backgroundColor: CColors.disableBackground },
      '.ms-TextField-fieldGroup': { backgroundColor: CColors.disableBackground },
    },
    ':has(.ms-TextField-field[disabled])': {
      // margin: '4px 0 0',
      backgroundColor: CColors.disableBackground,
      border: `1px solid ${CColors.disableBorder}`,
    },
    selectors: {
      '.ms-TextField-fieldGroup': {
        width: 115,
        height: heightSm,
        border: `none`,
        background: CColors.lighterGray,
        borderRadius,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        paddingLeft: 5,
      },
      '.ms-TextField-fieldGroup:has(.ms-TextField-field[disabled])': {
        height: heightSm - 2,
        backgroundColor: CColors.disableBackground,
      },
      '.ms-TextField.is-disabled': { margin: 0, height: heightSm - 2 },
      '.ms-TextField-fieldGroup::after': { border: `none`, borderRadius },
      '.ms-TextField-field': { width: '100%', height: heightSm, padding: 0, backgroundColor: CColors.lighterGray, borderRadius },
      '.ms-TextField-field[disabled]': { height: heightSm - 2, backgroundColor: CColors.disableBackground, color: CColors.disableGray },
      'i.msDatePickerDisabled': { height: heightSm, color: CColors.darkGray, padding: '5px 3px 3px 5px', position: 'relative' },
      'i:not(.msDatePickerDisabled)': { height: heightSm - 2, color: CColors.disableGray, backgroundColor: CColors.disableBackground, padding: '4px 3px 2px 4px', position: 'relative' },
    },
    span: { display: 'none' },
  },
  datePickerRaw: {
    height: 16,
    selectors: {
      '.ms-TextField-wrapper': { width: 97 },
      '.ms-TextField-fieldGroup': {
        width: '100%',
        height: 16,
        border: `none`,
        background: 'inherit',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'center',
      },
      '.ms-TextField-field': { width: 72, height: 16, padding: 0, background: 'inherit' },
      '.ms-TextField-field[disabled]': { width: 72, backgroundColor: 'inherit', color: 'inherit' },
      'i.msDatePickerDisabled': { width: 16, height: 16, color: CColors.darkGray, padding: '0 0 0 5px', position: 'relative' },
      'i:not(.msDatePickerDisabled)': { width: 16, height: 16, padding: '0 0 0 5px', position: 'relative' },
    },
    span: { display: 'none' },
  },

  // Tables
  selectionTable: {
    // tableLayout: 'fixed',
    borderSpacing: 0,
    width: '100%',
    selectors: {
      'tbody > tr > td': { padding: '5px 10px', border: `1px solid ${CColors.lightGray}`, borderStyle: 'none solid solid solid' },
      'tbody > tr:first-child td': { borderTopStyle: 'solid' },
      'tbody > tr:first-child > td:first-child': { borderTopLeftRadius: 7 },
      'tbody > tr:first-child > td:last-child': { borderTopRightRadius: 7 },
      'tbody > tr:last-child > td:first-child': { borderBottomLeftRadius: 7 },
      'tbody > tr:last-child > td:last-child': { borderBottomRightRadius: 7 },
    },
  },
  table: {
    // tableLayout: 'fixed',
    borderCollapse: 'collapse',
    width: '100%',
    selectors: {
      thead: {
        background: CColors.background,
        color: CColors.text,
        fontWeight: 400,
        selectors: {
          'th:first-child': { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
          'th:last-child': { borderTopRightRadius: 7, borderBottomRightRadius: 7 },
          th: { fontWeight: 600, padding: 10, textAlign: 'left' },
        },
      },
      'tbody > tr:first-child > td': { paddingTop: '13px !important' },
    },
  },
  tableSm: {
    borderCollapse: 'collapse',
    width: '100%',
    selectors: {
      thead: {
        background: CColors.background,
        color: CColors.text,
        fontWeight: 400,
        selectors: {
          'th:first-child': { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
          'th:last-child': { borderTopRightRadius: 7, borderBottomRightRadius: 7 },
          th: { fontSize: 13, fontWeight: 600, padding: '6px 10px', textAlign: 'left' },
        },
      },
      'tbody > tr:first-child > td': { paddingTop: '5px !important' },
    },
  },
  tableSeparated: {
    borderCollapse: 'collapse',
    width: '100%',
    selectors: {
      thead: {
        background: CColors.background,
        color: CColors.text,
        fontWeight: 400,
        selectors: {
          'th:first-child': { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
          'th:last-child': { borderTopRightRadius: 7, borderBottomRightRadius: 7 },
          th: { fontWeight: 600, padding: 10, textAlign: 'left' },
        },
      },
      'tbody > tr:not(:last-child) > td': { borderBottom: `1px solid ${CColors.lightGray}` },
      'tbody > tr > td': { padding: 10 },
    },
  },
  tableSeparatedSm: {
    borderCollapse: 'collapse',
    width: '100%',
    selectors: {
      thead: {
        background: CColors.background,
        color: CColors.text,
        fontWeight: 400,
        selectors: {
          'th:first-child': { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
          'th:last-child': { borderTopRightRadius: 7, borderBottomRightRadius: 7 },
          th: { fontWeight: 600, padding: '6px 10px', textAlign: 'left' },
        },
      },
      'tbody > tr:not(:last-child) > td': { borderBottom: `1px solid ${CColors.lightGray}` },
      'tbody > tr > td': { padding: 10 },
    },
  },
  tableSeparatedXs: {
    borderCollapse: 'collapse',
    width: '100%',
    selectors: {
      thead: {
        background: CColors.background,
        color: CColors.text,
        fontWeight: 400,
        selectors: {
          'th:first-child': { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
          'th:last-child': { borderTopRightRadius: 7, borderBottomRightRadius: 7 },
          th: { fontWeight: 600, padding: '4px 6px', textAlign: 'left' },
        },
      },
      'tbody > tr:not(:last-child) > td': { borderBottom: `1px solid ${CColors.lightGray}` },
      'tbody > tr > td': { padding: '4px 10px' },
    },
  },
  bkDetailList: {
    width: '100%',
    overflowX: 'auto',
    padding: 1,
    '.th-focus:focus-visible': { outline: `1px solid ${theme.palette.themePrimary}`, borderRadius: 7 },
    '.header': {
      height: 34,
      display: 'flex',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      background: CColors.background,
      color: CColors.text,
      fontWeight: 500,
      '.th': { display: 'flex', alignItems: 'center', fontWeight: 600, padding: '0 10px', borderRadius: 7 },
      '.th:hover': { backgroundColor: CColors.backgroundBlue },
    },
    '.body': {
      border: `1px solid ${CColors.lightGray}`,
    },
    '.tr': { display: 'flex', height: 40, alignItems: 'center' },
    '.tr-focus': { display: 'flex', height: 40, flexDirection: 'column', justifyContent: 'center' },
    '.tr-focus:focus-visible': { outline: `1px solid ${theme.palette.themePrimary}`, '.tr': { borderBottom: `1px solid ${CColors.white} !important` } },
    '.tr:hover': { backgroundColor: CColors.lighterGray },
    '.tr-active': { display: 'flex', height: 40, alignItems: 'center', backgroundColor: '#E7EEFB', borderBottom: `1px solid ${CColors.lightGray}` },
    '.ms-FocusZone:not(:last-child) > .tr-focus > .tr': {
      borderBottom: `1px solid ${CColors.lightGray}`,
    },
    '.td': { padding: '4px 10px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
    '.td-focus:focus-visible': { outline: `1px solid ${theme.palette.themePrimary}` },
    '.footer': { backgroundColor: CColors.backgroundBlue, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 },
  },

  // Checks
  check: {
    width: 'fit-content',
    input: {
      margin: 0,
    },
    '.ms-Checkbox-checkbox': {
      height: 16,
      width: 16,
      border: `1px solid ${CColors.gray}`,
      borderRadius: 4,
      background: CColors.white,
      margin: 0,
    },
    '.ms-Checkbox-checkmark': {
      color: theme.palette.themePrimary,
      fontWeight: 'bold',
      fontSize: 12,
    },
    '.ms-Checkbox-label': {
      alignItems: 'center',
    },
    ':hover .ms-Checkbox-checkbox': {
      borderRadius: 4,
      background: CColors.white,
    },
    ':hover .ms-Checkbox-checkmark': {
      color: theme.palette.themePrimary,
    },
    ':focus-within .ms-Checkbox-checkbox': {
      border: `1px solid ${theme.palette.themePrimary}`,
      borderRadius: 4,
    },
    '.ms-Checkbox-checkbox::after': {
      top: '2px !important',
      left: '2px !important',
      borderWidth: '5px',
      width: '9px !important',
      height: '9px !important',
    },
  },
  toggle: {
    '.ms-Toggle-innerContainer': {
      '.ms-Toggle-background[aria-checked=true]': {
        span: {
          width: 16,
          height: 16,
        },
      },
      '.ms-Toggle-background[aria-checked=false]': {
        backgroundColor: CColors.lightGray,
        border: 'none',
        span: {
          width: 16,
          height: 16,
          backgroundColor: CColors.white,
        },
      },
      '.ms-Toggle-stateText': {
        color: `${CColors.darkestGray}`,
      },
    },
  },
  choiceGroup: {
    '.ms-Label': { fontWeight: 400, color: CColors.black },
    '.ms-ChoiceField': { margin: 0 },
    '.ms-ChoiceField-field::after': { display: 'none' },
    '.ms-ChoiceField-field::before': { border: `1px solid ${theme.palette.neutralTertiaryAlt}`, width: 16, height: 16, top: 3 },
    '.ms-ChoiceField-field:hover::before': { border: `3px solid ${theme.palette.neutralSecondaryAlt}` },
    '.ms-ChoiceField-field.is-checked::before': { border: `3px solid ${theme.palette.themePrimary}` },
    '.ms-ChoiceFieldLabel': { paddingLeft: 24 },
  },
  choiceGroupH: {
    width: '100%',
    '[role="radiogroup"]': { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 10 },
    '.ms-Label': { fontWeight: 400, color: CColors.black, whiteSpace: 'nowrap', width: 'fit-content' },
    '.ms-ChoiceFieldGroup-flexContainer': { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    '.ms-ChoiceField': { margin: 0 },
    '.ms-ChoiceField-field::after': { display: 'none' },
    '.ms-ChoiceField-field::before': { border: `1px solid ${theme.palette.neutralTertiaryAlt}`, width: 16, height: 16, top: 3 },
    '.ms-ChoiceField-field:hover::before': { border: `3px solid ${theme.palette.neutralSecondaryAlt}` },
    '.ms-ChoiceField-field.is-checked::before': { border: `3px solid ${theme.palette.themePrimary}` },
    '.ms-ChoiceFieldLabel': { paddingLeft: 24 },
  },
  //Panels
  panel: {
    selectors: {
      '.ms-Panel-content': {
        padding: '0 40px',
      },
      '.ms-Overlay': {
        backgroundColor: '#00000054',
      },
      '.ms-Panel-commands': {
        padding: '15px 60px 0px 35px',
      },
      '.ms-Panel-footer': {
        padding: '0 15px',
      },
      '.ms-Panel-navigation': {
        borderBottom: 'none',
      },
      '.ms-Panel-closeButton': {
        display: 'none',
      },
      '.hrMuted-145': {
        display: 'none',
      },
      '.ms-Panel-footerInner': {
        paddingRight: '24px',
      },
      '.ms-Panel-navigation span': {
        fontSize: 20,
        fontWeight: 400,
      },
      '.ms-Button--commandBar': {
        minWidth: '55px !important',
      },
      '.ms-Panel-navigation>button:nth-of-type(1)': {
        backgroundColor: 'white',
        height: heightSm,
        minWidth: 'fit-content',
      },
    },
  },
  // Modals
  modal: {
    selectors: {
      '.modal-header': {
        borderBottom: 'none',
        padding: '0px 10px',
        marginRight: '3%',
      },
      '.modal-title': {
        fontWeight: 500,
        fontSize: 16,
      },
      '.hrMuted-145': {
        display: 'none',
      },
      '.ms-Dialog-main': {
        marginTop: 0,
        padding: 10,
        borderRadius: 12,
        boxShadow: 'rgba(0, 0, 0, 0.22) 0 0 0 0, rgba(0, 0, 0, 0.18) 0px 12px 15px 0px',
        minHeight: 'fit-content',
      },
      '.modal-container': {
        minHeight: 'fit-content',
      },
      '.ms-Button--commandBar': {
        minWidth: '55px !important',
      },
      '.ms-Panel-navigation>button:nth-of-type(1)': {
        backgroundColor: 'white',
      },
      '.modal-close-button': {
        display: 'none',
      },
      '.ms-Button-flexContainer': {
        height: '100%',
      },
      '.ms-Button--primary': {
        marginLeft: '10px !important',
        width: 92,
        padding: 6,
        borderRadius: 4,
        '::after': {
          borderRadius: 4,
        },
        selectors: {
          '.ms-Button-label': { fontWeight: `400 !important` },
          '.ms-Icon': { display: 'none' },
          '.ms-Button-flexContainer': {
            justifyContent: 'center',
          },
        },
      },
      '.ms-Button--action': {
        width: 80,
        border: `1px solid ${CColors.lightGray}`,
        backgroundColor: CColors.background,
        padding: 6,
        borderRadius: 4,
        color: '#333333',
        ':hover': {
          backgroundColor: CColors.disableBackground,
          color: '#333333',
          border: `1px solid ${CColors.lightGray}`,
        },
        ':active': {
          backgroundColor: CColors.lightGray,
          color: '#333333',
          border: `1px solid ${CColors.lightGray}`,
        },
        selectors: {
          '.ms-Button-label': { fontWeight: `400 !important` },
          '.ms-Icon': { display: 'none' },
          '.ms-Button-flexContainer': {
            justifyContent: 'center',
          },
        },
      },
    },
  },
  callout: {
    borderRadius: 12,
    background: 'white',
    border: '1px solid white !important',
    padding: 15,
    selectors: {
      '.ms-Callout-beakCurtain': { borderRadius: 12 },
    },
  },

  pagingList: {
    // Header
    // '.ms-DetailsList-headerWrapper > div > div > div': {
    //   width: 'fit-content',
    // },
    '.ms-DetailsHeader': {
      background: CColors.background,
      borderRadius: 7,
      height,
      borderBottom: 'none',
      width: 'fit-content',
    },
    '.ms-DetailsHeader-cellName': {
      color: CColors.text,
      fontWeight: 600,
    },
    '.ms-DetailsHeader-cell:hover': { backgroundColor: CColors.backgroundBlue, borderTopLeftRadius: 7, borderBottomLeftRadius: 7 },
    '.is-actionable.is-empty': { minWidth: '190px !important' },
    // Rows
    // '.ms-DetailsRow': { minWidth: 'fit-content !important' },
    // '.ms-DetailsRow-fields div:has(.ms-OverflowSet)': { width: 'fit-content !important' },
    '.ms-DetailsRow-fields': {
      borderColor: CColors.lightGray,
      padding: '3px -1px',
    },
    '.ms-DetailsRow': {
      width: '100%',
    },
    '.ms-DetailsRow:hover': {
      backgroundColor: CColors.lighterGray,
    },
    '.ms-DetailsRow.is-selected': {
      backgroundColor: CColors.lighterGray,
    },

    // Action cell styles
    '.ms-OverflowSet': {
      gap: 10,
      paddingLeft: 15,
    },
    '.ms-Button-menuIcon': {
      color: CColors.lightText,
      fontWeight: 600,
    },
    '.ms-DetailsRow-cell:has(.ms-OverflowSet)': {
      width: 'max-content !important',
    },

    //Check boxes
    '.ms-Check-checkHost': { opacity: 1, height: '100%' },
    '.ms-Check.is-checked': {
      border: `1px solid ${theme.palette.blue}`,
      ':hover': {
        '.ms-Check-check': { opacity: 1 },
      },
    },
    '.ms-Check': {
      border: `1px solid ${CColors.gray}`,
      borderRadius,
      backgroundColor: CColors.white,
      ':hover': {
        border: `1px solid ${theme.palette.blue}`,
        cursor: 'pointer',
        '.ms-Check-check': { opacity: 0 },
      },
      selectors: {
        '::before': { display: 'none' },
        '.ms-Check-circle': { display: 'none' },
        '.ms-Check-check': { backgroundColor: 'none', fontSize: 18, height: 0, width: 0, color: theme.palette.blue, top: 7, left: 8.5, fontWeight: 500 },
      },
    },
  },
  ac: {
    selectors: {
      '.ms-DetailsHeader-cellTitle': {
        justifyContent: 'center',
      },
    },
  },
  inputContainer: {
    height: 'fit-content',
    borderRadius,
    backgroundColor: CColors.lighterGray,
    ':hover': {
      backgroundColor: CColors.disableBackground,
    },
    ':has(input:focus)': {
      border: `1px solid ${theme.palette.themePrimary}99 !important`,
      backgroundColor: '#fff !important',
      boxShadow: `0px 0px 3px 0px ${theme.palette.themePrimary}50`,
    },
  },
  pickerItem: {
    borderRadius,
    backgroundColor: CColors.pickerItem,
    color: CColors.black,
    ':hover': { backgroundColor: CColors.pickerItem, color: CColors.black },
  },
  pickerCross: {
    fontSize: 12,
    padding: 3,
    borderRadius,
    cursor: 'pointer',
    backgroundColor: CColors.pickerItem,
    color: CColors.midText,
    ':hover': { backgroundColor: CColors.pickerCross },
  },

  // detail list component
  detailList: {
    marginBottom: -1,
    borderRadius: 4,
    // border: `1px solid ${BkColors.lightGray}`,
    '.ms-FocusZone ms-DetailsRow': {
      width: '100%',
    },
    '.ms-DetailsHeader-cell': {
      backgroundColor: CColors.background,
    },
    '.ms-DetailsList-contentWrapper': {
      // overflowX: 'auto',
    },
    '.ms-DetailsRow-fields > div:first-child': {
      borderLeft: `1px solid ${CColors.lightGray}`,
    },
    '.ms-DetailsRow-fields > div:last-child': {
      borderRight: `1px solid ${CColors.lightGray}`,
    },
    '.ms-DetailsHeader-cellName': {
      width: '100%',
      color: CColors.text,
    },
    '.ms-DetailsHeader': {
      backgroundColor: CColors.background,
    },
    '.ms-DetailsRow-cell': { display: 'block' },
  },
  filterDataTable: {
    marginBottom: -1,
    borderRadius: 4,
    overflowX: 'auto',
    maxHeight: '70vh',
    selectors: {
      '.ms-DetailsHeader-cell': { backgroundColor: CColors.background },
      '.ms-DetailsHeader-cellTitle': { padding: '0px !important' },
      '.ms-DetailsHeader-cellName': { width: '100%', color: CColors.text },
      '.ms-DetailsHeader': { backgroundColor: CColors.background },
      '.ms-DetailsRow': { minWidth: '100% !important' },
      '.ms-DetailsRow-fields': { alignItems: 'center' },
      '.ms-Check-checkHost': { opacity: 1, height: '100%' },
      '.ms-Check.is-checked': {
        border: `1px solid ${theme.palette.blue}`,
        ':hover': {
          '.ms-Check-check': { opacity: 1 },
        },
      },
      '.ms-Check': {
        border: `1px solid ${CColors.gray}`,
        borderRadius,
        backgroundColor: CColors.white,
        ':hover': {
          border: `1px solid ${theme.palette.blue}`,
          cursor: 'pointer',
          '.ms-Check-check': { opacity: 0 },
        },
        selectors: {
          '::before': { display: 'none' },
          '.ms-Check-circle': { display: 'none' },
          '.ms-Check-check': { backgroundColor: 'none', fontSize: 18, height: 0, width: 0, color: theme.palette.blue, top: 7, left: 8.5, fontWeight: 500 },
        },
      },
    },
  },

  separator: {
    marginTop: 8,
    marginBottom: 4,
    padding: 0,
    '::before': {
      backgroundColor: CColors.lightGray,
    },
  },
});
