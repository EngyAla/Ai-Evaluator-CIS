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
===== 19-23task.html =====

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <!-- assigment lessons 19-23  Task 2-->
        <header>
            <h1>My Website</h1>

           
            <a href="#H">Home</a>
            <a href="#About">About</a>
            <a href="#Ser">Services</a>
            <a href="#Gal">Gallery</a>
            <a href="#Con">Contact</a>
        </header>

        <hr>

        
        <nav>
            <a href="#1">Link 1</a>
            <a href="#2">Link 2</a>
            <a href="#3">Link 3</a>
            <a href="#4">Link 4</a>
            <a href="#5">Link 5</a>
            <a href="#6">Link 6</a>
        </nav>

        <hr>

       
        <main>

            
            <section>

                
                <article>
                    <h2>Article One</h2>
                    <p>first article content.</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s" >
                    <br>
                    <a href="#Art1">Read More</a>
                </article>

                <hr>

                
                <article>
                    <h2>Artical Two</h2>
                    <p>second article content.</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s" >
                    <br>
                    <a href="#Art2">Read More</a>
                </article>

                <hr>

             
                <article>
                    <h2>Article Three</h2>
                    <p> third article content.</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s" >
                    <br>
                    <a href="#Art3">Read More</a>
                </article>

            </section>

            
            <aside>
                <h3>Categories</h3>

                <ul>
                    <li>Category One</li>
                    <li>Category Two</li>
                    <li>Category Three</li>
                    <li>Category Four</li>
                    <li>Category Five</li>
                </ul>
            </aside>

        </main>

        <hr>


        <footer>
            Copyright 2021 &copy;
        </footer>
    <!-- assigment lessons 19-23  Task 3-->
        
        <audio controls autoplay loop >
            <source src="audio.mp3" type="audio/mpeg">
            <source src="audio.ogg" type="audio/ogg">
            <source src="audio.wav" type="audio/wav">
             Your browser does not support the audio Tag
        </audio>

    <!-- assigment lessons 19-23  Task 3-->
        <video poster="417a357d7d045b0289a06863d0d131de.jpg" muted autoplay>
            <source src="movie.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
            <source src="movie.mov" type="video/mov">
             Your browser does not support the video Tag
            <track src ="fgsubtitles_en.vtt" kind ="subtitles" srclang="en" label="English">
            <track src ="fgsubtitles_it.vtt" kind ="subtitles" srclang="it" label="italian">
        </video>
</body>
</html>
```

===== 24-27task.html =====

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- assigment lessons 24-27  Task 1-->
     <form action="test.py" method="post">
        <input type ="hidden" value="112354" name="hidden field">
        <label>Username</label>
        <br>
        <input type="text" required name="username" placeholder="username">
        <hr>
        <label>password</label>
        <br>
        <input type="password"name="pass" placeholder="password">
         <hr>
        <label>Email</label>
        <br>
        <input type="email" required name="email" placeholder="Email Address">
        <hr>
        <label>Mobile</label>
        <br>
        <input type="text"name= "mobile" placeholder="mobile">
        <hr>
        <label>Subject</label>
        <br>
        <input type="text" name="subject" placeholder="subject">
        <input type="reset"value="Empty Form">
        <input type="submit" value="Send Data">
     </form>
     <!-- assigment lessons 24-27  Task 2-->
      <form>
        <input type="range" start="400" step="50" max="500" min="100">
      </form>
    
</body>
</html>
```

