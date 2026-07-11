# AI Evaluation Rubric

## Assignment Information

**Level:** Beginner
**Week:** 4
**Lessons:** 23–37

Evaluate the student's submission ONLY according to the following requirements.
Do not infer additional requirements.
Ignore folder structure.
Ignore file names except when referencing where an issue exists.
Review every submitted HTML file before generating feedback.

---

# Task 1 (Lessons 19–23) — Semantic HTML Elements

### Critical Requirements
- The student correctly identifies valid HTML elements:
  - Header: Expected `<header>`
  - Nav: Expected `<nav>`
  - Main: Expected `<main>`
  - Aside: Expected `<aside>`
  - Picture: Expected `<picture>`
  - Figure: Expected `<figure>`
  - Footer: Expected `<footer>`
  - Figcaption: Expected `<figcaption>`
  - Section: Expected `<section>`
  - Ruby: Expected `<ruby>`
  - Data: Expected `<data>`
  - Article: Expected `<article>`
- The following must be identified as invalid HTML elements:
  - Command
  - Install
  - Text

### Optional Checks
- Verify if student comments their code.

---

# Task 2 (Lessons 19–23) — Semantic Page Layout

### Critical Requirements
- The page must include:
  - Header: Expected `<header>`
  - Navigation: Expected `<nav>`
  - Main content: Expected `<main>`
  - Sidebar: Expected `<aside>`
  - Footer: Expected `<footer>`
- Header:
  - A page title exists.
  - At least five navigation links exist: Expected `<a>` inside the header.
- Navigation:
  - A navigation bar exists: Expected `<nav>`.
  - It contains at least six links: Expected six `<a>` tags.
- Main Content:
  - Three articles exist: Expected three `<article>` elements.
  - Each article contains a heading, a paragraph, an image (`<img>`), and a "Read More" link (`<a>`).
  - Articles are separated using `<hr>`.
- Sidebar:
  - Sidebar contains the title "Categories".
  - Sidebar contains an unordered list (`<ul>`).
  - The unordered list contains five categories (`<li>`).
- Footer:
  - Footer exists: Expected `<footer>`.
  - Footer contains the text "Copyright 2021 ©" where the copyright symbol is created using a valid HTML entity: Expected `&copy;` or `&#169;`.

### Optional Checks
- Verify if links use working URLs.

---

# Task 3 (Lessons 19–23) — Audio Element

### Critical Requirements
- The page contains one audio element: Expected `<audio autoplay loop>`.
- At least three source elements exist: Expected three `<source>` elements inside `<audio>`.
- Each source uses a different audio format.
- Fallback text exists inside `<audio>`.

### Optional Checks
- Audio files actually exist on the disk.

---

# Task 4 (Lessons 19–23) — Video Element

### Critical Requirements
- The page contains one video element: Expected `<video autoplay muted poster="...">`.
- At least three video sources exist: Expected three `<source>` elements inside `<video>`.
- A poster image is specified.
- Two subtitle tracks exist: Expected two `<track kind="subtitles">` elements.
- Each subtitle uses a different language (e.g., `srclang` attribute).
- Fallback text exists inside `<video>`.

### Optional Checks
- Video tracks are in WebVTT format.

---

# Task 5 (Lessons 24–27) — Form

### Critical Requirements
- Verify that the form contains the following inputs with their own labels:
  - Username: Expected `<input type="text">`
  - Password: Expected `<input type="password">`
  - Mobile: Expected `<input type="tel">`
  - Email: Expected `<input type="email">`
  - Subject: Expected `<input type="text">`
- Validation:
  - Username is required: Expected `required` attribute.
  - Email is required: Expected `required` attribute.
- Placeholder: Every input contains a placeholder: Expected `placeholder` attribute.
- Layout:
  - Label and input pair is separated from the next pair using `<hr>`.
- Form Action and Method:
  - Form configuration: Expected `<form action="test.py" method="post">`
- Hidden Input:
  - Verify that one hidden input exists: Expected `<input type="hidden">`
- Buttons:
  - Submit button exists: Expected `<input type="submit" value="Send Data">` or `<button type="submit">Send Data</button>`
  - Reset button exists: Expected `<input type="reset" value="Empty Form">` or `<button type="reset">Empty Form</button>`

### Optional Checks
- Label appears above its input.

---

# Task 6 (Lessons 24–27) — Range Input

### Critical Requirements
- One range input exists: Expected `<input type="range" min="0" max="400" step="50" value="400">`

