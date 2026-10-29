---
title: Understanding Hooks - useState and useEffect basics
date: '2021-10-05T23:30:47.651Z'
slug: understanding-hooks-usestate-and-useeffect-basics
tags:
  - reactjs
  - reacthooks
  - web-development
coverImage: >-
  /images/blog/GaWy_44Tg.webp
---
Before Hooks were introduced in React, if you wanted a stateful component, Class ones were the only way to go... to go and write a lot of code that is less readable, not that easy to follow.

So, if you began to learn React recently or if you've already been in track for some time, you probably already know what and how important Hooks are. If not, let me give you a brief introduction to them based on what I've learned so far.

# Hooks 
They are JavaScript functions that, basically, allow you to add some functionality to your components. The two most used hooks are **useState** and **useEffect**, being the latter one more confusing and kind of harder to grasp. 

There are some rules to keep in mind when working with Hooks. Main ones are:

-  They work only in functional components, not in class ones. This means there's less code to write, less *'this'* here and there, and what not in comparison to what it is like with Class components.

-  Should not be called conditionally; however, conditionals can be set up inside of them.

-  Should be called at the top level of your React function.

To go in-depth with the rules, visit [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) in React docs.

Now, let's get to **useState** and **useEffect** basics.

## useState
This hook allows you to add 'state' to a functional component. FYI, a state is a JavaScript object that represents a component's current value.

To import it, use: 
```
import React, {useState} from 'react'
``` 

<code>**useState()**</code> accepts one argument called the *initial state* (it can be a boolean, string, number, array or object).

If you <code>console.log(useState())</code> , you'll see that it returns an array of 2 items:

```
console.log(useState()) // (2) [undefined, ƒ]
``` 
The first item is the *current state* and the second one is a function that updates that state.

So, to make life easier when working with this hook, it is important to destructure that array as shown in the following example:
```
const [name, setName] = useState('Juan')
``` 
where:
-  **name** is the *current state*, which in the first render is going to be the initial state passed in as an argument to useState (in this case it is a string: 'Juan'),

- **setName** is the function that updates **name**,

- and **'Juan'** is the *initial state*.


### Dealing with states that belong to the same family
When you have several useState that share the same parent, so to say, there's a way that allows you to write less code.

To illustrate this, let’s first imagine you want to work with some people’s information: first name, age, email, and phone.

- One way (more code) is to destructure an useState for each one of them:

```
const [firstName, setFirstName] = useState('')
const [age, setAge] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
``` 

- The other way (less code) is to destructure an useState for their parent reference as an object, which in this case I'm naming that 'parent reference' as *person*:

```
const [person, setPerson] = useState( { firstName: '', age: '', email: '', phone: '' } )
``` 
Then, in order to refer to each piece of information, use *person.firstName*, *person.age*, etc, as shown below:


Let's have our component:

```
const MyComponent = () => {
    const [person, setPerson] = useState({
         firstName: 'Chimuelo',
         age: 24,
         message: 'Random Message',
     })     
  }
    return (
         <>
             <h1>Person's info:</h1>
             <p>{person.firstName}</p>
             <p>{person.age}</p>
             <p>{person.message}</p>
             <button type='button' onClick={changeMessage}>
                 Change Message
             </button>
         </>
     )
}
``` 
With objects, when changing the state of a specific item, use the Spread Operator to preserve the other items. If you don't, the only item that will be displayed is the one you're referring to.

```
const changeMessage = () => {
         if (person.message === 'Random Message') {
           setPerson( { ...person, message: 'Hello World' } ) 
         } else {
           setPerson( { ...person, message: 'Random Message' } )
         }
} 
``` 
With this code, if the person's current message is '*Random Message*', <code>changeMessage()</code> will change it to '*Hello World*', leaving the other items' values the same. Then, all of the items will be displayed as intended (**name**: *Chimuelo*, **age**: *24*, **message**: *Hello World*).

However, if we have it this way:

```
const changeMessage = () => {
         if (person.message === 'Random Message') {
           setPerson( { message: 'Hello World' } ) 
         } else {
           setPerson( { message: 'Random Message' } )
         }
} 
``` 
The above will remove both *name* and *age* from the list, and will, then, display *message* only. So, don't forget to use the Spread Operator when changing values from an object :)

## useEffect
This hook lets you perform side effects in your components, which, at the same time, are allowed to have lifecycle methods just like Class components do (*componentDidMount*, *componentDidUpdate* and *componentWillUnmount*).

*Definition of side effect from Wikipedia*
> In computer science, an operation, function or expression is said to have a side effect if it modifies some state variable value(s) outside its local environment
 
Most popular examples of side effects are data fetching and DOM manipulations.

