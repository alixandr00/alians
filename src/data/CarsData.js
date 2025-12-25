// src/data/carsData.js
import CarBlack from '../assets/SOK6363-762x456.jpg';
// Audi Q5 2021 Black
import AudiQ520210 from '../assets/Audi Q5 2021 0.jpg'
import AudiQ520211 from '../assets/Audi Q5 2021 1.webp'
import AudiQ520212 from '../assets/Audi Q5 2021 2.webp'
import AudiQ520213 from '../assets/Audi Q5 2021 3.webp'
// Audi Q5 2021 White
import AudiQ52021White0 from '../assets/AudiQ52021White0.jpg'
import AudiQ52021White1 from '../assets/AudiQ52021White1.jpg'
import AudiQ52021White2 from '../assets/AudiQ52021White2.jpg'
import AudiQ52021White3 from '../assets/AudiQ52021White3.jpg'
// Bmw X5 2020 White
import BmwX5White0 from '../assets/Bmw2020White0.jpg'
import BmwX5White1 from '../assets/Bmw2020White1.jpg'
import BmwX5White2 from '../assets/Bmw2020White2.jpg'
import BmwX5White3 from '../assets/Bmw2020White3.jpg'
// Tesla Model 3 White 
import TeslaModel3White0 from '../assets/Tesla2021White0.jpg'
import TeslaModel3White1 from '../assets/Tesla2021White1.jpg'
import TeslaModel3White2 from '../assets/Tesla2021White2.jpg'
import TeslaModel3White3 from '../assets/Tesla2021White3.jpg'

