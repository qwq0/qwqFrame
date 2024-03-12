/**
 * 按键数据
 * 当发生键盘事件时传递
 * 包含按键和按下状态等数据
 */
declare class KeyboardData$1 {
    /**
     * @param {string} key
     * @param {boolean} hold
     * @param {boolean} pressing
     */
    constructor(key: string, hold: boolean, pressing: boolean);
    /**
     * 操作的键名
     * @type {string}
     */
    key: string;
    /**
     * 当前键目前是否被按下
     * @type {boolean}
     */
    hold: boolean;
    /**
     * 当前键是否刚按下
     * (键按下时第一次为true)
     * @type {boolean}
     */
    pressing: boolean;
}

/**
 * 指针数据
 * 当发生鼠标或触摸事件时传递
 * 包含指针坐标和按下状态等数据
 */
declare class PointerData$1 {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} vx
     * @param {number} vy
     * @param {number} sx
     * @param {number} sy
     * @param {boolean} hold
     * @param {boolean} pressing
     */
    constructor(x: number, y: number, vx: number, vy: number, sx: number, sy: number, hold: boolean, pressing: boolean);
    /**
     * 当前指针位置x
     * @type {number}
    */
    x: number;
    /**
     * 当前指针位置y
     * @type {number}
    */
    y: number;
    /**
     * 指针位置和上次位置的变化x
     * @type {number}
    */
    vx: number;
    /**
     * 指针位置和上次位置的变化y
     * @type {number}
    */
    vy: number;
    /**
     * 此指针的起始位置x
     * @type {number}
    */
    sx: number;
    /**
     * 此指针的起始位置y
     * @type {number}
    */
    sy: number;
    /**
     * 当前此指针是否处于按下状态
     * @type {boolean}
    */
    hold: boolean;
    /**
     * 当前指针是否正在按下(按下事件)
     * @type {boolean}
    */
    pressing: boolean;
}

/**
 * 钩子绑定到值类
 */
declare class HookBindValue {
    /**
     * @param {import("./HookBindInfo").HookBindInfo} info
     * @param {object} targetObj
     * @param {string | symbol} targetKey
     */
    constructor(info: HookBindInfo, targetObj: object, targetKey: string | symbol);
    /**
     * 触发此钩子
     * 销毁后仍可通过此方法手动触发
     */
    emit(): void;
    /**
     * 销毁此钩子
     * 销毁后钩子将不再自动触发
     */
    destroy(): void;
    #private;
}

/**
 * 钩子绑定到回调类
 */
declare class HookBindCallback {
    /**
     * @param {import("./HookBindInfo").HookBindInfo} info
     * @param {function(any): void} callback
     */
    constructor(info: HookBindInfo, callback: (arg0: any) => void);
    /**
     * 触发此钩子
     */
    emit(): void;
    /**
     * 销毁此钩子
     * 销毁后钩子将不再自动触发
     */
    destroy(): void;
    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {HookBindCallback} 返回自身
     */
    bindDestroy(targetObj: object): HookBindCallback;
    #private;
}

/**
 * 钩子绑定信息
 */
declare class HookBindInfo {
    /**
     * @param {object} proxyObj
     * @param {object} srcObj
     * @param {Array<string | symbol>} keys
     * @param {Map<string | symbol, Set<HookBindValue | HookBindCallback>>} hookMap
     * @param {function(...any): any} ctFunc
     */
    constructor(proxyObj: object, srcObj: object, keys: Array<string | symbol>, hookMap: Map<string | symbol, Set<HookBindValue | HookBindCallback>>, ctFunc: (...args: any[]) => any);
    proxyObj: any;
    /**
     * 获取此钩子绑定的值
     */
    getValue(): any;
    /**
     * 添加钩子
     * @package
     * @param {HookBindValue | HookBindCallback} hookObj
     */
    addHook(hookObj: HookBindValue | HookBindCallback): void;
    /**
     * 移除钩子
     * @package
     * @param {HookBindValue | HookBindCallback} hookObj
     */
    removeHook(hookObj: HookBindValue | HookBindCallback): void;
    /**
     * 绑定到值
     * @template {Object} T
     * @param {T} targetObj
     * @param {(keyof T) | (string & {}) | symbol} targetKey
     * @returns {HookBindValue}
     */
    bindToValue<T extends unknown>(targetObj: T, targetKey: symbol | (string & {}) | keyof T): HookBindValue;
    /**
     * 绑定到回调函数
     * @param {function(any): void} callback
     * @returns {HookBindCallback}
     */
    bindToCallback(callback: (arg0: any) => void): HookBindCallback;
    #private;
}

/**
 * 创建NStyle 省略new
 * @param {keyOfStyle} key
 * @param {string | HookBindInfo} value
 */
declare function createNStyle(key: keyOfStyle, value: string | HookBindInfo): NStyle<keyOfStyle>;
/**
 * 创建一组NStyle的flat NList
 * @param {{ [x in keyOfStyle]?: string | HookBindInfo }} obj
 */