useEffect runs after the first render and every re-render by default. So, in short, as React docs mentions:
> By using this Hook, you tell React that your component needs to do something after render.

To import it, use: 

```
import React, {useState, useEffect} from 'react'
``` 

<code>**useEffect()**</code> accepts 2 arguments: 
1. A callback function which is the effect that will run after every re-render
2. An optional second argument called the *dependency list*, which is an array that determines whether the effect runs or not. If this parameter is present with an existing array, that means the effect will **only run if the values in that array change**. But, if it's an empty array, that means the effect **will only run in the first render**.

One example of how useEffect is run is when updating a value with setState. When setState is triggered, re-rendering is also triggered and that’s when useEffect runs.

Let's illustrate this with an example of data fetching:

First, you have to know that useEffect callback functions cannot be asynchronous. If you want to implement an async/await function, either declare it outside the useEffect or inside the callback function.

```
const MyComponent = () => {
  // initial state is an empty array as we'll be fetching data, 
  // that is, we'll work with an array of objects.
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setUsers(data)
  }
  return ...
}
``` 
As you can see, after storing the fetched data in the variable *data*, I'm updating the state of *users* right away. Thing is, how would you call <code>getUsers</code>?

If you run it this way:


```
  const getUsers = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setUsers(data)
  }

  getUsers()
``` 
That will make you face an infinite loop because, as I mentioned above, <code>setState()</code> triggers re-render, and what happens here is that, every time you call <code>getUsers</code>, you're triggering <code>setUsers(data)</code>, which, at the same time, triggers re-render, then <code>getUsers</code> is called again and that makes the infinite loop.

To avoid this, passing an empty array as the second argument to useEffect will make this only run in the first render. So, it would be like this:

```
  const getUsers = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])
``` 
## Cleanup function
As in useEffect we talk about side effects, it is important to know that there are 2 different types of them: the ones that require a cleanup, and the ones that don't.

To help you differentiate them, let's first understand the definition of a *memory leak*, which is a term used when talking about cleaning up effects.

*Definition of memory leak from Wikipedia*
> In computer science, a memory leak is a type of resource leak that occurs when a computer program incorrectly manages memory allocations in a way that memory which is no longer needed is not released.

Now, let me start by explaining to you the side effects that require a cleanup:

They are those that are not released *(for reference, React docs uses the term 'forget')* immediately, so they can cause a memory leak which can affect your app's performance negatively.

Let me show an example using a side effect that requires a cleanup function.

First, imagine you have a button to show and hide an item. Then, you have the following component:

```
const Item = () => {
  const [size, setSize] = useState(window.innerWidth)
  const checkSize = () => {
    setSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    }
  })
``` 
If you don't set up a cleanup function, every time you click on the show/hide button, the last effect won't be released on every re-render, so all effects will be left in memory making it possible for a memory leak to occur. Also, if you head over to the Dev Tools > Elements > Event Listeners > resize (in this case), you'll notice that there's a log of all events from the first to the last one. Just like this:

![Captura de pantalla 2021-10-05 161230.png](/images/blog/TC4FAqdnp.webp)


To avoid that, it is crucial to clean up the effects from the previous render before running them one more time. The useEffect would now be like this:
```
  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => {
      window.removeEventListener('resize', checkSize)
    }
  })
```
Now, every time you click the show/hide button, the useEffect process will be the following:

1. Run the cleanup function (whatever is inside the <code>return</code>).
2. Run whatever is outside the cleanup function.

Having done this, a great view on what this feature does is that it basically tells React to clean up the effects from the previous render before running the effects the next time to avoid performance issues.

### Use cases of useEffect
If you still don't have clear when to pass an empty array, or an existing array, or a cleanup function, here you have a short explanation.

- When you want something to happen during every re-render, don't pass a second parameter but make sure whether it needs a cleanup function or not to avoid a memory leak. **BE CAREFUL WITH THIS CASE!** You won't want to run into an infinite loop :D
- When you want something to happen only during the first render, pass an empty array as the second parameter. e.g. when fetching data.
- When you want something to happen only when an array is updated, pass in that array as the second parameter.

### Dealing with multiple effects
In Class components, having unrelated logic in lifecycle methods is a common thing and sometimes problematic because it makes that code kind of more confusing to be read. This is not an issue anymore since the introduction of Hooks as they can be used more than once. So, anytime you'll be working with different effects, you can split them up in different useEffects. Hooks make it all easier! :)

## Conclusion
The introduction of React Hooks has, undoubtedly, improved React devs' efficiency given the great advantages they offer when working with stateful components.

Hope you find this article helpful :)

[You can find me on Twitter](https://twitter.com/JuanMendozaDev) where I'll be sharing web development related content.


