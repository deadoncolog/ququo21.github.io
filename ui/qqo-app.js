(function () {
  'use strict';
  var PREFIX = 'qqo';
  var STORAGE_KEY = 'qqo_orders_v1';
  var CD_MINS = 12;
  var CHAINS = [{"key": "trc20", "label": "USDT-TRC20", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 36 36\" width=\"35\" height=\"35\" aria-hidden=\"true\"><circle cx=\"15.5\" cy=\"15.5\" r=\"13.5\" fill=\"#259E79\"/><path d=\"M17.35 16.42v-.01c-.1.01-.63.04-1.82.04-1.02 0-1.63-.03-1.86-.04v.01c-3.55-.16-6.2-.78-6.2-1.52 0-.74 2.65-1.36 6.2-1.52v2.43c.24.02.86.05 1.88.05 1.15 0 1.71-.04 1.8-.05v-2.43c3.54.16 6.19.78 6.19 1.52 0 .74-2.65 1.36-6.19 1.52zm0-3.29v-2.17h5.05V7.95H8.62v3.01h5.05v2.17c-4.02.18-7.04.98-7.04 1.94 0 .96 3.02 1.76 7.04 1.94v6.95h3.68v-6.95c4.01-.18 7.03-.98 7.03-1.94 0-.96-3.02-1.76-7.03-1.94z\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"8.2\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"7\" fill=\"#EF0027\"/><path d=\"M23.1 23.3l8.1 1.4-4.7 6.9-3.4-8.3zm1.3 1.1l2.1 5.1 1.1-4.1-3.2-1zm4.1 1.2l-.9 3.4 2.4-3.1-1.5-.3z\" fill=\"#FFFFFF\"/></svg>"}, {"key": "erc20", "label": "USDT-ERC20", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 36 36\" width=\"35\" height=\"35\" aria-hidden=\"true\"><circle cx=\"15.5\" cy=\"15.5\" r=\"13.5\" fill=\"#259E79\"/><path d=\"M17.35 16.42v-.01c-.1.01-.63.04-1.82.04-1.02 0-1.63-.03-1.86-.04v.01c-3.55-.16-6.2-.78-6.2-1.52 0-.74 2.65-1.36 6.2-1.52v2.43c.24.02.86.05 1.88.05 1.15 0 1.71-.04 1.8-.05v-2.43c3.54.16 6.19.78 6.19 1.52 0 .74-2.65 1.36-6.19 1.52zm0-3.29v-2.17h5.05V7.95H8.62v3.01h5.05v2.17c-4.02.18-7.04.98-7.04 1.94 0 .96 3.02 1.76 7.04 1.94v6.95h3.68v-6.95c4.01-.18 7.03-.98 7.03-1.94 0-.96-3.02-1.76-7.03-1.94z\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"8.2\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"7\" fill=\"#627EEA\"/><path d=\"M27 21.8v3.85l3.25 1.45L27 21.8z\" fill=\"#FFFFFF\" fill-opacity=\"0.72\"/><path d=\"M27 21.8l-3.25 5.3 3.25-1.45V21.8z\" fill=\"#FFFFFF\"/><path d=\"M27 29.55v2.65l3.25-4.5L27 29.55z\" fill=\"#FFFFFF\" fill-opacity=\"0.72\"/><path d=\"M27 32.2v-2.65l-3.25-1.85L27 32.2z\" fill=\"#FFFFFF\"/><path d=\"M27 28.95l3.25-1.85L27 25.65v3.3z\" fill=\"#FFFFFF\" fill-opacity=\"0.45\"/><path d=\"M23.75 27.1L27 28.95v-3.3l-3.25 1.45z\" fill=\"#FFFFFF\" fill-opacity=\"0.82\"/></svg>"}, {"key": "bep20", "label": "USDT-BEP20", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 36 36\" width=\"35\" height=\"35\" aria-hidden=\"true\"><circle cx=\"15.5\" cy=\"15.5\" r=\"13.5\" fill=\"#259E79\"/><path d=\"M17.35 16.42v-.01c-.1.01-.63.04-1.82.04-1.02 0-1.63-.03-1.86-.04v.01c-3.55-.16-6.2-.78-6.2-1.52 0-.74 2.65-1.36 6.2-1.52v2.43c.24.02.86.05 1.88.05 1.15 0 1.71-.04 1.8-.05v-2.43c3.54.16 6.19.78 6.19 1.52 0 .74-2.65 1.36-6.19 1.52zm0-3.29v-2.17h5.05V7.95H8.62v3.01h5.05v2.17c-4.02.18-7.04.98-7.04 1.94 0 .96 3.02 1.76 7.04 1.94v6.95h3.68v-6.95c4.01-.18 7.03-.98 7.03-1.94 0-.96-3.02-1.76-7.03-1.94z\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"8.2\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"7\" fill=\"#F3BA2F\"/><path d=\"M27 22.7l1.85 1.85-1.85 1.85-1.85-1.85L27 22.7zm-4.3 4.3l1.45-1.45 1.45 1.45-1.45 1.45L22.7 27zm8.6 0l-1.45 1.45-1.45-1.45 1.45-1.45L31.3 27zM27 31.3l-1.85-1.85L27 27.6l1.85 1.85L27 31.3zm0-5.45l1.15 1.15L27 28.15 25.85 27 27 25.85z\" fill=\"#FFFFFF\"/></svg>"}, {"key": "solana", "label": "USDT-Solana", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 36 36\" width=\"35\" height=\"35\" aria-hidden=\"true\"><defs><linearGradient id=\"solGrad_c2fae2\" x1=\"20\" y1=\"20\" x2=\"34\" y2=\"34\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\" stop-color=\"#00FFA3\"/><stop offset=\"100%\" stop-color=\"#DC1FFF\"/></linearGradient></defs><circle cx=\"15.5\" cy=\"15.5\" r=\"13.5\" fill=\"#259E79\"/><path d=\"M17.35 16.42v-.01c-.1.01-.63.04-1.82.04-1.02 0-1.63-.03-1.86-.04v.01c-3.55-.16-6.2-.78-6.2-1.52 0-.74 2.65-1.36 6.2-1.52v2.43c.24.02.86.05 1.88.05 1.15 0 1.71-.04 1.8-.05v-2.43c3.54.16 6.19.78 6.19 1.52 0 .74-2.65 1.36-6.19 1.52zm0-3.29v-2.17h5.05V7.95H8.62v3.01h5.05v2.17c-4.02.18-7.04.98-7.04 1.94 0 .96 3.02 1.76 7.04 1.94v6.95h3.68v-6.95c4.01-.18 7.03-.98 7.03-1.94 0-.96-3.02-1.76-7.03-1.94z\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"8.2\" fill=\"#FFFFFF\"/><circle cx=\"27\" cy=\"27\" r=\"7\" fill=\"#111827\"/><path d=\"M23.5 29.2c.1-.1.25-.15.4-.15h6.8c.25 0 .38.3.2.48l-1.3 1.32c-.1.1-.25.15-.4.15h-6.8c-.25 0-.38-.3-.2-.48l1.3-1.32zm0-5.4c.1-.1.25-.15.4-.15h6.8c.25 0 .38.3.2.48l-1.3 1.32c-.1.1-.25.15-.4.15h-6.8c-.25 0-.38-.3-.2-.48l1.3-1.32zm6.1 2.7c-.1-.1-.25-.15-.4-.15h-6.8c-.25 0-.38.3-.2.48l1.3 1.32c.1.1.25.15.4.15h6.8c.25 0 .38-.3.2-.48l-1.3-1.32z\" fill=\"url(#solGrad_c2fae2)\"/></svg>"}];

  function $(id) { return document.getElementById(id); }

  var toastTimer = null;
  function showToast(msg) {
    var el = $(PREFIX + 'Toast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2600);
  }

  function loadOrders() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveOrder(rec) {
    var list = loadOrders();
    list.unshift(rec);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50))); } catch (e) {}
  }

  // Mobile Menu
  var burger = $(PREFIX + 'Burger');
  var mobMenu = $(PREFIX + 'MobMenu');
  if (burger && mobMenu) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !mobMenu.hidden;
      mobMenu.hidden = open;
      burger.setAttribute('aria-expanded', String(!open));
    });
    mobMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        mobMenu.hidden = true;
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Category Filter on Homepage
  var catBtns = document.querySelectorAll('.' + PREFIX + '-cat-btn');
  var cards = document.querySelectorAll('.' + PREFIX + '-card[data-cat]');
  if (catBtns.length && cards.length) {
    catBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-cat');
        catBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        cards.forEach(function (c) {
          var show = (target === '全部') || (c.getAttribute('data-cat') === target);
          c.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  // Modals open / close
  var modals = {
    order: $(PREFIX + 'OrderModal'),
    ticket: $(PREFIX + 'TicketModal'),
    pay: $(PREFIX + 'PayModal')
  };
  var cdTimer = null;

  function closeModal(key) {
    var m = modals[key];
    if (m) m.hidden = true;
    if (key === 'pay' && cdTimer) { clearInterval(cdTimer); cdTimer = null; }
  }
  function openModal(key) {
    Object.keys(modals).forEach(function (k) { if (k !== key) closeModal(k); });
    if (modals[key]) modals[key].hidden = false;
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () { openModal(btn.getAttribute('data-open-modal')); });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () { closeModal(btn.getAttribute('data-close-modal')); });
  });

  document.addEventListener('click', function (e) {
    if (mobMenu && !mobMenu.hidden && !mobMenu.contains(e.target) && e.target !== burger && !(burger && burger.contains(e.target))) {
      mobMenu.hidden = true;
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
    Object.keys(modals).forEach(function (k) {
      if (modals[k] && !modals[k].hidden && e.target === modals[k]) closeModal(k);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobMenu && !mobMenu.hidden) { mobMenu.hidden = true; if (burger) burger.setAttribute('aria-expanded', 'false'); }
      Object.keys(modals).forEach(closeModal);
    }
  });

  // Real localStorage Order Lookup
  var orderForm = $(PREFIX + 'OrderForm');
  var orderRes = $(PREFIX + 'OrderRes');
  if (orderForm && orderRes) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var mail = ($(PREFIX + 'LookupEmail').value || '').trim().toLowerCase();
      var oid = ($(PREFIX + 'LookupId').value || '').trim().toUpperCase();
      if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        showToast('请输入有效的收货电子邮箱');
        return;
      }
      if (!oid) {
        showToast('请输入订单编号');
        return;
      }
      var found = loadOrders().find(function (r) {
        return r.orderId.toUpperCase() === oid && r.email.toLowerCase() === mail;
      });
      orderRes.hidden = false;
      if (found) {
        orderRes.innerHTML = '<strong>已查到订单记录：</strong><br>订单编号：' + found.orderId + '<br>商品名称：' + found.productName + '<br>数量与金额：' + found.qty + ' 个 / $' + found.amount + ' USD<br>收件邮箱：' + found.email + '<br>状态：待核销自动发卡（24H内直发邮箱）';
      } else {
        orderRes.innerHTML = '<strong>未匹配到本机订单：</strong>请确认收件邮箱与订单编号是否一致，或稍后查收邮箱通知。';
      }
    });
  }

  // After-sales Ticket Form
  var ticketForm = $(PREFIX + 'TicketForm');
  if (ticketForm) {
    ticketForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var oid = ($(PREFIX + 'TickOrder').value || '').trim();
      var mail = ($(PREFIX + 'TickEmail').value || '').trim();
      var desc = ($(PREFIX + 'TickDesc').value || '').trim();
      if (!oid || !mail || !desc) {
        showToast('请完整填写订单编号、收件邮箱与异常说明');
        return;
      }
      ticketForm.reset();
      closeModal('ticket');
      showToast('售后工单已登记，核实结果将发送至您的邮箱');
    });
  }

  // Checkout on Detail Pages
  var coBox = $(PREFIX + 'Checkout');
  if (coBox) {
    var unitPrice = parseFloat(coBox.getAttribute('data-price') || '0');
    var productName = coBox.getAttribute('data-title') || '';
    var qtyInput = $(PREFIX + 'Qty');
    var totalEl = $(PREFIX + 'Total');
    var chainGrid = $(PREFIX + 'ChainGrid');
    var buyBtn = $(PREFIX + 'BuyBtn');
    var emailInput = $(PREFIX + 'Email');
    var selectedChain = CHAINS[0];

    function updateTotal() {
      var q = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1));
      qtyInput.value = q;
      totalEl.textContent = '$' + (unitPrice * q).toFixed(2) + ' USD';
    }

    if (chainGrid) {
      CHAINS.forEach(function (ch, idx) {
        var card = document.createElement('button');
        card.type = 'button';
        card.className = PREFIX + '-chain-card' + (idx === 0 ? ' is-selected' : '');
        card.innerHTML = ch.svg + '<span>' + ch.label + '</span>';
        card.addEventListener('click', function () {
          selectedChain = ch;
          chainGrid.querySelectorAll('.' + PREFIX + '-chain-card').forEach(function (el) { el.classList.remove('is-selected'); });
          card.classList.add('is-selected');
        });
        chainGrid.appendChild(card);
      });
    }

    var btnMinus = $(PREFIX + 'QtyMinus');
    var btnPlus = $(PREFIX + 'QtyPlus');
    if (btnMinus) btnMinus.addEventListener('click', function () { qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1); updateTotal(); });
    if (btnPlus) btnPlus.addEventListener('click', function () { qtyInput.value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1); updateTotal(); });
    if (qtyInput) qtyInput.addEventListener('change', updateTotal);
    updateTotal();

    if (buyBtn) {
      buyBtn.addEventListener('click', function () {
        var mail = (emailInput.value || '').trim();
        if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
          showToast('请先填写正确的收货电子邮箱');
          emailInput.focus();
          return;
        }
        var qty = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1));
        var total = (unitPrice * qty).toFixed(2);
        var orderId = 'QQO' + String(Date.now()).slice(-6) + String(Math.floor(100 + Math.random() * 900));
        var nodes = window.QQO_NODES || {};
        var addr = nodes[selectedChain.key] || '';

        buyBtn.disabled = true;
        buyBtn.textContent = '正在生成订单...';
        setTimeout(function () {
          buyBtn.textContent = '订单已生成，正在调起支付';
          setTimeout(function () {
            buyBtn.disabled = false;
            buyBtn.textContent = '立即购买';
            saveOrder({ orderId: orderId, productName: productName, qty: qty, amount: total, email: mail, net: selectedChain.label });

            $(PREFIX + 'PayOrderId').textContent = orderId;
            $(PREFIX + 'PayProdName').textContent = productName;
            $(PREFIX + 'PayQty').textContent = qty + ' 个';
            $(PREFIX + 'PayEmail').textContent = mail;
            $(PREFIX + 'PayNet').textContent = selectedChain.label;
            $(PREFIX + 'PayAmount').textContent = '$' + total + ' USD';
            $(PREFIX + 'PayAddr').textContent = addr;

            openModal('pay');
            try {
              if (typeof window['drawChainQr'] === 'function') {
                window['drawChainQr']($(PREFIX + 'QrCanvas'), addr, selectedChain.label, '#F43F5E');
              }
            } catch (err) {}

            var remain = CD_MINS * 60;
            var cdEl = $(PREFIX + 'Countdown');
            clearInterval(cdTimer);
            function tick() {
              var m = String(Math.floor(remain / 60)).padStart(2, '0');
              var s = String(remain % 60).padStart(2, '0');
              var tp = $(PREFIX + 'TimerPill'); if (tp) tp.innerHTML = '请在规定时间内完成支付 <strong>' + m + ':' + s + '</strong>'; else if (cdEl) cdEl.textContent = m + ':' + s;
              if (remain <= 0) clearInterval(cdTimer);
              remain--;
            }
            tick();
            cdTimer = setInterval(tick, 1000);
          }, 260);
        }, 540);
      });
    }

    var copyBtn = $(PREFIX + 'CopyAddr');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var txt = ($(PREFIX + 'PayAddr').textContent || '').trim();
        if (!txt) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(function () { showToast('收款地址已复制'); }).catch(function () { showToast('请长按地址手动复制'); });
        } else {
          showToast('请手动复制收款地址');
        }
      });
    }
  }
})();