declare function createNStyleList(obj: {
    [x: string & {}]: string | HookBindInfo | undefined;
    length?: string | HookBindInfo;
    filter?: string | HookBindInfo;
    fill?: string | HookBindInfo;
    animationName?: string | HookBindInfo;
    all?: string | HookBindInfo;
    offset?: string | HookBindInfo;
    height?: string | HookBindInfo;
    width?: string | HookBindInfo;
    left?: string | HookBindInfo;
    top?: string | HookBindInfo;
    item?: string | HookBindInfo;
    accentColor?: string | HookBindInfo;
    alignContent?: string | HookBindInfo;
    alignItems?: string | HookBindInfo;
    alignSelf?: string | HookBindInfo;
    alignmentBaseline?: string | HookBindInfo;
    animation?: string | HookBindInfo;
    animationDelay?: string | HookBindInfo;
    animationDirection?: string | HookBindInfo;
    animationDuration?: string | HookBindInfo;
    animationFillMode?: string | HookBindInfo;
    animationIterationCount?: string | HookBindInfo;
    animationPlayState?: string | HookBindInfo;
    animationTimingFunction?: string | HookBindInfo;
    appearance?: string | HookBindInfo;
    aspectRatio?: string | HookBindInfo;
    backdropFilter?: string | HookBindInfo;
    backfaceVisibility?: string | HookBindInfo;
    background?: string | HookBindInfo;
    backgroundAttachment?: string | HookBindInfo;
    backgroundBlendMode?: string | HookBindInfo;
    backgroundClip?: string | HookBindInfo;
    backgroundColor?: string | HookBindInfo;
    backgroundImage?: string | HookBindInfo;
    backgroundOrigin?: string | HookBindInfo;
    backgroundPosition?: string | HookBindInfo;
    backgroundPositionX?: string | HookBindInfo;
    backgroundPositionY?: string | HookBindInfo;
    backgroundRepeat?: string | HookBindInfo;
    backgroundSize?: string | HookBindInfo;
    baselineShift?: string | HookBindInfo;
    blockSize?: string | HookBindInfo;
    border?: string | HookBindInfo;
    borderBlock?: string | HookBindInfo;
    borderBlockColor?: string | HookBindInfo;
    borderBlockEnd?: string | HookBindInfo;
    borderBlockEndColor?: string | HookBindInfo;
    borderBlockEndStyle?: string | HookBindInfo;
    borderBlockEndWidth?: string | HookBindInfo;
    borderBlockStart?: string | HookBindInfo;
    borderBlockStartColor?: string | HookBindInfo;
    borderBlockStartStyle?: string | HookBindInfo;
    borderBlockStartWidth?: string | HookBindInfo;
    borderBlockStyle?: string | HookBindInfo;
    borderBlockWidth?: string | HookBindInfo;
    borderBottom?: string | HookBindInfo;
    borderBottomColor?: string | HookBindInfo;
    borderBottomLeftRadius?: string | HookBindInfo;
    borderBottomRightRadius?: string | HookBindInfo;
    borderBottomStyle?: string | HookBindInfo;
    borderBottomWidth?: string | HookBindInfo;
    borderCollapse?: string | HookBindInfo;
    borderColor?: string | HookBindInfo;
    borderEndEndRadius?: string | HookBindInfo;
    borderEndStartRadius?: string | HookBindInfo;
    borderImage?: string | HookBindInfo;
    borderImageOutset?: string | HookBindInfo;
    borderImageRepeat?: string | HookBindInfo;
    borderImageSlice?: string | HookBindInfo;
    borderImageSource?: string | HookBindInfo;
    borderImageWidth?: string | HookBindInfo;
    borderInline?: string | HookBindInfo;
    borderInlineColor?: string | HookBindInfo;
    borderInlineEnd?: string | HookBindInfo;
    borderInlineEndColor?: string | HookBindInfo;
    borderInlineEndStyle?: string | HookBindInfo;
    borderInlineEndWidth?: string | HookBindInfo;
    borderInlineStart?: string | HookBindInfo;
    borderInlineStartColor?: string | HookBindInfo;
    borderInlineStartStyle?: string | HookBindInfo;
    borderInlineStartWidth?: string | HookBindInfo;
    borderInlineStyle?: string | HookBindInfo;
    borderInlineWidth?: string | HookBindInfo;
    borderLeft?: string | HookBindInfo;
    borderLeftColor?: string | HookBindInfo;
    borderLeftStyle?: string | HookBindInfo;
    borderLeftWidth?: string | HookBindInfo;
    borderRadius?: string | HookBindInfo;
    borderRight?: string | HookBindInfo;
    borderRightColor?: string | HookBindInfo;
    borderRightStyle?: string | HookBindInfo;
    borderRightWidth?: string | HookBindInfo;
    borderSpacing?: string | HookBindInfo;
    borderStartEndRadius?: string | HookBindInfo;
    borderStartStartRadius?: string | HookBindInfo;
    borderStyle?: string | HookBindInfo;
    borderTop?: string | HookBindInfo;
    borderTopColor?: string | HookBindInfo;
    borderTopLeftRadius?: string | HookBindInfo;
    borderTopRightRadius?: string | HookBindInfo;
    borderTopStyle?: string | HookBindInfo;
    borderTopWidth?: string | HookBindInfo;
    borderWidth?: string | HookBindInfo;
    bottom?: string | HookBindInfo;
    boxShadow?: string | HookBindInfo;
    boxSizing?: string | HookBindInfo;
    breakAfter?: string | HookBindInfo;
    breakBefore?: string | HookBindInfo;
    breakInside?: string | HookBindInfo;
    captionSide?: string | HookBindInfo;
    caretColor?: string | HookBindInfo;
    clear?: string | HookBindInfo;
    clip?: string | HookBindInfo;
    clipPath?: string | HookBindInfo;
    clipRule?: string | HookBindInfo;
    color?: string | HookBindInfo;
    colorInterpolation?: string | HookBindInfo;
    colorInterpolationFilters?: string | HookBindInfo;
    colorScheme?: string | HookBindInfo;
    columnCount?: string | HookBindInfo;
    columnFill?: string | HookBindInfo;
    columnGap?: string | HookBindInfo;
    columnRule?: string | HookBindInfo;
    columnRuleColor?: string | HookBindInfo;
    columnRuleStyle?: string | HookBindInfo;
    columnRuleWidth?: string | HookBindInfo;
    columnSpan?: string | HookBindInfo;
    columnWidth?: string | HookBindInfo;
    columns?: string | HookBindInfo;
    contain?: string | HookBindInfo;
    container?: string | HookBindInfo;
    containerName?: string | HookBindInfo;
    containerType?: string | HookBindInfo;
    content?: string | HookBindInfo;
    counterIncrement?: string | HookBindInfo;
    counterReset?: string | HookBindInfo;
    counterSet?: string | HookBindInfo;
    cssFloat?: string | HookBindInfo;
    cssText?: string | HookBindInfo;
    cursor?: string | HookBindInfo;
    direction?: string | HookBindInfo;
    display?: string | HookBindInfo;
    dominantBaseline?: string | HookBindInfo;
    emptyCells?: string | HookBindInfo;
    fillOpacity?: string | HookBindInfo;
    fillRule?: string | HookBindInfo;
    flex?: string | HookBindInfo;
    flexBasis?: string | HookBindInfo;
    flexDirection?: string | HookBindInfo;
    flexFlow?: string | HookBindInfo;
    flexGrow?: string | HookBindInfo;
    flexShrink?: string | HookBindInfo;
    flexWrap?: string | HookBindInfo;
    float?: string | HookBindInfo;
    floodColor?: string | HookBindInfo;
    floodOpacity?: string | HookBindInfo;
    font?: string | HookBindInfo;
    fontFamily?: string | HookBindInfo;
    fontFeatureSettings?: string | HookBindInfo;
    fontKerning?: string | HookBindInfo;
    fontOpticalSizing?: string | HookBindInfo;
    fontPalette?: string | HookBindInfo;
    fontSize?: string | HookBindInfo;
    fontSizeAdjust?: string | HookBindInfo;
    fontStretch?: string | HookBindInfo;
    fontStyle?: string | HookBindInfo;
    fontSynthesis?: string | HookBindInfo;
    fontVariant?: string | HookBindInfo;
    fontVariantAlternates?: string | HookBindInfo;
    fontVariantCaps?: string | HookBindInfo;
    fontVariantEastAsian?: string | HookBindInfo;
    fontVariantLigatures?: string | HookBindInfo;
    fontVariantNumeric?: string | HookBindInfo;
    fontVariantPosition?: string | HookBindInfo;
    fontVariationSettings?: string | HookBindInfo;
    fontWeight?: string | HookBindInfo;
    gap?: string | HookBindInfo;
    grid?: string | HookBindInfo;
    gridArea?: string | HookBindInfo;
    gridAutoColumns?: string | HookBindInfo;
    gridAutoFlow?: string | HookBindInfo;
    gridAutoRows?: string | HookBindInfo;
    gridColumn?: string | HookBindInfo;
    gridColumnEnd?: string | HookBindInfo;
    gridColumnGap?: string | HookBindInfo;
    gridColumnStart?: string | HookBindInfo;
    gridGap?: string | HookBindInfo;
    gridRow?: string | HookBindInfo;
    gridRowEnd?: string | HookBindInfo;
    gridRowGap?: string | HookBindInfo;
    gridRowStart?: string | HookBindInfo;
    gridTemplate?: string | HookBindInfo;
    gridTemplateAreas?: string | HookBindInfo;
    gridTemplateColumns?: string | HookBindInfo;
    gridTemplateRows?: string | HookBindInfo;
    hyphenateCharacter?: string | HookBindInfo;
    hyphens?: string | HookBindInfo;
    imageOrientation?: string | HookBindInfo;
    imageRendering?: string | HookBindInfo;
    inlineSize?: string | HookBindInfo;
    inset?: string | HookBindInfo;
    insetBlock?: string | HookBindInfo;
    insetBlockEnd?: string | HookBindInfo;
    insetBlockStart?: string | HookBindInfo;
    insetInline?: string | HookBindInfo;
    insetInlineEnd?: string | HookBindInfo;
    insetInlineStart?: string | HookBindInfo;
    isolation?: string | HookBindInfo;
    justifyContent?: string | HookBindInfo;
    justifyItems?: string | HookBindInfo;
    justifySelf?: string | HookBindInfo;
    letterSpacing?: string | HookBindInfo;
    lightingColor?: string | HookBindInfo;
    lineBreak?: string | HookBindInfo;
    lineHeight?: string | HookBindInfo;
    listStyle?: string | HookBindInfo;
    listStyleImage?: string | HookBindInfo;
    listStylePosition?: string | HookBindInfo;
    listStyleType?: string | HookBindInfo;
    margin?: string | HookBindInfo;
    marginBlock?: string | HookBindInfo;
    marginBlockEnd?: string | HookBindInfo;
    marginBlockStart?: string | HookBindInfo;
    marginBottom?: string | HookBindInfo;
    marginInline?: string | HookBindInfo;
    marginInlineEnd?: string | HookBindInfo;
    marginInlineStart?: string | HookBindInfo;
    marginLeft?: string | HookBindInfo;
    marginRight?: string | HookBindInfo;
    marginTop?: string | HookBindInfo;
    marker?: string | HookBindInfo;
    markerEnd?: string | HookBindInfo;
    markerMid?: string | HookBindInfo;
    markerStart?: string | HookBindInfo;
    mask?: string | HookBindInfo;
    maskClip?: string | HookBindInfo;
    maskComposite?: string | HookBindInfo;
    maskImage?: string | HookBindInfo;
    maskMode?: string | HookBindInfo;
    maskOrigin?: string | HookBindInfo;
    maskPosition?: string | HookBindInfo;
    maskRepeat?: string | HookBindInfo;
    maskSize?: string | HookBindInfo;
    maskType?: string | HookBindInfo;
    maxBlockSize?: string | HookBindInfo;
    maxHeight?: string | HookBindInfo;
    maxInlineSize?: string | HookBindInfo;
    maxWidth?: string | HookBindInfo;
    minBlockSize?: string | HookBindInfo;
    minHeight?: string | HookBindInfo;
    minInlineSize?: string | HookBindInfo;
    minWidth?: string | HookBindInfo;
    mixBlendMode?: string | HookBindInfo;
    objectFit?: string | HookBindInfo;
    objectPosition?: string | HookBindInfo;
    offsetDistance?: string | HookBindInfo;
    offsetPath?: string | HookBindInfo;
    offsetRotate?: string | HookBindInfo;
    opacity?: string | HookBindInfo;
    order?: string | HookBindInfo;
    orphans?: string | HookBindInfo;
    outline?: string | HookBindInfo;
    outlineColor?: string | HookBindInfo;
    outlineOffset?: string | HookBindInfo;
    outlineStyle?: string | HookBindInfo;
    outlineWidth?: string | HookBindInfo;
    overflow?: string | HookBindInfo;
    overflowAnchor?: string | HookBindInfo;
    overflowClipMargin?: string | HookBindInfo;
    overflowWrap?: string | HookBindInfo;
    overflowX?: string | HookBindInfo;
    overflowY?: string | HookBindInfo;
    overscrollBehavior?: string | HookBindInfo;
    overscrollBehaviorBlock?: string | HookBindInfo;
    overscrollBehaviorInline?: string | HookBindInfo;
    overscrollBehaviorX?: string | HookBindInfo;
    overscrollBehaviorY?: string | HookBindInfo;
    padding?: string | HookBindInfo;
    paddingBlock?: string | HookBindInfo;
    paddingBlockEnd?: string | HookBindInfo;
    paddingBlockStart?: string | HookBindInfo;
    paddingBottom?: string | HookBindInfo;
    paddingInline?: string | HookBindInfo;
    paddingInlineEnd?: string | HookBindInfo;
    paddingInlineStart?: string | HookBindInfo;
    paddingLeft?: string | HookBindInfo;
    paddingRight?: string | HookBindInfo;
    paddingTop?: string | HookBindInfo;
    pageBreakAfter?: string | HookBindInfo;
    pageBreakBefore?: string | HookBindInfo;
    pageBreakInside?: string | HookBindInfo;
    paintOrder?: string | HookBindInfo;
    parentRule?: string | HookBindInfo;
    perspective?: string | HookBindInfo;
    perspectiveOrigin?: string | HookBindInfo;
    placeContent?: string | HookBindInfo;
    placeItems?: string | HookBindInfo;
    placeSelf?: string | HookBindInfo;
    pointerEvents?: string | HookBindInfo;
    position?: string | HookBindInfo;
    printColorAdjust?: string | HookBindInfo;
    quotes?: string | HookBindInfo;
    resize?: string | HookBindInfo;
    right?: string | HookBindInfo;
    rotate?: string | HookBindInfo;
    rowGap?: string | HookBindInfo;
    rubyPosition?: string | HookBindInfo;
    scale?: string | HookBindInfo;
    scrollBehavior?: string | HookBindInfo;
    scrollMargin?: string | HookBindInfo;
    scrollMarginBlock?: string | HookBindInfo;
    scrollMarginBlockEnd?: string | HookBindInfo;
    scrollMarginBlockStart?: string | HookBindInfo;
    scrollMarginBottom?: string | HookBindInfo;
    scrollMarginInline?: string | HookBindInfo;
    scrollMarginInlineEnd?: string | HookBindInfo;
    scrollMarginInlineStart?: string | HookBindInfo;
    scrollMarginLeft?: string | HookBindInfo;
    scrollMarginRight?: string | HookBindInfo;
    scrollMarginTop?: string | HookBindInfo;
    scrollPadding?: string | HookBindInfo;
    scrollPaddingBlock?: string | HookBindInfo;
    scrollPaddingBlockEnd?: string | HookBindInfo;
    scrollPaddingBlockStart?: string | HookBindInfo;
    scrollPaddingBottom?: string | HookBindInfo;
    scrollPaddingInline?: string | HookBindInfo;
    scrollPaddingInlineEnd?: string | HookBindInfo;
    scrollPaddingInlineStart?: string | HookBindInfo;
    scrollPaddingLeft?: string | HookBindInfo;
    scrollPaddingRight?: string | HookBindInfo;
    scrollPaddingTop?: string | HookBindInfo;
    scrollSnapAlign?: string | HookBindInfo;
    scrollSnapStop?: string | HookBindInfo;
    scrollSnapType?: string | HookBindInfo;
    scrollbarGutter?: string | HookBindInfo;
    shapeImageThreshold?: string | HookBindInfo;
    shapeMargin?: string | HookBindInfo;
    shapeOutside?: string | HookBindInfo;
    shapeRendering?: string | HookBindInfo;
    stopColor?: string | HookBindInfo;
    stopOpacity?: string | HookBindInfo;
    stroke?: string | HookBindInfo;
    strokeDasharray?: string | HookBindInfo;
    strokeDashoffset?: string | HookBindInfo;
    strokeLinecap?: string | HookBindInfo;
    strokeLinejoin?: string | HookBindInfo;
    strokeMiterlimit?: string | HookBindInfo;
    strokeOpacity?: string | HookBindInfo;
    strokeWidth?: string | HookBindInfo;
    tabSize?: string | HookBindInfo;
    tableLayout?: string | HookBindInfo;
    textAlign?: string | HookBindInfo;
    textAlignLast?: string | HookBindInfo;
    textAnchor?: string | HookBindInfo;
    textCombineUpright?: string | HookBindInfo;
    textDecoration?: string | HookBindInfo;
    textDecorationColor?: string | HookBindInfo;
    textDecorationLine?: string | HookBindInfo;
    textDecorationSkipInk?: string | HookBindInfo;
    textDecorationStyle?: string | HookBindInfo;
    textDecorationThickness?: string | HookBindInfo;
    textEmphasis?: string | HookBindInfo;
    textEmphasisColor?: string | HookBindInfo;
    textEmphasisPosition?: string | HookBindInfo;
    textEmphasisStyle?: string | HookBindInfo;
    textIndent?: string | HookBindInfo;
    textOrientation?: string | HookBindInfo;
    textOverflow?: string | HookBindInfo;
    textRendering?: string | HookBindInfo;
    textShadow?: string | HookBindInfo;
    textTransform?: string | HookBindInfo;
    textUnderlineOffset?: string | HookBindInfo;
    textUnderlinePosition?: string | HookBindInfo;
    touchAction?: string | HookBindInfo;
    transform?: string | HookBindInfo;
    transformBox?: string | HookBindInfo;
    transformOrigin?: string | HookBindInfo;
    transformStyle?: string | HookBindInfo;
    transition?: string | HookBindInfo;
    transitionDelay?: string | HookBindInfo;
    transitionDuration?: string | HookBindInfo;
    transitionProperty?: string | HookBindInfo;
    transitionTimingFunction?: string | HookBindInfo;
    translate?: string | HookBindInfo;
    unicodeBidi?: string | HookBindInfo;
    userSelect?: string | HookBindInfo;
    verticalAlign?: string | HookBindInfo;
    visibility?: string | HookBindInfo;
    webkitAlignContent?: string | HookBindInfo;
    webkitAlignItems?: string | HookBindInfo;
    webkitAlignSelf?: string | HookBindInfo;
    webkitAnimation?: string | HookBindInfo;
    webkitAnimationDelay?: string | HookBindInfo;
    webkitAnimationDirection?: string | HookBindInfo;
    webkitAnimationDuration?: string | HookBindInfo;
    webkitAnimationFillMode?: string | HookBindInfo;
    webkitAnimationIterationCount?: string | HookBindInfo;
    webkitAnimationName?: string | HookBindInfo;
    webkitAnimationPlayState?: string | HookBindInfo;
    webkitAnimationTimingFunction?: string | HookBindInfo;
    webkitAppearance?: string | HookBindInfo;
    webkitBackfaceVisibility?: string | HookBindInfo;
    webkitBackgroundClip?: string | HookBindInfo;
    webkitBackgroundOrigin?: string | HookBindInfo;
    webkitBackgroundSize?: string | HookBindInfo;
    webkitBorderBottomLeftRadius?: string | HookBindInfo;
    webkitBorderBottomRightRadius?: string | HookBindInfo;
    webkitBorderRadius?: string | HookBindInfo;
    webkitBorderTopLeftRadius?: string | HookBindInfo;
    webkitBorderTopRightRadius?: string | HookBindInfo;
    webkitBoxAlign?: string | HookBindInfo;
    webkitBoxFlex?: string | HookBindInfo;
    webkitBoxOrdinalGroup?: string | HookBindInfo;
    webkitBoxOrient?: string | HookBindInfo;
    webkitBoxPack?: string | HookBindInfo;
    webkitBoxShadow?: string | HookBindInfo;
    webkitBoxSizing?: string | HookBindInfo;
    webkitFilter?: string | HookBindInfo;
    webkitFlex?: string | HookBindInfo;
    webkitFlexBasis?: string | HookBindInfo;
    webkitFlexDirection?: string | HookBindInfo;
    webkitFlexFlow?: string | HookBindInfo;
    webkitFlexGrow?: string | HookBindInfo;
    webkitFlexShrink?: string | HookBindInfo;
    webkitFlexWrap?: string | HookBindInfo;
    webkitJustifyContent?: string | HookBindInfo;
    webkitLineClamp?: string | HookBindInfo;
    webkitMask?: string | HookBindInfo;
    webkitMaskBoxImage?: string | HookBindInfo;
    webkitMaskBoxImageOutset?: string | HookBindInfo;
    webkitMaskBoxImageRepeat?: string | HookBindInfo;
    webkitMaskBoxImageSlice?: string | HookBindInfo;
    webkitMaskBoxImageSource?: string | HookBindInfo;
    webkitMaskBoxImageWidth?: string | HookBindInfo;
    webkitMaskClip?: string | HookBindInfo;
    webkitMaskComposite?: string | HookBindInfo;
    webkitMaskImage?: string | HookBindInfo;
    webkitMaskOrigin?: string | HookBindInfo;
    webkitMaskPosition?: string | HookBindInfo;
    webkitMaskRepeat?: string | HookBindInfo;
    webkitMaskSize?: string | HookBindInfo;
    webkitOrder?: string | HookBindInfo;
    webkitPerspective?: string | HookBindInfo;
    webkitPerspectiveOrigin?: string | HookBindInfo;
    webkitTextFillColor?: string | HookBindInfo;
    webkitTextSizeAdjust?: string | HookBindInfo;
    webkitTextStroke?: string | HookBindInfo;
    webkitTextStrokeColor?: string | HookBindInfo;
    webkitTextStrokeWidth?: string | HookBindInfo;
    webkitTransform?: string | HookBindInfo;
    webkitTransformOrigin?: string | HookBindInfo;
    webkitTransformStyle?: string | HookBindInfo;
    webkitTransition?: string | HookBindInfo;
    webkitTransitionDelay?: string | HookBindInfo;
    webkitTransitionDuration?: string | HookBindInfo;
    webkitTransitionProperty?: string | HookBindInfo;
    webkitTransitionTimingFunction?: string | HookBindInfo;
    webkitUserSelect?: string | HookBindInfo;
    whiteSpace?: string | HookBindInfo;
    widows?: string | HookBindInfo;
    willChange?: string | HookBindInfo;
    wordBreak?: string | HookBindInfo;
    wordSpacing?: string | HookBindInfo;
    wordWrap?: string | HookBindInfo;
    writingMode?: string | HookBindInfo;
    zIndex?: string | HookBindInfo;
    getPropertyPriority?: string | HookBindInfo;
    getPropertyValue?: string | HookBindInfo;
    removeProperty?: string | HookBindInfo;
    setProperty?: string | HookBindInfo;
}): NList;
/**
 * @typedef {(keyof CSSStyleDeclaration & string) | (string & {})} keyOfStyle
 */
