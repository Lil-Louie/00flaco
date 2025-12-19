
const guessArea = {
    widthOfLetterBox: 55,
    heightOfLetterBox: 55,
    numRows: 6,
    numColumns: 5,
    hGap: 10,
    vGap: 10
};

const topBannerHeight = 150;
const messageCenterHeight = 50;

const guessAreaWidth = guessArea.numColumns * guessArea.widthOfLetterBox +
    (guessArea.numColumns - 1) * guessArea.hGap;

const guessAreaHeight = guessArea.numRows * guessArea.heightOfLetterBox +
    (guessArea.numRows - 1) * guessArea.vGap;

const keyboardHeight = 200;

const keyboardFunctionSizes = {
    width: 80,
    height: 50
};

const keyboardBoxSizes = {
    width: 40,
    height: 50
};


const keyboardRowsHGap = 0;


const dimensions = {
    width: 600,
    height: topBannerHeight + messageCenterHeight + guessAreaHeight + keyboardHeight,

    topBannerHeight: topBannerHeight,
    
    guessAreaHeight: guessAreaHeight,
    guessAreaWidth,
    guessArea,

    messageCenterHeight: messageCenterHeight,

    keyboardHeight: keyboardHeight,
    keyboardBoxSizes,
    keyboardFunctionSizes,
    keyboardRowsHGap
};

export default dimensions;