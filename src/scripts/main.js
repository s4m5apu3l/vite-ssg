import 'virtual:svg-icons-register';
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiperThumbsDetailCardBottom = new Swiper('.js-thumbs-bottom', {
    spaceBetween: 5,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        0: {
            direction: 'horizontal',
        },
        840: {
            direction: 'vertical',
        },
    },
    modules: [Thumbs],
});

const swiperThumbsDetailCardTop = new Swiper('.js-thumbs-top', {
    slidesPerView: 1,
    freeMode: true,
    thumbs: {
        swiper: swiperThumbsDetailCardBottom,
    },
    modules: [Navigation, Thumbs],
});

const swiperRecommend = new Swiper('.js-recommend', {
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1.1,
        },
        510: {
            slidesPerView: 2,
        },
        710: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 4,
        },
        1440: {
            slidesPerView: 5,
        },
    },
    navigation: {
        nextEl: '.js-recommend-swiper-btn-next',
        prevEl: '.js-recommend-swiper-btn-prev',
    },
    modules: [Navigation],
});
const swiperRelatedProducts = new Swiper('.js-related', {
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1.1,
        },
        510: {
            slidesPerView: 2,
        },
        710: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 4,
        },
        1440: {
            slidesPerView: 5,
        },
    },
    navigation: {
        nextEl: '.js-related-swiper-btn-next',
        prevEl: '.js-related-swiper-btn-prev',
    },
    modules: [Navigation],
});

document.addEventListener('DOMContentLoaded', function () {
    // CATALOG TOGGLE LIST LENGTH
    if (document.querySelector('.l-catalog__content')) {
        const catalogItems = document.querySelectorAll('.l-catalog__item');
        const catalogItemsContainer = document.querySelector('.l-catalog__content');

        catalogItems.forEach(item => {
            const listItems = item.querySelectorAll('.l-catalog__item-list li');
            const toggleButton = item.querySelector('.toggleButton');

            // Проверяем, нужно ли показывать кнопку
            if (listItems.length > 5) {
                item.classList.add('limited-height'); // Добавляем класс для ограничения высоты, если это нужно по условиям задачи
                toggleButton.style.display = 'block'; // Показываем кнопку
                toggleButton.textContent = `Ещё ${listItems.length - 5} категории`; // Указываем количество скрытых категорий
            } else {
                toggleButton.style.display = 'none'; // Если элементов меньше или равно 5, кнопка не показывается
            }
        });

        catalogItemsContainer.addEventListener('click', event => {
            if (event.target && event.target.classList.contains('toggleButton')) {
                console.dir(event.target);
                const itemContent = event.target.closest('.l-catalog__item');
                const listItems = itemContent.querySelectorAll('.l-catalog__item-list li');

                // Переключаем класс для расширения/сужения списка
                const isExpanded = itemContent.classList.toggle('expanded');
                event.target.textContent = isExpanded ? 'Свернуть' : `Ещё ${listItems.length - 5} категории`; // Изменяем текст кнопки
            }
        });
    }

    // HEADER LOGIC
    // BURGER HEADER
    const burgerBtn = document.querySelector('.l-header__burger');
    const burgerCloseBtn = document.querySelector('.l-nav__mobile-close');
    const headerNav = document.querySelector('.l-nav__mobile');

    burgerBtn.addEventListener('click', () => {
        headerNav.classList.add('active');
        burgerBtn.classList.add('active');
        this.body.classList.add('overflow-hidden');
    });
    burgerCloseBtn.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        headerNav.classList.remove('active');
        this.body.classList.remove('overflow-hidden');
    });

    // HEADER TABS
    const tabsContainer = document.querySelector('.l-header__tab-btns');

    tabsContainer.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('l-header-tab-btn')) {
            // Удаляем класс 'active' у всех кнопок
            tabsContainer.querySelectorAll('.l-header-tab-btn').forEach(tab => {
                tab.classList.remove('active');
            });

            // Добавляем класс 'active' к нажатой кнопке
            target.classList.add('active');

            // Управляем отображением контента
            document.querySelectorAll('.l-header__search').forEach(form => {
                if (form.classList.contains('l-header-tab-content__form')) {
                    // Если контент соответствует активной вкладке, показываем его
                    if (form.dataset.tab === target.dataset.tab) {
                        form.classList.add('active');
                    } else {
                        // Иначе скрываем
                        form.classList.remove('active');
                    }
                }
            });
        }
    });

    // CATALOG
    if (document.querySelector('.js-catalog ')) {
        // catalog switch between grid and list
        const catalogBtns = document.querySelectorAll('.js-catalog-sort-btn');
        const catalogContent = document.querySelector('.js-catalog');

        catalogBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catalogBtns.forEach(btn => btn.classList.remove('active'));

                btn.classList.add('active');

                const mode = btn.dataset.mode;
                catalogContent.className = 'l-content js-catalog ' + mode;
            });
        });

        // filter catalog logic
        const toggleFilterBtn = document.querySelector('.js-filter-btn-open');
        const filterBlockContent = document.querySelector('.l-catalog__cards-aside');

        toggleFilterBtn.addEventListener('click', () => {
            if (filterBlockContent.style.display == '') {
                filterBlockContent.style.display = 'block';
            } else if (filterBlockContent.style.display == 'block') {
                filterBlockContent.style.display = 'none';
            } else {
                filterBlockContent.style.display = 'block';
            }
        });
    }

    // full tab logic
    if (document.querySelector('.l-tab-content')) {
        const tabs = document.querySelectorAll('.js-tab-btn');
        const tabContents = document.querySelectorAll('.l-tab-content');

        const hideAllTabs = () => {
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
        };

        const activateTab = tab => {
            const targetTabContentId = tab.getAttribute('data-tab');
            const targetTabContent = document.querySelector(`.l-tab-content[data-tab="${targetTabContentId}"]`);

            hideAllTabs();

            tab.classList.add('active');
            targetTabContent.classList.add('active');
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                activateTab(tab);
            });
        });
    }

    if (document.querySelector('.l-search-detail')) {
        const addBtn = document.querySelector('.js-open-modal-search');
        const closeBtn = document.querySelector('.js-close-modal-search');
        const modal = document.querySelector('.js-search-modal');

        addBtn.addEventListener('click', () => {
            modal.showModal();
        });

        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    if (document.querySelector('.l-catalog-filter__form-item')) {
        const selects = document.querySelectorAll('.l-catalog-filter__form-item');

        selects.forEach(select => {
            const updateStyle = () => {
                select.classList.toggle('placeholder-style', select.selectedIndex === 0);
            };

            // Инициализируем стиль при загрузке
            updateStyle();

            // Обновляем стиль при изменении выбора
            select.addEventListener('change', updateStyle);
        });
    }
});
