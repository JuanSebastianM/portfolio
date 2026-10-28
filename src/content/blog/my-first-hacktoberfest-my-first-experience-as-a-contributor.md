---
title: 'My First Hacktoberfest, My First Experience as a Contributor'
subtitle: >-
  Making my first contributions to open-source was very challenging but also
  rewarding as I learned a lot from them.
date: '2021-10-28T21:53:44.522Z'
slug: my-first-hacktoberfest-my-first-experience-as-a-contributor
tags:
  - hacktoberfest-1
  - reactjs
  - nextjs
  - opensource
coverImage: >-
  /images/blog/o9bSJz8MI.webp
---
In this article I'm going to share my first Hacktoberfest experience with you, including all the pre and post details.

<hr/>

My coding journey started this year in April and ever since then I had been reading about many events that were about to happen in the upcoming months, including Hacktoberfest: a global celebration of open source software. 

The month of October was right around the corner and I was just beginning to learn React. As for becoming a participant of this amazing event, I was feeling this dumb fear of not being capable of contributing because of lack of experience. So, during the first days of its start, I would just read other devs' experience to *probably* gain some motivation. 

Days passed and I continued not feeling ready to make my first contribution as I simply thought I had to have much more experience but I hadn't even checked what the projects needed help with! This was my first mistake that led me to almost not participate in this edition of Hacktoberfest.

6 days were missing for this event to finish and it was when I decided to just give it a shot, because, otherwise, I would have to wait 1 complete year for the next edition. 

So, I started looking around for projects to which I could contribute given my current knowledge on JavaScript and React. This is when I found about [DeepSource Discover](https://deepsource.io/discover), one of the partners of Hacktoberfest. They help developers to find open-source projects that have code quality issues. And, after a long while, I came across with one project whose name caught my attention: [Help a Family by Margarita Humanitarian Foundation](https://helpafamily.margaritahumanitarian.org/). It is a non-profit organization that provides humanitarian aid to families in need.

Their web app is built with React + Next.js and know what? I've never used Next.js. I have only been learning React during this month, and all the issues were related to Next.js. I didn't feel afraid because it's, basically, React but with some special features. Anyway, I had no other option than to go and read the Next.js docs to get into context about how things work.

# Details About My Contribution

My contribution wasn't that big in terms of having to fix big issues, bugs, or make this big changes. However, I do feel proud for what I did because, at the end of the day, I learned a lot and I overcame that stupid fear I had before I decided to make my first contribution.

All the issues I fixed *(4 in total)* were labeled as *anti-pattern* and the first one was caused because they were using a component (`Link`) that enables client-side transitions between routes, but the way it is implemented *(see below)* causes a light accessibility issue as shown by DeepSource.


```
<Link href="/">
  <a>Home</a>
</Link>
``` 
I wanted to help them get rid of this small issue, so, what I did in the first place was to head over to the docs and read everything about this component. I read about a prop (`passHref`) that, somehow, sends the `href` property of `Link` to its child (`a` element). Besides that, I went to Google to try and see if someone else had faced this issue before :). 

After a long research, I found an interesting [solution](https://github.com/vercel/next.js/issues/5533#issuecomment-760242123) at [Next.js Issues section on GitHub](https://github.com/vercel/next.js/issues). And, that's what I applied to fix this issue.  [My pull request](https://github.com/margaritahumanitarian/helpafamily/pull/308) was then accepted and successfully merged!


# What I Learned

- As the project uses `yarn`, I had to research a little about it since I've always used `npm`. Now I know more about the differences between `npm` and `yarn`, the commands, etc.
- When there are other devs working on the same project, they might have made some changes to it. So, in order to keep my branch in sync with the remote repo, I followed [this article](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/keeping-your-local-repository-in-sync-with-github/syncing-your-branch).
- Besides that, I also learned how to properly organize my React apps. I already knew something about this, but thanks to the fact that I checked how they have this app organized, now I completely understand how to do this: the components should go in a ***components*** folder, the pages should go in a ***pages*** folder, and so on.

# Conclusion

Impostor syndrome is always there but if you're afraid of contributing to an open-source project, starting that new project because you don't want to fail, well, let me tell you that this is how I felt before doing this. Just do it, buddy! :) If you fail, you'll learn anyways. If you succeed, you'll most probably regret not having started earlier!

<hr>

This is it for this article. Thanks for reading it all, and hopefully my experience serves as motivation for you to start contributing or whatever else :)

You can find me on [Twitter](https://twitter.com/JuanMendozaDev).

See you in a next one!
