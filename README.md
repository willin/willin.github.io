# Willin.Wang

<https://willin.wang/>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [TODO List](#todo-list)
- [项目技术栈](#%E9%A1%B9%E7%9B%AE%E6%8A%80%E6%9C%AF%E6%A0%88)
  - [规范化](#%E8%A7%84%E8%8C%83%E5%8C%96)
  - [前端](#%E5%89%8D%E7%AB%AF)
  - [工具](#%E5%B7%A5%E5%85%B7)
- [技术细节（Tricks）](#%E6%8A%80%E6%9C%AF%E7%BB%86%E8%8A%82tricks)
  - [CSS: 获取 隐藏元素的高度](#css-%E8%8E%B7%E5%8F%96-%E9%9A%90%E8%97%8F%E5%85%83%E7%B4%A0%E7%9A%84%E9%AB%98%E5%BA%A6)
  - [元素组件化，操作中心化](#%E5%85%83%E7%B4%A0%E7%BB%84%E4%BB%B6%E5%8C%96%E6%93%8D%E4%BD%9C%E4%B8%AD%E5%BF%83%E5%8C%96)
    - [1. 抽出组件避免无谓的内存开销](#1-%E6%8A%BD%E5%87%BA%E7%BB%84%E4%BB%B6%E9%81%BF%E5%85%8D%E6%97%A0%E8%B0%93%E7%9A%84%E5%86%85%E5%AD%98%E5%BC%80%E9%94%80)
    - [2. 元素组件化，操作中心化](#2-%E5%85%83%E7%B4%A0%E7%BB%84%E4%BB%B6%E5%8C%96%E6%93%8D%E4%BD%9C%E4%B8%AD%E5%BF%83%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TODO List

- [x] I18n in 简体中文/繁體中文/English without any 3rd party lib
- [x] Route controller without any 3rd party lib
- [x] Store (using HTML5 LocalStorage) without any 3rd party lib
- [x] Color Scheme using [GPLU-6](https://color.adobe.com/zh/GPLU-6-color-theme-10377548/?showPublished=true)
- [x] Parcel Bundle (instead of webpack)
- [x] Web fonts (Using IconFont and Font-Spider)
- [x] Transition animation
- [ ] Responsive

Perhaps most things in the bundled script file are translations and views.

## 项目技术栈

### 规范化

- EditorConfig：控制缩进
- ESLint：控制 js 代码规范

### 前端

- HyperApp：只有1kb的前端数据双向绑定框架
- Vanilla ES2017： 新一代的原生 js 标准，写得好能比 jQuery、Vue、React 封装实现更高效
- JSX： Facebook 发布的最初用于 React 的可以在 javascript 中进行快速模板编写的工具
- stylus： 用于构建 CSS 样式的语言

### 工具

- Parcel：一个可以替代 Webpack 的优化打包工具
- Babel：成了一个比较鸡肋的辅助工具，用于 JSX 编译

偷懒了，所以用了 Babel 让项目臃肿了 8kb 左右，其实可以用其他的工具将 JSX 编译好的。

p.s. 本项目中除去 Babel 编译加入的臃肿代码其他部分均为手写代码，未使用任何第三方库实现。目前项目仍在持续改进中，js 打包后 13kb（主要为 Babel runtime，翻译文件及页面模板居多，感谢 hyperapp 的设计理念让我在核心代码上持续优化精简），css 9kb（web 字体和 css reset 导致的臃肿）。最终完成时预计总计不超过 30kb。

## 技术细节（Tricks）

### CSS: 获取 隐藏元素的高度

在路由切换的渐变效果中，我希望实现的是类似 jQuery 中的 `slideDown` / `slideUp` 效果，但在实际操作中发现，当元素设置为 `display:none` 的时候，无论是

```js
document.getElementById('id').offsetHeight
```

还是

```js
document.getElementById('id').clientHeight
```

取出来的结果都是 `0`。

所以不用 `display` 属性，通过元素高度和可见性来控制元素隐藏：

```stylus
.hidden
  max-height 0
  overflow hidden
  height auto
```

获取该隐藏元素的高度通过：

```js
document.getElementById('id').scrollHeight
```

### 元素组件化，操作中心化

参考提交 [`84280a94`](https://github.com/willin/willin.github.io/commit/84280a947f763489208497cd407b7afaae4ac33e)

本次提交主要修改为：

#### 1. 元素组件化，抽出组件避免无谓的内存开销

以此处为例：

```js
// _footer.js
export default ({ state: { year, lang, langs }, actions: { changeLang } }) => {
  // 问题代码1
  const handleClick = l => (e) => { changeLang(l); e.preventDefault(); };
  // 问题代码2
  const link = ([l, t]) => (<li><a href="#" class={lang === l ? 'active' : ''} onclick={handleClick(l)}>{t}</a></li>);
  // return ( ... );
};
```

避免嵌套的方法定义，即 function 内再定义 function，每次执行的时候会重新分配新的内存空间。

#### 2. 操作中心化

以主界面框架为例：

```js
// _main.js
export default ({ state, actions }) => {
  // 问题代码1 Router Action 操作置于页面内
  const setView = () => {
    const route = router();
    actions.setRoute(route);
    const items = document.getElementsByClassName('hidden');
    for (let i = 0; i < items.length; i += 1) {
      // eslint-disable-next-line no-param-reassign
      items[i].style.maxHeight = '0px';
    }
    const view = document.getElementById(route);
    view.style.maxHeight = `${view.scrollHeight}px`;
  };
  $on(window, 'load', setView);
  $on(window, 'hashchange', setView);
  // 问题代码2 组件定义在渲染函数内部
  const link = ([r, i]) => (
    <li>
      <a href={`#/${r}`} class={state.route === r ? 'active' : ''}>
        <i class={`iconfont icon-${i}`} /> {state.i18n[r]}
      </a>
    </li>
  );
  // return ( ... );
};
```
单独抽出 component 目录，将组件定义统一管理。

- 元素组件化，即把页面中复用的组件抽出
- 操作中心化，即把重要操作全部放到 Actions 内执行

优化的处理方案可以在最新的分支代码中查看。
