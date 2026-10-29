---
title: Getting Started with Jest + Unit Testing
subtitle: >-
  Knowing how to test code is an important skill developers must have given the
  advantages it provides.
date: '2021-10-13T00:57:52.777Z'
slug: getting-started-with-jest-unit-testing
tags:
  - testing
  - jest
  - unit-testing
  - javascript
coverImage: >-
  /images/blog/2EXgue-sW.webp
---
A common case among beginners is spending so much time trying to understand why the code is not working the way it is expected to work, and for that reason they get stuck in the development of their projects. This usually happens because there's never a testing process.


In this article, I'll introduce you to **Unit Testing**, and to **Jest**, a JavaScript testing framework. However, before getting to that, let's first be clear with why testing is important by taking a real-world case as an example.

# Testing
Testing is an important process not only in software development, but everywhere.

Imagine you're interested in buying a second-hand car to which the current owner refers as a car that looks like if it were new (10/10). Now think about the events that could happen if you just go and buy it without taking the time to make sure that everything works fine in it. Many things could happen, right? 

The same happens here, if you don't test your code beforehand, you might get into trouble later on.

Knowing how to test your code will, undoubtedly, boost your efficiency and effectiveness as a developer because you'll be able to know why your code is not working in a faster and more structured way.


# Unit Testing
Unit testing is basically testing individual units of code (just as the name says) to ensure their outputs are what you expect. A popular testing framework used in Unit Testing is **Jest**.

## Jest
Jest is a JavaScript testing framework maintained by Facebook.

> It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly. *- Jest Core Team*

### Setup
In order to setup Jest, you should follow these steps:

1. **Have *npm* installed**. To check if you have it, use <code>npm --version</code> in your terminal. If you don't have it installed, check out [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. **Create a *package.json* file**. There are 2 ways to do that: <code>npm init</code> will create a *package.json* file but before, you'll be able to configure it your way. That means you can write a custom description, a name and other information as you wish. The other way is by using <code>npm init -y</code> which lets you skip that configuration process and you will just get the file with the default information.
3. **Install Jest**. To do so, use <code>npm install --save-dev jest</code>. This will save Jest as a dependency.
4. Now, head over to the package.json file and **change the value of "test" to "jest"**.
5. You're now ready to test any code you want :)

### Jest Matchers
Before getting into action, you have to know about **matchers** in Jest.

*Taken from Jest Docs*

> Jest uses "matchers" to let you test values in different ways.

I'll cover the most common matchers briefly:

- #### toBe
<code>toBe</code> refers to exact equality. It works similar to the strict equal (===).

```
test('10 plus 10 is 20', () => {
  expect(10 + 10).toBe(20)
})
``` 
This test will pass succesfully.

```
test('numbers is the same as sameNumbers', () => {
  const numbers = [1, 2, 3]
  const sameNumbers = [1, 2, 3]
  expect(numbers).toBe(sameNumbers)
})
``` 
This test will not pass because, even though the values are the same, the arrays have different memory addresses (*read more about memory management if you want to go deep on that topic)*.

Given the last example, we can conclude that, when testing arrays or objects, <code>toBe</code> is not the recommended option. To do so, there is the matcher <code>toEqual</code>.

- #### toEqual
This matcher is almost always the way to go. It refers to deep equality, which means it compares every value of an object or array deeply.
Taking the previous test as an example, if you use <code>toEqual</code> instead of <code>toBe</code>, that will pass.

- #### toMatch
When checking strings with regular expressions, you can use <code>toMatch</code>.

```
test('there is an "e" in hello', () => {
  expect('hello').toMatch(/e/)
})
``` 
- #### toContain
If you want to check whether an iterable contains a specific item, use <code>toContain</code>.

```
const numbers = [1, 2, 3]
  expect(numbers).toContain(2)
``` 

- #### Testing for the opposite of a matcher
If you want to test for the opposite of a matcher, simply use <code>.not</code> just before the matcher: as for <code>toBe</code>, it would be: <code>.not.toBe(...)</code>, and so on for the rest.

Check out [Jest docs](https://jestjs.io/docs/expect) for a complete list.

### Testing your code
The process to test code with Jest is simple:

1. Imagine you have a function that accepts an array of strings and you expect it to return the longest string:
```
const longestStr = (arr) => {
  let longestString = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (longestString.length < arr[i].length) {
      longestString = arr[i]
    }
  }
  return longestString
}
module.exports = longestStr
``` 
Notice the ***module.exports = longestStr*** at the end. It is to export the function and then you'll be able to import it in the tests file.
2. Create a separate JavaScript file which, if you're working with functions, is recommended to be called the same as the function you're going to test, and it should have either ***.spec.js*** or ***.test.js*** as extension (both of them work the same way, so it's up to you to choose which one to work with). 
3. In this file you're going to, first, import your function, like this:
```
const longestStr = require('./longestString')
```  
4. and then set up your test. To do so, use <code>test()</code> which receives 2 parameters: the first one is a string that describes what the code is expected to do, and the second parameter is a function where you're going to write 2 more things: 1st, a function called **expect** in which you'll put the function with the arguments you want to test it with. 2nd, a **matcher**:
```
test("longest string is 'this is the longest one'", () => {
  expect(
    longestStr(['hello world', 'testing', 'this is the longest one', 'yes'])
  ).toEqual('this is the longest one')
})
``` 

5. To run the test, type <code>npm test</code> in your terminal.

When running, it will look like this:
![running.png](/images/blog/i6nZixaga.webp)

If the test passes, it will look something like this:
![passed.png](/images/blog/zClYJ_ozz.webp)

If the test fails, you'll be able to know what result your code is actually returning (here I intentionally modified something in the *longestString.js* file to make the test fail):
![failed.png](/images/blog/OujDBT78z.webp)

### Working with several tests
If you have several JavaScript files to test, but you want to test only one of them, you have to specify the file name to be tested when running <code>npm test</code> (don't forget to add its respective extension):
- Imagine you have a different file than the one we have been using so far: let's call it *sum.js*

- If you run <code>npm test</code>, you will be testing both files at the same time. Then, if one of the tests fail, you won't see any details about that. So, if you don't want this, you have to specify which file to test, like this: <code>npm test sum.spec.js</code>

### Skipping tests
Imagine you have prepared several tests in your *.spec.js* or *.test.js* file, if you run <code>npm test fileName</code>, all tests will run at the same time. If you want to run only a specific test without removing or commenting out the others, you can use <code>.skip</code>:

```
test.skip('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toEqual(3)
})
test.skip('adds 10+10 to equal 20', () => {
  expect(sum(10, 10)).toEqual(20)
})
test('2 + 2 is not equal to 6', () => {
  expect(sum(2, 2)).not.toEqual(6)
})
``` 
Here, only the last test will run and the others will be skipped but will still be logged as shown below:
![skipped.png](/images/blog/W2kWftc2I.webp)



This is all for this article. Hope you found it helpful :)

You can find me on [Twitter](https://twitter.com/JuanMendozaDev) where I'm also sharing my journey on web development.