/**
 * 样式
 * @template {keyOfStyle} T
 */
declare class NStyle<T extends keyOfStyle> {
    /**
     * @param {T} key
     * @param {string | HookBindInfo} value
     */
    constructor(key: T, value: string | HookBindInfo);
    /**
     * @type {T}
     */
    key: T;
    /**
     * @type {string | HookBindInfo}
     */
    value: string | HookBindInfo;
    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement.js").NElement} e
     */
    apply(e: NElement<any>): void;
}
type keyOfStyle = (keyof CSSStyleDeclaration & string) | (string & {});

/**
 * Text节点的封装
 * 用于进行节点定位
 * @typedef {import("./NElement").NElement} NElement
 * @typedef {import("./NLocate").NLocate} NLocate
 */
declare class NText$1 {
    /**
     * @param {string | Text} text
     */
    constructor(text: string | Text);
    /**
     * Text节点
     * @type {Text}
     */
    node: Text;
    /**
     * 设置此文本节点的文本
     * @param {string} text
     */
    setText(text: string): void;
    /**
     * 在此节点之前插入节点
     * @param {NElement | NLocate | NText} target
     */
    insBefore(target: NElement<any> | NLocate$1 | NText$1): void;
    /**
     * 在此节点之后插入节点
     * @param {NElement | NLocate | NText} target
     */
    insAfter(target: NElement<any> | NLocate$1 | NText$1): void;
    /**
     * 使用指定节点替换此节点
     * @param {Array<NElement | NText | NLocate>} elements
     */
    replaceWith(...elements: Array<NElement<any> | NText$1 | NLocate$1>): void;
}
/**
 * Text节点的封装
 * 用于进行节点定位
 */
type NLocate$1 = NLocate;

/**
 * Comment节点的封装
 * 用于进行节点定位
 * @typedef {import("./NElement").NElement} NElement
 * @typedef {import("./NText").NText} NText
 */
declare class NLocate {
    /**
     * @param {Comment} [node]
     */
    constructor(node?: Comment | undefined);
    /**
     * Comment节点
     * @type {Comment}
     */
    node: Comment;
    /**
     * 在此节点之前插入节点
     * @param {NElement | NLocate | NText} target
     */
    insBefore(target: NElement<any> | NLocate | NText): void;
    /**
     * 在此节点之后插入节点
     * @param {NElement | NLocate | NText} target
     */
    insAfter(target: NElement<any> | NLocate | NText): void;
    /**
     * 使用指定节点替换此节点
     * @param {Array<NElement | NText | NLocate>} elements
     */
    replaceWith(...elements: Array<NElement<any> | NText | NLocate>): void;
}
/**
 * Comment节点的封装
 * 用于进行节点定位
 */
type NText = NText$1;

/**
 * 根据HTMLElement对象获取NElement对象
 * @template {HTMLElement} ElementObjectType
 * @param {ElementObjectType} element
 * @returns {NElement<ElementObjectType>}
 */
declare function getNElement<ElementObjectType extends HTMLElement>(element: ElementObjectType): NElement<ElementObjectType>;
/**
 * dom元素的封装
 * @template {HTMLElement} ElementObjectType
 */
