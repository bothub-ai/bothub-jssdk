# Bothub SDK for JavaScript - API 文档

这里将会列举出所有的 SDK 方法和配置项。Bothub SDK 将会被挂载在全局的`BH`命名空间下，你可以通过`window.BH`来访问它。

## 核心方法

|方法|描述|
|:--|:--|
|[.init()](./core/init.md)|用于初始化和设置SDK。调用这个函数后才能调用所有其他 SDK 方法。|

## User 模块

|方法|描述|
|:--|:--|
|[.User.getCustomUserId()](./user/getCustomUserId.md)|获取当前的用户自定义编号。|
|[.User.changeCustomUserId()](./user/changeCustomUserId.md)|变更并设置当前用户的自定义编号。|

## Event 模块

|方法|描述|
|:--|:--|
|[.Event.addedToCart()](./event/addedToCart.md)|当用户添加商品至购物车时，触发此事件。|
|[.Event.addedToWishlist()](./event/addedToCart.md)|当用户添加商品至愿望单时，触发此事件。|
|[.Event.initiatedCheckout()](./event/initiatedCheckout.md)|当用户添加商品至愿望单时，触发此事件。|
|[.Event.purchase()](./event/purchase.md)|当用户完成商品购买时，请触发该事件。|
|[.Event.logEvent()](./event/logEvent.md)|记录 Bothub 事件，例如当有人完成您的教程时。|

## Widget 模块
|方法|描述|
|:--|:--|
|[.Widget.setConfig()](./widget/setConfig.md)|设置插件属性。|
|[.Widget.render()](./widget/render.md)|立即渲染插件。|
|[.Widget.destroy()](./widget/destroy.md)|销毁插件。|