declare namespace cssG {
    function diFull(value: string): string;
    function rgb(r: string | number, g: string | number, b: string | number, a?: string | number | undefined): string;
}

/**
 * 创建NStyle 省略new
 * @param {keyOfStyle} key
 * @param {string} value
 */
declare function createNStyle(key: keyOfStyle, value: string): NStyle<keyOfStyle>;
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
     * @param {string} value
     */
    constructor(key: T, value: string);
    /**
     * @type {T}
     */
    key: T;
    /**
     * @type {string}
     */
    value: string;
    /**
     * 将此特征应用于元素
     * @param {NElement} e
     */
    apply(e: NElement<any>): void;
}
type keyOfStyle = (keyof CSSStyleDeclaration & string) | (string & {});

/**
 * 根据HTMLElement对象获取NElement对象
 * 如果没有则生成
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
     * @param {ElementObjectType} elementObj
     */
    constructor(elementObj: ElementObjectType);
    /**
     * @type {ElementObjectType}
     */
    element: ElementObjectType;
    /**
     * 添加单个子节点
     * @param {NElement | HTMLElement} chi
     */
    addChild(chi: NElement<any> | HTMLElement): void;
    /**
     * 添加多个子节点
     * @param {Array<NElement | HTMLElement | Array<NElement | HTMLElement>>} chi
     */
    addChilds(...chi: Array<NElement<any> | HTMLElement | Array<NElement<any> | HTMLElement>>): void;
    /**
     * 插入单个子节点(在中间)
     * 如果此节点之前在树中则先移除后加入
     * @param {NElement} chi
     * @param {number | NElement} pos 添加到的位置 负数从后到前 超过范围添加到最后
     */
    insChild(chi: NElement<any>, pos: number | NElement<any>): void;
    /**
     * 查找子节点在当前节点中的位置
     * 从0开始
     * 不是子节点则返回-1
     * @param {NElement} chi
     * @returns {number}
     */
    childInd(chi: NElement<any>): number;
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
     * 修改样式
     * @param {import("../feature/NStyle").keyOfStyle} styleName
     * @param {string | number} value
     */
    setStyle(styleName: keyOfStyle, value: string | number): void;
    /**
     * 获取样式
     * @param {import("../feature/NStyle").keyOfStyle} styleName
     * @returns {string | number}
     */
    getStyle(styleName: keyOfStyle): string | number;
    /**
     * 修改多个样式
     * @param {{ [x in (import("../feature/NStyle").keyOfStyle)]?: string | number }} obj
     */
    setStyles(obj: {
        [x: string & {}]: string | number | undefined;
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
    }): void;
    /**
     * 修改文本
     * @param {string} text
     */
    setText(text: string): void;
    /**
     * 添加文本
     * @param {string} text
     */
    addText(text: string): void;
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
     */
    animate(keyframes: Array<Keyframe> | PropertyIndexedKeyframes, options: number | KeyframeAnimationOptions): void;
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
}

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
 * 流水线
 */
declare class NAsse {
    /**
     * @param {function(NElement): void} callback
     */
    constructor(callback: (arg0: NElement<any>) => void);
    /**
     * @type {function(NElement): void}
     */
    callback: (arg0: NElement<any>) => void;
    /**
     * 将此特征应用于元素
     * @param {NElement} e
     */
    apply(e: NElement<any>): void;
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
     * @param {NElement} e
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
     * @param {function(HTMLElementEventMap[T]): any} callback
     */
    constructor(key: T, callback: (arg0: HTMLElementEventMap[T]) => any);
    /**
     * @type {T}
     */
    eventName: T;
    /**
     * @type {function(HTMLElementEventMap[T]): any}
     */
    callback: (arg0: HTMLElementEventMap[T]) => any;
    /**
     * 将此特征应用于元素
     * @param {NElement} e
     */
    apply(e: NElement<any>): void;
}

/**
 * 标签名
 * 标签名使用小写字母
 * 不包含此类的特征列表默认为div
 * 一层特征列表只能有唯一tagName
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
 * 特征列表
 * @typedef {Array<string | NTagName | NStyle | NAttr | NEvent | NAsse | NList | NList_list | NElement>} NList_list
 */
declare class NList {
    /**
     * 生成拉平列表
     * @param {NList_list} list
     */
    static flat(list: NList_list): NList;
    /**
     * 获取(生成)元素
     * @param {NList_list} list
     */
    static getElement(list: NList_list): NElement<any>;
    /**
     * @param {NList_list} list
     */
    constructor(list: NList_list);
    /**
     * @type {NList_list}
     */
    list: NList_list;
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
type NList_list = Array<string | NTagName<any> | NStyle<any> | NAttr<any> | NEvent<any> | NAsse | NList | (string | NElement<any> | NStyle<any> | NEvent<any> | NAsse | NTagName<any> | NAttr<any> | NList | NList_list)[] | NElement<any>>;

/**
 * 指针数据
 * 当发生鼠标或触摸事件时传递
 * 包含指针坐标和按下状态等数据
 */
declare class pointerData {
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
 * 鼠标(拖拽)事件处理
 * @param {NElement} element 绑定到元素
 * @param {function(pointerData):void} callBack 回调
 * @param {number} [button] 绑定的按键
 */
declare function mouseBind(element: NElement<any>, callBack: (arg0: pointerData) => void, button?: number | undefined): void;

/**
 * 触摸(拖拽) 事件处理
 * @param {NElement} element
 * @param {function(pointerData):void} callBack
 */
declare function touchBind(element: NElement<any>, callBack: (arg0: pointerData) => void): void;

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

export { NAsse, NAttr, NElement, NEvent, NList, NStyle, NTagName, createNStyle, cssG, divideLayout_DU, divideLayout_LR, divideLayout_RL, divideLayout_UD, expandElement, getNElement, mouseBind, runOnce, tag, tagName, touchBind };
