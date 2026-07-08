Great work! However,

### Task1.html
*   The header must contain at least five navigation links.
    ```html
        <li><a href="http://">Contact Us</a></li>
        <li><a href="http://">Blog</a></li>
    ```
*   The sidebar's unordered list must contain five categories.
    ```html
        <li>Link4</li>
        <li>Link5</li>
    ```

### Task2.html
*   The audio element's source elements do not use different audio formats.
    ```html
        <source src="" type="audio/mpeg">
        <source src="" type="audio/ogg">
        <source src="" type="audio/wav">
    ```
*   The video element must include two subtitle tracks with different languages.
    ```html
        <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
        <track kind="subtitles" src="subtitles-fr.vtt" srclang="fr" label="French">
    ```

### Task3.html
*   The username input's label is not correctly associated (missing `id` on the input), and the input is missing the `required` attribute.
    ```html
            <label for="uName">UserName : </label>
            <input type="text" id="uName" placeholder="املأ الحقل" required>
    ```
*   The password input's label is not correctly associated (missing `id` on the input).
    ```html
            <label for="Password">Password : </label>
            <input type="password" id="Password" placeholder="ضع كلمة مرور صعبة">
    ```
*   The mobile input's type is `text` instead of `tel`, and its label is not correctly associated (missing `id` on the input).
    ```html
            <label for="mobile">Mobile : </label>
            <input type="tel" id="mobile" placeholder="املأ الحقل" required>
    ```
*   The email input's label is not correctly associated (missing `id` on the input).
    ```html
            <label for="Email">Email : </label>
            <input type="email" id="Email" placeholder="املأ الحقل" required>
    ```
*   The subject input's label is not correctly associated (missing `id` on the input).
    ```html
            <label for="subject">Subject : </label>
            <input type="text" id="subject" placeholder="املأ الحقل">
    ```
*   The hidden input must have `type="hidden"`.
    ```html
        <input type="hidden" value="1">
    ```
*   The range input's `min` attribute should be `0`, and its `max` attribute should be `400`.
    ```html
            <input type="range" value="400" min="0" max="400" step="50">
    ```

### Task4.html
*   The email input's `value` attribute should be `o@o.com`.
    ```html
            <input type="email" name="Email" placeholder="املأ الحقل" readonly value="o@o.com" >
    ```
*   The textarea is missing the `name="brief"` attribute, and the default text should be inside the element, not in a `placeholder` attribute.
    ```html
            <textarea name="brief">Write Here Why You Want To Learn Programming</textarea>
    ```
*   ARIA attributes (`aria-checked`, `aria-labelledby`) are not applied to the skills checkboxes.
    ```html
           <input type="checkbox" name="Skills" value="Problem Solving" id="P-Solving" checked aria-checked="true" aria-labelledby="label-P-Solving">
           <label for="P-Solving" id="label-P-Solving">Problem Solving</label>
           <!-- ... similar for other checkboxes, with aria-checked="false" if not checked -->
    ```
*   ARIA attributes (`aria-checked`, `aria-labelledby`) are not applied to the job radio buttons.
    ```html
           <input type="radio" name="Jobs" value="Front" id="Front" checked aria-checked="true" aria-labelledby="label-Front">
           <label for="Front" id="label-Front">Front-End</label>
           <!-- ... similar for other radio buttons, with aria-checked="false" if not checked -->
    ```

### Task5.html
*   The iframe's `width` attribute should be `100%`.
    ```html
            <iframe src="https://elzero.org/" frameborder="0" width="100%" height="400"></iframe>
    ```