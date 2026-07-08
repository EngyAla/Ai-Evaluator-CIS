# ROLE
You are an experienced Elzero mentor.
Your job is NOT to perform a full code review.
Your job is to review the student's assignment exactly as a human mentor reviewing Elzero assignments.
Focus only on the assignment objectives.
Report only mistakes that are directly related to the assignment requirements.
Do not report every possible HTML issue.
Ignore minor issues unless they are explicitly required by the rubric.
Your feedback should closely resemble the feedback written by a human mentor.

# EVALUATION RULES
- Evaluate ONLY according to the provided rubric.
- Ignore folder structure.
- Use relative file paths ONLY to identify where an issue exists.
- Do NOT use file names as evaluation criteria.
- Ignore anything outside the rubric.
- Review the ENTIRE submission before generating feedback.
- Do NOT stop after finding the first mistake.
- Return ALL rubric violations found.
- Never invent mistakes.
- Do not infer requirements that are not explicitly defined in the rubric.
- If a requirement is not mentioned in the rubric, ignore it.
- Only evaluate the tasks represented by the submitted source files.
- Do not assume that all assignment tasks were submitted.
- Do NOT report missing implementations for lessons that are not included in the student's submission.
- Keep feedback concise.
- Do not explain HTML theory.
- Do not behave like an HTML validator.
- Do not behave like a linter.
- Do not report HTML best practices unless they are explicitly required by the rubric.
- Ignore stylistic differences.
- Ignore code formatting.
- Ignore code organization.
- Ignore naming conventions.
- Ignore optional improvements.
- Review only the assignment objectives.
- Treat the rubric as the single source of truth.

# RESPONSE FORMAT
If the submission contains no mistakes, return EXACTLY:
Excellent work!
Everything is correct.

Otherwise:
- Start with:
Great work! However,
- Mention only the mistakes.
- Mention every rubric violation found.
- Do NOT mention requirements that were satisfied.
- Do NOT include scores.
- Do NOT include markdown headings.
- Do NOT explain your reasoning.
- If a code correction is required, return ONLY the smallest corrected snippet.
- Never rewrite the entire file.

Before generating feedback:
Review every submitted file.
Identify only violations of Critical Requirements.
Do not mention Optional Checks.
Do not report HTML best practices.
Do not invent improvements.
Imagine that the student will receive your feedback on Discord from a human mentor.
Your response should sound natural, concise, and practical.
Do not overwhelm the student with unnecessary comments.

# ASSIGNMENT TITLE
Beginner-a_week4

# ASSIGNMENT DESCRIPTION
Watch videos from Lesson 23 to Lesson 37.
Solve all assignments.
Upload your GitHub repository.

# RUBRIC
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

# STUDENT SUBMISSION
===== Task1.html =====

```html

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
    <meta name="description" content="This Is Our Book Store" />
  </head>
  <body>
    <header>
      <h2>My Website</h2>
      <ul>
        <li><a href="http://">Home</a></li>
        <li><a href="http://">About</a></li>
        <li><a href="http://">Services</a></li>
        <li><a href="http://">Contact Us</a></li>
      </ul>
    </header>

    <hr>
    <nav>
      <li><a href="http://">Link1</a></li>
      <li><a href="http://">Link2</a></li>
      <li><a href="http://">Link3</a></li>
      <li><a href="http://">Link4</a></li>
      <li><a href="http://">Link5</a></li>
      <li><a href="http://">Link6</a></li>     
    </nav>
    <hr>

    <main>
        <article>
            <h3>Article One</h3>
            <p>This is a short description of first Content.</p>
            <img src="" alt="image1">
            <br>
            <a href="http://">اقرا المزيد</a>
        </article>
        <hr>

        <article>
            <h3>Article Two</h3>
            <p>This is a short description of Second Content.</p>
            <img src="" alt="image2">
            <br>
            <a href="http://">اقرا المزيد</a>
        </article>
        <hr>

        <article>
            <h3>Article Three</h3>
            <p>This is a short description of Third Content.</p>
            <img src="" alt="image2">
            <br>
            <a href="http://">اقرا المزيد</a>
        </article>
        <hr>

    </main>


    <aside>
      <h2>Categories</h2>

      <ul>
        <li>Link1</li>
        <li>Link2</li>
        <li>Link3</li>
        <li>Link4</li>
      </ul>
    </aside>
    <hr>
    <footer>
      <p>CopyRight 2021 &copy;</p>
    </footer>
  </body>
</html>
```

===== Task2.html =====

```html

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
    <meta name="description" content="This Is Our Book Store" />
  </head>
  <body>
    
    <audio controls loop autoplay>
        <source src="" type=""> 
        <source src="" type=""> 
        <source src="" type=""> 
        المتصفح لا يدعم هذا الملف الصوتي
    </audio>

    <video controls muted autoplay poster="">
        <source src="" type="">
        <source src="" type="">
        <source src="" type="">
        
        لمتصفح لا يدعم هذا الملف المرئي
    </video>
  </body>
</html>
```

