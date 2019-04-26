import { warn } from 'src/lib/print';
import { render } from 'src/widget';
import { language, messengerAppId, renderImmediately } from 'src/store';

/** 加载 facebook SDK */
export function loadFacebookSDK() {
    const id = 'facebook-jssdk';
    let script = document.getElementById(id) as HTMLScriptElement;

    // 网页已经加载脚本
    if (script) {
        // 已加载的脚本是全量 facebook SDK
        if (/sdk\/xfbml\.customerchat\.js$/.test(script.src)) {
            return true;
        }
        else {
            warn(
                'Some other Facebook SDK have been loaded on the website, ' +
                'some features of the Bothub SDK may not be available',
            );
            return false;
        }
    }

    // 加载 facebook 脚本
    script = document.createElement('script');

    script.id = id;
    script.async = true;
    script.src = `https://connect.facebook.net/${language}/sdk/xfbml.customerchat.js`;

    document.getElementsByTagName('head')[0].appendChild(script);

    return true;
}

function bothubFacebookInit() {
    // Facebook SDK 初始化
    window.FB.init({
        appId: messengerAppId,
        xfbml: true,
        version: 'v3.2',
    });

    // 允许立即渲染，延迟 500 毫秒，渲染所有插件
    if (renderImmediately) {
        setTimeout(render, 500);
    }
}

/** facebook SDK 初始化 */
export function facebookInit() {
    const fbAsyncInitPrev = window.fbAsyncInit;

    if (fbAsyncInitPrev) {
        // 初始化函数已经运行
        if (fbAsyncInitPrev.hasRun) {
            bothubFacebookInit();
        }
        // 初始化函数还未运行
        else {
            window.fbAsyncInit = () => {
                fbAsyncInitPrev();
                bothubFacebookInit();
            };
        }
    }
    else {
        window.fbAsyncInit = bothubFacebookInit;
    }
}