import { h, Component } from 'preact';
import { ComponentProps, bhClass } from './constant';
import { WarpperClassName, underlineObject } from '../helper';

import { log } from 'src/lib/print';
import { copy } from 'src/lib/utils';
import { parseClass } from 'src/lib/dom';

import {
    bhClass as bhCheckboxClass,
    fbClass as fbCheckboxClass,
} from '../checkbox/constant';

import Loading from 'src/widget/components/loading';

interface State {
    /** 是否显示优惠码 */
    showCode: boolean;
    /** 是否震动盒子 */
    shakeBox: boolean;
    /** 文本是否已复制 */
    isCopied: boolean;
}

export default class DiscountComponent extends Component<ComponentProps, State> {
    state: State = {
        showCode: false,
        shakeBox: false,
        isCopied: false,
    };

    render() {
        const {
            id,
            data,
            fbAttrs,
            loading,
            isChecked,
            clickShowCodeBtn,
            clickCopyCodeBtn,
        } = this.props;

        const {
            showCode,
            shakeBox,
            isCopied,
        } = this.state;

        const clickButton = () => {
            if (showCode) {
                log(`Copy the code to Clipboard, ${data.discountCode}`);
                copy(data.discountCode);
                clickCopyCodeBtn && clickCopyCodeBtn();
                this.setState({ isCopied: true });
            }
            else if (isChecked) {
                this.setState({ showCode: true });
                clickShowCodeBtn && clickShowCodeBtn;
            }
            else {
                this.setState({ shakeBox: true });
                setTimeout(() => this.setState({ shakeBox: false }), 1000);
            }
        };

        return (
            <div id={id} class={WarpperClassName}>
                <div class={bhClass}>
                    <div class={parseClass([`${bhClass}__box`, {
                        [`${bhClass}__code`]: showCode,
                        ['shake-box']: shakeBox,
                    }])}>
                        {showCode
                            ? <div class={`${bhClass}__tip`} style='color: #33D499'>
                                <div class={`${bhClass}__msg`}>SUCCESS</div>
                            </div>
                            : <div class={`${bhClass}__tip`} style='color: #FF6969'>
                                <div class={`${bhClass}__notice`}>{ data.notice }</div>
                                <div class={`${bhClass}__msg`}>DISCOUNT</div>
                            </div>
                        }
                        <div class={`${bhClass}__content`}>
                            { loading ? <Loading /> : '' }
                            <div
                                data-ref={window.btoa(id)}
                                class={`${bhCheckboxClass} ${fbCheckboxClass}`}
                                style={(loading || !showCode) ? '' : {
                                    opacity: '0',
                                    zIndex: -1,
                                    position: 'absolute',
                                }}
                                {...underlineObject(fbAttrs)}
                            />
                            { showCode
                                ? <div class={`${bhClass}__content-text`}>{ data.discountText }</div>
                                : ''
                            }
                            { showCode
                                ? <div class={`${bhClass}__content-code`}>{ data.discountCode }</div>
                                : ''
                            }
                        </div>
                    </div>
                    <button
                        class={`${bhClass}__btn`}
                        onClick={clickButton}
                        disabled={loading}
                    >{
                        showCode
                            ? isCopied
                                ? 'Copied!'
                                : data.copyCodeBtnText
                            : data.showCodeBtnText
                    }</button>
                </div>
            </div>
        );
    }
}