export const carsData = [
    {
        id: 1,
        image: AudiQ520213,
        images: [AudiQ520210, AudiQ520211, AudiQ520212],
        title: 'Audi Q5 Black',
        price: 25900,
        year: 2021,
        transmission: 'Автомат',
        mileage: 23000,
        brand: 'Audi',
        fuel: 'Бензин',
        description: 'Полная комплектация, идеальное состояние. Привезена из Китая.',
        specs: ['Климат-контроль', 'Панорамная крыша']
    },
    {
        id: 2,
        image: AudiQ52021White0,
        images: [AudiQ52021White1, AudiQ52021White2, AudiQ52021White3],
        title: 'Audi Q5 White',
        price: 28500,
        year: 2022,
        transmission: 'Автомат',
        mileage: 15000,
        brand: 'Audi',
        fuel: 'Гибрид',
        description: 'Стильный кроссовер в белом цвете.',
        specs: ['Адаптивный круиз', 'LED оптика']
    },
    {
        id: 3,
        image: BmwX5White0,
        images: [BmwX5White1, BmwX5White2, BmwX5White3],
        title: 'BMW X5 White',
        price: 45000,
        year: 2020,
        transmission: 'Автомат',
        mileage: 40000,
        brand: 'BMW',
        fuel: 'Дизель',
        description: 'Мощный и надежный автомобиль.',
        specs: ['Пневмоподвеска', 'M-пакет']
    },
    {
        id: 4,
        image: TeslaModel3White0,
        images: [TeslaModel3White1, TeslaModel3White2, TeslaModel3White3],
        title: 'Tesla Model 3',
        price: 32000,
        year: 2021,
        transmission: 'Автомат',
        mileage: 12000,
        brand: 'Tesla',
        fuel: 'Электро',
        description: 'Современный электрокар с автопилотом.',
        specs: ['Автопилот', 'Огромный экран']
    },
    {
        id: 5,
        image: CarBlack,
        title: 'Zeekr 001 FR',
        price: 58000,
        year: 2023,
        transmission: 'Автомат',
        mileage: 100,
        brand: 'Zeekr',
        fuel: 'Электро',
        description: 'Невероятная динамика и запас хода 700км.',
        specs: ['Спортивные ковши', '4 мотора']
    },
    {
        id: 6,
        image: CarBlack,
        title: 'BYD Han EV',
        price: 35500,
        year: 2022,
        transmission: 'Автомат',
        mileage: 8500,
        brand: 'BYD',
        fuel: 'Электро',
        description: 'Премиальный седан из Поднебесной.',
        specs: ['Вентиляция сидений', 'Brembo тормоза']
    },
    {
        id: 7,
        image: CarBlack,
        title: 'Geely Monjaro',
        price: 31000,
        year: 2023,
        transmission: 'Автомат',
        mileage: 500,
        brand: 'Geely',
        fuel: 'Бензин',
        description: 'Новый кроссовер на платформе Volvo.',
        specs: ['3 экрана', 'Полный привод']
    },
    {
        id: 8,
        image: CarBlack,
        title: 'Mercedes-Benz E-Class',
        price: 42000,
        year: 2019,
        transmission: 'Автомат',
        mileage: 65000,
        brand: 'Mercedes',
        fuel: 'Бензин',
        description: 'Немецкий комфорт и статус.',
        specs: ['Burmester звук', 'Амбиентная подсветка']
    },
    {
        id: 9,
        image: CarBlack,
        title: 'Tesla Model Y Long Range',
        price: 39000,
        year: 2022,
        transmission: 'Автомат',
        mileage: 18000,
        brand: 'Tesla',
        fuel: 'Электро',
        description: 'Самый популярный семейный электрокар.',
        specs: ['7 мест', 'Тепловой насос']
    },
    {
        id: 10,
        image: CarBlack,
        title: 'Chery Tiggo 8 Pro',
        price: 22500,
        year: 2021,
        transmission: 'Автомат',
        mileage: 45000,
        brand: 'Chery',
        fuel: 'Бензин',
        description: 'Просторный семейный внедорожник.',
        specs: ['Круговой обзор', 'Панорама']
    },
    {
        id: 11,
        image: CarBlack,
        title: 'Subaru Forester',
        price: 18900,
        year: 2017,
        transmission: 'Автомат',
        mileage: 95000,
        brand: 'Subaru',
        fuel: 'Бензин',
        description: 'Легендарная система полного привода.',
        specs: ['X-Mode', 'EyeSight система']
    },
    {
        id: 12,
        image: CarBlack,
        title: 'JAC JS6',
        price: 19800,
        year: 2023,
        transmission: 'Автомат',
        mileage: 1200,
        brand: 'JAC',
        fuel: 'Бензин',
        description: 'Современный дизайн и экономичный мотор.',
        specs: ['Apple CarPlay', 'Цифровая панель']
    },
    {
        id: 13,
        image: CarBlack,
        title: 'Audi A6 Avant',
        price: 34000,
        year: 2020,
        transmission: 'Автомат',
        mileage: 52000,
        brand: 'Audi',
        fuel: 'Дизель',
        description: 'Идеальный автомобиль для путешествий.',
        specs: ['Matrix LED', 'Фаркоп']
    },
    {
        id: 14,
        image: CarBlack,
        title: 'BMW 3 Series M Sport',
        price: 37500,
        year: 2021,
        transmission: 'Автомат',
        mileage: 28000,
        brand: 'BMW',
        fuel: 'Бензин',
        description: 'Драйв и управляемость в каждом повороте.',
        specs: ['M-тормоза', 'Проекция на стекло']
    },
    {
        id: 15,
        image: CarBlack,
        title: 'Zeekr X',
        price: 29900,
        year: 2023,
        transmission: 'Автомат',
        mileage: 50,
        brand: 'Zeekr',
        fuel: 'Электро',
        description: 'Городской кроссовер будущего.',
        specs: ['Безрамочные зеркала', 'Face ID']
    },
    {
        id: 16,
        image: CarBlack,
        title: 'BYD Song Plus',
        price: 26000,
        year: 2022,
        transmission: 'Автомат',
        mileage: 14000,
        brand: 'BYD',
        fuel: 'Гибрид',
        description: 'Запас хода до 1100 км в гибридном режиме.',
        specs: ['Поворотный экран', 'NFC ключ']
    },
    {
        id: 17,
        image: CarBlack,
        title: 'Mercedes GLE 450',
        price: 68000,
        year: 2021,
        transmission: 'Автомат',
        mileage: 33000,
        brand: 'Mercedes',
        fuel: 'Гибрид',
        description: 'Роскошь и мощь в одном флаконе.',
        specs: ['Гидроподвеска', 'Массаж сидений']
    },
    {
        id: 18,
        image: CarBlack,
        title: 'Geely Coolray',
        price: 17500,
        year: 2020,
        transmission: 'Автомат',
        mileage: 58000,
        brand: 'Geely',
        fuel: 'Бензин',
        description: 'Яркий молодежный кроссовер.',
        specs: ['Автопарковка', 'Спортивный выхлоп']
    },
    {
        id: 19,
        image: CarBlack,
        title: 'Subaru Outback',
        price: 24000,
        year: 2018,
        transmission: 'Автомат',
        mileage: 82000,
        brand: 'Subaru',
        fuel: 'Бензин',
        description: 'Универсал повышенной проходимости.',
        specs: ['Harman Kardon', 'Подогрев руля']
    },
    {
        id: 20,
        image: CarBlack,
        title: 'Tesla Model S Plaid',
        price: 75000,
        year: 2022,
        transmission: 'Автомат',
        mileage: 9000,
        brand: 'Tesla',
        fuel: 'Электро',
        description: 'Разгон до 100 км/ч за 2.1 секунды.',
        specs: ['Штурвал вместо руля', '3 мотора']
    },
    {
        id: 21,
        image: CarBlack,
        title: 'Chery Exeed TXL',
        price: 27800,
        year: 2022,
        transmission: 'Автомат',
        mileage: 21000,
        brand: 'Chery',
        fuel: 'Бензин',
        description: 'Премиальный суббренд компании Chery.',
        specs: ['Sony аудиосистема', 'Память зеркал']
    },
    {
        id: 22,
        image: CarBlack,
        title: 'JAC T8 Pro',
        price: 23000,
        year: 2023,
        transmission: 'Механика',
        mileage: 300,
        brand: 'JAC',
        fuel: 'Дизель',
        description: 'Надежный пикап для работы и отдыха.',
        specs: ['Грузоподъемность 900кг', 'Кожаный салон']
    },
    {
        id: 23,
        image: CarBlack,
        title: 'BMW X7 xDrive40i',
        price: 89000,
        year: 2021,
        transmission: 'Автомат',
        mileage: 31000,
        brand: 'BMW',
        fuel: 'Бензин',
        description: 'Флагманский кроссовер в идеале.',
        specs: ['Sky Lounge крыша', 'Лазерные фары']
    },
    {
        id: 24,
        image: CarBlack,
        title: 'Audi Q7 e-tron',
        price: 49500,
        year: 2020,
        transmission: 'Автомат',
        mileage: 48000,
        brand: 'Audi',
        fuel: 'Гибрид',
        description: 'Экономичный и мощный гибрид.',
        specs: ['Виртуальный кокпит', 'Пневма']
    }
];


