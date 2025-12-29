import LiXiang from '../assets/lixiang.png'
import LincCo from '../assets/LynkCo.jpg'
import Omoda from '../assets/omoda.png'
import Tank from '../assets/tank.png'
import Voyah from '../assets/voyah.webp'
import Xiaomi from '../assets/mi.png'

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
    { name: 'Audi', icon: 'https://www.carlogos.org/car-logos/audi-logo.png', models: ['A4 (B9)', 'A6 (C8)', 'A8 (D5)', 'Q5 (FY)', 'Q7 (4M)', 'Q8', 'e-tron GT'] },
    { name: 'BMW', icon: 'https://www.carlogos.org/car-logos/bmw-logo.png', models: ['3 Series (G20)', '5 Series (G60)', '7 Series (G70)', 'X3 (G45)', 'X5 (G05)', 'X7 (G07)', 'iX'] },
    { name: 'BYD', icon: 'https://www.carlogos.org/car-logos/byd-logo.png', models: ['Han', 'Tang', 'Song Plus', 'Qin Plus', 'Seal', 'Dolphin', 'Yuan Plus'] },
    { name: 'Changan', icon: 'https://www.carlogos.org/car-logos/changan-logo.png', models: ['UNI-K', 'UNI-V', 'UNI-T', 'CS55 Plus', 'CS75 Plus', 'Hunter Plus'] },
    { name: 'Chevrolet', icon: 'https://www.carlogos.org/car-logos/chevrolet-logo.png', models: ['Tahoe', 'Camaro', 'Malibu', 'Equinox EV', 'Monza', 'Traverse'] },
    { name: 'Ford', icon: 'https://www.carlogos.org/car-logos/ford-logo.png', models: ['Explorer', 'Mustang Mach-E', 'F-150', 'Bronco', 'Mondeo'] },
    { name: 'Geely', icon: 'https://www.carlogos.org/car-logos/geely-logo.png', models: ['Monjaro', 'Tugella', 'Coolray', 'Atlas (New)', 'Okavango', 'Preface'] },
    { name: 'Honda', icon: 'https://www.carlogos.org/car-logos/honda-logo.png', models: ['Civic', 'Accord', 'CR-V', 'HR-V', 'ZR-V', 'Odyssey'] },
    { name: 'Hyundai', icon: 'https://www.carlogos.org/car-logos/hyundai-logo.png', models: ['Palisade', 'Santa Fe', 'Tucson', 'Elantra', 'Sonata', 'Staria', 'IONIQ 5'] },
    { name: 'Kia', icon: 'https://www.carlogos.org/car-logos/kia-logo.png', models: ['Sportage', 'Sorento', 'K5', 'Carnival', 'EV6', 'EV9', 'Seltos'] },
    { name: 'Land Rover', icon: 'https://www.carlogos.org/car-logos/land-rover-logo.png', models: ['Defender', 'Range Rover', 'RR Sport', 'Velar', 'Evoque'] },
    { name: 'Lexus', icon: 'https://www.carlogos.org/car-logos/lexus-logo.png', models: ['RX', 'NX', 'LX 600', 'ES', 'IS', 'RZ', 'UX'] },
    { name: 'LiXiang', icon: LiXiang, models: ['L6', 'L7', 'L8', 'L9', 'Mega'] },
    { name: 'Mazda', icon: 'https://www.carlogos.org/car-logos/mazda-logo.png', models: ['CX-5', 'CX-30', 'CX-60', 'CX-90', 'Mazda 3', 'Mazda 6'] },
    { name: 'Mercedes', icon: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png', models: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLS', 'EQS', 'G-Class'] },
    { name: 'Mitsubishi', icon: 'https://www.carlogos.org/car-logos/mitsubishi-logo.png', models: ['Outlander', 'Pajero Sport', 'L200', 'ASX', 'Eclipse Cross'] },
    { name: 'Nissan', icon: 'https://www.carlogos.org/car-logos/nissan-logo.png', models: ['X-Trail', 'Qashqai', 'Patrol', 'Ariya', 'Altima', 'Pathfinder'] },
    { name: 'Subaru', icon: 'https://www.carlogos.org/car-logos/subaru-logo.png', models: ['Forester', 'Outback', 'Crosstrek', 'WRX', 'Solterra'] },
    { name: 'Toyota', icon: 'https://www.carlogos.org/car-logos/toyota-logo.png', models: ['Camry', 'RAV4', 'LC 300', 'Prado', 'Highlander', 'Crown'] },
    { name: 'Volkswagen', icon: 'https://www.carlogos.org/car-logos/volkswagen-logo.png', models: ['Golf 8', 'Passat', 'Tiguan', 'Touareg', 'ID.4', 'ID.6'] },
    { name: 'Zeekr', icon: 'https://www.carlogos.org/car-logos/zeekr-logo.png', models: ['001', '007', '009', 'X'] },
    { name: 'Bentley', icon: 'https://www.carlogos.org/car-logos/bentley-logo.png', models: ['Bentayga', 'Continental GT', 'Flying Spur'] }
];

