---
title: Sample Post
description: "A sample post that shows every text and media element, so each article reads the same way — calm, clear and easy on the eyes."
author: Mehedi Sharif
categories: [Building]
tags: [Building, Writing]
cover_placeholder: "Cover image · 2100 × 900"
cover_caption: "Cover image caption, with photo credit if needed."
---

## Style guide: how every post on this blog looks

<p class="leadp">This opening paragraph is the lead. It is set a little larger so the reader eases into the post and knows what it is about within a few seconds.</p>
<p>Body text is set in Inter at 19px with a line height of 1.75, and each line holds about 65–75 characters. That width is the sweet spot for long reading: the eye finds the next line without effort, and nothing feels cramped.</p>

<h2 id="t-text">Text styles</h2>
<p>Inside a paragraph you can use <strong>bold for key ideas</strong>, <em>italics for emphasis or titles</em>, and <a href="#">links that are underlined in lime</a>. Short technical terms go in <code>inline code</code>, and you can <mark>highlight a phrase</mark> that matters. Keyboard shortcuts look like <kbd>⌘</kbd> + <kbd>K</kbd>, and abbreviations like <abbr title="GoHighLevel">GHL</abbr> show their meaning on hover.<sup><a href="#fn1" id="r1">1</a></sup></p>

<h2 id="t-head">Headings</h2>
<p>Headings use Cormorant Garamond, the same serif as the rest of the site. They break a long post into parts that are easy to scan.</p>
<h3>Heading level three</h3>
<p>Use this for sections inside a main section. It stays serif, but smaller.</p>
<h4>Heading level four</h4>
<p>A bold Inter heading for small sub-points, steps or short groups of paragraphs.</p>
<h5>Heading level five · label</h5>
<p>A small uppercase label for things like “Step 1” or “Key takeaway”.</p>

<h2 id="t-lists">Lists</h2>
<p>An unordered list, with a nested level:</p>
<ul>
  <li>Keep each point short — one idea per line.</li>
  <li>Start with the most important point.
    <ul>
      <li>A nested point adds detail.</li>
      <li>Use nesting only one level deep.</li>
    </ul>
  </li>
  <li>End with a clear next step.</li>
</ul>
<p>An ordered list for steps:</p>
<ol>
  <li>Write the draft without editing.</li>
  <li>Cut every sentence that doesn’t help the reader.</li>
  <li>Read it out loud, then publish.</li>
</ol>
<p>A checklist:</p>
<ul class="checks">
  <li class="d"><span class="box done" aria-hidden="true">✓</span>Pick a topic</li>
  <li class="d"><span class="box done" aria-hidden="true">✓</span>Write the first draft</li>
  <li><span class="box" aria-hidden="true"></span>Add images and captions</li>
</ul>

<h2 id="t-quotes">Quotes</h2>
<p>A blockquote is for quoting someone else, with the source underneath:</p>
<blockquote><p>“A quote from a book, a person or another article sits here, set in italics with a lime rule on the left.”</p><cite>— Author name, Source</cite></blockquote>
<div class="pull"><p>A pull quote lifts one strong line out of the post so skimmers catch it.</p><span>Pull quote</span></div>

<h2 id="t-images">Images</h2>
<p>An image inside the text column, with a caption:</p>
<figure>
  <div class="media" style="aspect-ratio: 3 / 2">Image · 1360 × 906</div>
  <figcaption>Captions are small, muted and centred under the image.</figcaption>
</figure>
<p>A wide image breaks out of the text column for more impact:</p>
<figure class="wide">
  
  <figcaption>A wide image, still captioned.</figcaption>
</figure>
<p>Two images side by side, for comparisons or before-and-after:</p>
<figure>
  <div class="gal"><div class="media" style="aspect-ratio: 4 / 5">Image 1</div><div class="media" style="aspect-ratio: 4 / 5">Image 2</div></div>
  <figcaption>Left: before. Right: after.</figcaption>
</figure>

<h2 id="t-video">Video</h2>
<p>Videos from YouTube or Vimeo sit in a 16:9 frame with a lime play button:</p>
<figure>
  <div class="video" role="img" aria-label="Video player placeholder"><div class="play"><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="#030407"></path></svg></div><div class="bar"><span>1:24</span><span class="track"><i></i></span><span>4:30</span></div></div>
  <figcaption>Video title or a short note about the video.</figcaption>
</figure>

<h2 id="t-code">Code</h2>
<p>Code blocks show the file name, the language and a copy button. Highlighted lines draw attention to what changed:</p>
<div class="code">
  <div class="top"><span><b>reading-time.js</b> · JavaScript</span><button type="button" class="copy" aria-label="Copy code"><svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h10v10H9zM5 5h10v2H7v8H5z" fill="currentColor"></path></svg>Copy</button></div>
<pre><span class="l"><span class="c">// Estimate reading time from the post body</span></span><span class="l"><span class="k">export function</span> <span class="f">readingTime</span>(text, wpm = <span class="n">220</span>) {</span><span class="l hl">  <span class="k">const</span> words = text.<span class="f">trim</span>().<span class="f">split</span>(<span class="s">/\s+/</span>).length;</span><span class="l hl">  <span class="k">const</span> minutes = Math.<span class="f">max</span>(<span class="n">1</span>, Math.<span class="f">round</span>(words / wpm));</span><span class="l">  <span class="k">return</span> <span class="s">`${minutes} min read`</span>;</span><span class="l">}</span><span class="l"></span><span class="l"><span class="f">readingTime</span>(post.body); <span class="c">// → "6 min read"</span></span></pre>
</div>

<h2 id="t-table">Tables &amp; notes</h2>
<p>Tables are simple, with plenty of space and numbers aligned to the right:</p>
<table class="tbl">
  <thead><tr><th>Element</th><th>Font</th><th class="num">Size</th></tr></thead>
  <tbody>
    <tr><td>Title</td><td>Cormorant Garamond</td><td class="num">76px</td></tr>
    <tr><td>Heading 2</td><td>Cormorant Garamond</td><td class="num">44px</td></tr>
    <tr><td>Body</td><td>Inter</td><td class="num">19px</td></tr>
    <tr><td>Caption</td><td>Inter</td><td class="num">14px</td></tr>
  </tbody>
</table>
<div class="callout"><span class="ic" aria-hidden="true">i</span><div><strong>Note</strong>A callout box highlights a tip, a warning or a key takeaway without breaking the flow of reading.</div></div>
<hr>
<p>A short closing paragraph ends the post and points the reader to what to do next — reply, share, or read another post.</p>
<div class="fn"><strong style="font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase">Notes</strong><ol><li id="fn1">Footnotes sit at the end of the post, in a smaller size. <a href="#r1" aria-label="Back to text">↩</a></li></ol></div>
