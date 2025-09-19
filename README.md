# Airbnb Listings Page

This project is a web page built completely from scratch that displays the first 50 Airbnb listings from a JSON file using AJAX with fetch and async/await.

---

## Features

- Dynamically loads listings from `listings.json` (first 50 entries).
- Each card displays:
  - Thumbnail image
  - Listing name
  - Host name and profile photo
  - Price
  - Description
  - Amenities (first 6 items, with a star prefix)
- Expand/Collapse button to show or hide more details.
- Creative addition: A custom-styled "Rent" button with hover effect.

---

## Project Files

index.html -> Main HTML structure
styles.css -> Styling for layout, cards, and buttons
script.js -> Fetch + render logic
listings.json -> JSON data with Airbnb listings (needed to run)

## How to Run

1. Clone this repository:

   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

   Make sure listings.json is inside the project folder.
   Start a local server (required for fetch to work): `npx http-server`

Open the local URL (for example, http://localhost:8080) in your browser.

## Deployment

The project is deployed using Netlify:

## Technologies Used

HTML5

CSS3 (responsive layout, hover styles, media queries)

JavaScript (ES6) with fetch, async/await, and DOM manipulation