declare class NElement<ElementObjectType extends HTMLElement> {
    /**
     * 根据HTMLElement对象获取NElement对象
     * @template {HTMLElement} ElementObjectType
     * @param {ElementObjectType} element
     * @returns {NElement<ElementObjectType>}
     */
    static byElement<ElementObjectType_1 extends HTMLElement>(element: ElementObjectType_1): NElement<ElementObjectType_1>;
    /**
     * @private
     * @param {ElementObjectType} elementObj
     */
    private constructor();
    /**
     * 元素对象
     * @readonly
     * @type {ElementObjectType}
     */
    readonly node: ElementObjectType;
    /**
     * 样式名 到 钩子绑定 映射
     * @private
     * @type {Map<string, HookBindValue | HookBindCallback>}
     */
    private styleHooks;
    /**
     * @returns {ElementObjectType}
     */
    get element(): ElementObjectType;
    /**
     * 添加单个子节点
     * @param {NElement | NLocate | NText | Node | string | HookBindInfo} chi
     */
    addChild(chi: NElement<any> | NLocate | NText$1 | Node | string | HookBindInfo): void;
    /**
     * 添加多个子节点
     * @param {Array<Parameters<NElement["addChild"]>[0] | Array<Parameters<NElement["addChild"]>[0]>>} chi
     */
    addChilds(...chi: Array<Parameters<NElement<any>["addChild"]>[0] | Array<Parameters<NElement<any>["addChild"]>[0]>>): void;
    /**
     * 插入单个子节点(在中间)
     * 如果此节点之前在树中则先移除后加入
     * @param {NElement | NLocate | NText} chi
     * @param {number | NElement | NLocate | NText} pos 添加到的位置 负数从后到前 超过范围添加到最后
     */
    insChild(chi: NElement<any> | NLocate | NText$1, pos: number | NElement<any> | NLocate | NText$1): void;
    /**
     * 查找子节点在当前节点中的位置
     * 从0开始
     * 不是子节点则返回-1
     * @param {NElement} chi
     * @returns {number}
     */
    childInd(chi: NElement<any>): number;
    /**
     * 在此节点之前插入节点
     * @param {NElement | NLocate | NText} target
     */
    insBefore(target: NElement<any> | NLocate | NText$1): void;
    /**
     * 在此节点之后插入节点
     * @param {NElement | NLocate | NText} target
     */
    insAfter(target: NElement<any> | NLocate | NText$1): void;
    /**
     * 移除此节点
     */
    remove(): void;
    /**
     * 移除此节点的子节点
     * @param {number} [begin] 开始删除的子节点下标 缺省则为从0开始
     * @param {number} [end] 结束删除的子节点下标 不包含end 缺省则为到结尾
     */
    removeChilds(begin?: number | undefined, end?: number | undefined): void;
    /**
     * 获取子节点列表
     * 返回的列表不会随dom树变化
     * @returns {Array<NElement>}
     */
    getChilds(): Array<NElement<any>>;
    /**
     * 获取第ind个子节点
     * @param {number} ind
     * @returns {NElement}
     */
    getChild(ind: number): NElement<any>;
    /**
     * 使用指定节点替换此节点
     * @param {Array<NElement | NText | NLocate>} elements
     */
    replaceWith(...elements: Array<NElement<any> | NText$1 | NLocate>): void;
    /**
     * 修改样式
     * @param {import("../feature/NStyle.js").keyOfStyle} styleName
     * @param {string | number | HookBindInfo} value
     */
    setStyle(styleName: keyOfStyle, value: string | number | HookBindInfo): void;
    /**
     * 获取样式
     * @param {import("../feature/NStyle.js").keyOfStyle} styleName
     * @returns {string | number}
     */
    getStyle(styleName: keyOfStyle): string | number;
    /**
     * 修改多个样式
     * @param {{ [x in (import("../feature/NStyle.js").keyOfStyle)]?: string | number | HookBindInfo }} obj
     */
    setStyles(obj: {
        [x: string & {}]: string | number | HookBindInfo | undefined;
        length?: string | number | HookBindInfo;
        filter?: string | number | HookBindInfo;
        fill?: string | number | HookBindInfo;
        animationName?: string | number | HookBindInfo;
        all?: string | number | HookBindInfo;
        offset?: string | number | HookBindInfo;
        height?: string | number | HookBindInfo;
        width?: string | number | HookBindInfo;
        left?: string | number | HookBindInfo;
        top?: string | number | HookBindInfo;
        item?: string | number | HookBindInfo;
        accentColor?: string | number | HookBindInfo;
        alignContent?: string | number | HookBindInfo;
        alignItems?: string | number | HookBindInfo;
        alignSelf?: string | number | HookBindInfo;
        alignmentBaseline?: string | number | HookBindInfo;
        animation?: string | number | HookBindInfo;
        animationDelay?: string | number | HookBindInfo;
        animationDirection?: string | number | HookBindInfo;
        animationDuration?: string | number | HookBindInfo;
        animationFillMode?: string | number | HookBindInfo;
        animationIterationCount?: string | number | HookBindInfo;
        animationPlayState?: string | number | HookBindInfo;
        animationTimingFunction?: string | number | HookBindInfo;
        appearance?: string | number | HookBindInfo;
        aspectRatio?: string | number | HookBindInfo;
        backdropFilter?: string | number | HookBindInfo;
        backfaceVisibility?: string | number | HookBindInfo;
        background?: string | number | HookBindInfo;
        backgroundAttachment?: string | number | HookBindInfo;
        backgroundBlendMode?: string | number | HookBindInfo;
        backgroundClip?: string | number | HookBindInfo;
        backgroundColor?: string | number | HookBindInfo;
        backgroundImage?: string | number | HookBindInfo;
        backgroundOrigin?: string | number | HookBindInfo;
        backgroundPosition?: string | number | HookBindInfo;
        backgroundPositionX?: string | number | HookBindInfo;
        backgroundPositionY?: string | number | HookBindInfo;
        backgroundRepeat?: string | number | HookBindInfo;
        backgroundSize?: string | number | HookBindInfo;
        baselineShift?: string | number | HookBindInfo;
        blockSize?: string | number | HookBindInfo;
        border?: string | number | HookBindInfo;
        borderBlock?: string | number | HookBindInfo;
        borderBlockColor?: string | number | HookBindInfo;
        borderBlockEnd?: string | number | HookBindInfo;
        borderBlockEndColor?: string | number | HookBindInfo;
        borderBlockEndStyle?: string | number | HookBindInfo;
        borderBlockEndWidth?: string | number | HookBindInfo;
        borderBlockStart?: string | number | HookBindInfo;
        borderBlockStartColor?: string | number | HookBindInfo;
        borderBlockStartStyle?: string | number | HookBindInfo;
        borderBlockStartWidth?: string | number | HookBindInfo;
        borderBlockStyle?: string | number | HookBindInfo;
        borderBlockWidth?: string | number | HookBindInfo;
        borderBottom?: string | number | HookBindInfo;
        borderBottomColor?: string | number | HookBindInfo;
        borderBottomLeftRadius?: string | number | HookBindInfo;
        borderBottomRightRadius?: string | number | HookBindInfo;
        borderBottomStyle?: string | number | HookBindInfo;
        borderBottomWidth?: string | number | HookBindInfo;
        borderCollapse?: string | number | HookBindInfo;
        borderColor?: string | number | HookBindInfo;
        borderEndEndRadius?: string | number | HookBindInfo;
        borderEndStartRadius?: string | number | HookBindInfo;
        borderImage?: string | number | HookBindInfo;
        borderImageOutset?: string | number | HookBindInfo;
        borderImageRepeat?: string | number | HookBindInfo;
        borderImageSlice?: string | number | HookBindInfo;
        borderImageSource?: string | number | HookBindInfo;
        borderImageWidth?: string | number | HookBindInfo;
        borderInline?: string | number | HookBindInfo;
        borderInlineColor?: string | number | HookBindInfo;
        borderInlineEnd?: string | number | HookBindInfo;
        borderInlineEndColor?: string | number | HookBindInfo;
        borderInlineEndStyle?: string | number | HookBindInfo;
        borderInlineEndWidth?: string | number | HookBindInfo;
        borderInlineStart?: string | number | HookBindInfo;
        borderInlineStartColor?: string | number | HookBindInfo;
        borderInlineStartStyle?: string | number | HookBindInfo;
        borderInlineStartWidth?: string | number | HookBindInfo;
        borderInlineStyle?: string | number | HookBindInfo;
        borderInlineWidth?: string | number | HookBindInfo;
        borderLeft?: string | number | HookBindInfo;
        borderLeftColor?: string | number | HookBindInfo;
        borderLeftStyle?: string | number | HookBindInfo;
        borderLeftWidth?: string | number | HookBindInfo;
        borderRadius?: string | number | HookBindInfo;
        borderRight?: string | number | HookBindInfo;
        borderRightColor?: string | number | HookBindInfo;
        borderRightStyle?: string | number | HookBindInfo;
        borderRightWidth?: string | number | HookBindInfo;
        borderSpacing?: string | number | HookBindInfo;
        borderStartEndRadius?: string | number | HookBindInfo;
        borderStartStartRadius?: string | number | HookBindInfo;
        borderStyle?: string | number | HookBindInfo;
        borderTop?: string | number | HookBindInfo;
        borderTopColor?: string | number | HookBindInfo;
        borderTopLeftRadius?: string | number | HookBindInfo;
        borderTopRightRadius?: string | number | HookBindInfo;
        borderTopStyle?: string | number | HookBindInfo;
        borderTopWidth?: string | number | HookBindInfo;
        borderWidth?: string | number | HookBindInfo;
        bottom?: string | number | HookBindInfo;
        boxShadow?: string | number | HookBindInfo;
        boxSizing?: string | number | HookBindInfo;
        breakAfter?: string | number | HookBindInfo;
        breakBefore?: string | number | HookBindInfo;
        breakInside?: string | number | HookBindInfo;
        captionSide?: string | number | HookBindInfo;
        caretColor?: string | number | HookBindInfo;
        clear?: string | number | HookBindInfo;
        clip?: string | number | HookBindInfo;
        clipPath?: string | number | HookBindInfo;
        clipRule?: string | number | HookBindInfo;
        color?: string | number | HookBindInfo;
        colorInterpolation?: string | number | HookBindInfo;
        colorInterpolationFilters?: string | number | HookBindInfo;
        colorScheme?: string | number | HookBindInfo;
        columnCount?: string | number | HookBindInfo;
        columnFill?: string | number | HookBindInfo;
        columnGap?: string | number | HookBindInfo;
        columnRule?: string | number | HookBindInfo;
        columnRuleColor?: string | number | HookBindInfo;
        columnRuleStyle?: string | number | HookBindInfo;
        columnRuleWidth?: string | number | HookBindInfo;
        columnSpan?: string | number | HookBindInfo;
        columnWidth?: string | number | HookBindInfo;
        columns?: string | number | HookBindInfo;
        contain?: string | number | HookBindInfo;
        container?: string | number | HookBindInfo;
        containerName?: string | number | HookBindInfo;
        containerType?: string | number | HookBindInfo;
        content?: string | number | HookBindInfo;
        counterIncrement?: string | number | HookBindInfo;
        counterReset?: string | number | HookBindInfo;
        counterSet?: string | number | HookBindInfo;
        cssFloat?: string | number | HookBindInfo;
        cssText?: string | number | HookBindInfo;
        cursor?: string | number | HookBindInfo;
        direction?: string | number | HookBindInfo;
        display?: string | number | HookBindInfo;
        dominantBaseline?: string | number | HookBindInfo;
        emptyCells?: string | number | HookBindInfo;
        fillOpacity?: string | number | HookBindInfo;
        fillRule?: string | number | HookBindInfo;
        flex?: string | number | HookBindInfo;
        flexBasis?: string | number | HookBindInfo;
        flexDirection?: string | number | HookBindInfo;
        flexFlow?: string | number | HookBindInfo;
        flexGrow?: string | number | HookBindInfo;
        flexShrink?: string | number | HookBindInfo;
        flexWrap?: string | number | HookBindInfo;
        float?: string | number | HookBindInfo;
        floodColor?: string | number | HookBindInfo;
        floodOpacity?: string | number | HookBindInfo;
        font?: string | number | HookBindInfo;
        fontFamily?: string | number | HookBindInfo;
        fontFeatureSettings?: string | number | HookBindInfo;
        fontKerning?: string | number | HookBindInfo;
        fontOpticalSizing?: string | number | HookBindInfo;
        fontPalette?: string | number | HookBindInfo;
        fontSize?: string | number | HookBindInfo;
        fontSizeAdjust?: string | number | HookBindInfo;
        fontStretch?: string | number | HookBindInfo;
        fontStyle?: string | number | HookBindInfo;
        fontSynthesis?: string | number | HookBindInfo;
        fontVariant?: string | number | HookBindInfo;
        fontVariantAlternates?: string | number | HookBindInfo;
        fontVariantCaps?: string | number | HookBindInfo;
        fontVariantEastAsian?: string | number | HookBindInfo;
        fontVariantLigatures?: string | number | HookBindInfo;
        fontVariantNumeric?: string | number | HookBindInfo;
        fontVariantPosition?: string | number | HookBindInfo;
        fontVariationSettings?: string | number | HookBindInfo;
        fontWeight?: string | number | HookBindInfo;
        gap?: string | number | HookBindInfo;
        grid?: string | number | HookBindInfo;
        gridArea?: string | number | HookBindInfo;
        gridAutoColumns?: string | number | HookBindInfo;
        gridAutoFlow?: string | number | HookBindInfo;
        gridAutoRows?: string | number | HookBindInfo;
        gridColumn?: string | number | HookBindInfo;
        gridColumnEnd?: string | number | HookBindInfo;
        gridColumnGap?: string | number | HookBindInfo;
        gridColumnStart?: string | number | HookBindInfo;
        gridGap?: string | number | HookBindInfo;
        gridRow?: string | number | HookBindInfo;
        gridRowEnd?: string | number | HookBindInfo;
        gridRowGap?: string | number | HookBindInfo;
        gridRowStart?: string | number | HookBindInfo;
        gridTemplate?: string | number | HookBindInfo;
        gridTemplateAreas?: string | number | HookBindInfo;
        gridTemplateColumns?: string | number | HookBindInfo;
        gridTemplateRows?: string | number | HookBindInfo;
        hyphenateCharacter?: string | number | HookBindInfo;
        hyphens?: string | number | HookBindInfo;
        imageOrientation?: string | number | HookBindInfo;
        imageRendering?: string | number | HookBindInfo;
        inlineSize?: string | number | HookBindInfo;
        inset?: string | number | HookBindInfo;
        insetBlock?: string | number | HookBindInfo;
        insetBlockEnd?: string | number | HookBindInfo;
        insetBlockStart?: string | number | HookBindInfo;
        insetInline?: string | number | HookBindInfo;
        insetInlineEnd?: string | number | HookBindInfo;
        insetInlineStart?: string | number | HookBindInfo;
        isolation?: string | number | HookBindInfo;
        justifyContent?: string | number | HookBindInfo;
        justifyItems?: string | number | HookBindInfo;
        justifySelf?: string | number | HookBindInfo;
        letterSpacing?: string | number | HookBindInfo;
        lightingColor?: string | number | HookBindInfo;
        lineBreak?: string | number | HookBindInfo;
        lineHeight?: string | number | HookBindInfo;
        listStyle?: string | number | HookBindInfo;
        listStyleImage?: string | number | HookBindInfo;
        listStylePosition?: string | number | HookBindInfo;
        listStyleType?: string | number | HookBindInfo;
        margin?: string | number | HookBindInfo;
        marginBlock?: string | number | HookBindInfo;
        marginBlockEnd?: string | number | HookBindInfo;
        marginBlockStart?: string | number | HookBindInfo;
        marginBottom?: string | number | HookBindInfo;
        marginInline?: string | number | HookBindInfo;
        marginInlineEnd?: string | number | HookBindInfo;
        marginInlineStart?: string | number | HookBindInfo;
        marginLeft?: string | number | HookBindInfo;
        marginRight?: string | number | HookBindInfo;
        marginTop?: string | number | HookBindInfo;
        marker?: string | number | HookBindInfo;
        markerEnd?: string | number | HookBindInfo;
        markerMid?: string | number | HookBindInfo;
        markerStart?: string | number | HookBindInfo;
        mask?: string | number | HookBindInfo;
        maskClip?: string | number | HookBindInfo;
        maskComposite?: string | number | HookBindInfo;
        maskImage?: string | number | HookBindInfo;
        maskMode?: string | number | HookBindInfo;
        maskOrigin?: string | number | HookBindInfo;
        maskPosition?: string | number | HookBindInfo;
        maskRepeat?: string | number | HookBindInfo;
        maskSize?: string | number | HookBindInfo;
        maskType?: string | number | HookBindInfo;
        maxBlockSize?: string | number | HookBindInfo;
        maxHeight?: string | number | HookBindInfo;
        maxInlineSize?: string | number | HookBindInfo;
        maxWidth?: string | number | HookBindInfo;
        minBlockSize?: string | number | HookBindInfo;
        minHeight?: string | number | HookBindInfo;
        minInlineSize?: string | number | HookBindInfo;
        minWidth?: string | number | HookBindInfo;
        mixBlendMode?: string | number | HookBindInfo;
        objectFit?: string | number | HookBindInfo;
        objectPosition?: string | number | HookBindInfo;
        offsetDistance?: string | number | HookBindInfo;
        offsetPath?: string | number | HookBindInfo;
        offsetRotate?: string | number | HookBindInfo;
        opacity?: string | number | HookBindInfo;
        order?: string | number | HookBindInfo;
        orphans?: string | number | HookBindInfo;
        outline?: string | number | HookBindInfo;
        outlineColor?: string | number | HookBindInfo;
        outlineOffset?: string | number | HookBindInfo;
        outlineStyle?: string | number | HookBindInfo;
        outlineWidth?: string | number | HookBindInfo;
        overflow?: string | number | HookBindInfo;
        overflowAnchor?: string | number | HookBindInfo;
        overflowClipMargin?: string | number | HookBindInfo;
        overflowWrap?: string | number | HookBindInfo;
        overflowX?: string | number | HookBindInfo;
        overflowY?: string | number | HookBindInfo;
        overscrollBehavior?: string | number | HookBindInfo;
        overscrollBehaviorBlock?: string | number | HookBindInfo;
        overscrollBehaviorInline?: string | number | HookBindInfo;
        overscrollBehaviorX?: string | number | HookBindInfo;
        overscrollBehaviorY?: string | number | HookBindInfo;
        padding?: string | number | HookBindInfo;
        paddingBlock?: string | number | HookBindInfo;
        paddingBlockEnd?: string | number | HookBindInfo;
        paddingBlockStart?: string | number | HookBindInfo;
        paddingBottom?: string | number | HookBindInfo;
        paddingInline?: string | number | HookBindInfo;
        paddingInlineEnd?: string | number | HookBindInfo;
        paddingInlineStart?: string | number | HookBindInfo;
        paddingLeft?: string | number | HookBindInfo;
        paddingRight?: string | number | HookBindInfo;
        paddingTop?: string | number | HookBindInfo;
        pageBreakAfter?: string | number | HookBindInfo;
        pageBreakBefore?: string | number | HookBindInfo;
        pageBreakInside?: string | number | HookBindInfo;
        paintOrder?: string | number | HookBindInfo;
        parentRule?: string | number | HookBindInfo;
        perspective?: string | number | HookBindInfo;
        perspectiveOrigin?: string | number | HookBindInfo;
        placeContent?: string | number | HookBindInfo;
        placeItems?: string | number | HookBindInfo;
        placeSelf?: string | number | HookBindInfo;
        pointerEvents?: string | number | HookBindInfo;
        position?: string | number | HookBindInfo;
        printColorAdjust?: string | number | HookBindInfo;
        quotes?: string | number | HookBindInfo;
        resize?: string | number | HookBindInfo;
        right?: string | number | HookBindInfo;
        rotate?: string | number | HookBindInfo;
        rowGap?: string | number | HookBindInfo;
        rubyPosition?: string | number | HookBindInfo;
        scale?: string | number | HookBindInfo;
        scrollBehavior?: string | number | HookBindInfo;
        scrollMargin?: string | number | HookBindInfo;
        scrollMarginBlock?: string | number | HookBindInfo;
        scrollMarginBlockEnd?: string | number | HookBindInfo;
        scrollMarginBlockStart?: string | number | HookBindInfo;
        scrollMarginBottom?: string | number | HookBindInfo;
        scrollMarginInline?: string | number | HookBindInfo;
        scrollMarginInlineEnd?: string | number | HookBindInfo;
        scrollMarginInlineStart?: string | number | HookBindInfo;
        scrollMarginLeft?: string | number | HookBindInfo;
        scrollMarginRight?: string | number | HookBindInfo;
        scrollMarginTop?: string | number | HookBindInfo;
        scrollPadding?: string | number | HookBindInfo;
        scrollPaddingBlock?: string | number | HookBindInfo;
        scrollPaddingBlockEnd?: string | number | HookBindInfo;
        scrollPaddingBlockStart?: string | number | HookBindInfo;
        scrollPaddingBottom?: string | number | HookBindInfo;
        scrollPaddingInline?: string | number | HookBindInfo;
        scrollPaddingInlineEnd?: string | number | HookBindInfo;
        scrollPaddingInlineStart?: string | number | HookBindInfo;
        scrollPaddingLeft?: string | number | HookBindInfo;
        scrollPaddingRight?: string | number | HookBindInfo;
        scrollPaddingTop?: string | number | HookBindInfo;
        scrollSnapAlign?: string | number | HookBindInfo;
        scrollSnapStop?: string | number | HookBindInfo;
        scrollSnapType?: string | number | HookBindInfo;
        scrollbarGutter?: string | number | HookBindInfo;
        shapeImageThreshold?: string | number | HookBindInfo;
        shapeMargin?: string | number | HookBindInfo;
        shapeOutside?: string | number | HookBindInfo;
        shapeRendering?: string | number | HookBindInfo;
        stopColor?: string | number | HookBindInfo;
        stopOpacity?: string | number | HookBindInfo;
        stroke?: string | number | HookBindInfo;
        strokeDasharray?: string | number | HookBindInfo;
        strokeDashoffset?: string | number | HookBindInfo;
        strokeLinecap?: string | number | HookBindInfo;
        strokeLinejoin?: string | number | HookBindInfo;
        strokeMiterlimit?: string | number | HookBindInfo;
        strokeOpacity?: string | number | HookBindInfo;
        strokeWidth?: string | number | HookBindInfo;
        tabSize?: string | number | HookBindInfo;
        tableLayout?: string | number | HookBindInfo;
        textAlign?: string | number | HookBindInfo;
        textAlignLast?: string | number | HookBindInfo;
        textAnchor?: string | number | HookBindInfo;
        textCombineUpright?: string | number | HookBindInfo;
        textDecoration?: string | number | HookBindInfo;
        textDecorationColor?: string | number | HookBindInfo;
        textDecorationLine?: string | number | HookBindInfo;
        textDecorationSkipInk?: string | number | HookBindInfo;
        textDecorationStyle?: string | number | HookBindInfo;
        textDecorationThickness?: string | number | HookBindInfo;
        textEmphasis?: string | number | HookBindInfo;
        textEmphasisColor?: string | number | HookBindInfo;
        textEmphasisPosition?: string | number | HookBindInfo;
        textEmphasisStyle?: string | number | HookBindInfo;
        textIndent?: string | number | HookBindInfo;
        textOrientation?: string | number | HookBindInfo;
        textOverflow?: string | number | HookBindInfo;
        textRendering?: string | number | HookBindInfo;
        textShadow?: string | number | HookBindInfo;
        textTransform?: string | number | HookBindInfo;
        textUnderlineOffset?: string | number | HookBindInfo;
        textUnderlinePosition?: string | number | HookBindInfo;
        touchAction?: string | number | HookBindInfo;
        transform?: string | number | HookBindInfo;
        transformBox?: string | number | HookBindInfo;
        transformOrigin?: string | number | HookBindInfo;
        transformStyle?: string | number | HookBindInfo;
        transition?: string | number | HookBindInfo;
        transitionDelay?: string | number | HookBindInfo;
        transitionDuration?: string | number | HookBindInfo;
        transitionProperty?: string | number | HookBindInfo;
        transitionTimingFunction?: string | number | HookBindInfo;
        translate?: string | number | HookBindInfo;
        unicodeBidi?: string | number | HookBindInfo;
        userSelect?: string | number | HookBindInfo;
        verticalAlign?: string | number | HookBindInfo;
        visibility?: string | number | HookBindInfo;
        webkitAlignContent?: string | number | HookBindInfo;
        webkitAlignItems?: string | number | HookBindInfo;
        webkitAlignSelf?: string | number | HookBindInfo;
        webkitAnimation?: string | number | HookBindInfo;
        webkitAnimationDelay?: string | number | HookBindInfo;
        webkitAnimationDirection?: string | number | HookBindInfo;
        webkitAnimationDuration?: string | number | HookBindInfo;
        webkitAnimationFillMode?: string | number | HookBindInfo;
        webkitAnimationIterationCount?: string | number | HookBindInfo;
        webkitAnimationName?: string | number | HookBindInfo;
        webkitAnimationPlayState?: string | number | HookBindInfo;
        webkitAnimationTimingFunction?: string | number | HookBindInfo;
        webkitAppearance?: string | number | HookBindInfo;
        webkitBackfaceVisibility?: string | number | HookBindInfo;
        webkitBackgroundClip?: string | number | HookBindInfo;
        webkitBackgroundOrigin?: string | number | HookBindInfo;
        webkitBackgroundSize?: string | number | HookBindInfo;
        webkitBorderBottomLeftRadius?: string | number | HookBindInfo;
        webkitBorderBottomRightRadius?: string | number | HookBindInfo;
        webkitBorderRadius?: string | number | HookBindInfo;
        webkitBorderTopLeftRadius?: string | number | HookBindInfo;
        webkitBorderTopRightRadius?: string | number | HookBindInfo;
        webkitBoxAlign?: string | number | HookBindInfo;
        webkitBoxFlex?: string | number | HookBindInfo;
        webkitBoxOrdinalGroup?: string | number | HookBindInfo;
        webkitBoxOrient?: string | number | HookBindInfo;
        webkitBoxPack?: string | number | HookBindInfo;
        webkitBoxShadow?: string | number | HookBindInfo;
        webkitBoxSizing?: string | number | HookBindInfo;
        webkitFilter?: string | number | HookBindInfo;
        webkitFlex?: string | number | HookBindInfo;
        webkitFlexBasis?: string | number | HookBindInfo;
        webkitFlexDirection?: string | number | HookBindInfo;
        webkitFlexFlow?: string | number | HookBindInfo;
        webkitFlexGrow?: string | number | HookBindInfo;
        webkitFlexShrink?: string | number | HookBindInfo;
        webkitFlexWrap?: string | number | HookBindInfo;
        webkitJustifyContent?: string | number | HookBindInfo;
        webkitLineClamp?: string | number | HookBindInfo;
        webkitMask?: string | number | HookBindInfo;
        webkitMaskBoxImage?: string | number | HookBindInfo;
        webkitMaskBoxImageOutset?: string | number | HookBindInfo;
        webkitMaskBoxImageRepeat?: string | number | HookBindInfo;
        webkitMaskBoxImageSlice?: string | number | HookBindInfo;
        webkitMaskBoxImageSource?: string | number | HookBindInfo;
        webkitMaskBoxImageWidth?: string | number | HookBindInfo;
        webkitMaskClip?: string | number | HookBindInfo;
        webkitMaskComposite?: string | number | HookBindInfo;
        webkitMaskImage?: string | number | HookBindInfo;
        webkitMaskOrigin?: string | number | HookBindInfo;
        webkitMaskPosition?: string | number | HookBindInfo;
        webkitMaskRepeat?: string | number | HookBindInfo;
        webkitMaskSize?: string | number | HookBindInfo;
        webkitOrder?: string | number | HookBindInfo;
        webkitPerspective?: string | number | HookBindInfo;
        webkitPerspectiveOrigin?: string | number | HookBindInfo;
        webkitTextFillColor?: string | number | HookBindInfo;
        webkitTextSizeAdjust?: string | number | HookBindInfo;
        webkitTextStroke?: string | number | HookBindInfo;
        webkitTextStrokeColor?: string | number | HookBindInfo;
        webkitTextStrokeWidth?: string | number | HookBindInfo;
        webkitTransform?: string | number | HookBindInfo;
        webkitTransformOrigin?: string | number | HookBindInfo;
        webkitTransformStyle?: string | number | HookBindInfo;
        webkitTransition?: string | number | HookBindInfo;
        webkitTransitionDelay?: string | number | HookBindInfo;
        webkitTransitionDuration?: string | number | HookBindInfo;
        webkitTransitionProperty?: string | number | HookBindInfo;
        webkitTransitionTimingFunction?: string | number | HookBindInfo;
        webkitUserSelect?: string | number | HookBindInfo;
        whiteSpace?: string | number | HookBindInfo;
        widows?: string | number | HookBindInfo;
        willChange?: string | number | HookBindInfo;
        wordBreak?: string | number | HookBindInfo;
        wordSpacing?: string | number | HookBindInfo;
        wordWrap?: string | number | HookBindInfo;
        writingMode?: string | number | HookBindInfo;
        zIndex?: string | number | HookBindInfo;
        getPropertyPriority?: string | number | HookBindInfo;
        getPropertyValue?: string | number | HookBindInfo;
        removeProperty?: string | number | HookBindInfo;
        setProperty?: string | number | HookBindInfo;
    }): void;
    /**
     * 修改文本
     * @param {string} text
     */
    setText(text: string): void;
    /**
     * 添加文本
     * @param {string} text
     * @returns {Text}
     */
    addText(text: string): Text;
    /**
     * 设置HTMLElement属性
     * @param {string} key
     * @param {string} value
     */
    setAttr(key: string, value: string): void;
    /**
     * 设置多个HTMLElement属性
     * @param {Object<string, string>} obj
     */
    setAttrs(obj: {
        [x: string]: string;
    }): void;
    /**
     * 设置元素可见性
     * @param {"block" | "inline" | "flex" | "none" | "inline-block" | string} s
     */
    setDisplay(s: "block" | "inline" | "flex" | "none" | "inline-block" | string): void;
    /**
     * 添加事件监听器
     * @template {keyof HTMLElementEventMap} K
     * @param {K} eventName
     * @param {function(HTMLElementEventMap[K]): any} callBack
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener<K extends keyof HTMLElementEventMap>(eventName: K, callBack: (arg0: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    /**
     * 移除事件监听器
     * @param {string} eventName
     * @param {function(Event) : void} callBack
     * @param {boolean | EventListenerOptions} [options]
     */
    removeEventListener(eventName: string, callBack: (arg0: Event) => void, options?: boolean | EventListenerOptions | undefined): void;
    /**
     * 执行动画
     * @param {Array<Keyframe> | PropertyIndexedKeyframes} keyframes
     * @param {number | KeyframeAnimationOptions} options
     * @returns {Animation}
     */
    animate(keyframes: Array<Keyframe> | PropertyIndexedKeyframes, options: number | KeyframeAnimationOptions): Animation;
    /**
     * 执行动画并提交
     * 在执行完成动画后将最后的效果提交到style
     * @param {Array<Keyframe> | PropertyIndexedKeyframes} keyframes
     * @param {number | KeyframeAnimationOptions} options
     * @returns {Promise<void>} 动画执行完后返回
     */
    animateCommit(keyframes: Array<Keyframe> | PropertyIndexedKeyframes, options: number | KeyframeAnimationOptions): Promise<void>;
    /**
     * 流水线
     * @param {function(NElement): void} asseFunc 流水线函数(无视返回值)
     * @returns {NElement} 返回本身
     */
    asse(asseFunc: (arg0: NElement<any>) => void): NElement<any>;
    /**
     * 获取标签名
     * 标签名使用小写字母
     * @returns {keyof HTMLElementTagNameMap}
     */
    getTagName(): keyof HTMLElementTagNameMap;
    /**
     * 应用NList到元素
     * @param {NList | ConstructorParameters<typeof NList>[0]} list
     * @returns {NElement} 返回被操作的NElement
     */
    applyNList(list: NList | ConstructorParameters<typeof NList>[0]): NElement<any>;
}

