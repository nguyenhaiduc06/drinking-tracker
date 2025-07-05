import * as Font from 'expo-font';

export const fonts = {
  // Quicksand Font Family
  quicksand: {
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    semibold: 'Quicksand-SemiBold',
    bold: 'Quicksand-Bold',
  },
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

// Font loading function
export const loadFonts = async (): Promise<void> => {
  await Font.loadAsync({
    [fonts.quicksand.regular]: require('../assets/fonts/Quicksand-Regular.otf'),
    [fonts.quicksand.medium]: require('../assets/fonts/Quicksand-Medium.otf'),
    [fonts.quicksand.semibold]: require('../assets/fonts/Quicksand-SemiBold.otf'),
    [fonts.quicksand.bold]: require('../assets/fonts/Quicksand-Bold.otf'),
  });
};

// Font style helpers
export const fontStyles = {
  regular: {
    fontFamily: fonts.quicksand.regular,
  },
  medium: {
    fontFamily: fonts.quicksand.medium,
  },
  semibold: {
    fontFamily: fonts.quicksand.semibold,
  },
  bold: {
    fontFamily: fonts.quicksand.bold,
  },
} as const;
