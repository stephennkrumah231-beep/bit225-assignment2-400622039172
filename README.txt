# BlueLib Catalogue

BIT225 Advanced Web Technologies — Assignment 2
BlueCrest College, Ghana
Programme: BSc. Information Technology, Level 200, Semester III, Fall 2026
Author: Fadi
Student ID: YOUR_STUDENT_ID

Single-page front end for the BlueCrest College Library catalogue. Built with semantic HTML, CSS and plain JavaScript only. No React, Bootstrap, jQuery or other libraries.

## Features

- HTML5 skeleton with header, nav, main, two section elements and a footer that carries the student name and ID.
- Labelled Add Book form: Title, Author, Category (select: IT, Business, Science, Arts) and Copies Available (number).
- At least six books stored in a JavaScript array and rendered as cards by script, not hard-coded in the HTML.
- CSS Grid: 3 cards per row on desktop, 2 on tablet (900px and below), 1 on mobile (below 600px).
- CSS custom properties for the main colours, plus hover effects on cards, navigation links and buttons.
- Search box filters cards by title as the user types.
- Category dropdown shows only books in the selected category. Search and category work together.
- Submitting the form adds a book without reloading. Every field must be filled, and copies must be a whole number of 0 or more. A clear error is shown when validation fails.
- Each card has a Borrow button that reduces copies by 1. At 0 the card shows "Out of stock" and the button is disabled.
- One starter book (Financial Accounting) has 0 copies so the out-of-stock state is visible on first load.

## Folder structure

bit225-assignment2-YOUR_STUDENT_ID/
  index.html
  css/style.css
  js/app.js
  README.md

index.html links to css/style.css and js/app.js. Those folders must exist or the page will be unstyled and the script will not run.

## How to run

1. Replace YOUR_STUDENT_ID in index.html, js/app.js and this file.
2. Open index.html in a browser, or serve the folder locally.
3. Check the browser console is clear (F12, then Console).
4. Check the markup at https://validator.w3.org/ (upload the file, or use Direct Input).

## Submission checklist

1. GitHub repository named bit225-assignment2- followed by your student ID.
2. ZIP of this folder uploaded to the LMS.
3. Repository URL (and GitHub Pages URL, if enabled) in the LMS comment.
4. Two screenshots: one at desktop width and one below 600px (browser device toolbar).

GitHub Pages: repository Settings, then Pages, deploy from the main branch, root folder. The site URL will look like https://username.github.io/bit225-assignment2-STUDENTID/

## Sources

Behaviour follows MDN Web Docs for semantic HTML, CSS Grid, media queries, custom properties, DOM events and form validation. Implementation was drafted with assistance from Grok (xAI), October 2026, and is cited in comments in index.html and js/app.js.