/**
 * 标签名
 * 标签名使用小写字母
 * 不包含此类的特征列表默认为div
 * 一层特征列表只能有唯一tagName (或等价的)
 * @template {keyof HTMLElementTagNameMap} T
 */
declare class NTagName<T extends keyof HTMLElementTagNameMap> {
    /**
     * @param {T} tagName
     */
    constructor(tagName: T);
    /**
     * @type {T}
     */
    tagName: T;
}

/**
 * @typedef {(keyof HTMLElement & string) | (string & {})} keyObjectOfHtmlElementAttr
 */
/**
 * 属性
 * @template {keyObjectOfHtmlElementAttr} T
 */
declare class NAttr<T extends keyObjectOfHtmlElementAttr> {
    /**
     * @param {T} key
     * @param {string | number | boolean | Function} value
     */
    constructor(key: T, value: string | number | boolean | Function);
    /**
     * @type {T}
     */
    key: T;
    /**
     * 若为函数则应用时调用
     * 若有返回值则赋值到属性
     * @type {string | number | boolean | Function}
     */
    value: string | number | boolean | Function;
    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement").NElement} e
     */
    apply(e: NElement<any>): void;
}
type keyObjectOfHtmlElementAttr = (keyof HTMLElement & string) | (string & {});

/**
 * 事件
 * @template {keyof HTMLElementEventMap} T
 */
