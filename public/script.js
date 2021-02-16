const MenuController = {
  menu_btn: document.querySelector('[data-menu="menu-control"]'),
  menu: document.querySelector('.nav__menu'),
  modal_ovl: document.querySelector('.modal-overlay'),

  init() {
    MenuController.menu_btn.addEventListener('click', MenuController.open);
  },
  open() {
    MenuController.menu_btn.classList.toggle('active');
    MenuController.activeMenu();
  },

  activeMenu() {
    if (MenuController.menu.classList.contains('active')) {
      MenuController.menu.classList.remove('active');
      ModalController.modal_ovl.classList.remove('active');
    } else {
      MenuController.menu.classList.add('active');
      ModalController.modal_ovl.classList.add('active');
    }
  },
};

const ModalController = {
  buttons: document.querySelectorAll('.funding__project__button'),
  modal_ovl: document.querySelector('.modal-overlay'),
  modal: document.querySelector('.modal'),
  modal_close: document.querySelector('[data-menu="modal-close"]'),
  modal_w1: document.querySelector('.wrapper-1'),
  modal_w2: document.querySelector('.wrapper-2'),

  init() {
    ModalController.buttons.forEach((btn) => {
      btn.addEventListener('click', ModalController.active);
    });
  },
  active() {
    ModalController.modal.classList.add('active');
    ModalController.modal_ovl.classList.add('active');

    ModalController.modal_close.addEventListener(
      'click',
      ModalController.disable,
    );
  },
  disable() {
    ModalController.modal.classList.remove('active');
    ModalController.modal_ovl.classList.remove('active');
  },
  enableOffers(event) {
    let container = event.target.parentNode.parentNode.parentNode;
    let isBuying = container.querySelector('.card__buy');
    if (isBuying) {
      isBuying.classList.add('active');
    }
  },
  disableOffers(container) {
    let isBuying = container.querySelector('.card__buy');
    if (isBuying) {
      isBuying.classList.remove('active');
    }
  },
  confirm() {
    if (ModalController.modal_w1.classList.contains('active')) {
      ModalController.modal_w2.classList.remove('disable');
      ModalController.modal_w1.classList.remove('active');
    } else {
      ModalController.modal_w2.classList.add('disable');
      ModalController.modal_w1.classList.add('active');
    }
  },
};

const InputController = {
  inputs: document.querySelectorAll('input'),

  init() {
    InputController.inputs.forEach((input) => {
      input.addEventListener('change', InputController.selectElement);
    });
  },
  selectElement(event) {
    InputController.clean();
    ModalController.enableOffers(event);
    let container = event.target.parentNode.parentNode.parentNode;
    container.style.border = '2px solid #21afa7';
  },
  clean() {
    InputController.inputs.forEach((input) => {
      let container = input.parentNode.parentNode.parentNode;
      ModalController.disableOffers(container);
      container.style.border = '1px solid #aaa';
    });
  },
};

const BagController = {
  buttons: document.querySelectorAll('[data-cart="buying"]'),
  btnFinish: document.querySelector('[data-button="finish"]'),

  init() {
    console.log(BagController.buttons);
    BagController.buttons.forEach((button) => {
      button.addEventListener('click', ModalController.confirm);
      let container = button.parentElement;
    });

    BagController.btnFinish.addEventListener('click', (event) => {
      ModalController.disable();
      ModalController.confirm();
    });
  },
};

ModalController.init();
MenuController.init();
InputController.init();
BagController.init();