export const row2Brands = [
    { name: 'Cadillac', icon: 'https://www.carlogos.org/car-logos/cadillac-logo.png', models: ['Escalade', 'XT5', 'XT6', 'CT5', 'Lyriq'] },
    { name: 'Chery', icon: 'https://www.carlogos.org/car-logos/chery-logo.png', models: ['Tiggo 4 Pro', 'Tiggo 7 Pro Max', 'Tiggo 8 Pro Max', 'Arrizo 8'] },
    { name: 'Genesis', icon: 'https://www.carlogos.org/car-logos/genesis-logo.png', models: ['G70', 'G80', 'G90', 'GV70', 'GV80'] },
    { name: 'Hongqi', icon: 'https://www.carlogos.org/car-logos/hongqi-logo.png', models: ['H5', 'H9', 'E-HS9', 'HS5'] },
    { name: 'Infiniti', icon: 'https://www.carlogos.org/car-logos/infiniti-logo.png', models: ['QX50', 'QX55', 'QX60', 'QX80'] },
    { name: 'Jaguar', icon: 'https://www.carlogos.org/car-logos/jaguar-logo.png', models: ['F-Pace', 'E-Pace', 'I-Pace', 'XF'] },
    { name: 'Jeep', icon: 'https://www.carlogos.org/car-logos/jeep-logo.png', models: ['Grand Cherokee', 'Wrangler', 'Compass'] },
    { name: 'Lamborghini', icon: 'https://www.carlogos.org/car-logos/lamborghini-logo.png', models: ['Urus', 'Revuelto', 'Huracan Sterrato'] },
    { name: 'Lynk & Co', icon: LincCo, models: ['01', '03', '05', '08', '09'] },
    { name: 'McLaren', icon: 'https://www.carlogos.org/car-logos/mclaren-logo.png', models: ['Artura', '750S', 'GT'] },
    { name: 'Mini', icon: 'https://www.carlogos.org/car-logos/mini-logo.png', models: ['Cooper', 'Countryman', 'Aceman'] },
    { name: 'Omoda', icon: Omoda, models: ['C5', 'S5'] },
    { name: 'Porsche', icon: 'https://www.carlogos.org/car-logos/porsche-logo.png', models: ['911 (992)', 'Taycan', 'Cayenne', 'Macan EV', 'Panamera'] },
    { name: 'Rolls Royce', icon: 'https://www.carlogos.org/car-logos/rolls-royce-logo.png', models: ['Cullinan', 'Ghost', 'Phantom', 'Spectre'] },
    { name: 'Skoda', icon: 'https://www.carlogos.org/car-logos/skoda-logo.png', models: ['Octavia', 'Superb', 'Kodiaq', 'Enyaq'] },
    { name: 'Tank', icon: Tank, models: ['300', '400', '500', '700'] },
    { name: 'Tesla', icon: 'https://www.carlogos.org/car-logos/tesla-logo.png', models: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'] },
    { name: 'Volvo', icon: 'https://www.carlogos.org/car-logos/volvo-logo.png', models: ['XC40', 'XC60', 'XC90', 'EX30', 'EX90'] },
    { name: 'Voyah', icon: Voyah, models: ['Free', 'Dream', 'Passion'] },
    { name: 'Xiaomi', icon: Xiaomi, models: ['SU7', 'SU7 Max'] },
    { name: 'Exeed', icon: 'https://www.carlogos.org/car-logos/exeed-logo.png', models: ['RX', 'VX', 'TXL', 'LX'] }
];

export const BRANDS_MODELS = {
    'Audi': ['A4 (B9 Facelift)', 'A6 (C8)', 'A8 (D5)', 'Q5 (FY)', 'Q7 (4M Facelift)', 'Q8', 'e-tron GT', 'Q4 e-tron'],
    'BMW': ['3 Series (G20)', '5 Series (G60)', '7 Series (G70)', 'X3 (G45)', 'X5 (G05)', 'X7 (G07 LCI)', 'iX', 'XM'],
    'BYD': ['Han', 'Tang', 'Song Plus', 'Qin Plus', 'Seal', 'Dolphin', 'Yuan Plus'],
    'Changan': ['UNI-K', 'UNI-V', 'UNI-T', 'CS55 Plus', 'CS75 Plus', 'Hunter Plus', 'Lamore'],
    'Chevrolet': ['Tahoe (GMT1YC)', 'Camaro', 'Malibu', 'Equinox (EV)', 'Monza', 'Traverse', 'Silverado'],
    'Ford': ['Explorer', 'Mustang Mach-E', 'F-150 (P702)', 'Bronco', 'Mondeo (China)', 'Puma', 'Territory'],
    'Geely': ['Monjaro', 'Tugella', 'Coolray', 'Atlas (New)', 'Okavango', 'Preface', 'Galaxy L7', 'Geometry C'],
    'Honda': ['Civic (FE/FL)', 'Accord (CY)', 'CR-V (RS)', 'HR-V', 'ZR-V', 'e:NP1', 'Odyssey'],
    'Hyundai': ['Palisade', 'Santa Fe (MX5)', 'Tucson (NX4)', 'Elantra (CN7)', 'Sonata (DN8)', 'Staria', 'IONIQ 5', 'IONIQ 6'],
    'Kia': ['Sportage (NQ5)', 'Sorento (MQ4)', 'K5 (DL3)', 'Carnival (KA4)', 'EV6', 'EV9', 'Seltos', 'K8'],
    'Land Rover': ['Defender (L663)', 'Range Rover (L460)', 'Range Rover Sport (L461)', 'Velar', 'Evoque (L551)'],
    'Lexus': ['RX (AL30)', 'NX (AZ20)', 'LX 600 (J310)', 'ES (XZ10)', 'IS (XE30)', 'RZ', 'UX'],
    'LiXiang': ['L6', 'L7', 'L8', 'L9', 'Mega'],
    'Mazda': ['CX-5 (KF)', 'CX-30', 'CX-60', 'CX-90', 'Mazda 3 (BP)', 'Mazda 6 (GL)'],
    'Mercedes': ['C-Class (W206)', 'E-Class (W214)', 'S-Class (W223)', 'GLE (V167)', 'GLS (X167)', 'EQS', 'EQE', 'G-Class (New)'],
    'Mitsubishi': ['Outlander (GM)', 'Pajero Sport (QE)', 'L200 (LC)', 'ASX', 'Eclipse Cross'],
    'Nissan': ['X-Trail (T33)', 'Qashqai (J12)', 'Patrol (Y63)', 'Ariya', 'Altima (L34)', 'Pathfinder (R53)'],
    'Subaru': ['Forester (SK/SL)', 'Outback (BT)', 'Crosstrek (GU)', 'WRX (VB)', 'Solterra'],
    'Toyota': ['Camry (XV70/XV80)', 'RAV4 (XA50)', 'Land Cruiser 300', 'Prado (J250)', 'Highlander (XU70)', 'Crown (SH60)', 'bZ4X'],
    'Volkswagen': ['Golf 8', 'Passat (B9)', 'Tiguan (Mk3)', 'Touareg (CR)', 'ID.4', 'ID.6', 'ID.7', 'Teramont'],
    'Zeekr': ['001', '007', '009', 'X', 'MIX'],
    'Bentley': ['Bentayga', 'Continental GT', 'Flying Spur'],
    'Cadillac': ['Escalade (GMT1XX)', 'XT5', 'XT6', 'CT5', 'Lyriq', 'Optiq'],
    'Chery': ['Tiggo 4 Pro', 'Tiggo 7 Pro Max', 'Tiggo 8 Pro Max', 'Arrizo 8', 'Explore 06'],
    'Genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80'],
    'Hongqi': ['H5', 'H9', 'E-HS9', 'HS5', 'HS7'],
    'Infiniti': ['QX50', 'QX55', 'QX60', 'QX80 (2025)'],
    'Jaguar': ['F-Pace', 'E-Pace', 'I-Pace', 'XF'],
    'Jeep': ['Grand Cherokee (WL)', 'Wrangler (JL)', 'Compass', 'Grand Wagoneer'],
    'Lamborghini': ['Urus Performatre', 'Revuelto', 'Huracan Sterrato'],
    'Lynk & Co': ['01', '03', '05', '08', '09'],
    'McLaren': ['Artura', '750S', 'GT'],
    'Mini': ['Cooper (J01)', 'Countryman (U25)', 'Aceman'],
    'Omoda': ['C5', 'S5'],
    'Porsche': ['911 (992)', 'Taycan', 'Cayenne (E3 Facelift)', 'Macan (EV)', 'Panamera (G3)'],
    'Rolls Royce': ['Cullinan', 'Ghost', 'Phantom', 'Spectre'],
    'Skoda': ['Octavia (A8)', 'Superb (B9)', 'Kodiaq (Mk2)', 'Enyaq'],
    'Tank': ['300', '400', '500', '700'],
    'Tesla': ['Model 3 (Highland)', 'Model Y', 'Model S (Plaid)', 'Model X', 'Cybertruck'],
    'Volvo': ['XC40', 'XC60', 'XC90', 'EX30', 'EX90', 'V60'],
    'Voyah': ['Free', 'Dream', 'Passion'],
    'Xiaomi': ['SU7'],
    'Exeed': ['RX', 'VX', 'TXL', 'LX']
};