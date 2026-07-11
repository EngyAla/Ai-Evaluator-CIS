Great work! However,

In `Lessons 24To27.html`:
*   Not all label and input pairs are separated from the next pair using `<hr>`.
*   The range input does not have the expected `min="0"`, `max="400"`, and `step="50"` attributes.

In `Lessons 28To30.html`:
*   The username input is missing the `autofocus` attribute.
*   The job inputs are using `type="checkbox"` instead of the expected `type="radio"`.
*   The textarea has multiple `name` attributes, and the `name` attribute value "breif" is misspelled.
*   The textarea's default text should be placed *inside* the element, not as a `placeholder`.

In `Lessons31to34.html`:
*   The URL input is missing the `required` attribute.
*   The iframe element is commented out and must be present.
*   The iframe's `src` attribute value is not "https://elzero.org".
*   The iframe's `width` attribute value is not "100%".
*   The iframe's `height` attribute value is not "400".

In `Lessons35to37.html`:
*   The accessibility range text should be "10 to 20", not "10 To 20".
*   The ARIA acronym explanation includes extra text "(Accessibility)".
*   The "JavaScript" skill `div` has `tabindex="o"` (letter 'o') instead of `tabindex="0"` (digit '0').