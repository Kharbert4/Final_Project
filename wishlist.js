/**
 * wishlist.js
 * Handles adding and removing items from the dynamic wishlist using localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select all 'Add to Wish List' buttons/elements
    const wishlistButton = document.querySelector('.wishlist');

    // Only run if the wishlist button exists on the page
    if (wishlistButton) {
        // 1. Get the clothing item's details from the current page
        const titleElement = document.querySelector('.title');
        const priceElement = document.querySelector('.clothing-info ul li:first-child');
        const imageElement = document.querySelector('.clothing-item img');

        let item = null;

        if (titleElement && priceElement && imageElement) {
            item = {
                // Get the item title, trimming whitespace
                name: titleElement.textContent.trim(),
                // Extract and clean the price string
                price: priceElement.textContent.replace('Price:', '').trim(),
                // Get the image source (used as a unique ID and for display)
                imgSrc: imageElement.getAttribute('src')
            };

            // 2. Check and update the button text/state on page load
            updateWishlistButton(wishlistButton, item.imgSrc);

            // 3. Attach the click handler to the button
            wishlistButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior, though it's a div
                toggleWishlistItem(item, wishlistButton);
            });
        }
    }
});

/**
 * Retrieves the current wishlist from localStorage.
 * @returns {Array} An array of wishlist items.
 */
function getWishlist() {
    // Get the string from localStorage, or an empty array string if null
    const wishlistJson = localStorage.getItem('wishlist') || '[]';
    try {
        // Parse the JSON string back into a JavaScript object (array)
        return JSON.parse(wishlistJson);
    } catch (e) {
        // Handle parsing errors just in case
        console.error("Error parsing wishlist from localStorage:", e);
        return [];
    }
}

/**
 * Saves the updated wishlist array back to localStorage.
 * @param {Array} wishlist - The array of wishlist items to save.
 */
function saveWishlist(wishlist) {
    // Stringify the array so it can be stored as a string in localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/**
 * Adds or removes an item from the wishlist and updates the button text.
 * @param {Object} item - The item to add or remove.
 * @param {HTMLElement} button - The wishlist button element.
 */
function toggleWishlistItem(item, button) {
    const wishlist = getWishlist();
    const itemIndex = wishlist.findIndex(i => i.imgSrc === item.imgSrc);

    if (itemIndex > -1) {
        // Item is already in the list, so remove it (toggle off)
        wishlist.splice(itemIndex, 1);
        button.textContent = 'Add to Wish List';
        button.classList.remove('in-wishlist');
        console.log(`${item.name} removed from wishlist.`);
    } else {
        // Item is not in the list, so add it (toggle on)
        wishlist.push(item);
        button.textContent = 'Remove from Wish List';
        button.classList.add('in-wishlist');
        console.log(`${item.name} added to wishlist.`);
    }

    saveWishlist(wishlist);
}

/**
 * Checks if an item is in the wishlist and updates the button text accordingly.
 * @param {HTMLElement} button - The wishlist button element.
 * @param {string} itemId - The unique identifier of the item (imgSrc).
 */
function updateWishlistButton(button, itemId) {
    const wishlist = getWishlist();
    const isInWishlist = wishlist.some(item => item.imgSrc === itemId);

    if (isInWishlist) {
        button.textContent = 'Remove from Wish List';
        button.classList.add('in-wishlist');
    } else {
        button.textContent = 'Add to Wish List';
        button.classList.remove('in-wishlist');
    }
}