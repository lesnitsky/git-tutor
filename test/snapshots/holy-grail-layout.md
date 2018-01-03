# Holy Grail Layout

The Holy Grail Layout is a classic CSS problem with various solutions presented over time. If you’re unfamiliar with the history of the Holy Grail layout, this A List Apart article offers a pretty good summary and links to a few of the more well-known solutions.

At its core, the Holy Grail Layout is a page with a header, footer, and three columns. The center column contains the main content, and the left and right columns contain supplemental content like ads or navigation.

Most CSS solutions to this problem aim to meet a few goals:

* They should have a fluid center with fixed-width sidebars.
* The center column (main content) should appear first in the HTML source.
* All columns should be the same height, regardless of which column is actually the tallest.
* They should require minimal markup.
* The footer should “stick” to the bottom of the page when content is sparse.
* Unfortunately, because of the nature of these goals and the original limitations of CSS, none of the classic solutions to this problem were ever able to satisfy all of them.

With Flexbox, a complete solution is finally possible.

## The HTML

📄 index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body class="HolyGrail">
        <header>…</header>
        <div class="HolyGrail-body">
            <main class="HolyGrail-content">…</main>
            <nav class="HolyGrail-nav">…</nav>
            <aside class="HolyGrail-ads">…</aside>
        </div>
        <footer>…</footer>
    </body>
</html>

```
## The CSS

Getting the center content row to stretch and the footer to stick to the bottom is solved with the same technique shown in the Sticky Footer example. The only difference is the center row of the Holy Grail layout (.HolyGrail-body) needs to be display:flex in order to properly arrange its children.

📄 style.css
```css
.HolyGrail {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

.HolyGrail-body {
    display: flex;
    flex: 1;
}

```
Styling three equal-height columns with a fluid center and fixed-width sidebars is just as easy:

📄 style.css
```diff
      display: flex;
      flex: 1;
  }
+ 
+ .HolyGrail-content {
+     flex: 1;
+ }
+ 
+ .HolyGrail-nav, .HolyGrail-ads {
+     /* 12em is the width of the columns */
+     flex: 0 0 12em;
+ }
+ 
+ .HolyGrail-nav {
+     /* put the nav on the left */
+     order: -1;
+ }

```
And of course don't forget to import css file to your html page

📄 index.html
```diff
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
+     <link rel="stylesheet" href="./style.css">
  </head>
  <body class="HolyGrail">
          <header>…</header>

```
## Being Responsive

The Holy Grail layout came from an era of Web design when pretty much everyone was browsing on a computer. But with the increasing number of mobile devices and the rising popularity of responsive design, the Holy Grail layout has gone mostly out of fashion.

Either way, with Flexbox, creating a mobile-first and mobile-friendly version of the Holy Grail layout is easy. The gist is to simply make the center section flex-direction:column by default and then flex-direction:row for larger screens.

Here’s a complete example that is responsive and mobile-first. You can also resize this browser window to see it in action.

📄 style.css
```diff
      /* put the nav on the left */
      order: -1;
  }
+ 
+ .HolyGrail,
+ .HolyGrail-body {
+   display: flex;
+   flex-direction: column;
+ }
+ 
+ .HolyGrail-nav {
+   order: -1;
+ }
+ 
+ @media (min-width: 768px) {
+   .HolyGrail-body {
+     flex-direction: row;
+     flex: 1;
+   }
+   .HolyGrail-content {
+     flex: 1;
+   }
+   .HolyGrail-nav, .HolyGrail-ads {
+     /* 12em is the width of the columns */
+     flex: 0 0 12em;
+   }
+ }

```
View the [full source](https://github.com/philipwalton/solved-by-flexbox/blob/master/assets/css/components/holy-grail.css) for the HolyGrail component used in this demo on Github.

