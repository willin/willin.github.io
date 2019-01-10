<template>
  <section>
    {{ $t('donate.text') }}:
    <nav>
      <a href="/images/wx.png" class="gallery">
        {{ $t('donate.wechat') }}
      </a> |
      <a href="/images/alipay.png" class="gallery">
        {{ $t('donate.alipay') }}
      </a> |
      <a href="https://www.patreon.com/willin" target="_blank">
        {{ $t('donate.patreon') }}
      </a> |
      <a href="https://www.paypal.me/willinwang" target="_blank">
        {{ $t('donate.paypal') }}
      </a>
    </nav>
  </section>
</template>