===== Task3.html =====

```html

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
    <meta charset="UTF-8"/>
  </head>
  <body>

    <form action="test.py" method="post">

        <div>
            <label for="uName">UserName : </label>
            <input type="text" placeholder="املأ الحقل">
            <hr>
        </div>

        <div>
            <label for="Password">Password : </label>
            <input type="password" placeholder="ضع كلمة مرور صعبة">
            <hr>
        </div>

        <div>
            <label for="mobile">Mobile : </label>
            <input type="text" placeholder="املأ الحقل" required>
            <hr>
        </div>

        <div>
            <label for="Email">Email : </label>
            <input type="email" placeholder="املأ الحقل" required>
            <hr>
        </div>

        <div>
            <label for="subject">Subject : </label>
            <input type="text" placeholder="املأ الحقل">
            <hr>
        </div>
        
        <div>
            <label for="Num">Number : </label>
            <input type="range" value="400" min="100" max="500" step="50">
            <hr>
        </div>

        <input type="number" hidden value="1">

        <input type="reset" value="Empty Form">
        <br> <br>
        <input type="submit" value="Send Data">

    </form>
    
  </body>
</html>
```

===== Task4.html =====

```html

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
    <meta charset="UTF-8"/>
  </head>
  <body>

    <form action="Task4.html" method="get" >

        <div>
            <label for="uName">UserName : </label>
            <input type="text" name="UserName" placeholder="املأ الحقل" autofocus required minlength="5" maxlength="20">
            <hr>
        </div>

        <div>
            <label for="Email">Email : </label>
            <input type="email" name="Email" placeholder="املأ الحقل" readonly value="Reda@gmail.com" >
            <hr>
        </div>

        <div>
            <input type="hidden" name="Token" value="b92f1fc2fce391ad7af633723afd3055"  >     
        </div>

        
        <div>
            <h3><b> Skills:</b></h3> 
           <input type="checkbox" name="Skills" value="Problem Solving" id="P-Solving" checked>
           <label for="P-Solving">Problem Solving</label>
        </div>

         <div>
           <input type="checkbox" name="Skills" value="Analysis" id="Analysis">
           <label for="Analysis">Analysis</label>
        </div>

        <div>
           <input type="checkbox" name="Skills" value="Planning" id="Planning">
           <label for="Planning">Planning</label>
           <hr>
        </div>


        <div>
            <h3><b>Jobs:</b></h3> 
           <input type="radio" name="Jobs" value="Front" id="Front" checked>
           <label for="Front">Front-End</label>
        </div>

         <div>
           <input type="radio" name="Jobs" value="Back" id="Back">
           <label for="Back">Back-End</label>
        </div>

        <div>
           <input type="radio" name="Jobs" value="P-Manager" id="P-Manager">
           <label for="P-Manager">Project Manager</label>
           <hr>
        </div>


        <label for="Books">Check Book : </label>
        <select id="Books">
            

            <optgroup label="PHP">
                <option value="5">V5.0</option>
                <option value="7">V7.0</option>
                <option value="8">V8.0</option>
            </optgroup>

            <optgroup label="Python">
                <option value="2">V2.0</option>
                <option value="3">V3.0</option>
                <option value="3.9">V3.9</option>
            </optgroup>

        </select>
        <hr>

        <div>
            <textarea placeholder="Write here What do you want to learn Programming"></textarea>
            <hr>
        </div>


        <input type="reset" value="Empty ">
        <br> <br>
        <input type="submit" value="Send Data">

    </form>
    
  </body>
</html>
```

===== Task5.html =====

```html

<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
    <meta charset="UTF-8"/>
  </head>
  <body>

    <form action="Task4.html" method="get" target="_blank" novalidate >

        <div>
            <label for="Search">Search: </label>
            <input type="search" name="search" placeholder="Enter A Search Word" autofocus>
            <hr>
        </div>

        <div>
            <label for="File">Upload : </label>
            <input type="file" name="file">
            <hr>
        </div>

       <div>
            <label for="Url">Url : </label>
            <input type="url" name="Url" required>
            <hr>
        </div>

        <div>
            <label for="Date">Date : </label>
            <input type="date" name="Date" value="1982-10-25">
            <hr>
        </div>

        <div>
            <label for="Month">Month : </label>
           <input type="month" name="Month" value="1982-10">
            <hr>
        </div>

        <div>
            <pre>
                <code>
                    Hello Line One
                    Hello Line Two
                    Hello Line Three
                         Hello Line Four
                </code>
            </pre>
            <hr>
        </div>

        <div>
            <iframe src="https://elzero.org/" frameborder="0" width="400" height="400"></iframe>
            <hr>
        </div>

        <input type="reset" value="Empty ">
        <br> <br>
        <input type="submit" value="Send Data">

    </form>
    
  </body>
</html>
```