export const customsRates = {
    '2025': {
        p1000: ['$6 100', '$1 773'], p1200: ['$7 320', '$2 127'], p1400: ['$8 540', '$2 481'], p1500: ['$9 150', '$2 659'], p1600: ['$9 760', '$2 836'], p1700: ['$10 370', '$3 013'], p1800: ['$10 980', '$3 190'], p2000: ['$12 200', '$3 545'], p2200: ['$13 420', '$3 899'], p2400: ['$14 640', '$4 254'], p2500: ['$15 250', '$4 431'], p3000: ['$18 300', '$5 317'], p3300: ['$20 130', '$5 848'], p3500: ['$21 350', '$6 203'], p3800: ['$23 180', '$6 735'], p4000: ['$24 400', '$6 405'], p4400: ['$26 840', '$7 046'], p4500: ['$27 450', '$7 205'], p4600: ['$28 060', '$7 366'], p5000: ['$30 500', '$8 000'], p5700: ['$34 770', '$9 128'], p6000: ['$36 600', '$9 600'], p6200: ['$37 820', '$9 928']
    },
    '2024': {
        p1000: ['$6 100', '$1 773'], p1200: ['$7 320', '$2 127'], p1400: ['$8 540', '$2 481'], p1500: ['$9 150', '$2 659'], p1600: ['$9 760', '$2 836'], p1700: ['$10 370', '$3 013'], p1800: ['$10 980', '$3 190'], p2000: ['$12 200', '$3 545'], p2200: ['$13 420', '$3 899'], p2400: ['$14 640', '$4 254'], p2500: ['$15 250', '$4 431'], p3000: ['$18 300', '$5 317'], p3300: ['$20 130', '$5 848'], p3500: ['$21 350', '$6 203'], p3800: ['$23 180', '$6 735'], p4000: ['$24 400', '$6 405'], p4400: ['$26 840', '$7 046'], p4500: ['$27 450', '$7 205'], p4600: ['$28 060', '$7 366'], p5000: ['$30 500', '$8 000'], p5700: ['$34 770', '$9 128'], p6000: ['$36 600', '$9 600'], p6200: ['$37 820', '$9 928']
    },
    '2023': {
        p1000: ['$5 590', '$1 624'], p1200: ['$6 700', '$1 950'], p1400: ['$7 800', '$2 270'], p1500: ['$8 385', '$2 436'], p1600: ['$8 944', '$2 599'], p1700: ['$9 503', '$2 761'], p1800: ['$10 062', '$2 924'], p2000: ['$11 180', '$3 248'], p2200: ['$12 298', '$3 573'], p2400: ['$13 416', '$3 897'], p2500: ['$13 975', '$4 060'], p3000: ['$16 770', '$4 872'], p3300: ['$18 447', '$5 359'], p3500: ['$19 565', '$5 684'], p3800: ['$21 242', '$6 172'], p4000: ['$22 360', '$5 870'], p4400: ['$24 596', '$6 457'], p4500: ['$25 155', '$6 603'], p4600: ['$25 714', '$6 750'], p5000: ['$27 950', '$7 337'], p5700: ['$31 863', '$8 365'], p6000: ['$33 540', '$8 804'], p6200: ['$34 658', '$9 098']
    },
    '2022': {
        p1000: ['$5 090', '$1 479'], p1200: ['$6 100', '$1 775'], p1400: ['$7 120', '$2 070'], p1500: ['$7 635', '$2 218'], p1600: ['$8 144', '$2 366'], p1700: ['$8 653', '$2 514'], p1800: ['$9 162', '$2 662'], p2000: ['$10 180', '$2 958'], p2200: ['$11 198', '$3 254'], p2400: ['$12 216', '$3 549'], p2500: ['$12 725', '$3 697'], p3000: ['$15 270', '$4 436'], p3300: ['$16 797', '$4 880'], p3500: ['$17 815', '$5 176'], p3800: ['$19 343', '$5 620'], p4000: ['$20 360', '$5 345'], p4400: ['$22 396', '$5 879'], p4500: ['$22 905', '$6 012'], p4600: ['$23 414', '$6 147'], p5000: ['$25 450', '$6 680'], p5700: ['$29 013', '$7 616'], p6000: ['$30 540', '$8 017'], p6200: ['$31 558', '$8 285']
    },
    '2021': {
        p1000: ['$4 470', '$1 300'], p1200: ['$5 360', '$1 560'], p1400: ['$6 250', '$1 820'], p1500: ['$6 705', '$1 950'], p1600: ['$7 150', '$2 080'], p1700: ['$7 590', '$2 210'], p1800: ['$8 040', '$2 340'], p2000: ['$8 940', '$2 600'], p2200: ['$9 830', '$2 860'], p2400: ['$10 720', '$3 120'], p2500: ['$11 175', '$3 250'], p3000: ['$11 640', '$4 034'], p3300: ['$12 804', '$4 810'], p3500: ['$13 580', '$5 100'], p3800: ['$14 744', '$5 465'], p4000: ['$15 520', '$5 830'], p4400: ['$17 072', '$6 415'], p4500: ['$17 460', '$6 560'], p4600: ['$17 848', '$6 706'], p5000: ['$19 400', '$7 290'], p5700: ['$22 116', '$8 310'], p6000: ['$23 280', '$8 750'], p6200: ['$24 056', '$9 040']
    },
    '2020': {
        p1000: ['$3 440', '$2 500'], p1200: ['$4 128', '$3 000'], p1400: ['$4 816', '$3 500'], p1500: ['$5 160', '$3 750'], p1600: ['$5 504', '$4 000'], p1700: ['$5 848', '$4 250'], p1800: ['$6 192', '$4 500'], p2000: ['$6 880', '$5 000'], p2200: ['$7 568', '$5 500'], p2400: ['$8 256', '$6 000'], p2500: ['$8 600', '$6 250'], p3000: ['$10 350', '$3 587'], p3300: ['$11 385', '$4 634'], p3500: ['$12 075', '$4 815'], p3800: ['$13 110', '$5 217'], p4000: ['$13 800', '$5 620'], p4400: ['$15 180', '$6 183'], p4500: ['$15 525', '$6 322'], p4600: ['$15 870', '$6 465'], p5000: ['$17 250', '$7 025'], p5700: ['$19 665', '$8 010'], p6000: ['$20 700', '$8 430'], p6200: ['$21 390', '$8 715']
    },
    '2019': {
        p1000: ['$3 020', '$517'], p1200: ['$3 624', '$620'], p1400: ['$4 228', '$1 465'], p1500: ['$4 530', '$1 570'], p1600: ['$4 832', '$1 676'], p1700: ['$5 134', '$1 780'], p1800: ['$5 436', '$1 885'], p2000: ['$6 040', '$2 094'], p2200: ['$6 644', '$2 303'], p2400: ['$7 248', '$2 512'], p2500: ['$7 550', '$2 617'], p3000: ['$9 060', '$3 140'], p3300: ['$9 966', '$4 460'], p3500: ['$10 570', '$4 730'], p3800: ['$11 476', '$5 069'], p4000: ['$12 080', '$5 408'], p4400: ['$13 288', '$5 952'], p4500: ['$13 590', '$6 084'], p4600: ['$13 892', '$6 222'], p5000: ['$15 100', '$6 760'], p5700: ['$17 214', '$7 710'], p6000: ['$18 120', '$8 112'], p6200: ['$18 724', '$8 387']
    },
    '2018': {
        p1000: ['$2 580', '$442'], p1200: ['$3 096', '$530'], p1400: ['$3 612', '$1 251'], p1500: ['$3 870', '$1 341'], p1600: ['$4 128', '$1 432'], p1700: ['$4 386', '$1 521'], p1800: ['$4 644', '$1 610'], p2000: ['$5 160', '$1 788'], p2200: ['$5 676', '$1 969'], p2400: ['$6 192', '$2 147'], p2500: ['$6 450', '$2 236'], p3000: ['$7 740', '$2 682'], p3300: ['$8 514', '$4 283'], p3500: ['$9 030', '$4 542'], p3800: ['$9 804', '$4 866'], p4000: ['$10 320', '$5 190'], p4400: ['$11 352', '$5 715'], p4500: ['$11 610', '$5 841'], p4600: ['$11 868', '$5 975'], p5000: ['$12 900', '$6 490'], p5700: ['$14 706', '$7 405'], p6000: ['$15 480', '$7 788'], p6200: ['$15 996', '$8 055']
    }
};

