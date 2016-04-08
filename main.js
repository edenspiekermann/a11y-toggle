(function () {
  'use strict';

  var internalId = 0;

  function $ (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function closest (el, selector) {
    if (el.closest) return el.closest(selector);

    var matches = el.webkitMatchesSelector
      ? 'webkitMatchesSelector'
      : (el.msMatchesSelector ? 'msMatchesSelector' : 'matches');

    while (el) {
      if (el.nodeType === 1 && el[matches](selector)) {
        return el;
      }

      el = el.parentNode;
    }

    return null;
  }

  // Iterate over all toggles (elements with the `data-a11y-toggle` attribute)
  var togglesMap = $('[data-a11y-toggle]').reduce(function (acc, toggle) {
    var targetId = toggle.getAttribute('data-a11y-toggle');

    // If it doesn’t have an ID, dynamically set it
    toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);

    // If it doesn’t have `aria-expanded`, set it to `true`
    toggle.hasAttribute('aria-expanded') || toggle.setAttribute('aria-expanded', true);

    // Transpose `data-a11y-toggle` attribute in `aria-controls`
    toggle.setAttribute('aria-controls', targetId);

    // Store current toggle against the target (multiple toggles possible)
    acc['#' + targetId] = acc['#' + targetId] || [];
    acc['#' + targetId].push(toggle);
    return acc;
  }, {});

  // Iterate over the targets based on the key of `togglesMap`
  var targetsMap = $(Object.keys(togglesMap)).reduce(function (acc, target) {
    // If it doesn’t have `aria-hidden`, set it to `false`
    target.hasAttribute('aria-hidden') || target.setAttribute('aria-hidden', false);

    // If it doesn’t have a `aria-labelledby`, set it to the ID of all the
    // toggles for the current target
    var labelledby = togglesMap['#' + target.id].map(function (toggle) {
      return toggle.id;
    }).join(' ');
    target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', labelledby);

    // Store the target node against its ID for quick search on click events
    acc[target.id] = target;
    return acc;
  }, {});

  // Bind a single event listener on the document
  document.addEventListener('click', function (event) {
    // Grab the toggle from the event target
    var toggle = closest(event.target, '[data-a11y-toggle]');
    // Grab the target from the ID store in `aria-controls` attribute
    var target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

    if (!target) return false;

    // Grab all the siblings toggles for current target (if any)
    var toggles = togglesMap['#' + target.id];
    var isExpanded = target.getAttribute('aria-hidden') === 'false';

    // Update `aria-hidden` attribute on target and `aria-expanded` attribute
    // on each toggle
    target.setAttribute('aria-hidden', isExpanded);
    toggles.forEach(function (toggle) {
      return toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
})();
