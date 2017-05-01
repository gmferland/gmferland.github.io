---
type: posts
title: "Recursion with Python"
date: 2017-05-01 13:00:00
categories: coding
---
Python wasn't the first language I learned but it's the one I use most often in my own projects because it is quick and easy to work with. There's very little translation involved in turning a design from pseudocode into a working program. If I have a small idea that I want to test, I can just open the interpreter and go. And the syntax is free of brackets and semicolons, making large blocks of code easy to read. This last point is the reason why I think it's a great language to demonstrate recursion. Recursive functions aren't more time or space efficient than their iterative counterparts, but they do make for elegant and easy-to-read code.

The following is a subset of problems from my Data Structures and Advanced Programming class. They represent the sort of problems that I enjoy solving, problems that lend themselves to a succinct answer that requires a bit of clever thinking. In all of these problems, the hard part is coming up with a base case and a recursive structure.

<h2>1. Sum of Digits</h2>
The goal here is to write a recursive function that prints out the sum of the digits of an integer written in base 10. So for example, f(123) = 6. Here a good knowledge of place value makes for an easy recursive solution. It's easy to read off the ones digit by taking the number modulo 10 and add it to a sum. Then dividing by 10 can shift the digits one place to the right. Repeating this process yields a nice recursive algorithm. Finally, for the reason that 1 = 1 mod 10 and -1 = 9 mod 10, it's easier to handle negative integers by just flipping the sign at the outset.
{% highlight python %}
def decimalDigitSum(n):
    # Handle the negative case
    if n < 0:
        n = -n
    if n < 10:
        return n
    else:
        return n % 10 + decimalDigitSum(n // 10)
{% endhighlight %}

<h2>2. Binary String</h2>
A simple variation on the previous problem would be just to return a string of the digits instead of adding them to a sum. The process of recursively reading digits from the ones place would be the same, but the output would be different. This problem adds the extra twist of not returning a base 10 string but a binary string. Here the general approach is the same, but we take advantage of some cool features of Python. After all, everything in computers is represented in binary. So Python allows you to do bitwise (binary) operations on a base 10 integer because that integer is stored in binary anyways. The two bitwise operations that come in handy here are the bitwise and (&), which treats binary digits like booleans and returns their intersection, and the bitshift (>>), which shifts all bits to the right by the specified amount. By bitwise and-ing with 1, we can read off the ones digit (since 1 & 1 = 1 and 1 & 0 = 0). Then we bitshift to obtain the next digit. Using these two operations we "read off" the binary representation of an integer one bit at a time. Two base cases are used to prevent an unnecessary leading zero after the last bitshift.
{% highlight python %}
def toBinaryString(n):
    if n == 0:
        return "0"
    elif n == 1:
        return "1"
    else:
        s = toBinaryString(n >> 1) + str(n & 1)
        return s
{% endhighlight %}

<h2>3. Subset Sum</h2>
This problem asks, given a set of integers and a target sum, does any subset of the integers add up to the target? I found it very difficult at first to come up with a good recursive rule for this one. Given my math background I feel very comfortable with set theory, and I know that subsets have a very clean, black and white, in or out structure. That is, for any subset, an individual element is either in the subset or it is not. And the power set can be perfectly partitioned into the subsets that contain the element and those that do not. Using that property, we have to make two branches at every recursive step, depending on whether a number is in the sum or not. And, if it is in the sum, we must provide an updated target that takes that into account.
{% highlight python %}
def subsetSum(numbers, targetSum):
    if targetSum == 0:
        return True
    elif len(numbers) == 1:
        return numbers[0] == targetSum
    else:
        return subsetSum(numbers[1:], targetSum - numbers[0]) or subsetSum(numbers[1:], targetSum)
{% endhighlight %}

<h2>4. Power Set of a String</h2>
Using the "in/out" property above, it's intuitive that we build our recursive algorithm by either including or not including each character in a subset. The tricky part here is that if we want to return the complete power set, we'd need to return a list. But if we want our function to be recursive, then it would return a list at each step of the way. And this is a bit messy and inconvenient when we want to build and return a string (containing a subset) at each step. The solution is a recursive helper method to build up the subset strings wrapped in a caller that supplies the list.
{% highlight python %}
def subsetStrings(s):
    r = []
    stringHelper(s, "", r)
    return r

# A helper method to keep track of partially built substrings in subsetStrings
def stringHelper(s, soFar, result):
    if len(s) == 0:
        result.append(soFar)
    else:
        stringHelper(s[1:], soFar + s[0], result)
        stringHelper(s[1:], soFar, result)
{% endhighlight %}