export const row1Brands = [
    {
        name: 'Audi',
        icon: 'https://www.carlogos.org/car-logos/audi-logo.png',
        models: ['A4', 'A6', 'Q5', 'Q7', 'Q8', 'e-tron', 'A8']
    },
    {
        name: 'BMW',
        icon: 'https://www.carlogos.org/car-logos/bmw-logo.png',
        models: ['3 Series', '5 Series', 'X5', 'X7', 'iX', 'M4', 'X3']
    },
    {
        name: 'BYD',
        icon: 'https://www.carlogos.org/car-logos/byd-logo.png',
        models: ['Han', 'Tang', 'Song', 'Qin', 'Seal', 'Dolphin', 'Yuan Plus']
    },
    {
        name: 'Tesla',
        icon: 'https://www.carlogos.org/car-logos/tesla-logo.png',
        models: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck']
    },
    {
        name: 'Mercedes',
        icon: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png',
        models: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLS', 'EQS', 'GLC']
    },
    {
        name: 'Mazda',
        icon: 'https://www.carlogos.org/car-logos/mazda-logo.png',
        models: ['CX-5', 'CX-9', 'CX-30', 'CX-60', 'Mazda 3', 'Mazda 6']
    },
    {
        name: 'Chevrolet',
        icon: 'https://www.carlogos.org/car-logos/chevrolet-logo.png',
        models: ['Tahoe', 'Suburban', 'Camaro', 'Malibu', 'Equinox', 'Trax']
    }
];