===== 28-30task.html =====

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <!-- assigment lessons 28-30 Tasks-->
    <form>
        <input type="hidden" value="b92f1fc2fce391ad7af633723afd3055" name="token">
        <label>Username </label>
        <input type="text" autofocus min="5" max="20" name ="username" required>
        <label>Email </label>
        <input type ="email" value="o@o.com" name="email"readonly>
        <h2>skills</h2>
        <div>
           <input type="checkbox" name="skill" id="ps" value="Problem Solving" checked>
           <label for="#ps">Problem Solving</label >

         </div>
          <div>
           <input type="checkbox" name="skill" id="lt" value="Logical Thinking">
           <label for="#lt">Logical Thinking</label>

         </div>
          <div>
           <input type="checkbox" name="skill" id="as" value="Advanced Search">
           <label for="#as">Advanced Search</label>

         </div>
          <div>
           <input type="checkbox" name="skill" id="p" value="planing">
           <label for ="#p">planing</label>

         </div>
          <div>
           <input type="checkbox" name="skill" id="a" value="Analysis">
           <label for ="#a">Analysis </label>

         </div>
         <h2>job</h2>
          <div>
           <input type="radio"name="job"id="f" checked value="Front-End Developer">
           <label for ="#f">Front-End Developer</label>

         </div>
         <div>
           <input type="radio"name="job"id="b" value="Back-End Developer">
           <label for ="#b">Back-End Developer</label>

         </div>
          <div>
           <input type="radio"name="job"id="ba"  value="Business Analyst">
           <label for ="#ba"> Business Analyst</label>

         </div>
          <div>
           <input type="radio"name="job"id="pm" value="Project Manager">
           <label for ="#pm"> Project Manager</label>

         </div>
         <br>
         <div>
            <label> Progarmming language Version</label>
            <select name="progarmming language version">
               <optgroup label="PHP">
                 <option value ="v5.0">v5.0</option>
                  <option value ="v7.0">v7.0</option>
                  <option value ="v8.0">v8.0</option>
                </optgroup>
                <optgroup label="Python">
                  <option value ="v2.0">v2.0</option>
                  <option value ="v3.0">v3.0</option>
                   <option value ="v3.0">v3.9</option>
                </optgroup>
             </select>
         </div>
        <br>
         
         <textarea placeholder="Write here Why you Want To Learn Programming" cols="41"rows="20" name="brief"></textarea>

        

        <input type="submit" value="Send">
        <input type ="reset" value="Empty">

    </form>
    
</body>
</html>
```

===== 31-34task.html =====

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <!-- assigment lessons 31-34 Task 1&2  -->
      <form novalidate>
        <label>Search</label>
        <br>
        <br>
        <input type="search" autofocus placeholder="Enter A Search Word" name ="searched">
        <br>
        <br>
        <label>Upload</label>
        <br>
        <br>
        <input type="file" name ="file" >
        <br>
        <br>
        <label>Url </label>
        <br>
        <br>
        <input type="url" required name="url">
        <br>
        <br>
        <label>Date</label>
        <input type="date" name="date" value="1982-10-25">
        <br>
         <br>
        <label>Month</label>
        <input type="month" name ="month" value="1982-10">
         <br>
         <br>
         <input type="reset" value="Empty">
        <input type ="submit" value="Save">
      </form>
       <!-- assigment lessons 31-34 Task 3  -->
        <pre>
       Hello Line One
       Hello Line One
       Hello Line One
              Hello Line One
        </pre>
        <!-- assigment lessons 31-34 Task 4  -->
         <iframe  src="https://elzero.org/" width="100%" height="400px"></iframe>


    
</body>
</html>
```

===== 35-37task.html =====

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- assigment lessons 35-37 Task 3  -->
     <div class="choose-skill" role="radiogroup" aria-label="Choose a skill">

        <div id="skill1" class="skill" role="radio" aria-checked="false" tabindex="0" aria-labelledby="label1">
            Python
        </div>
        <label id="label1">Skill One</label>

        <div id="skill2" class="skill" role="radio" aria-checked="false" tabindex="-1" aria-labelledby="label2">
            PHP
        </div>
        <label id="label2">Skill Two</label>

        <div id="skill3" class="skill" role="radio" aria-checked="false" tabindex="-1" aria-labelledby="label3">
            JavaScript
        </div>
        <label id="label3">Skill Three</label>

    </div>

</body>
</html>
```
