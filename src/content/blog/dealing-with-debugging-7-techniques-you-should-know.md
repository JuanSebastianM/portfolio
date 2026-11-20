---
title: 'Dealing with Debugging: 7 Techniques You Should Know'
date: '2023-02-18T01:01:18.771Z'
slug: dealing-with-debugging-7-techniques-you-should-know
tags:
  - javascript
  - css
  - debugging
  - wemakedevs
coverImage: >-
  /images/blog/7866364d-fe3b-4a0e-8a6d-17b2c7a9b8f2.webp
---
Debugging is one of the most important skills one can have and knowing techniques to do so effectively is key. As part of my experience, here are some techniques that have helped me a lot throughout my journey and will, for sure, boost yours :)

## CSS-related techniques

1. Sometimes we spend a lot of time wondering why the styles are not being applied to an element. So, **adding a border color (**`border: 1px solid <whatever-color-you-want>;`) to that element can help you know what's going on with it more deeply. You'll then confirm if you're really targeting the element or not.
    

<p><a href="https://twitter.com/JuanMendozaDev/status/1412566644375928834?s=20">View the original post on X</a></p>

1. Use your browser console (aka Dev Tools) to:
    
    1. **apply all the styles to the element, instead of applying them blindly in your** `.css` **file and having to switch apps every single time to check how it is looking**. Once you've applied all the styles through the browser console, copy and paste them in your `.css` file :)
        
    2. if you're **working with a components library** (Material UI, Chakra UI, etc...), **you might want to disable those styles you think are causing your component to look unexpectedly bad.** This way you'll know which style you should override in your `.css` file. Also, the next tip will come in handy for this specific case.
        
    3. **know which class or HTML element you have to target in your** `.css` **file.** This can also help you know if your styles might get overridden because of a low specificity value, and for that, you'll then know how much specificity you'll have to apply.
        

## JavaScript-related techniques

**These techniques will more likely also work for any other programming language but the syntax might not be the same**. However, you'll be able to reference everything.

1. `console.log` **<s>everything</s> out**. Sometimes we underestimate the power of console logging and, instead, try to figure out why our code is not working by just reading it or commenting out line by line to see where it broke. So, confirm that the variable you're working with is returning the expected value or at least is not `undefined` because of a typo 😁.
    
2. **Use breakpoints to verify that your code is working as expected**. Watch my recording below for a quick tutorial on VS Code 😄
    

<p><a href="https://player.vimeo.com/video/800019976">Watch the original video on Vimeo</a></p>

You can do this in the Dev Tools by doing something similar or by using `debugger;` . For a quick tutorial on this, check this [https://developer.chrome.com/docs/devtools/javascript/breakpoints/](https://developer.chrome.com/docs/devtools/javascript/breakpoints/).

1. **If you're running into performance issues** on the front-end of your app, take a look at the **Network** tab in the DevTools and see what's causing them. It might be that your asset files are too high, so you can compress them with Adobe PhotoShop or any online tool. Or, if you're working with HTTP requests, you can also check if they're the issue, maybe you're making too many requests and you can optimize them.
    

That's it for this article, thanks for reading! Hope these techniques improve your debugging as much as possible 😊.

You can find me on [**Twitter**](https://twitter.com/JuanMendozaDev) and [**LinkedIn**](https://www.linkedin.com/in/juan-sebastian-mendoza-perez/).