declare class NEvent<T extends keyof HTMLElementEventMap> {
    /**
     * @param {T} key
     * @param {(event: HTMLElementEventMap[T], currentElement: import("../node/NElement").NElement) => void} callback
     */
    constructor(key: T, callback: (event: HTMLElementEventMap[T], currentElement: NElement<any>) => void);
    /**
     * @type {T}
     */
    eventName: T;
    /**
     * @type {(event: HTMLElementEventMap[T], currentElement: import("../node/NElement").NElement) => void}
     */
    callback: (event: HTMLElementEventMap[T], currentElement: NElement<any>) => void;
    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement").NElement} element
     */
    apply(element: NElement<any>): void;
}

/**
 * 流水线
 */
declare class NAsse {
    /**
     * @param {function(import("../node/NElement").NElement): void} callback
     */
    constructor(callback: (arg0: NElement<any>) => void);
    /**
     * @type {function(import("../node/NElement").NElement): void}
     */
    callback: (arg0: NElement<any>) => void;
    /**
     * 将此特征应用于元素
     * @param {import("../node/NElement").NElement} e
     */
    apply(e: NElement<any>): void;
}

/**
 * 特征列表
 * @typedef {Array<string | HookBindInfo | NTagName | NStyle | NAttr | NEvent | NAsse | NList | NList_list | NElement | NText | NLocate | ((e: NElement) => void)>} NList_list
 * @typedef {NList_list[number]} NList_item
 */
declare class NList {
    /**
     * 生成拉平列表
     * @param {NList_list} list
     */
    static flat(list: NList_list$1): NList;
    /**
     * 获取(生成)元素
     * @param {NList_list} list
     */
    static getElement(list: NList_list$1): NElement<any>;
    /**
     * @param {NList_list} list
     */
    constructor(list: NList_list$1);
    /**
     * @type {NList_list}
     */
    list: NList_list$1;
    /**
     * 拉平特征
     * (默认)标记为false将作为子元素节点
     * 标记为true将作为上层节点的特征列表
     * @type {boolean}
     */
    flatFlag: boolean;
    /**
     * 为元素应用特征列表
     * @param {NElement<HTMLElement>} element
     */
    apply(element: NElement<HTMLElement>): void;
    /**
     * 获取列表的标签名
     * @returns {string}
     */
    getTagName(): string;
    /**
     * 获取(生成)元素
     * @returns {NElement}
     */
    getElement(): NElement<any>;
}
/**
 * 特征列表
 */
type NList_list$1 = (string | HookBindInfo | NElement<any> | NLocate | NText$1 | NAsse | NList | NList_list$1 | NTagName<any> | NStyle<any> | NAttr<any> | NEvent<any> | ((e: NElement<any>) => void))[];

declare namespace cssG {
    function diFull(value: string): string;
    function rgb(r: string | number, g: string | number, b: string | number, a?: string | number | undefined): string;
}

/**
 * 绑定元素属性到对象作为getter/setter
 * @template {Object} T
 * @param {string} attrName
 * @param {T} obj
 * @param {(keyof T) | (string & {})} key
 * @param {boolean} [noInitialize] 不将对象中原来的值赋给元素属性
 * @returns {(element: NElement) => void} 流水线函数
 */
declare function bindAttribute<T extends unknown>(attrName: string, obj: T, key: (string & {}) | keyof T, noInitialize?: boolean | undefined): (element: NElement<any>) => void;

/**
 * 展开元素
 * 将内容js对象转换为封装的HTML树
 * 请不要转换不受信任的json
 * @param {EDObj} obj EleData格式的对象
 * @returns {NElement}
*/
declare function expandElement(obj: EDObj): NElement<any>;
/**
 * 遍历展开元素
 */
