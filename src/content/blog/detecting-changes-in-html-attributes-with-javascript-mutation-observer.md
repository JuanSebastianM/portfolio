---
title: Detecting Changes in HTML Attributes with JavaScript Mutation Observer
date: '2023-05-06T23:37:48.055Z'
slug: detecting-changes-in-html-attributes-with-javascript-mutation-observer
tags:
  - javascript
  - mutationobserver
  - aws
  - html5
  - jquery
coverImage: >-
  /images/blog/a5a22d7f-46e5-45ea-a004-b802d3e918d9.webp
---
Detecting mutations in the DOM tree can be quite challenging in vanilla JavaScript, but thankfully, there's a constructor that makes it easier.

In this article, we'll dive into the basics of **Mutation Observer** by driving you through the solution for a task I was assigned a couple of weeks ago at work. So, let's get started!

## Context

The task was basically to build an ever-playing video carousel for a client's website. The idea was to have:

1. 3 short muted music videos playing one at a time in the background. Each video would be related to a specific music genre.
    
2. A button that, when clicked, would pop up a modal containing a longer music video (with sound) related to the current visible short one. This means that every time the carousel went to a different slide, there would be a different pop-up video.
    

In short, there'd be a total of 3 short muted videos and 3 long popup videos.

As that project is built mainly with PHP and JQuery, I had no other choice than to figure out how to do all that magic without the flexibility that JavaScript libraries and frameworks offer.

So, after long research, I ran into a StackOverflow solution that recommended using the Mutation Observer constructor.

**<mark>SPOILER:</mark>** I'll be mixing JQuery (to reduce code when creating new DOM elements and not spam your screen) and vanilla JavaScript (to make the code less confusing for those who are not familiar with JQuery).

## Definition

In a nutshell, this is a powerful JavaScript constructor that allows you to **monitor changes** to DOM elements **in real-time**, giving you the ability to respond to user interactions and make dynamic updates to your site.

## Syntax

```javascript
new MutationObserver(callback);
```

It lets you pass a callback as the first parameter. This callback's first parameter is an array of mutations.

There are 3 types of mutations you can watch for with this constructor: "attributes", "characterData", and "childList".

For more in-depth details, visit the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

---

***NOTE:*** *This constructor may not be necessary when working with libraries or frameworks because it's very likely that they have a more optimized functionality that's equivalent to this one. Maybe they do, maybe they don't. Anyways, it is very useful in vanilla JavaScript.*

---

## The Real Challenge

Regarding this task, the real challenge I had was to find a way to develop the dynamic video rendering feature (idea #2 from above).

For this, I noticed that the library I used ([slick](https://kenwheeler.github.io/slick/)) to create the carousel was adding an `aria-hidden` attribute to each background `video` element. This attribute was being used to let the carousel know which video element was visible and which were hidden.

1. When `aria-hidden` === "false", that `video` was visible.
    
2. When `aria-hidden` === "true", that `video` was hidden.
    

## Ideas I came up with

There were a total of 5 ideas:

1. Create an array of strings representing music genres, which would serve as the ID for each video. These IDs would then be used in the .mp4 file names stored in AWS S3.
    
    ```javascript
    const musicGenres = ["Reggaeton", "Pop", "Country"];
    ```
    
    The URL of every muted music video would be something like this: [https://s3.amazonaws.com/bucket-name/Muted\_Video\_InsertGenreHere.mp4](https://s3.amazonaws.com/bucket-name/Muted_Video_InsertGenreHere.mp4). And for the version with sound, it would be something like this: [https://s3.amazonaws.com/bucket-name/Video\_InsertGenreHere.mp4](https://s3.amazonaws.com/bucket-name/Video_InsertGenreHere.mp4).
    
2. Loop through the music genres array to create the carousel videos with a `data-genre` attribute, whose value would be their respective genre.
    
    ```javascript
    musicGenres.forEach(genre => {
        const videoHtml = `
            <video class="carousel-video" preload muted playsinline data-genre=${genre}>
                <source src=".../Muted_Video_${genre}.mp4" type="video/mp4">
            </video>
        `;
    
        // append each new video element to the carousel container
        $(".videoCarouselContainer").append(videoHtml);
    });
    ```
    
3. Create a new MutationObserver instance and listen to changes to the `aria-hidden` attribute of all video elements inside the carousel to know which is the currently visible video.
    
    ```javascript
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        // save targeted element to avoid repeating `mutation.target`
        const targetedVideoElement = mutation.target;
        
        const isCurrentVideo = targetedVideoElement.getAttribute("aria-hidden") === "false";
      }
    });
    ```
    
4. After saving the currently visible background video element in a variable, grab the value of its `data-genre` attribute.
    
    ```javascript
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        // ...
    
        if (isCurrentVideo) {
          // if video is visible, play it
          targetedVideoElement.play();
          
          const currentVideoGenre = targetedVideoElement.getAttribute("data-genre");
        } else {
          // if video is not visible, pause and reset it
          targetedVideoElement.pause();
          targetedVideoElement.currentTime = 0;
        }     
      }
    });
    ```
    
5. Finally, create a new `video` element inside the popup modal that is of the same music genre as the current background video.
    
    ```javascript
    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        // ...
    
        if (isCurrentVideo) {
          // ...
    
          const popupVideoHtml = `
            <video controls>
              <source src=".../Video_${currentVideoGenre}.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          `;
    
          // set new video as the content of the modal container
          $(".ModalContainer").html(popupVideoHtml);
        } else {
          // ...
        }     
      }
    });
    ```
    

This would work like this: every time there was a slide change event, a new `video` element would be created as a child of the modal container.

However, all of this code won't do anything at this point. As the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver) states:

> DOM observation does not begin immediately; the `observe()` method must be called first to establish which portion of the DOM to watch and what kinds of changes to watch for.

For this, you just need to call that `observe` method from the MutationObserver instance by passing 2 arguments:

1. the target DOM element
    
2. the configuration
    

```javascript
const observerConfiguration = {
  attributes: true
};

// get all muted video elements
const videoElements = document.querySelectorAll(".carousel-video");

// observe them
videoElements.forEach(videoElement => {
  observer.observe(videoElement, observerConfiguration);
});
```

In this particular case, only attribute mutations (as per the 3rd idea) need to be watched for.

## Optimizing the MutationObserver's performance

For better performance, you have to try to be as specific as possible in the configuration object. Otherwise, the performance of this code may be impacted negatively (probably not much but if you're too nitpicky about performance, here you go 😉).

To be more specific, there's the `attributeFilter` property which lets you clarify that not all attribute mutations need to be observed and whose value is an array of the only attributes to watch for. With this, the configuration object would end up like this:

```javascript
const observerConfiguration = {
  attributes: true,
  attributeFilter: ["aria-hidden"],
};
```

For more info about the `observe` method and its configuration options, refer to the [docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe).

## Final Code

You can find the complete code on [this Github Gist](https://gist.github.com/JuanSebastianM/674b1139867974a779ba39eefb38e907).

## Conclusion

If you're a web developer looking for a way to track changes to specific DOM elements in your code in real-time, you'll want to pay attention to Mutation Observer.

---

You can find me on [Twitter](https://twitter.com/JuanMendozaDev) and [LinkedIn](https://www.linkedin.com/in/juan-sebastian-mendoza-perez/).