export const row2Brands = [
    {
        name: 'JAC',
        icon: 'https://www.carlogos.org/car-logos/jac-motors-logo.png',
        models: ['JS4', 'JS6', 'J7', 'T8 Pro', 'iEVA50']
    },
    {
        name: 'Subaru',
        icon: 'https://www.carlogos.org/car-logos/subaru-logo.png',
        models: ['Forester', 'Outback', 'XV', 'Ascent', 'WRX']
    },
    {
        name: 'Geely',
        icon: 'https://www.carlogos.org/car-logos/geely-logo.png',
        models: ['Coolray', 'Monjaro', 'Tugella', 'Atlas', 'Emgrand']
    },
    {
        name: 'Chery',
        icon: 'https://www.carlogos.org/car-logos/chery-logo.png',
        models: ['Tiggo 4 Pro', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Arrizo 8']
    },
    {
        name: 'Zeekr',
        icon: 'https://www.carlogos.org/car-logos/zeekr-logo.png',
        models: ['001', '009', 'X', '007']
    },
    {
        name: 'Lada',
        icon: 'https://www.carlogos.org/car-logos/lada-logo.png',
        models: ['Vesta', 'Granta', 'Niva Travel', 'Largus']
    },
    {
        name: 'Hyundai',
        icon: 'https://www.carlogos.org/car-logos/hyundai-logo.png',
        models: ['Tucson', 'Santa Fe', 'Palisade', 'Elantra', 'Sonata', 'Ioniq 5']
    }
];