type EDObj = {
    [x: string]: any;
    id?: string;
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
    position?: "static" | "absolute" | "relative" | "fixed" | string;
    display?: "block" | "inline" | "none" | "inline-block" | string;
    overflow?: "visible" | "hidden" | "scroll" | "auto" | string;
    tagName?: string;
    classList?: Array<string>;
    text?: string;
    style?: {
        [x: number]: string | number | undefined;
        length?: string | number;
        filter?: string | number;
        fill?: string | number;
        animationName?: string | number;
        all?: string | number;
        offset?: string | number;
        height?: string | number;
        width?: string | number;
        left?: string | number;
        top?: string | number;
        item?: string | number;
        accentColor?: string | number;
        alignContent?: string | number;
        alignItems?: string | number;
        alignSelf?: string | number;
        alignmentBaseline?: string | number;
        animation?: string | number;
        animationDelay?: string | number;
        animationDirection?: string | number;
        animationDuration?: string | number;
        animationFillMode?: string | number;
        animationIterationCount?: string | number;
        animationPlayState?: string | number;
        animationTimingFunction?: string | number;
        appearance?: string | number;
        aspectRatio?: string | number;
        backdropFilter?: string | number;
        backfaceVisibility?: string | number;
        background?: string | number;
        backgroundAttachment?: string | number;
        backgroundBlendMode?: string | number;
        backgroundClip?: string | number;
        backgroundColor?: string | number;
        backgroundImage?: string | number;
        backgroundOrigin?: string | number;
        backgroundPosition?: string | number;
        backgroundPositionX?: string | number;
        backgroundPositionY?: string | number;
        backgroundRepeat?: string | number;
        backgroundSize?: string | number;
        baselineShift?: string | number;
        blockSize?: string | number;
        border?: string | number;
        borderBlock?: string | number;
        borderBlockColor?: string | number;
        borderBlockEnd?: string | number;
        borderBlockEndColor?: string | number;
        borderBlockEndStyle?: string | number;
        borderBlockEndWidth?: string | number;
        borderBlockStart?: string | number;
        borderBlockStartColor?: string | number;
        borderBlockStartStyle?: string | number;
        borderBlockStartWidth?: string | number;
        borderBlockStyle?: string | number;
        borderBlockWidth?: string | number;
        borderBottom?: string | number;
        borderBottomColor?: string | number;
        borderBottomLeftRadius?: string | number;
        borderBottomRightRadius?: string | number;
        borderBottomStyle?: string | number;
        borderBottomWidth?: string | number;
        borderCollapse?: string | number;
        borderColor?: string | number;
        borderEndEndRadius?: string | number;
        borderEndStartRadius?: string | number;
        borderImage?: string | number;
        borderImageOutset?: string | number;
        borderImageRepeat?: string | number;
        borderImageSlice?: string | number;
        borderImageSource?: string | number;
        borderImageWidth?: string | number;
        borderInline?: string | number;
        borderInlineColor?: string | number;
        borderInlineEnd?: string | number;
        borderInlineEndColor?: string | number;
        borderInlineEndStyle?: string | number;
        borderInlineEndWidth?: string | number;
        borderInlineStart?: string | number;
        borderInlineStartColor?: string | number;
        borderInlineStartStyle?: string | number;
        borderInlineStartWidth?: string | number;
        borderInlineStyle?: string | number;
        borderInlineWidth?: string | number;
        borderLeft?: string | number;
        borderLeftColor?: string | number;
        borderLeftStyle?: string | number;
        borderLeftWidth?: string | number;
        borderRadius?: string | number;
        borderRight?: string | number;
        borderRightColor?: string | number;
        borderRightStyle?: string | number;
        borderRightWidth?: string | number;
        borderSpacing?: string | number;
        borderStartEndRadius?: string | number;
        borderStartStartRadius?: string | number;
        borderStyle?: string | number;
        borderTop?: string | number;
        borderTopColor?: string | number;
        borderTopLeftRadius?: string | number;
        borderTopRightRadius?: string | number;
        borderTopStyle?: string | number;
        borderTopWidth?: string | number;
        borderWidth?: string | number;
        bottom?: string | number;
        boxShadow?: string | number;
        boxSizing?: string | number;
        breakAfter?: string | number;
        breakBefore?: string | number;
        breakInside?: string | number;
        captionSide?: string | number;
        caretColor?: string | number;
        clear?: string | number;
        clip?: string | number;
        clipPath?: string | number;
        clipRule?: string | number;
        color?: string | number;
        colorInterpolation?: string | number;
        colorInterpolationFilters?: string | number;
        colorScheme?: string | number;
        columnCount?: string | number;
        columnFill?: string | number;
        columnGap?: string | number;
        columnRule?: string | number;
        columnRuleColor?: string | number;
        columnRuleStyle?: string | number;
        columnRuleWidth?: string | number;
        columnSpan?: string | number;
        columnWidth?: string | number;
        columns?: string | number;
        contain?: string | number;
        container?: string | number;
        containerName?: string | number;
        containerType?: string | number;
        content?: string | number;
        counterIncrement?: string | number;
        counterReset?: string | number;
        counterSet?: string | number;
        cssFloat?: string | number;
        cssText?: string | number;
        cursor?: string | number;
        direction?: string | number;
        display?: string | number;
        dominantBaseline?: string | number;
        emptyCells?: string | number;
        fillOpacity?: string | number;
        fillRule?: string | number;
        flex?: string | number;
        flexBasis?: string | number;
        flexDirection?: string | number;
        flexFlow?: string | number;
        flexGrow?: string | number;
        flexShrink?: string | number;
        flexWrap?: string | number;
        float?: string | number;
        floodColor?: string | number;
        floodOpacity?: string | number;
        font?: string | number;
        fontFamily?: string | number;
        fontFeatureSettings?: string | number;
        fontKerning?: string | number;
        fontOpticalSizing?: string | number;
        fontPalette?: string | number;
        fontSize?: string | number;
        fontSizeAdjust?: string | number;
        fontStretch?: string | number;
        fontStyle?: string | number;
        fontSynthesis?: string | number;
        fontVariant?: string | number;
        fontVariantAlternates?: string | number;
        fontVariantCaps?: string | number;
        fontVariantEastAsian?: string | number;
        fontVariantLigatures?: string | number;
        fontVariantNumeric?: string | number;
        fontVariantPosition?: string | number;
        fontVariationSettings?: string | number;
        fontWeight?: string | number;
        gap?: string | number;
        grid?: string | number;
        gridArea?: string | number;
        gridAutoColumns?: string | number;
        gridAutoFlow?: string | number;
        gridAutoRows?: string | number;
        gridColumn?: string | number;
        gridColumnEnd?: string | number;
        gridColumnGap?: string | number;
        gridColumnStart?: string | number;
        gridGap?: string | number;
        gridRow?: string | number;
        gridRowEnd?: string | number;
        gridRowGap?: string | number;
        gridRowStart?: string | number;
        gridTemplate?: string | number;
        gridTemplateAreas?: string | number;
        gridTemplateColumns?: string | number;
        gridTemplateRows?: string | number;
        hyphenateCharacter?: string | number;
        hyphens?: string | number;
        imageOrientation?: string | number;
        imageRendering?: string | number;
        inlineSize?: string | number;
        inset?: string | number;
        insetBlock?: string | number;
        insetBlockEnd?: string | number;
        insetBlockStart?: string | number;
        insetInline?: string | number;
        insetInlineEnd?: string | number;
        insetInlineStart?: string | number;
        isolation?: string | number;
        justifyContent?: string | number;
        justifyItems?: string | number;
        justifySelf?: string | number;
        letterSpacing?: string | number;
        lightingColor?: string | number;
        lineBreak?: string | number;
        lineHeight?: string | number;
        listStyle?: string | number;
        listStyleImage?: string | number;
        listStylePosition?: string | number;
        listStyleType?: string | number;
        margin?: string | number;
        marginBlock?: string | number;
        marginBlockEnd?: string | number;
        marginBlockStart?: string | number;
        marginBottom?: string | number;
        marginInline?: string | number;
        marginInlineEnd?: string | number;
        marginInlineStart?: string | number;
        marginLeft?: string | number;
        marginRight?: string | number;
        marginTop?: string | number;
        marker?: string | number;
        markerEnd?: string | number;
        markerMid?: string | number;
        markerStart?: string | number;
        mask?: string | number;
        maskClip?: string | number;
        maskComposite?: string | number;
        maskImage?: string | number;
        maskMode?: string | number;
        maskOrigin?: string | number;
        maskPosition?: string | number;
        maskRepeat?: string | number;
        maskSize?: string | number;
        maskType?: string | number;
        maxBlockSize?: string | number;
        maxHeight?: string | number;
        maxInlineSize?: string | number;
        maxWidth?: string | number;
        minBlockSize?: string | number;
        minHeight?: string | number;
        minInlineSize?: string | number;
        minWidth?: string | number;
        mixBlendMode?: string | number;
        objectFit?: string | number;
        objectPosition?: string | number;
        offsetDistance?: string | number;
        offsetPath?: string | number;
        offsetRotate?: string | number;
        opacity?: string | number;
        order?: string | number;
        orphans?: string | number;
        outline?: string | number;
        outlineColor?: string | number;
        outlineOffset?: string | number;
        outlineStyle?: string | number;
        outlineWidth?: string | number;
        overflow?: string | number;
        overflowAnchor?: string | number;
        overflowClipMargin?: string | number;
        overflowWrap?: string | number;
        overflowX?: string | number;
        overflowY?: string | number;
        overscrollBehavior?: string | number;
        overscrollBehaviorBlock?: string | number;
        overscrollBehaviorInline?: string | number;
        overscrollBehaviorX?: string | number;
        overscrollBehaviorY?: string | number;
        padding?: string | number;
        paddingBlock?: string | number;
        paddingBlockEnd?: string | number;
        paddingBlockStart?: string | number;
        paddingBottom?: string | number;
        paddingInline?: string | number;
        paddingInlineEnd?: string | number;
        paddingInlineStart?: string | number;
        paddingLeft?: string | number;
        paddingRight?: string | number;
        paddingTop?: string | number;
        pageBreakAfter?: string | number;
        pageBreakBefore?: string | number;
        pageBreakInside?: string | number;
        paintOrder?: string | number;
        parentRule?: string | number;
        perspective?: string | number;
        perspectiveOrigin?: string | number;
        placeContent?: string | number;
        placeItems?: string | number;
        placeSelf?: string | number;
        pointerEvents?: string | number;
        position?: string | number;
        printColorAdjust?: string | number;
        quotes?: string | number;
        resize?: string | number;
        right?: string | number;
        rotate?: string | number;
        rowGap?: string | number;
        rubyPosition?: string | number;
        scale?: string | number;
        scrollBehavior?: string | number;
        scrollMargin?: string | number;
        scrollMarginBlock?: string | number;
        scrollMarginBlockEnd?: string | number;
        scrollMarginBlockStart?: string | number;
        scrollMarginBottom?: string | number;
        scrollMarginInline?: string | number;
        scrollMarginInlineEnd?: string | number;
        scrollMarginInlineStart?: string | number;
        scrollMarginLeft?: string | number;
        scrollMarginRight?: string | number;
        scrollMarginTop?: string | number;
        scrollPadding?: string | number;
        scrollPaddingBlock?: string | number;
        scrollPaddingBlockEnd?: string | number;
        scrollPaddingBlockStart?: string | number;
        scrollPaddingBottom?: string | number;
        scrollPaddingInline?: string | number;
        scrollPaddingInlineEnd?: string | number;
        scrollPaddingInlineStart?: string | number;
        scrollPaddingLeft?: string | number;
        scrollPaddingRight?: string | number;
        scrollPaddingTop?: string | number;
        scrollSnapAlign?: string | number;
        scrollSnapStop?: string | number;
        scrollSnapType?: string | number;
        scrollbarGutter?: string | number;
        shapeImageThreshold?: string | number;
        shapeMargin?: string | number;
        shapeOutside?: string | number;
        shapeRendering?: string | number;
        stopColor?: string | number;
        stopOpacity?: string | number;
        stroke?: string | number;
        strokeDasharray?: string | number;
        strokeDashoffset?: string | number;
        strokeLinecap?: string | number;
        strokeLinejoin?: string | number;
        strokeMiterlimit?: string | number;
        strokeOpacity?: string | number;
        strokeWidth?: string | number;
        tabSize?: string | number;
        tableLayout?: string | number;
        textAlign?: string | number;
        textAlignLast?: string | number;
        textAnchor?: string | number;
        textCombineUpright?: string | number;
        textDecoration?: string | number;
        textDecorationColor?: string | number;
        textDecorationLine?: string | number;
        textDecorationSkipInk?: string | number;
        textDecorationStyle?: string | number;
        textDecorationThickness?: string | number;
        textEmphasis?: string | number;
        textEmphasisColor?: string | number;
        textEmphasisPosition?: string | number;
        textEmphasisStyle?: string | number;
        textIndent?: string | number;
        textOrientation?: string | number;
        textOverflow?: string | number;
        textRendering?: string | number;
        textShadow?: string | number;
        textTransform?: string | number;
        textUnderlineOffset?: string | number;
        textUnderlinePosition?: string | number;
        touchAction?: string | number;
        transform?: string | number;
        transformBox?: string | number;
        transformOrigin?: string | number;
        transformStyle?: string | number;
        transition?: string | number;
        transitionDelay?: string | number;
        transitionDuration?: string | number;
        transitionProperty?: string | number;
        transitionTimingFunction?: string | number;
        translate?: string | number;
        unicodeBidi?: string | number;
        userSelect?: string | number;
        verticalAlign?: string | number;
        visibility?: string | number;
        webkitAlignContent?: string | number;
        webkitAlignItems?: string | number;
        webkitAlignSelf?: string | number;
        webkitAnimation?: string | number;
        webkitAnimationDelay?: string | number;
        webkitAnimationDirection?: string | number;
        webkitAnimationDuration?: string | number;
        webkitAnimationFillMode?: string | number;
        webkitAnimationIterationCount?: string | number;
        webkitAnimationName?: string | number;
        webkitAnimationPlayState?: string | number;
        webkitAnimationTimingFunction?: string | number;
        webkitAppearance?: string | number;
        webkitBackfaceVisibility?: string | number;
        webkitBackgroundClip?: string | number;
        webkitBackgroundOrigin?: string | number;
        webkitBackgroundSize?: string | number;
        webkitBorderBottomLeftRadius?: string | number;
        webkitBorderBottomRightRadius?: string | number;
        webkitBorderRadius?: string | number;
        webkitBorderTopLeftRadius?: string | number;
        webkitBorderTopRightRadius?: string | number;
        webkitBoxAlign?: string | number;
        webkitBoxFlex?: string | number;
        webkitBoxOrdinalGroup?: string | number;
        webkitBoxOrient?: string | number;
        webkitBoxPack?: string | number;
        webkitBoxShadow?: string | number;
        webkitBoxSizing?: string | number;
        webkitFilter?: string | number;
        webkitFlex?: string | number;
        webkitFlexBasis?: string | number;
        webkitFlexDirection?: string | number;
        webkitFlexFlow?: string | number;
        webkitFlexGrow?: string | number;
        webkitFlexShrink?: string | number;
        webkitFlexWrap?: string | number;
        webkitJustifyContent?: string | number;
        webkitLineClamp?: string | number;
        webkitMask?: string | number;
        webkitMaskBoxImage?: string | number;
        webkitMaskBoxImageOutset?: string | number;
        webkitMaskBoxImageRepeat?: string | number;
        webkitMaskBoxImageSlice?: string | number;
        webkitMaskBoxImageSource?: string | number;
        webkitMaskBoxImageWidth?: string | number;
        webkitMaskClip?: string | number;
        webkitMaskComposite?: string | number;
        webkitMaskImage?: string | number;
        webkitMaskOrigin?: string | number;
        webkitMaskPosition?: string | number;
        webkitMaskRepeat?: string | number;
        webkitMaskSize?: string | number;
        webkitOrder?: string | number;
        webkitPerspective?: string | number;
        webkitPerspectiveOrigin?: string | number;
        webkitTextFillColor?: string | number;
        webkitTextSizeAdjust?: string | number;
        webkitTextStroke?: string | number;
        webkitTextStrokeColor?: string | number;
        webkitTextStrokeWidth?: string | number;
        webkitTransform?: string | number;
        webkitTransformOrigin?: string | number;
        webkitTransformStyle?: string | number;
        webkitTransition?: string | number;
        webkitTransitionDelay?: string | number;
        webkitTransitionDuration?: string | number;
        webkitTransitionProperty?: string | number;
        webkitTransitionTimingFunction?: string | number;
        webkitUserSelect?: string | number;
        whiteSpace?: string | number;
        widows?: string | number;
        willChange?: string | number;
        wordBreak?: string | number;
        wordSpacing?: string | number;
        wordWrap?: string | number;
        writingMode?: string | number;
        zIndex?: string | number;
        getPropertyPriority?: string | number;
        getPropertyValue?: string | number;
        removeProperty?: string | number;
        setProperty?: string | number;
    } | {
        [x: string]: string | number;
    };
    attr?: {
        [x: string]: string;
    };
    event?: {
        input?: (arg0: Event) => void;
        progress?: (arg0: Event) => void;
        error?: (arg0: Event) => void;
        pause?: (arg0: Event) => void;
        play?: (arg0: Event) => void;
        waiting?: (arg0: Event) => void;
        abort?: (arg0: Event) => void;
        cancel?: (arg0: Event) => void;
        ended?: (arg0: Event) => void;
        resize?: (arg0: Event) => void;
        copy?: (arg0: Event) => void;
        toggle?: (arg0: Event) => void;
        select?: (arg0: Event) => void;
        fullscreenchange?: (arg0: Event) => void;
        fullscreenerror?: (arg0: Event) => void;
        cut?: (arg0: Event) => void;
        paste?: (arg0: Event) => void;
        animationcancel?: (arg0: Event) => void;
        animationend?: (arg0: Event) => void;
        animationiteration?: (arg0: Event) => void;
        animationstart?: (arg0: Event) => void;
        auxclick?: (arg0: Event) => void;
        beforeinput?: (arg0: Event) => void;
        blur?: (arg0: Event) => void;
        canplay?: (arg0: Event) => void;
        canplaythrough?: (arg0: Event) => void;
        change?: (arg0: Event) => void;
        click?: (arg0: Event) => void;
        close?: (arg0: Event) => void;
        compositionend?: (arg0: Event) => void;
        compositionstart?: (arg0: Event) => void;
        compositionupdate?: (arg0: Event) => void;
        contextmenu?: (arg0: Event) => void;
        cuechange?: (arg0: Event) => void;
        dblclick?: (arg0: Event) => void;
        drag?: (arg0: Event) => void;
        dragend?: (arg0: Event) => void;
        dragenter?: (arg0: Event) => void;
        dragleave?: (arg0: Event) => void;
        dragover?: (arg0: Event) => void;
        dragstart?: (arg0: Event) => void;
        drop?: (arg0: Event) => void;
        durationchange?: (arg0: Event) => void;
        emptied?: (arg0: Event) => void;
        focus?: (arg0: Event) => void;
        focusin?: (arg0: Event) => void;
        focusout?: (arg0: Event) => void;
        formdata?: (arg0: Event) => void;
        gotpointercapture?: (arg0: Event) => void;
        invalid?: (arg0: Event) => void;
        keydown?: (arg0: Event) => void;
        keypress?: (arg0: Event) => void;
        keyup?: (arg0: Event) => void;
        load?: (arg0: Event) => void;
        loadeddata?: (arg0: Event) => void;
        loadedmetadata?: (arg0: Event) => void;
        loadstart?: (arg0: Event) => void;
        lostpointercapture?: (arg0: Event) => void;
        mousedown?: (arg0: Event) => void;
        mouseenter?: (arg0: Event) => void;
        mouseleave?: (arg0: Event) => void;
        mousemove?: (arg0: Event) => void;
        mouseout?: (arg0: Event) => void;
        mouseover?: (arg0: Event) => void;
        mouseup?: (arg0: Event) => void;
        playing?: (arg0: Event) => void;
        pointercancel?: (arg0: Event) => void;
        pointerdown?: (arg0: Event) => void;
        pointerenter?: (arg0: Event) => void;
        pointerleave?: (arg0: Event) => void;
        pointermove?: (arg0: Event) => void;
        pointerout?: (arg0: Event) => void;
        pointerover?: (arg0: Event) => void;
        pointerup?: (arg0: Event) => void;
        ratechange?: (arg0: Event) => void;
        reset?: (arg0: Event) => void;
        scroll?: (arg0: Event) => void;
        securitypolicyviolation?: (arg0: Event) => void;
        seeked?: (arg0: Event) => void;
        seeking?: (arg0: Event) => void;
        selectionchange?: (arg0: Event) => void;
        selectstart?: (arg0: Event) => void;
        slotchange?: (arg0: Event) => void;
        stalled?: (arg0: Event) => void;
        submit?: (arg0: Event) => void;
        suspend?: (arg0: Event) => void;
        timeupdate?: (arg0: Event) => void;
        touchcancel?: (arg0: Event) => void;
        touchend?: (arg0: Event) => void;
        touchmove?: (arg0: Event) => void;
        touchstart?: (arg0: Event) => void;
        transitioncancel?: (arg0: Event) => void;
        transitionend?: (arg0: Event) => void;
        transitionrun?: (arg0: Event) => void;
        transitionstart?: (arg0: Event) => void;
        volumechange?: (arg0: Event) => void;
        webkitanimationend?: (arg0: Event) => void;
        webkitanimationiteration?: (arg0: Event) => void;
        webkitanimationstart?: (arg0: Event) => void;
        webkittransitionend?: (arg0: Event) => void;
        wheel?: (arg0: Event) => void;
    } | {
        [x: string]: (arg0: Event) => void;
    };
    child?: Array<EDObj | NElement<any>>;
    assembly?: Array<(arg0: NElement<any>) => void | NElement<any>>;
};

/**
 * 鼠标(拖拽)事件处理
 * @param {NElement} element 绑定到元素
 * @param {function(PointerData):void} callBack 回调
 * @param {number} [button] 绑定的按键
 * @param {HTMLElement | Window} [extensionRegion] 延伸区域 (实际捕获鼠标移动和按钮抬起的区域)
 */