### Optional Checks
- Range input contains a name attribute.

---

# Task 7 (Lessons 28–30) — Form Attributes

### Critical Requirements
- Username input exists.
- Email input exists.
- Hidden Token input exists.
- Token: Expected `<input type="hidden" value="b92f1fc2fce391ad7af633723afd3055">`
- Email: Expected `<input type="email" readonly value="o@o.com">`
- Username: Expected `<input type="text" autofocus minlength="5" maxlength="20" required>`
- Buttons:
  - Empty reset button exists: Expected `<input type="reset">` or `<button type="reset">`
  - Send submit button exists: Expected `<input type="submit">` or `<button type="submit">`

### Optional Checks
- Form target attribute.

---

# Task 8 (Lessons 28–30) — Checkbox and Radio Groups

### Critical Requirements
- Skills Checkboxes:
  - Skills use checkboxes: Expected `<input type="checkbox" name="skills">`
  - Every checkbox has a unique `id` attribute.
  - Every label uses the correct `for` attribute matching the checkbox `id`.
  - At least one checkbox is checked: Expected `checked` attribute on one checkbox.
- Job Radio Buttons:
  - Jobs use radio buttons: Expected `<input type="radio" name="job">`
  - Every radio button has a unique `id` attribute.
  - Every label uses the correct `for` attribute matching the radio `id`.
  - At least one radio button is checked: Expected `checked` attribute on one radio button.

### Optional Checks
- Input tags have value attributes.

---

# Task 9 (Lessons 28–30) — Select and Textarea

### Critical Requirements
- A select element exists: Expected `<select>`.
- Programming languages are grouped correctly: Expected `<optgroup>` tags inside `<select>`.
- A textarea exists with brief configuration: Expected `<textarea name="brief">Write Here Why You Want To Learn Programming</textarea>`

### Optional Checks
- Textarea cols and rows attributes.

---

# Task 10 (Lessons 31–34) — Advanced Form Attributes

### Critical Requirements
- Search input exists: Expected `<input type="search" placeholder="Enter A Search Word" autofocus>`
- File input exists: Expected `<input type="file">`
- URL input exists: Expected `<input type="url" required>`
- Form target: Expected `<form target="_blank" novalidate>`
- Empty reset button exists: Expected `<input type="reset">` or `<button type="reset">`

### Optional Checks
- Input elements are disabled or read-only.

---

# Task 11 (Lessons 31–34) — Date Inputs

### Critical Requirements
- Date input exists: Expected `<input type="date" value="1982-10-25">`
- Month input exists: Expected `<input type="month" value="1982-10">`

### Optional Checks
- Input has min or max dates.

---

# Task 12 (Lessons 31–34) — Preformatted Text

### Critical Requirements
- The four lines are placed inside a single preformatted element: Expected `<pre>`.

### Optional Checks
- Text inside `<pre>` uses code elements.

---

# Task 13 (Lessons 31–34) — Iframe

### Critical Requirements
- An iframe exists: Expected `<iframe src="https://elzero.org" width="100%" height="400">` (or CSS equivalent for width/height).

### Optional Checks
- Frameborder attribute.

---

# Task 14 (Lessons 35–37) — HTML Knowledge Questions

### Critical Requirements
- Answers match expected HTML knowledge:
  - Accessibility range text should be: "10 to 20" (NOT "10 – 20")
  - Keyboard navigation: Expected element uses attribute `tabindex="0"`
  - ARIA stands for: "Accessible Rich Internet Applications"

### Optional Checks
- Other ARIA standards.

---

# Task 15 (Lessons 35–37) — Accessibility

### Critical Requirements
- Every selectable skill is keyboard accessible: Expected `tabindex="0"` or native interactive element.
- ARIA attributes are correctly applied: Expected `aria-checked="..."` and `aria-labelledby="..."`.
- Labels correctly reference their corresponding controls.

### Optional Checks
- Colors and contrast ratios.

---

## Mentor Notes

When reviewing this assignment:
- Ignore minor formatting issues.
- Ignore HTML best practices.
- Ignore label associations unless explicitly required.
- Ignore accessibility improvements unless explicitly required.

Prioritize the following common mistakes:
- Mobile input should use type="tel".
- Remove '#' from label for attributes.
- Add target="_blank" to the form.
- Use "10 to 20" instead of "10 – 20".
- Add novalidate when required.
- Ensure textarea default text is inside the element.