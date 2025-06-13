# Imperial to Metric Converter Bookmarklet

This project provides a JavaScript bookmarklet that automatically converts imperial units (inches, feet, miles, pounds, etc.) to metric units (centimeters, meters, kilometers, kilograms, etc.) on any webpage. The script parses the visible text and replaces imperial measurements with their metric equivalents, making it easier to read content in the metric system.

## Features
- Converts inches, feet, miles, pounds, ounces, yards, and fluid ounces to metric units
- Handles mixed and unicode fractions (e.g., 1½, 3 1/2)
- Supports various notations (e.g., 5', 5", 5 ft, 5 in, etc.)
- Works as a bookmarklet in any modern browser

## Usage
1. (Optional) Build the bookmarklet by running:
   ```sh
   node build-bookmarklet.js
   ```
2. Open the generated `imperial2metric.bookmarklet.js` file and copy the bookmarklet code.
3. Create a new bookmark in your browser and paste the code as the URL.
4. Click the bookmarklet on any webpage to convert imperial units to metric.

## Files
- `imperial2metric.js` — Main conversion script
- `build-bookmarklet.js` — Node.js script to generate the bookmarklet
- `imperial2metric.bookmarklet.js` — Output bookmarklet code

---

# Конвертер Имперских Единиц в Метрические (Bookmarklet)

Этот проект предоставляет JavaScript-букмарклет, который автоматически конвертирует имперские единицы (дюймы, футы, мили, фунты и др.) в метрические (сантиметры, метры, километры, килограммы и др.) на любой веб-странице. Скрипт анализирует видимый текст и заменяет имперские значения на метрические аналоги, облегчая восприятие информации в метрической системе.

## Возможности
- Конвертация дюймов, футов, миль, фунтов, унций, ярдов и жидких унций в метрические единицы
- Поддержка смешанных и юникодных дробей (например, 1½, 3 1/2)
- Распознавание различных обозначений (например, 5', 5", 5 ft, 5 in и др.)
- Работает как букмарклет в любом современном браузере

## Использование
1. (Опционально) Соберите букмарклет командой:
   ```sh
   node build-bookmarklet.js
   ```
2. Откройте файл `imperial2metric.bookmarklet.js` и скопируйте код букмарклета.
3. Создайте новую закладку в браузере и вставьте код как URL.
4. Кликните по букмарклету на любой странице для конвертации имперских единиц в метрические.

## Файлы
- `imperial2metric.js` — основной скрипт конвертации
- `build-bookmarklet.js` — Node.js-скрипт для генерации букмарклета
- `imperial2metric.bookmarklet.js` — сгенерированный код букмарклета