declare function mouseBind(element: NElement<any>, callBack: (arg0: PointerData$1) => void, button?: number | undefined, extensionRegion?: HTMLElement | Window | undefined): void;

/**
 * 触摸(拖拽) 事件处理
 * @param {NElement} element
 * @param {function(PointerData):void} callBack
 * @param {boolean} [preventDefault]
 */
declare function touchBind(element: NElement<any>, callBack: (arg0: PointerData$1) => void, preventDefault?: boolean | undefined): void;

/**
 * 键盘 事件处理
 * @param {HTMLElement} element
 * @param {function(KeyboardData) : void} callBack
 */
declare function keyboardBind(element: HTMLElement, callBack: (arg0: KeyboardData$1) => void): void;

/**
 * 包装为仅能执行一次的函数
 * @template P
 * @template R
 * @template {function(...P) : R} T
 * @param {T} func
 * @returns {T}
 */
declare function runOnce<P, R, T extends (...arg0: P[]) => R>(func: T): T;

/**
 * 事件处理器
 * 可以定多个事件响应函数
 * @template {*} T
 */
declare class EventHandler<T extends unknown> {
    /**
     * 回调列表
     * @type {Array<function(T): void>}
     */
    cbList: Array<(arg0: T) => void>;
    /**
     * 单次回调列表
     * @type {Array<function(T): void>}
     */
    onceCbList: Array<(arg0: T) => void>;
    /**
     * 添加响应函数
     * @param {function(T): void} cb
     */
    add(cb: (arg0: T) => void): void;
    /**
     * 添加单次响应函数
     * 触发一次事件后将不再响应
     * @param {function(T): void} cb
     */
    addOnce(cb: (arg0: T) => void): void;
    /**
     * 返回一个Primise
     * 下次响应时此primise将解决
     * @returns {Promise<T>}
     */
    oncePromise(): Promise<T>;
    /**
     * 移除响应函数
     * @param {function(T): void} cb
     */
    remove(cb: (arg0: T) => void): void;
    /**
     * 移除所有响应函数
     */
    removeAll(): void;
    /**
     * 触发事件
     * @param {T} e
     */
    trigger(e: T): void;
    /**
     * 存在监听器
     * @returns {boolean}
     */
    existListener(): boolean;
    #private;
}

/**
 * 判断第一个参数是否属于之后所有的参数
 * 第一个参数与任何一个之后的参数相等 返回true
 * 与任何一个都不相等 返回false
 * @param {any} k
 * @param  {Array<any>} s
 * @returns {boolean}
 */
declare function isAmong(k: any, ...s: Array<any>): boolean;

/**
 * 左右方向分割
 * @param {string} leftSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
declare function divideLayout_LR(leftSize: string, a: NElement<any> | EDObj, b: NElement<any> | EDObj): NElement<any>;
/**
 * 上下方向分割
 * @param {string} upSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
declare function divideLayout_UD(upSize: string, a: NElement<any> | EDObj, b: NElement<any> | EDObj): NElement<any>;
/**
 * 右左方向分割
 * @param {string} rightSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
declare function divideLayout_RL(rightSize: string, a: NElement<any> | EDObj, b: NElement<any> | EDObj): NElement<any>;
/**
 * 下上方向分割
 * @param {string} downSize
 * @param {NElement | import("./expandElement").EDObj} a
 * @param {NElement | import("./expandElement").EDObj} b
 * @returns {NElement}
 */
declare function divideLayout_DU(downSize: string, a: NElement<any> | EDObj, b: NElement<any> | EDObj): NElement<any>;

/**
 * 解析标签
 * 默认为div标签
 * @param {TemplateStringsArray} strings
 * @param {Array<parsingElementKeysType>} keys
 * @returns {NElement}
 */
declare function tag(strings: TemplateStringsArray, ...keys: Array<parsingElementKeysType>): NElement<any>;
/**
 * 解析指定标签名的标签
 * @param {string} name
 * @returns {function(TemplateStringsArray, ...parsingElementKeysType): NElement}
 */
declare function tagName(name: string): (arg0: TemplateStringsArray, ...args: parsingElementKeysType[]) => NElement<any>;
/**
 * 解析标签
 */
type parsingElementKeysType = NElement<any> | NStyle<any> | NEvent<any>;

/**
 * 创建对象的代理
 * @template {object} T
 * @param {T} srcObj
 * @returns {T}
 */
declare function createHookObj<T extends unknown>(srcObj: T): T;
/**
 * 获取代理对象中指定值的绑定信息
 * @template {Object} T
 * @param {T} proxyObj
 * @param {[(keyof T) | (string & {}) | symbol] | [((keyof T) | (string & {}) | symbol), ...Array<(keyof T) | (string & {}) | symbol>, function(...any): any]} keys
 * @returns {HookBindInfo}
 */
declare function bindValue<T extends unknown>(proxyObj: T, ...keys: [symbol | (string & {}) | keyof T] | [symbol | (string & {}) | keyof T, ...(symbol | (string & {}) | keyof T)[], (...arg0: any[]) => any]): HookBindInfo;

/**
 * 数组钩子绑定类
 *
 * @typedef {{
 *  set: (index: number, value: any) => void,
 *  add: (index: number, value: any) => void,
 *  del: (index: number) => void
 * }} callbackType
 */
declare class ArrayHookBind {
    /**
     * @param {Array} proxyArr
     * @param {Set<ArrayHookBind>} hookSet
     * @param {callbackType} callback
     */
    constructor(proxyArr: any[], hookSet: Set<ArrayHookBind>, callback: callbackType$2);
    /**
     * 触发此钩子 (设置)
     * @param {number} index
     * @param {any} value
     */
    emitSet(index: number, value: any): void;
    /**
     * 触发此钩子 (增加)
     * @param {number} index
     * @param {any} value
     */
    emitAdd(index: number, value: any): void;
    /**
     * 触发此钩子 (删除)
     * @param {number} index
     */
    emitDel(index: number): void;
    /**
     * 销毁此钩子
     * 销毁后钩子将不再自动触发
     */
    destroy(): void;
    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {ArrayHookBind} 返回自身
     */
    bindDestroy(targetObj: object): ArrayHookBind;
    #private;
}
/**
 * 数组钩子绑定类
 */
type callbackType$2 = {
    set: (index: number, value: any) => void;
    add: (index: number, value: any) => void;
    del: (index: number) => void;
};

/**
 * 创建数组的代理
 * @template {Array} T
 * @param {T} srcArray
 * @returns {T}
 */
declare function createHookArray<T extends any[]>(srcArray: T): T;
/**
 * 绑定数组的代理
 * 回调函数中不应当进行可能触发钩子的操作
 * @template {any} K
 * @param {Array<K>} proxyArray
 * @param {{
 *  set?: (index: number, value: K) => void;
 *  add: (index: number, value: K) => void;
 *  del: (index: number) => void;
 * }} callbacks
 * @param {{ noSet?: boolean, addExisting?: boolean }} [option]
 * @returns {ArrayHookBind}
 */
declare function bindArrayHook<K extends unknown>(proxyArray: K[], callbacks: {
    set?: (index: number, value: K) => void;
    add: (index: number, value: K) => void;
    del: (index: number) => void;
}, option?: {
    noSet?: boolean;
    addExisting?: boolean;
} | undefined): ArrayHookBind;

/**
 * Map钩子绑定类
 *
 * @typedef {{
 *  add: (key: any, value: any) => void | (() => void),
 *  set: (key: any, value: any) => void | (() => void),
 *  del: (key: any) => void
 * }} callbackType
 */
declare class MapHookBind {
    /**
     * @param {Map} proxyMap
     * @param {Set<MapHookBind>} hookSet
     * @param {callbackType} callback
     */
    constructor(proxyMap: Map<any, any>, hookSet: Set<MapHookBind>, callback: callbackType$1);
    /**
     * 触发此钩子 (增加)
     * @param {any} key
     * @param {any} value
     */
    emitAdd(key: any, value: any): void;
    /**
     * 触发此钩子 (设置)
     * @param {any} key
     * @param {any} value
     */
    emitSet(key: any, value: any): void;
    /**
     * 触发此钩子 (删除)
     * @param {any} key
     */
    emitDel(key: any): void;
    /**
     * 销毁此钩子
     * 销毁后钩子将不再自动触发
     */
    destroy(): void;
    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {MapHookBind} 返回自身
     */
    bindDestroy(targetObj: object): MapHookBind;
    #private;
}
/**
 * Map钩子绑定类
 */
type callbackType$1 = {
    add: (key: any, value: any) => void | (() => void);
    set: (key: any, value: any) => void | (() => void);
    del: (key: any) => void;
};

/**
 * 创建Map的代理
 * @template {Map} T
 * @param {T} srcMap
 * @returns {T}
 */
declare function createHookMap<T extends Map<any, any>>(srcMap: T): T;
/**
 * 绑定Map的代理
 * 回调函数中不应当进行可能触发钩子的操作
 * @template {any} K
 * @template {any} V
 * @param {Map<K, V>} proxyMap
 * @param {{
 *  add?: (key: K, value: V) => void | (() => void),
 *  set?: (key: K, value: V) => void | (() => void),
 *  del?: (key: K) => void
 * }} callbacks
 * @param {{ noSet?: boolean, addExisting?: boolean }} [option]
 * @returns {MapHookBind}
 */
declare function bindMapHook<K extends unknown, V extends unknown>(proxyMap: Map<K, V>, callbacks: {
    add?: (key: K, value: V) => void | (() => void);
    set?: (key: K, value: V) => void | (() => void);
    del?: (key: K) => void;
}, option?: {
    noSet?: boolean;
    addExisting?: boolean;
} | undefined): MapHookBind;

/**
 * Set钩子绑定类
 *
 * @typedef {{
 *  add: (value: any) => void | (() => void),
 *  del: (value: any) => void
 * }} callbackType
 */
declare class SetHookBind {
    /**
     * @param {Set} proxyMap
     * @param {Set<SetHookBind>} hookSet
     * @param {callbackType} callback
     */
    constructor(proxyMap: Set<any>, hookSet: Set<SetHookBind>, callback: callbackType);
    /**
     * 触发此钩子 (增加)
     * @param {any} value
     */
    emitAdd(value: any): void;
    /**
     * 触发此钩子 (删除)
     * @param {any} value
     */
    emitDel(value: any): void;
    /**
     * 销毁此钩子
     * 销毁后钩子将不再自动触发
     */
    destroy(): void;
    /**
     * 绑定销毁
     * 当目标对象释放时销毁
     * @param {object} targetObj
     * @returns {SetHookBind} 返回自身
     */
    bindDestroy(targetObj: object): SetHookBind;
    #private;
}
/**
 * Set钩子绑定类
 */
type callbackType = {
    add: (value: any) => void | (() => void);
    del: (value: any) => void;
};

/**
 * 创建Set的代理
 * @template {Set} T
 * @param {T} srcSet
 * @returns {T}
 */
declare function createHookSet<T extends Set<any>>(srcSet: T): T;
/**
 * 绑定Set的代理
 * 回调函数中不应当进行可能触发钩子的操作
 * @template {any} K
 * @param {Set<K>} proxySet
 * @param {{
 *  add?: (value: K) => void | (() => void),
 *  del?: (value: K) => void
 * }} callbacks
 * @param {{ addExisting?: boolean }} [option]
 * @returns {SetHookBind}
 */
declare function bindSetHook<K extends unknown>(proxySet: Set<K>, callbacks: {
    add?: (value: K) => void | (() => void);
    del?: (value: K) => void;
}, option?: {
    addExisting?: boolean;
} | undefined): SetHookBind;

/**
 * 异步延迟
 * 将创建一个Promise并在指定延迟时间后解决
 * @param {number} time 单位:毫秒
 * @returns {Promise<void>}
 */
declare function delayPromise(time: number): Promise<void>;
/**
 * 异步延迟带值
 * 将创建一个Promise并在指定延迟时间后解决
 * @template {any} T
 * @param {number} time 单位:毫秒
 * @param {T} resolveValue
 * @returns {Promise<T>}
 */
declare function delayPromiseWithResolve<T extends unknown>(time: number, resolveValue: T): Promise<T>;
/**
 * 异步延迟拒绝
 * 将创建一个Promise并在指定延迟时间后拒绝
 * @param {number} time 单位:毫秒
 * @param {any} rejectReason
 * @returns {Promise<void>}
 */
declare function delayPromiseWithReject(time: number, rejectReason: any): Promise<void>;

type NList_list = NList_list$1;
type NList_item = NList_list$1;
type PointerData = PointerData$1;
type KeyboardData = KeyboardData$1;

export { EventHandler, KeyboardData, NAsse, NAttr, NElement, NEvent, NList, NList_item, NList_list, NLocate, NStyle, NTagName, NText$1 as NText, PointerData, bindArrayHook, bindAttribute, bindMapHook, bindSetHook, bindValue, createHookArray, createHookMap, createHookObj, createHookSet, createNStyle, createNStyleList, cssG, delayPromise, delayPromiseWithReject, delayPromiseWithResolve, divideLayout_DU, divideLayout_LR, divideLayout_RL, divideLayout_UD, expandElement, getNElement, isAmong, keyboardBind, mouseBind, runOnce, tag, tagName, touchBind };
