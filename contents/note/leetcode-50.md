---
title: "Clean Code Handbook: LeetCode 50 Common Interview Questions | LeetCode"
tags:
  - Hinton/Algorithm
date: "2024-07-05"
update: 
link:
  x: https://x.com/liu_qi_long/status/1846824674992558301
  xiaohongshu: https://www.xiaohongshu.com/explore/668787600000000003027317?xsec_token=AB31uUMsx4WGFz8V9F7ELlO5ZXxc9PHgPhbig8M0kYb2M=&xsec_source=pc_user
---

# Clean Code Handbook: LeetCode 50 Common Interview Questions | LeetCode

## Data structure

### Array/string

- _Transform & simplify combinatorial iterations_
    - _Representation_
        - [#13 Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/description/)
            Instead of representing the substring with starting and ending indices, represent it as center index and length is much more efficient, improving runtime from $O(n^3)$ to $O(n^2)$.
    - _Proxy items_
        - [#2 Two Sums II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/)
            If the array is sorted, then $a[i-] + a[j] \leq a[i] + a[j] \leq a[i] + a[j+]$. Thus $a[i] + a[j]$ can be used as a proxy of a bunch of other items in the iterations, improving the runtime to $O(n)$.
    - _Iteration folding_
        - [#1 Two Sums](https://leetcode.com/problems/two-sum/description/)
            $+$ is commutative, thus half of the iteration steps can be saved and makes each iteration only previous items are relevant. Therefore, hash table of the previous items can be constructed in each iteration to accelerate later iterations, improving runtime from $O(n^2)$ to $O(n)$.
        - [#3 Two Sums III - Data Structure Design]()
        - [#6 Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/description/)
            Iterate from head to tail requires 2 passes, while from tail to head leads to a 1 pass algorithm.
            - [#7 Reverse Words in a String II]()
                By first reverse the whole strings, the order of words aligns with the desired output, thus the word-level reverse can be done in place. This further improves space complexity from $O(n)$ to $O(1)$.
    - _Problem split_
        - [#10 Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)
            When a string contains repeating characters, any substring of it is invalidated, thus the existence of repeating characters separates the combinatorial space into two subspaces. Considering that the longest possible substring can also be deduce from the location of the repeating characters, the runtime can be improved from $O(n^3)$ brute force search to $O(n)$.
            - [#11 Longest Substring with At Most Two ($k$) Distinct Characters]()
- _Marginal cases analysis_
    - [#4 Valid Palindrome](https://leetcode.com/problems/valid-palindrome/description/)
    - [#5 Implement `strstr()`](https://leetcode.com/problems/implement-strstr/description/)
    - [#8 String to Integer (`atoi`)](https://leetcode.com/problems/string-to-integer-atoi/description/)
    - [#9 Valid Number](https://leetcode.com/problems/valid-number/description/)
        Parsing the digit structure with the optional components.
    - [#12 Missing Ranges]()
    - [#14 One Edit Distance]()
    - [#15 Read N Characters Given Read4]()
        - [#16 Read N Characters Given Read4 – Call multiple times]()

### Linked list

- _Dummy head trick_
    Initialize a dummy head first can make your code simpler, since for the first and later iterations you're always adding new nodes to an existed node, avoiding conditional initialization logic embedded into the iteration loops.
    - [#20 Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/)
    - [#21 Add Two Numbers](https://leetcode.com/problems/add-two-numbers/description/)
    - [#22 Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/description/)
- [#23 Merge K Sorted Linked Lists](https://leetcode.com/problems/merge-k-sorted-lists/description/)
    Brute force merging can be implemented by merging 2 lists at a time sequentially, leading to $O(nk^2)$ runtime complexity. _Divide and conquer mechanism_ can be used to improve the runtime down to $O(nk \log k)$.
- [#24 Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/description/)
    Deep copy a ordinary linked list is simple, whereas deep copy a linked list with an additional random pointer is tricky, since retrieve an item in the linked list costs $O(n)$ runtime, leading to $O(n^2)$ runtime complexity in total.
    This can be improve to $O(n)$ runtime and $O(n)$ space by construct a hash map from the original items to the deep copied items.
    The space complexity can be further improved to $O(1)$ by first inserting the deep copied items after the original items, thus the hash map can be replaced with `p.next`. Then split deep copied ones from the original ones.
### Binary tree
- _Recursion_
    All nodes of a binary tree share similar structure, which makes recursion a particularly suitable choice for solving tree-related problems.
    One thing to be noted is that recursion costs stack space, which should be considered when calculating the space complexity.
    - _Information feedforward_
        - [#25 Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/)
            Validate that any nodes are greater/less than all nodes of their left/right trees costs $O(n^2)$ runtime with the brute force approach. With recursion, the max & min bound information can be feedforward down to each node for verification, improving runtime to $O(n)$.
    - _Information feedback_
        - [#26 Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)
            Feedback the accumulative depth down from the leaf-nodes.
        - [#28. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/description/)
            Feedback the accumulative depth down from the leaf-nodes and judge if the depths of the left and right trees differ no more than 1.
    - _Divide-and-conquer_
        - [#29 Convert Sorted Array to Balanced Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/)*

        - [#31 Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)
            Finding the maximum path sum seems to have giant combinatorial solution space, which makes even the brute force approach unimaginable - it's $O(\sum_1^n \binom{n}{i})$. Divide-and-conquer improves it to $O(n)$ with the max path sum as the feedback information (feedbacks 0 when the current node is not included in the path).
- _Depth-first traversal_
    Depth-first traversal of the binary search tree happens to be the ordered traversal of the nodes.
    - [#25 Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/)
        If the tree is a binary search tree, depth-first traversal provides a sorted list. Thus depth-first traversal can be used for verification in $O(n)$ runtime.
    - [#30 Convert Sorted List to Balanced Binary Search Tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/)*

        First acquire the length of the linked list, then the start, mid, end indices of the trees & subtrees can be depth-first traversed, which will happens to access the nodes from the linked list in order.
- _Width-first traversal_
    Width-first traversal can be implemented with a queue: push the root to the queue. Then at each iteration, poll a node from the start of the queue and push all children to the queue.
    - [#27 Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/)
        Get the minimal depth when the first left node is reached in the width-first traversal.
- _Tree structure editing_
    This kind of problem is much more difficult than the others as it changes the tree structures at each step. _Bear in mind that assigning a node $A$ as another node $B$'s subtree doesn't delete $A$'s links to its parent nor its subtrees._ Be very careful!
    - [#32 Binary Tree Upside Down]()
        - Top-down approach: At each iteration, first keep copies of the current nodes left and right trees and then edit the current node: place the previous right node as the current node's left node and place previous edited node as the current node's right node - for accumulatively constructing an upside-down tree. Then set the kept left node as the current node and launch another iteration.
        - Bottom-up approach: Constructing the bottom-up tree by recursion is way more intuitive, as shown in this figure:
            ![img](leetcode-50-ex32.png)

### Stack

- [#39 Min Stack](https://leetcode.com/problems/min-stack/description/)
    When we pop a stack, it's state will be changed. To access the state of the stack, e.g. its minimal item, we can record the stack state with another stack whenever we push it (or whenever we change its state).
- _Last-In-First-Out (LIFO)_
    In some problems, we only look for the adjacent elements to determine what to do next, e.g. parsing arithmetic notations and parentheses. In this case, the stack's _LIFO_ property can be very useful.
    - [#40 Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/description/)
    - [#41 Valid Parentheses](https://leetcode.com/problems/valid-parentheses/description/)

## Algorithm

### Dynamic programming

The most important and challenging step of using dynamic programming is transforming the problem so that a _dynamic programming formula_ can be formulated.
	
- [#42 Climbing Stairs](https://leetcode.com/problems/climbing-stairs/description/)
    Set $f(n)$ as the number of ways you can climb to the $n$-th step. Then $f(n) = f(n-1) + f(n-2)$ - the [Fibonacci sequence](http://en.wikipedia.org/wiki/Fibonacci_number).
- [#43 Unique Paths](https://leetcode.com/problems/unique-paths/description/)
    Set $f(r, c)$ as the number of paths from cell $(r, c)$ to the bottom right cell. The $f(r, c) = f(r+1, c) + f(r, c+1)$. The calculation can be implemented with top-down recursion (from start cell) and ideally with _memorization_ to improve its efficiency. But the bottom up implementation (from target cell) is way more efficient.
    - [#44 Unique Paths II](https://leetcode.com/problems/unique-paths-ii/description/)
        Considering obstacle cells.
- [#45 Maximum Sum Subarray](https://leetcode.com/problems/maximum-sudescription/barray/)
    Set $f(k)$ as the maximum sum of subarray ending at index $k$. Let's assume $f(k-1)$'s subarray is $M$. If $M + A[k] > A[k]$, then $f(k)$ is obviously $M + A[k]$.
    However, if it's not true, is it possible to append a subarray of $M$ with $A[k]$ to get the maximum sum of subarray ending at index $k$? Luckily, the answer is no. $M + A[k] \leq A[k] \Rightarrow M \leq 0$, thus any subarray of $M$'s sum $\leq 0$. Therefore, in this case, $f(k)$'s subarray should be $A[k]$ itself.
    In summary, $f(k) = \max(f(k-1) + A[k], A[k])$.
    - [#46 Maximum Product Subarray](https://leetcode.com/problems/maximumdescription/-product-subarray/)
        The difficulty here is when $A[k]$ is negative, $f(k-1) * A[k]$ could become the minimum subarray, while $g(k-1)$, the minimum subarray ending at index $k-1$, becomes the maximum. Therefore, both $f(k), g(k)$ are needed to be tracked and the dynamic programming formula is: $f(k) = \max(f(k-1) * A[k], A[k], g(k-1) * A[k])$
- _Memorization_
    - [#47 Coins in a Line]()
        The possible moves of you and your opponent are overwhelming. One critical idea is assuming that both you and your opponent will take the optimal move. Set $P(i, j)$ as the maximum money one can take from the $i$-th to the $j$-th coins. When you are selecting between the $i$-th and the $j$-th coins, you minimize the maximum value your opponents could get from the remaining coins, and your opponents will do exactly the same. Therefore:
        $P(i, j) = \max(A_i + \min(P(i+2, j), P(i+1, j-1)), A_j + \min(P(i+1, j-1), P(i, j-2)))$

### Binary search

Following is a basic template of binary search:

```
int L = 0, R = A.length - 1;
while (L < R) {
    int M = (L + R) / 2;
    // TODO: Implement conditional checks.
}
```

It's very subtle to avoid _infinite loops_: make sure either `L` or `R` must be updated in every loop! For example, when `M` is acquired via _floor divide_ of `(L + R)/2`, then either `L = M + 1` or `R = M`.

- [#48 Search Insert Position](https://leetcode.com/problems/search-insert-position/description/)
    When target is within the range of the list's minimum/maximum, then `L`/`R` must have been updated when the loop ends, when `L=R`. Therefore, `A[L-1] < target` and `A[L+1] > target` and the insertion location can be easily deduced.
    It's a little bit trick to understand the case when the target is less/greater than the minimum/maximum since in this case `L`/`R` could keep unchanged and the size relationships don't hold. However, the insertion location should be `L` or `L+1`, exactly because `L` or `R` is never changed in this case.
- [#49 Find Minimum in Sorted Rotated Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)
    - [#50 Find Minimum in Rotated Sorted Array II – with duplicates](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/)


## Misc

### Math

- [#17 Reverse Integer](https://leetcode.com/problems/reverse-integer/description/)
    Deal with overflow/underflow.
    _P.S. For 32-bit `int`, since 1 bit is used for storing the sign, the max/min value is $\pm 2^{31} - 1 = \pm 2,147,483,647$._
- [#18 Plus One](https://leetcode.com/problems/plus-one/description/)
    Marginal case: 999.
- [#19 Palindrome Number](https://leetcode.com/problems/palindrome-numbdescription/er/)
    Digit parsing tricks.

### Bit manipulation

- _Tweaking commutative operation_
    When a commutative operation is applied to a chain of values, these values can be rearranged arbitrarily yet still get the same result. This property is particularly useful.
    - [#33 Single Number](https://leetcode.com/problems/single-number/description/)
        XOR detect changes between 2 bits. When XOR all of the numbers together, since XOR is commutative, we can group the repeating numbers together, which all become 0s. Therefore, the result will be the single number itself. ^ex-33
    - [#34 Single Number II](https://leetcode.com/problems/single-number-ii/description/)
        The same idea of [#33]() is used, but the commutative operation becomes: for each bit position, add all bits together and mod 3.
        This can be implemented with a 32-length `int` array. However, a more efficient approach uses 3 bitmasks  `ones`, `twos`, and `threes` to represent the bits that appears to be on for 1, 2, and 3 times. _The manipulation of these bitmasks requires some fascinating usage of logic operations._

### Misc

- [#35 Spiral Matrix](https://leetcode.com/problems/spiral-matrix/description/)
- [#36 Integer to Roman](https://leetcode.com/problems/integer-to-roman/description/)
- [#37 Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/)