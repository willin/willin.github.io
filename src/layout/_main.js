import { h } from 'hyperapp';

export default () => (
  <main>
    <nav>
      <ul>
        <li>
          <a href="#/" class="active">
            <i class="iconfont icon-user_info" />
            个人资料
          </a>
        </li>
        <li>
          <a href="#/resume">
            <i class="iconfont icon-suitcase" />
            简历
          </a>
        </li>
        <li>
          <a href="#/portfilio">
            <i class="iconfont icon-bulb" />
            作品
          </a>
        </li>
        <li>
          <a href="#/contact">
            <i class="iconfont icon-link" />
            联系
          </a>
        </li>
      </ul>
    </nav>
  </main>
);
