Great work! However,
In file `24-27task.html`:
- For the Mobile input, the `type` attribute should be `tel`.
  ```html
  <input type="tel"name= "mobile" placeholder="mobile">
  ```
- The range input attributes `min`, `max`, `step`, and `value` are not configured as required. The `start` attribute is incorrect.
  ```html
  <input type="range" min="0" max="400" step="50" value="400">
  ```
In file `28-30task.html`:
- For the Username input, the `min` and `max` attributes should be `minlength` and `maxlength` respectively.
  ```html
  <input type="text" autofocus minlength="5" maxlength="20" name ="username" required>
  ```
- For the skills checkboxes and job radio buttons, the `for` attribute in the `<label>` elements should not contain `#`.
  ```html
  <label for="ps">Problem Solving</label >
  ```
  ```html
  <label for="f">Front-End Developer</label>
  ```
- The default text for the `textarea` should be inside the element, not in the `placeholder` attribute.
  ```html
  <textarea cols="41"rows="20" name="brief">Write Here Why You Want To Learn Programming</textarea>
  ```
In file `31-34task.html`:
- The form is missing the `target="_blank"` attribute.
  ```html
  <form novalidate target="_blank">
  ```
In file `35-37task.html`:
- The selectable skills with IDs `skill2` and `skill3` should have `tabindex="0"` to be keyboard accessible.
  ```html
  <div id="skill2" class="skill" role="radio" aria-checked="false" tabindex="0" aria-labelledby="label2">
      PHP
  </div>
  <div id="skill3" class="skill" role="radio" aria-checked="false" tabindex="0" aria-labelledby="label3">
      JavaScript
  </div>
  ```