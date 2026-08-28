---
title: Understanding Deep Learning | Simon J.D. Prince
tags:
  - Hinton/CV
  - Hinton/ML
date: "2026-08-28"
update:
link: https://udlbook.github.io/udlbook/
link_amazon: https://www.amazon.com/Understanding-Deep-Learning-Simon-Prince-ebook/dp/B0BXKH8XY6
---

# Understanding Deep Learning | Simon J.D. Prince

> Free official electronic version: [Understanding Deep Learning](https://udlbook.github.io/udlbook/)

_P.S. This note won't cover the basics. Instead, I will focus on nuances that basic textbook won't cover. As the book title suggests, this book is for those who want to gain a deeper understanding of why and how deep learning works. To be honest, I have learned through these basic network architectures multiple times, both from textbooks and some of the original papers. But there are still lots of things I found intriguing and sometimes even surprising._

_P.S. Parts and chapters are renamed and reshuffled. I will first summarize major network architectures, which are versatile and somehow swappable components. Then I will iterates through major learning paradigms: from basic supervised training, to unsupervised (generative) learning, then to reinforcement learning. This order may be logical for note taking, but not for a learner who's not familiar with these contents._

## Part I. Major network architectures

### Fully connected layers / multi-layer perceptron (MLP)

- A single fully connected layer _(a.k.a multi-layer perceptron, MLP)_ is composed of: (i) a linear mapping from input nodes to hidden units, (ii) a second linear mapping from hidden units to output nodes, (iii) activation on each output nodes
	![img](/img/understanding-deep-learning-mlp.png)
	> The universal approximation theorem proves that for any continuous function, there exists a shallow network that can approximate this function to any specified precision
	- For each output node, when there are $D$ hidden units and the activation is ReLU, the output is a sum of $D$ ReLU functions, each with a different slope and joint, forming a function with at most $D+1$ linear regions
	- Since all output nodes share the same hidden units, their linear regions have the same joints but different slopes
- When multiple layers are stacked, the networks become "deep". We can think of it in two ways: (i) since each layer is a piecewise linear function with multiple linear regions, layering another layer upon it further segments each region into even more linear regions, thus increasing the expressivity of the network; (ii) however, the segmenting of each region is not independent, rather, they share _symmetry_ since each are segmented by the same next layer, which creates a "folding" like pattern
	![segment](/img/understanding-deep-learning-segment.png)
	![folding](/img/understanding-deep-learning-folding.png)
	- Deeper networks are usually easier to train (than a wider one with the same number of parameters), possibly due to the fact that over-parameterized deep models have a large family of roughly equivalent solutions that are easy to find
	- Deeper networks also seem to generalize better (than a wider one with the same number of parameters), possibly due to the fact that the _folding_ pattern creates a bias towards learning simpler, symmetric functions in each layer

### Convolutional neural networks (CNN)

- Underlying idea
	> However, fully connected networks have no notion of “nearby” and treat the relationship between every input equally... the interpretation of an image is stable under geometric transformations. An image of a tree is still an image of a tree if we shift it leftwards by a few pixels.
	- Equivariant
		$$\mathbf f[\mathbf t[\mathbf x]] = \mathbf t[\mathbf f[\mathbf x]]$$
		> Networks for per-pixel image segmentation should be equivariant to transformations.
	- Invariant
		$$f[\mathbf t[\mathbf x]] = f[\mathbf x]]$$
		Likewise, networks for image classification should be invariant to transformations
- Pipeline
	To achieve equivariance, a CNN uses convolution as its main operation, applying the same kernel to all locations of the input. For each input channel, multiple kernels produce multiple (hidden) maps. _Note that kernels for different channels don't share weights._ The maps from all input channels are then weighted and summed (with bias and activation) to produce multiple output channels—just like the weighted summation (with bias and activation) of hidden units to produce multiple output nodes in an MLP
	![img](/img/understanding-deep-learning-cnn.png)
	- Parameters of convolution
		Padding, stride, kernel size, dilation rate
	- Downsampling
		Stride, max pooling, mean pooling, average pooling, etc.
	- Upsampling
		Direct duplication, max unpooling, bilinear interpolation, transposed convolution, etc.
	- Change channel number
		The kernel size determines the receptive field of the convolution, while the number of weighted sums (with bias and activation) determines the number of output channels. To change the number of channels, we can use a 1x1 convolution, which is equivalent to a fully connected layer applied to each pixel independently

![img](/img/understanding-deep-learning-ImageNet.png)

### Residual networks (ResNet)

- Issues with deeper networks
	![img](/img/understanding-deep-learning-hard-to-train-deep-networks.png)
	- Shattered gradients
		Since tiny changes to early layers could cause big changes to the later layers, the gradients would appear to be "shattered"
	- Vanishing gradients
		If a signal is clipped by an activation layer, the gradients won't pass through this layer when they propagate backward. As the number of layers increases, the probability of vanishing gradients increases, making the network hard to train
	- Exploding gradients
		If the weights are initialized with a large variance, the output of each layer would have a larger variance than the input. As the number of layers increases, the variance of the output would explode, making the network hard to train
- **Residual connections**
	The residual blocks branch from the input and then add back to it, causing the blocks to learn the "residual" rather than full transformations of the input signal
	![img](/img/understanding-deep-learning-residual-connection.png)
	- Benefits
		They create multiple (and shorter) paths from the first layer to the final output, making gradients easier to back-propagate through
		Also, learning small residuals is easier than learning full transformations, especially when the identity mapping is a good approximation of the desired transformation
	![img](/img/understanding-deep-learning-residual-loss.png)
	- Order of operations in the residual blocks
		> [!tip]
		> The common practice in an MLP is to place a linear layer before activation. However, in a residual block, this makes the added residual entirely positive. Therefore, the activation should be placed before the linear layer.
		> But that introduces another problem: if the input to the first layer is entirely negative, the activation in the first residual block will clip it to zero. Therefore, a linear layer should be placed before all residual blocks
- Exploding variance with residual blocks
	If the input signal has variance 1, then after the first residual block, the variance would be 2 since the original signal and the residuals are added. After the next residual block, the variance would be 4, and so on... To address this issue, the common practice is to use batch normalization
	- **BatchNorm**
		For each input channel, compute the mean and standard deviation across the batch and use them to shift and scale the input. A learned scale $\gamma$ and a bias $\delta$ are then applied to preserve a learnable scale and bias while maintaining stability across all layers
		_P.S. In image processing, the mean and standard deviation are computed for each image channel across the batch._
		_P.S. With residual blocks and BatchNorm, each residual block adds only variance 1 if the learned $\gamma=1$. This makes the loss surface smoother. The normalization also makes large groups of model weights equivalent, making it easier to reach a good minimum._
	- Other normalization schemes
		![img](/img/understanding-deep-learning-normalization.png)

### Transformers

- Dot-product self-attention
	![img](/img/understanding-deep-learning-dot-product-self-attention.png)
	- Positional encoding
		![img](/img/understanding-deep-learning-positional-encoding.png)
	- Scaled dot-product self-attention
		> The dot products in the attention computation can have large magnitudes and move the arguments to the softmax function into a region where the largest value completely dominates. Small changes to the inputs to the softmax function now have little effect on the output (i.e., the gradients are very small), making the model difficult to train. To prevent this, the dot products are scaled by the square root of the dimension $D_q$ of the queries and keys (i.e., the number of rows in $\boldsymbol{\Omega}_q$ and $\boldsymbol{\Omega}_k$, which must be the same):
		> $$
		> \operatorname{Sa}[\mathbf{X}]
		> =
		> \mathbf{V}\cdot
		> \operatorname{Softmax}
		> \left[
		> \frac{\mathbf{K}^T\mathbf{Q}}{\sqrt{D_q}}
		> \right].
		> \tag{12.9}
		> $$
	- Multi-head attention
		The $D$-dimensional input is split into $H$ heads, each of which has $D/H$ dimensions. Each head has its own learned $\boldsymbol{\Omega}_q$, $\boldsymbol{\Omega}_k$, and $\boldsymbol{\Omega}_v$. The outputs of all heads are concatenated into a $D$-dimensional representation and then projected with a learned $\boldsymbol{\Omega}_o$.

- Transformer
	- Typical Transformer layers
		> $$
		> \begin{aligned}
		> \mathbf{X} &\leftarrow \mathbf{X} + \operatorname{MhSa}[\mathbf{X}] \\
		> \mathbf{X} &\leftarrow \operatorname{LayerNorm}[\mathbf{X}] \\
		> \mathbf{x}_n &\leftarrow \mathbf{x}_n + \operatorname{mlp}[\mathbf{x}_n],
		> \qquad \forall n \in \{1,\ldots,N\} \\
		> \mathbf{X} &\leftarrow \operatorname{LayerNorm}[\mathbf{X}],
		> \end{aligned}
		> \tag{12.13}
		> $$
	- Other components
		- Tokenization
		- Embeddings
	- Encoder-decoder: BERT
	- Decoder-only: GPT
		- **Masked self-attention**
			For language modelling, an attention mask is typically applied to the attention weights to prevent the model from attending to future tokens. This is done by adding a large negative value (e.g., $-\infty$) to the attention weights corresponding to future tokens before applying the softmax function, effectively setting their attention weights to zero.
			> [!important]
			> During training, each token only attends to the previous tokens and predicts the next token. Therefore, the model predicts a series of prediction tasks _in one go_, making the training very efficient.
			> 
			> During inference, since future tokens won't affect current tokens' keys and values, they can be cached and reused for the next token's attention computation, which makes the inference more efficient.
	- Transformers for images
		Vision Transformer (ViT) 👉 Swin Transformer 👉 etc.

### Graph neural network (GNN)

- Graph representation
	![img](/img/understanding-deep-learning-graphs.png)
	- Node embedding $\mathbf{X}$
	- Edge embedding $\mathbf{E}$
	- Adjacency matrix $\mathbf{A}$
    Position $(m,n)$ of the adjacency matrix $\mathbf{A}$ contains the number of walks of length one from node $m$ to node $n$. The entry at position $(m,n)$ of $\mathbf{A}^L$ contains the number of unique walks of length $L$ from node $m$ to node $n$.
    _P.S. This is not the same as the number of unique paths since the walks include routes that visit the same node more than once. Nonetheless, a non-zero entry at position $(m,n)$ indicates that the distance from $m$ to $n$ must be less than or equal to $L$._
- Graph neural networks (GNNs)
  > A graph neural network is a model that takes the node embeddings $\mathbf{X}$ and the adjacency matrix $\mathbf{A}$ as inputs and passes them through a series of $K$ layers. The node embeddings are updated at each layer to create intermediate “hidden” representations $\mathbf{H}_k$ before finally computing output embeddings $\mathbf{H}_K$.
	- Tasks
		- Graph-level
      > For graph-level tasks, the output node embeddings are combined (e.g., by averaging), and the resulting vector is mapped via a linear transformation or neural network to a fixed-size vector.
		- Node-level
		  The final node embeddings can be used for node-level prediction.
		- Edge-level
			A graph can be converted to its _edge graph_, where nodes become edges and edges become nodes, thus converting edge-level tasks into node-level tasks.
	- Graph convolutional networks (GCNs)
		> These models are convolutional in that they update each node by aggregating information from nearby nodes. As such, they induce a relational inductive bias (i.e., a bias toward prioritizing information from neighbors). They are spatial-based because they use the original graph structure. This contrasts with spectral-based methods, which apply convolutions in the Fourier domain.
		- Mean/max pooling aggregation
		- Attention-based aggregation
			> The attentions are masked so that each node only attends to itself and its neighbors
		- Kipf normalization
			> In Kipf normalization, the sum of the node representations is normalized as:
			> $$\mathbf{agg}[n] = \sum_{m\in \mathrm{ne}[n]} \frac{\mathbf{h}_m} {\sqrt{|\mathrm{ne}[n]||\mathrm{ne}[m]|}}, \tag{13.19} $$
			> with the logic that information coming from nodes with a very large number of neighbors should be down-weighted since there are many connections and they provide less unique information. This can also be expressed in matrix form using the degree matrix:
			> $$\mathbf{H}_{k+1} = \mathbf{a} \left[ \boldsymbol{\beta}_k \mathbf{1}^T + \boldsymbol{\Omega}_k \mathbf{H}_k \left( \mathbf{D}^{-1/2} \mathbf{A} \mathbf{D}^{-1/2} + \mathbf{I} \right) \right]. \tag{13.20}$$
		- Residual connections
			> With residual connections, the aggregated representation from the neighbors is transformed and passed through the activation function before summation or concatenation with the current node.
	- Batch sampling
		- Neighborhood sampling
			> Start with the batch nodes and randomly sample a fixed number of their neighbors in the previous layer. Then, we randomly sample a fixed number of their neighbors in the layer before, and so on.
		- Graph partitioning
			Cluster the original graph into disjoint subsets of nodes and sample from these clusters to maximize the number of internal links.

## Part II. Supervised learning

### Loss functions

To derive the loss function from the maximum likelihood perspective:

> [!important]
> 1. Choose a suitable probability distribution $Pr(\mathbf{y}|\boldsymbol{\theta})$ defined over the domain of the predictions $\mathbf{y}$ with distribution parameters $\boldsymbol{\theta}$.
> 2. Set the machine learning model $f[\mathbf{x}, \phi]$ to predict one or more of these parameters, so $\boldsymbol{\theta}=f[\mathbf{x}, \boldsymbol{\phi}]$ and $Pr(\mathbf{y}|\boldsymbol{\theta})=Pr(\mathbf{y}|f[\mathbf{x}, \boldsymbol{\phi}])$.
>	_P.S. Usually the predicted parameter is the mean of the Gaussian distribution._
> 3. To train the model, find the network parameters $\hat{\boldsymbol{\phi}}$ that minimize the negative log-likelihood loss function over the training dataset pairs ${\mathbf{x}_i,\mathbf{y}_i}$:
> $$\hat{\boldsymbol{\phi}}
> = \arg\!\min_{\boldsymbol{\phi}}\left[L[\boldsymbol{\phi}]\right]
> = \arg\!\min_{\boldsymbol{\phi}} \left[ -\sum_{i=1}^{I} \log\left[ Pr(\mathbf{y}_i|f[\mathbf{x}_i,\boldsymbol{\phi}]) \right] \right].
> \tag{5.6}$$
> _P.S. The underlying assumption is that the training data samples are independent and identically distributed (i.i.d.), so that $Pr(\{\mathbf{y}_i\}|\{\mathbf{x}_i\}) = \prod_i Pr(\mathbf{y}_i|\mathbf{x}_i) = \prod_i Pr(\mathbf{y}_i|f[\mathbf x_i, \boldsymbol{\phi}])$. Therefore, taking the negative log likelihood yields (5.6)._
> 4. To perform inference for a new test example $\mathbf{x}$, return either the full distribution $Pr(\mathbf{y}|f[\mathbf{x},\hat{\boldsymbol{\phi}}])$ or the value where this distribution is maximized.
>	_P.S. When the predicted parameter is the mean of the Gaussian distribution, the mean would be the value where the distribution is maximized; thus it's equivalent to taking the network output as the value directly._

_P.S. Here we derive the loss function from the perspective of maximizing likelihood or minimizing negative log likelihood. Another approach, called cross-entropy loss, is minimizing the Kullback-Leibler (KL) divergence between the empirical data distribution and the model distribution. They are mathematically equivalent._

- Regression 👉 Least squares loss
	> [!note]
	> We use a normal distribution as the probability model and let the neural network predict the mean:
	> $$Pr(\mathbf{y}|f[\mathbf{x}, \phi], \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp \left[ -\frac{(\mathbf{y} - f[\mathbf{x}, \boldsymbol{\phi}])^2}{2\sigma^2} \right]$$
	> Then we derive the **least squares loss function**:
	> $$\hat{\boldsymbol{\phi}} = \arg\!\min_{\boldsymbol{\phi}} Pr(\mathbf{y}|f[\mathbf{x}, \boldsymbol{\phi}], \sigma^2) = \arg\!\min_{\boldsymbol{\phi}} \sum_i (\mathbf{y}_i - f[\mathbf{x}_i, \boldsymbol{\phi}_i])^2.$$
- Classification 👉 Cross-entropy loss
	- Binary classification 👉 Binary cross-entropy loss
		> [!note]
		> We use a Bernoulli distribution as the probability model and let the neural network predict the probability of the positive class $\lambda = \text{sigmoid}[f[\mathbf x, \mathbf\theta]]$:
		> $$Pr(y|\lambda) = (1-\lambda)^{1-y}\cdot\lambda^y,$$
		> where $\text{sigmoid}[z] = \frac{1}{1+\exp{-z}}$. Then we derive the **binary cross-entropy function**:
		> $$\hat{\boldsymbol{\phi}} = \arg\!\min_{\boldsymbol{\phi}} Pr(\mathbf{y}|\text{sigmoid}[f[\mathbf x, \mathbf\theta]])$$
		> $$= \arg\!\min_{\boldsymbol{\phi}} \sum_{i=1}^I
		> - (1-y_i) \log \left[ 1 - \text{sigmoid}\left[ f[\mathbf x_i, \mathbf\theta] \right] \right]
		> - y_i \log \left[ \text{sigmoid}\left[ f[\mathbf x_i, \mathbf\theta] \right] \right]$$
	- Multi-class classification 👉 Multi-class cross-entropy loss
		> [!note]
		> We use a categorical distribution as the probability model and let the neural network predict the probability of each class $\lambda_k = \text{softmax}[\mathbf f[\mathbf x, \mathbf\theta]]$:
		> $$Pr(y=k) = \lambda_k,$$
		> where $\text{softmax}_k[\mathbf z] = \frac{\exp[z_k]}{\sum_{k'=1}^{K} \exp[z_{k'}]}$. Then we derive the **multi-class cross-entropy function**:
		> $$\hat{\boldsymbol{\phi}} = \arg\!\min_{\boldsymbol{\phi}} - \sum_{i=1}^I \log\left[ \text{softmax}_{y_i} \left[ \mathbf f[\mathbf x, \mathbf\theta] \right]\right]$$
		> $$= \arg\!\min_{\boldsymbol{\phi}} \sum_{i=1}^I \left(
		> f_{y_i}[\mathbf x_i, \mathbf\theta] - \log \left[ \sum_{k'=1}^K \exp[f_k'[\mathbf x_i, \mathbf\theta]] \right]
		> \right)$$

### Fitting models

- Gradient descent
	> **Step 1.** Compute the derivatives of the loss with respect to the parameters:
	> $$
	> \frac{\partial L}{\partial \phi} =
	> \begin{bmatrix}
	> \frac{\partial L}{\partial \phi_0} \\
	> \frac{\partial L}{\partial \phi_1} \\
	> \vdots \\
	> \frac{\partial L}{\partial \phi_N}
	> \end{bmatrix}.
	> \tag{6.2}
	> $$
	> **Step 2.** Update the parameters according to the rule:
	> $$
	> \phi \leftarrow \phi - \alpha \cdot \frac{\partial L}{\partial \phi},
	> \tag{6.3}
	> $$
	> where the positive scalar $\alpha$ determines the magnitude of the change. The first step computes the gradient of the loss function at the current position. This determines the **uphill direction** of the loss function. The second step moves a small distance $\alpha$ **downhill** (hence the negative sign).
	- Local minima
		Zero gradient (update stops), loss increases in all directions, but not necessarily the lowest loss
	- Saddle points
		Zero gradient (update stops), loss increases in some directions and decreases in others
- Stochastic gradient descent (SGD)
	To escape local minima, we can introduce randomness into the optimization process by selecting a subset of data samples at each iteration:
	> The mechanism for introducing randomness is simple. At each iteration, the algorithm chooses a random subset of the training data and computes the gradient from these examples alone. This subset is known as a **minibatch** or **batch** for short. The update rule for the model parameters $\phi_t$ at iteration $t$ is hence:
	> $$
	> \phi_{t+1} \leftarrow \phi_t - \alpha \cdot \sum_{i \in \mathcal{B}_t} \frac{\partial \ell_i[\phi_t]}{\partial \phi},
	> \tag{6.10}
	> $$
	> where $\mathcal{B}_t$ is a set containing the indices of the input/output pairs in the current batch and, as before, $\ell_i$ is the loss due to the $i^{\text{th}}$ pair. The term $\alpha$ is the learning rate... A single pass through the entire training dataset is referred to as an **epoch**.
	- Momentum term
		> A common modification to stochastic gradient descent is to add a *momentum* term. We update the parameters with a weighted combination of the gradient computed from the current batch and the direction moved in the previous step:
		> $$
		> \mathbf{m}_{t+1} \leftarrow \beta \cdot \mathbf{m}_t + (1-\beta)\sum_{i \in \mathcal{B}_t} \frac{\partial \ell_i[\phi_t]}{\partial \phi}
		> $$
		> $$
		> \phi_{t+1} \leftarrow \phi_t - \alpha \cdot \mathbf{m}_{t+1},
		> $$
		> where $\mathbf{m}_t$ is the momentum (which drives the update at iteration $t$), $\beta \in [0,1)$ controls the degree to which the gradient is smoothed over time, and $\alpha$ is the learning rate.
		- The gradient step is an infinite weighted sum of all the previous gradients
		- The effective learning rate increases if all these gradients are aligned over multiple iterations
		- The effective learning rate decreases if the gradient direction repeatedly changes as the terms in the sum cancel out
		- The overall effect is a smoother trajectory and reduced oscillatory behavior in valleys
- Adaptive gradient momentum (Adam)
	- Motivation
		Adam addresses one core issue of SGD:
		> [!warning]
		> When the gradient of the loss surface is much steeper in one direction than another, it is diﬀicult to choose a learning rate that (i) makes good progress in both directions and (ii) is stable.
	- How it works
		The core idea is to divide the gradient by its square root, so that the step lengths are normalized. To make it adaptive, both the gradient $\mathbf m$ and the squared gradient $\mathbf v$ are estimated using momentum:

		> $$
		> \mathbf{m}_{t+1} \leftarrow \beta \cdot \mathbf{m}_t + (1-\beta)\frac{\partial L[\phi_t]}{\partial \phi}
		> $$
		> $$
		> \mathbf{v}_{t+1} \leftarrow \gamma \cdot \mathbf{v}_t + (1-\gamma)\left(\frac{\partial L[\phi_t]}{\partial \phi}\right)^2,
		> \tag{6.15}
		> $$
		> where $\beta$ and $\gamma$ are the momentum coefficients for the two statistics.
		> 
		> Using momentum is equivalent to taking a weighted average over the history of each of these statistics. At the start of the procedure, all the previous measurements are effectively zero, resulting in unrealistically small estimates. Consequently, we modify these statistics using the rule:
		> $$
		> \tilde{\mathbf{m}}_{t+1} \leftarrow \frac{\mathbf{m}_{t+1}}{1-\beta^{t+1}}
		> $$
		> $$
		> \tilde{\mathbf{v}}_{t+1} \leftarrow \frac{\mathbf{v}_{t+1}}{1-\gamma^{t+1}}.
		> \tag{6.16}
		> $$
		> Since $\beta$ and $\gamma$ are in the range $[0,1)$, the terms with exponents $t+1$ become smaller with each time step, the denominators become closer to one, and this modification has a diminishing effect.
		> 
		> Finally, we update the parameters as before, but with the modified terms:
		> $$
		> \phi_{t+1} \leftarrow \phi_t - \alpha \cdot \frac{\tilde{\mathbf{m}}_{t+1}}{\sqrt{\tilde{\mathbf{v}}_{t+1}} + \epsilon}.
		> \tag{6.17}
		> $$
		> _The result is an algorithm that can converge to the overall minimum and makes good progress in every direction in the parameter space._
	- Visualization

		![img](/img/understanding-deep-learning-Adam.png)

#### Backward propagation

The aforementioned optimization algorithms rely on the computation of $\frac{\partial L}{\partial\phi}$, which can be efficiently computed using the **backward propagation** algorithm. The key idea is to apply the _chain rule_ of calculus to compute the gradient of the loss function with respect to each parameter $\phi$ in the network, starting from the output layer and moving backward through the network:

$$\frac{\partial L}{\partial \phi_i}
= \frac{\partial L}{\partial O'} \frac{\partial O'}{\partial \phi_i}
= \frac{\partial L}{\partial O'} \frac{\partial O'}{\partial O''} \frac{\partial O''}{\partial \phi_i},$$
where $O'$ and $O''$ are arbitrary intermediate layer outputs that depend on $\phi_i$. By recursively applying this process, we can compute the gradients for all parameters in the network.

#### He initialization

> Assuming that the distribution of pre-activations $f_j$ at the previous layer is symmetric about zero, half of these pre-activations will be clipped by the ReLU function, and the second moment $\mathbb{E}[h_j^2]$ will be half the variance $\sigma_f^2$ of $f_j$ (see problem 7.14):
> 
> $$
> \sigma_{f_i'}^2
> \sigma_\Omega^2
> \sum_{j=1}^{D_h}
> \frac{\sigma_f^2}{2}
> \frac{1}{2}D_h\sigma_\Omega^2\sigma_f^2.
> \tag{7.31}
> $$
> 
> This, in turn, implies that if we want the variance $\sigma_{f'}^2$ of the subsequent pre-activations $\mathbf{f}'$ to be the same as the variance $\sigma_f^2$ of the original pre-activations $\mathbf{f}$ during the forward pass, we should set:
> 
> $$
> \sigma_\Omega^2 = \frac{2}{D_h},
> \tag{7.32}
> $$
> 
> where $D_h$ is the dimension of the original layer to which the weights were applied. This is known as **He initialization**.

### Regularization

- Explicit regularization
	> The regularization term can be considered as a *prior* $Pr(\phi)$ that represents knowledge about the parameters before we observe the data and we now have the *maximum a posteriori* or *MAP* criterion:
	> 
	> $$
	> \hat{\phi} = \operatorname{argmax}_{\phi} \left[ \prod_{i=1}^{I} Pr(y_i|\mathbf{x}_i,\phi)Pr(\phi) \right].
	> \tag{9.4}
	> $$
	> 
	> moving back to the negative log-likelihood loss function by taking the log and multiplying by minus one, we see that $\lambda \cdot g[\phi] = -\log[pr(\phi)]$.
	- L2 regularization (weight decay)
		> The most commonly used regularization term is the $L2$ norm, which penalizes the sum of the squares of the parameter values:
		> 
		> $$
		> \hat{\phi} = \arg\min_{\phi} \left[
		> \sum_{i=1}^{I} \ell_i[\mathbf{x}_i, \mathbf{y}_i] + \lambda \sum_j \phi_j^2
		> \right], \tag{9.5}
		> $$
		> 
		> ... Here, the regularization term will favor functions that smoothly interpolate between the nearby points. This is reasonable behavior in the absence of knowledge about the true function.

		> [!important]
		> L2 regularization is usually only applied to the weights of the network, not the biases. Smaller weights contribute to smallness, whereas preferring smaller biases could risk underfitting the data. Therefore, L2 regularization is also called weight decay.

	- L0 regularization
		> The L0 regularization term applies a fixed penalty for every non-zero weight. The effect is to “prune” the network. L0 regularization can also be used to encourage group sparsity... L0 regularization is challenging to implement since the derivative of the regularization term is not smooth, and more sophisticated fitting methods are required.

	- L1 regularization
		> Somewhere between L2 and L0 regularization is L1 regularization or LASSO (least absolute shrinkage and selection operator), which imposes a penalty on the absolute values of the weights.

- Implicit regularization
	![img](/img/understanding-deep-learning-implicit-regularization.png)
	- Gradient Descent (GD)
		The trajectory of gradient descent will be affected by the step size. The trajectory of a continuous version of GD with an infinitesimally small step size can be described by $\frac{d\phi}{dt} = -\frac{\partial L}{\partial \phi}$, while the discrete version of GD can be described by $\phi_{t+1} = \phi_t - \alpha\frac{\partial L[\phi_t]}{\phi}$. If we "simulate" the discrete version of GD with the continuous one by modifying the loss function, the modified loss is:
		$$\tilde{L}_{GD}[\phi] = L[\phi] + \frac{\alpha}{4} \left| \frac{\partial L}{\partial \phi} \right|^2.$$
		Therefore, discrete GD repels the trajectory toward a path with **smaller gradient norm**, which is a form of **implicit regularization**.
	- Stochastic Gradient Descent (SGD)
		$$
		\tilde{L}_{SGD}[\phi]
		= \tilde{L}_{GD}[\phi] + \frac{\alpha}{4B} \sum_{b=1}^{B}
		\left| \frac{\partial L_b}{\partial \phi} - \frac{\partial L}{\partial \phi} \right|^2,
		$$
		where $L_b$ is the loss for the $b$-th of the $B$ batches in an epoch. Compared with GD, it further repels the trajectory toward a path with **smaller gradient variance** among batches, which is another form of **implicit regularization** and _might explain why SGD generalizes better than GD, especially with smaller batch sizes_.

#### Heuristics-driven tricks

Beyond explicit and implicit regularization, there are many heuristics-driven tricks that can influence the learning trajectory or modify the eventual models and thus improve the generalization performance of deep learning models. These include:

- Influencing the learning trajectory
	- **Dropout**
		Dropping a random subset of units in the network during training, which forces the network to learn redundant representations (i.e. avoid relying on a few neurons for prediction) and prevents overfitting. During inference, all units are used, but their outputs are scaled by 1 - dropout rate to account for the missing units during training.
	- **Early stopping**
		Using a validation set to monitor the model's performance during training and stopping the training process when the performance on the validation set starts to degrade, which prevents overfitting to the training data -- as training progresses, the model may start to try to fit the noise in the training data, which makes the function less smooth and can hurt its performance on unseen data.
	- **Transfer learning**
		Use a model trained on a large dataset for a related task as a starting point for training on a smaller dataset for the target task. This allows the model to leverage the knowledge learned from the large dataset and can improve generalization on the target task, compared with learning from scratch on a small dataset
	- **Multi-task learning**
		Train a network to perform multiple related tasks simultaneously, which can help the model learn more generalizable features and improve performance on each individual task
- Modifying the dataset
	- **Applying noise**
		Adding noise to the input data can help the model learn to be more robust to variations in the input and prevent overfitting. This can be done by adding Gaussian noise, randomly flipping or rotating images, or randomly masking parts of the input.
	- **Label smoothing**
		A technique where the label distribution (e.g. class label, language token, etc.) is smoothed by assigning a small probability to all classes, rather than assigning a probability of 1 to the correct class and 0 to all others. This prevents the model from becoming overconfident in its predictions and can improve generalization
	- **Data augmentation**
    Manipulating the data to generate new training examples, which can help the model learn to be more robust to variations in the input and prevent overfitting. This can be done by applying transformations such as rotation, scaling, flipping, or cropping to images, or by adding noise or perturbations to text or audio data
- **Ensembling**
	Combining the predictions of multiple models to improve overall performance and reduce overfitting. This can be done by averaging the predictions of multiple models, or by using a more sophisticated method such as stacking or boosting

### Evaluation

To fairly evaluate the performance of a model, we need to split the dataset into three disjoint sets: training set, validation set, and test set. The training set is used to train the model, the validation set is used for hyperparameter tuning or early stopping, and the test set is used to evaluate the final performance of the model. It's important that the test set is not used during training or hyperparameter tuning to ensure an unbiased estimate of the model's generalization performance.

The following is some mathematical and empirical analysis of the test-set performance.

- Noise, bias, and variance
	We assume the training dataset $\mathcal D$ is sampled stochastically: for an input $x$, the output $y$ has the expectation $\mu(x)$ and variance $\sigma^2$. The expected model that can be learned given all possible training datasets is $f_\mu[x] = \mathbb E_{\mathcal D} \left[ f[x, \phi[\mathcal D] \right]$. Then the expected test-set error over all possible training datasets is:
	> $$
	> \mathbb{E}_{\mathcal{D}}\left[\mathbb{E}_y[L[x]]\right]
	> = \underbrace{
	> \mathbb{E}_{\mathcal{D}}\left[\left(f[x,\phi[\mathcal{D}]] - f_\mu[x]\right)^2\right]
	> }_{\text{variance}}
	> +
	> \underbrace{
	> \left(f_\mu[x] - \mu[x]\right)^2
	> }_{\text{bias}}
	> +
	> \underbrace{
	> \sigma^2
	> }_{\text{noise}}.
	> \tag{8.7}
	> $$
	- The **variance** is uncertainty in the fitted model due to the particular training dataset sampled
		_The difference between the fitted model under the current training set $\mathcal D$ and the expected learned model given all possible training sets_
		> It follows we can reduce the variance by increasing the quantity of training data. This averages out the inherent noise and ensures that the input space is well sampled.
	- The **bias** is the systematic deviation of the model from the mean of the function we are modeling
		_The difference between the outputs of the expected learned model given all possible training sets and the actual expected output $y$_
		> This suggests that we can reduce this error by making the model more flexible. This is usually done by increasing the model capacity.
	- The **noise** is the inherent uncertainty in the true mapping from input to output
		_The variance in the output $y$ during data sampling_

- Bias-variance trade-off
	> For a fixed-size training dataset, the variance term typically increases as the model capacity increases. Consequently, increasing the model capacity does not necessarily reduce the test error. This is known as the bias-variance trade-off.
	- Double descent
		However, empirical evidence shows that the test error can decrease again as the model capacity increases beyond a certain point, leading to a **double descent** curve. This phenomenon is not yet fully understood, but it suggests that *over-parameterized models* can generalize well despite having low bias and high variance.

		![img](/img/understanding-deep-learning-double-descent.png)

		As shown in the figure, as the model capacity increases, the test error first decreases (due to reduced bias), then increases (due to increased variance), and finally decreases again, possibly due to the model's ability to interpolate the training data more smoothly and find a simpler solution that generalizes well.

## Part III. Unsupervised (generative) learning

> [!tip]
> ```
> Unsupervised learning
> ├── Clustering / density estimation / dimensionality reduction
> ├── Generative modeling: VAEs, GANs, diffusion models
> └── Self-supervised representation learning: contrastive learning, masked prediction, next-token prediction
> ```

_Self-supervised learning_ is a subset of _unsupervised learning_. Both learn from unlabelled data, by manipulating the original data in some way and constructing an objective (loss) to train the models. The subtle difference is that self-supervised learning focuses on learning useful & transferable **representations** from such a constructed task, while the focus of unsupervised learning is broader: e.g., extracting the structure in the dataset, learning a data distribution for generating new samples, etc.

- Latent variable
	> A latent variable $\mathbf z$ can be considered a compressed version of a data example x that captures its essential qualities
- Self-supervised learning
	- Contrastive
		In contrastive self-supervised learning, the model is trained to distinguish between similar and dissimilar pairs of data points. This encourages the model to learn representations that capture the underlying structure of the data and can improve generalization on downstream tasks.
	- Generative
		In generative self-supervised learning, the model is trained to generate or reconstruct the input data from a corrupted version of it. This forces the model to learn useful representations of the data that can be used for downstream tasks.
		- Probabilistic generative models
			> In addition to generating new examples, they assign a probability $Pr(\mathbf{x}|\phi)$ to each data point $\mathbf{x}$. This will depend on the model parameters $\phi$, and in training, we maximize the probability of the observed data $\{\mathbf{x}_i\}$, so the loss is the sum of the negative log-likelihoods (figure 14.2b):
			> $$L[\phi] = -\sum_{i=1}^{I} \log\left[Pr(\mathbf{x}_i|\phi)\right].
			\tag{14.1}$$
		- Desired properties
			Sampling: efficient, high-quality, high-coverage
			Latent space: well-behaved, disentangled
			Efficient likelihood computation
		- Metrics
			- Test likelihood
				Measure the likelihood assigned to a test dataset. This is not practical for models that cannot compute likelihoods efficiently, such as GANs and diffusion models.
			- Inception score (IS)
				Use a pre-trained classifier to measure the quality and diversity of generated samples. However, it is only sensible for generative models of the ImageNet database and is sensitive to the particular classification model. Also, it does not reward diversity.
			- Fréchet inception distance
				Compute a symmetric distance between the distributions of generated samples and real examples. The two distributions are approximated by multivariate Gaussians, and the distance is estimated using the Fréchet distance.
				> it does not model the distance with respect to the original data but rather the activations in the deepest layer of the inception classification network. These hidden units are the ones most associated with object classes, so the comparison occurs at a semantic level, ignoring the more fine-grained details of the images. This metric does take account of diversity within classes but relies heavily on the information retained by the features in the inception network; any information discarded by the network does not contribute to the result.
			- Manifold precision/recall
				> We consider the overlap between the data manifold (i.e., the subset of the data space where the real examples lie) and the model manifold (i.e., where the generated samples lie).
				> - The precision is the fraction of model samples that fall into the data manifold. This measures the proportion of generated samples that are realistic.
				> - The recall is the fraction of data examples that fall within the model manifold. This measures the proportion of the real data the model can generate.
				
				![img](/img/understanding-deep-learning-manifold-precision-recall.png)

Next we move on to unsupervised generative learning.

### Generative adversarial networks (GAN)

- **GAN loss**
	$$ \hat{\theta} = \underset{\theta}{\arg\max} \left[ \underset{\phi}{\min} \left[ \sum_j -\log\left[1-\operatorname{sig}\left[f\left[g[z_j,\theta],\phi\right]\right]\right] - \sum_i \log\left[\operatorname{sig}\left[f[x_i,\phi]\right]\right] \right] \right]. $$
	- $z_j$: the $j$-th random **latent/noise sample**, typically drawn from a simple distribution such as $z_j\sim\mathcal N(0,I)$
	- $g(z_j,\theta)$: the **generator** with parameters $\theta$, which maps latent sample $z_j$ to a synthetic data sample
	- $f(x,\phi)$: the **discriminator** with parameters $\phi$, which produces a logit indicating whether $x$ is real or generated. Thus $D_\phi(x)=\operatorname{sig}(f(x,\phi))$ can be interpreted as the predicted probability that $x$ is real
	- The expression inside the brackets is the **binary cross-entropy loss** for distinguishing real samples $x_i$ from generated samples $g(z_j,\theta)$
- **GAN training**
	The GAN loss can be decomposed into two separate loss functions for the generator and discriminator:
	$$L[\phi]=\sum_j -\log\left[1-\operatorname{sig}\left[f[g[z_j,\theta],\phi]\right]\right]-\sum_i \log\left[\operatorname{sig}\left[f[x_i,\phi]\right]\right]$$
	$$L[\theta]=\sum_j \log\left[1-\operatorname{sig}\left[f[g[z_j,\theta],\phi]\right]\right].$$
	- A **min-max adversarial game**
		- The discriminator minimizes $\mathcal L$ with respect to $\phi$, trying to assign $D_\phi(x_i)\to1$ for real data and $D_\phi(g(z_j,\theta))\to0$ for generated data.
		- The generator maximizes the discriminator's minimum achievable loss with respect to $\theta$, trying to generate samples that make real and fake data difficult to distinguish.
		- At equilibrium, an ideal generator reproduces the real data distribution, so the discriminator can do no better than random guessing: $D_\phi(x)\approx\frac12.$
	- Difficulties in GAN training
		- Quality _v.s._ coverage
			When the discriminator is optimal, $L[\phi]$ is equivalent to $D_{JS}[Pr(\mathbf x^* || Pr(\mathbf x))$, measuring the alignment between the generated distribution and the real data distribution in terms of both **quality** and **coverage**. However, the coverage term doesn't depend on the generator parameters $\theta$, so the generator only optimizes for quality. This can lead to **mode collapse**, where the generator produces a limited variety of samples that are of high quality but fail to cover the diversity of the real data distribution.
		- Vanishing gradients
			When the discriminator is too strong, the generator receives very small gradients and struggles to improve. This can lead to slow convergence or failure to learn; on the other hand, if the discriminator is too weak, it cannot provide useful feedback to the generator. A fine balance is needed to ensure that both networks learn effectively.
	- Common tricks
		- Wasserstein GAN loss
			The Wasserstein GAN (WGAN) loss is an alternative formulation of the GAN loss that addresses the vanishing gradient problem by using the Wasserstein distance (also known as Earth Mover's distance) instead of the Jensen-Shannon divergence.
		- Progressive growing
			The generator is initially trained to produce low-resolution images, and the resolution of the generated images is then gradually increased as training progresses. This allows the generator to learn coarse features first and then refine them, leading to more stable training and higher-quality images.
		- Minibatch discrimination
			Make the discriminator aware of the diversity of the minibatch rather than evaluating its samples independently. This encourages the generator to produce a wider variety of samples and helps prevent mode collapse, i.e., exploiting the reward by generating only a few high-quality samples.
		- Truncation
			Sample only latent variables $\mathbf z$ with high probability (i.e., close to the mean).
- Conditional generation
	- Conditional GAN
    Condition the generation on an attribute vector $\mathbf c$.
		![img](/img/understanding-deep-learning-conditional-gan.png)
	- Auxiliary classifier GAN (ACGAN)
    Condition the generation on class $c_j$ and use an auxiliary classifier in the discriminator to predict the class of the generated sample.
		![img](/img/understanding-deep-learning-auxiliary-classifier-gan.png)
	- InfoGAN
    Condition the generation on an attribute vector $\mathbf c$ and let the discriminator predict the attribute vector of the generated sample, which encourages the generator to learn disentangled representations of the attributes.
		![img](/img/understanding-deep-learning-info-gan.png)
  - StyleGAN: separate style from noise
    It introduces a set of style and noise latent codes into each layer of the generator, allowing for more control over the generated images and enabling the generation of high-quality images with fine-grained details.
			![img](/img/understanding-deep-learning-style-gan.png)
- Image translation
	- Pix2Pix
		![img](/img/understanding-deep-learning-pix2pix.png)
	- CycleGAN
		![img](/img/understanding-deep-learning-cycle-gen.png)

### Normalizing flows

> Of the four generative models discussed in this book, normalizing flows is the only model
that can compute the exact log-likelihood of a new sample... Normalizing flows can also learn to generate samples that approximate an existing density which is easy to evaluate but diﬀicult to sample from.

- Mapping from normal distribution to data distribution
  The key idea of normalizing flows is to learn a bijective mapping $f$ from a simple base distribution (e.g., standard normal) to the complex data distribution. This allows us to compute the exact log-likelihood of a new sample by applying the change of variables formula:
  $$\log Pr(\mathbf{x}) = \log Pr(\mathbf{z}) + \log \left| \det \frac{\partial f^{-1}(\mathbf{x})}{\partial \mathbf{x}} \right|,$$
  where $\mathbf{z} = f^{-1}(\mathbf{x})$ is the latent variable corresponding to the data point $\mathbf{x}$, and the determinant term accounts for the volume change under the transformation.

  > More precisely, the probability of data $x$ under the transformed distribution is:
  > $$Pr(x \mid \phi)=\left|\frac{\partial f[z,\phi]}{\partial z}\right|^{-1}\cdot Pr(z),\tag{16.1}$$
  > _P.S. The density of a distribution is stretched by $f$ with high-slope and vice verse._
  > ...
  > To learn the distribution, we find parameters $\phi$ that maximize the likelihood of the training data $\{x_i\}_{i=1}^{I}$ or equivalently minimize the negative log-likelihood:
  > $$\hat{\phi}=\underset{\phi}{\arg\max}\left[\prod_{i=1}^{I} Pr(x_i \mid \phi)\right]$$
  > $$=\underset{\phi}{\arg\min}\left[\sum_{i=1}^{I}-\log\left[Pr(x_i \mid \phi)\right]\right]$$
  > $$= \underset{\phi}{\arg\min}\left[\sum_{i=1}^{I}\log\left[\left| \frac{\partial f[z_i,\phi]}{\partial z_i} \right| \right] - \log\left[Pr(z_i)\right]\right],\tag{16.2}$$
  > where we have assumed that the data are independent and identically distributed in the first line and used the likelihood definition from equation 16.1 in the third line.

- Invertible network layers
  - Linear flows
    This is the simplest invertible layer, but it has limited expressiveness:
    $$\mathbf f[\mathbf h] = \mathbf\beta + \mathbf\Omega \mathbf h$$
  - Elementwise flows
		Applies element-wise invertible transformations to achieve non-linearity. However, the elements can't interact with each other.
  - Coupling flows
	  ![img](/img/understanding-deep-learning-coupling-flows.png)
  - Autoregressive flows
	  ![img](/img/understanding-deep-learning-autoregressive-flows.png)
  - Residual flows
	  ![img](/img/understanding-deep-learning-residual-flows.png)
  - Multi-scale flows
	  ![img](/img/understanding-deep-learning-multiscale-flows.png)

### Variational autoencoders (VAE)

- Latent variable models
	To describe the distribution $Pr(\mathbf x)$:
	$$Pr(\mathbf x) = \int Pr(\mathbf x, \mathbf z)d\mathbf z = \int Pr(\mathbf x|\mathbf z)Pr(\mathbf z) d\mathbf z$$
	$Pr(\mathbf z)$ is the latent variable, which is usually a standard multivariate normal distribution. $Pr(\mathbf x|\mathbf z)$ is the likelihood of the data given the latent variable, which is usually modeled by a neural network, which predicts the mean of a Gaussian:
  $$Pr(\mathbf x|\mathbf z, \phi) = \text{Norm}_{\mathbf x}[\mathbf f[\mathbf z, \phi], \sigma^2\mathbf I]$$
	![img](/img/understanding-deep-learning-latent-variable-model.png)
  - Ancestral sampling
    For generation, we first sample $\mathbf z$ from the prior $Pr(\mathbf z)$, and then sample $\mathbf x$ from the likelihood $Pr(\mathbf x|\mathbf z)$
	- Evidence lower bound (ELBO)
		> We start by multiplying and dividing the log-likelihood by an **arbitrary probability distribution $q(\mathbf z)$** over the latent variables:
		> $$\log[Pr(\mathbf{x}|\phi)] = \log\left[\int Pr(\mathbf{x},z|\phi)dz\right]
		> = \log\left[\int q(z)\frac{Pr(\mathbf{x},z|\phi)}{q(z)}dz\right]. \tag{17.14}$$
		> We then use Jensen's inequality for the logarithm (equation 17.12) to find a lower bound:
		> $$\log\left[\int q(z)\frac{Pr(\mathbf{x},z|\phi)}{q(z)}dz\right] \geq \int q(z)\log\left[\frac{Pr(\mathbf{x},z|\phi)}{q(z)}\right]dz. \tag{17.15}$$
		> where the right-hand side is termed the evidence lower bound or ELBO. It gets this name because $Pr(\mathbf{x}|\phi)$ is called the evidence in the context of Bayes' rule (equation 17.19). In practice, the distribution $q(z)$ has parameters $\theta$, so the ELBO can be written as:
		> $$\text{ELBO}[\theta,\phi] = \int q(z|\theta)\log\left[\frac{Pr(\mathbf{x},z|\phi)}{q(z|\theta)}\right]dz. \tag{17.16}$$
		- Tightness interpretation
			> $$\mathrm{ELBO}[\theta,\phi]= \int q(z|\theta)\log\left[\frac{\Pr(x,z|\phi)}{q(z|\theta)}\right]dz$$
			> $$= \int q(z|\theta)\log\left[\frac{\Pr(z|x,\phi)\Pr(x|\phi)}{q(z|\theta)}\right]dz$$
			> $$= \int q(z|\theta)\log[\Pr(x|\phi)]dz + \int q(z|\theta)\log\left[\frac{\Pr(z|x,\phi)}{q(z|\theta)}\right]dz$$
			> $$= \log[\Pr(x|\phi)] + \int q(z|\theta)\log\left[\frac{\Pr(z|x,\phi)}{q(z|\theta)}\right]dz$$
			> $$= \log[\Pr(x|\phi)] - D_{KL}\left[q(z|\theta)\parallel\Pr(z|x,\phi)\right]. \tag{17.17}$$

			The bound will be tight when $q(z|\theta) = \Pr(z|x,\phi)$.
		- Reconstruction interpretation
			> $$\mathrm{ELBO}[\theta,\phi]= \int q(z|\theta)\log\left[\frac{\Pr(x,z|\phi)}{q(z|\theta)}\right]dz$$
			> $$= \int q(z|\theta)\log\left[\frac{\Pr(x|z,\phi)\Pr(z)}{q(z|\theta)}\right]dz$$
			> $$= \int q(z|\theta)\log[\Pr(x|z,\phi)]dz+ \int q(z|\theta)\log\left[\frac{\Pr(z)}{q(z|\theta)}\right]dz$$
			> $$= \int q(z|\theta)\log[\Pr(x|z,\phi)]dz- D_{KL}\left[q(z|\theta)\parallel\Pr(z)\right].\tag{17.18}$$

			The first term measures the average agreement $Pr(\mathbf x|\mathbf z, \theta)$ between the latent variable and the data, i.e., the reconstruction accuracy; the second term measures the degree to which the auxiliary distribution $q(\mathbf z|\theta)$ matches the prior.

- Variational autoencoder (VAE)
	(17.18) was used to construct the VAE loss:
	> For a very approximate estimate, we can just use a single sample $z^*$ from $q(z|x,\theta)$:
	> $$\mathrm{ELBO}[\theta,\phi]\approx\log[\Pr(x|z^*,\phi)]-D_{KL}\left[q(z|x,\theta)\parallel\Pr(z)\right].\tag{17.23}$$
	> The second term is the KL divergence between the variational distribution
	> $$q(z|x,\theta)=\mathrm{Norm}_z[\mu,\Sigma]$$
	> and the prior
	> $$\Pr(z)=\mathrm{Norm}_z[0,I].$$
	> The KL divergence between two normal distributions can be calculated in closed form.
	
	![img](/img/understanding-deep-learning-VAE.png)
	- Encoder
		Here, $q(z|\theta)$ was adapted as $q(z|x, \theta)$ since the ELBO will be tight when $q(z|\theta) = \Pr(z|x,\phi)$, which requires the auxiliary distribution to take $x$ as input. It is effectively an encoder that maps the data $x$ to a latent variable $z$.
		- Reparameterization
      > It is diﬀicult to differentiate through this stochastic component... Fortunately, there is a simple solution; we can move the stochastic part into a branch of the network that draws a sample $\epsilon^*$ from $\mathrm{Norm}_{\epsilon}[0,I]$ and then use the relation:
      > $$z^*=\mu+\Sigma^{1/2}\epsilon^*.\tag{17.25}$$
      > to draw from the intended Gaussian. Now we can compute the derivatives as usual.
	- Decoder
    The decoder is the likelihood $Pr(\mathbf x|\mathbf z, \phi)$, which maps the latent variable $\mathbf z$ back to the data space and calculates the ELBO loss used to train both $\theta$ and $\phi$

### Diffusion models

> Modern VAEs can produce high-quality samples (figure 17.12d), but only by using hierarchical priors and specialized network architecture and regularization techniques. Diffusion models (chapter 18) can be viewed as VAEs with hierarchical priors... However, **in diffusion models, this encoder is predetermined; the goal is to learn a decoder that is the inverse of this process and can be used to produce samples**. Diffusion models are easy to train and can produce very high-quality samples that exceed the realism of those produced by GANs.

![img](/img/understanding-deep-learning-diffusion-models.png)

- **Encoder (forward process)**
	The encoder is a fixed process that gradually adds noise to the data. With enough time steps, the data becomes a Gaussian noise:
	$$z_1 = \sqrt{1-\beta_1}\cdot x + \sqrt{\beta_1}\cdot \epsilon_1$$
	$$z_t = \sqrt{1-\beta_t}\cdot z_{t-1} + \sqrt{\beta_t}\cdot \epsilon_t\quad \forall t \in 2,\ldots,T,$$
	$\beta_t \in [0,1]$ determine how quickly the noise is blended and are collectively known as the noise schedule.
	- Diffusion kernel $q(z_t|x)$
		Substituting each step together, all the noise added in each step will be i.i.d. and can be merged as a single noise $\epsilon$:
		$$z_t = \sqrt{\alpha_t}\cdot x + \sqrt{1-\alpha_t}\cdot \epsilon,$$
		where $\alpha_t = \prod_{s=1}^{t}(1-\beta_s)$. We can equivalently write this in probabilistic form:
		$$q(z_t|x)=\mathrm{Norm}_{z_t}\left[\sqrt{\alpha_t}\cdot x,(1-\alpha_t)I\right].$$
	- Conditional diffusion distribution $q(z_{t−1}|z_t,x)$
		$$q(z_{t-1}|z_t,x)=\frac{q(z_t|z_{t-1},x)q(z_{t-1}|x)}{q(z_t|x)}=\frac{q(z_t|z_{t-1})q(z_{t-1}|x)}{q(z_t|x)}$$
		This can be computed in closed form since we known the diffusion kernel:
		$$q(z_{t-1}|z_t,x)=\mathrm{Norm}_{z_{t-1}}\left[\frac{(1-\alpha_{t-1})\sqrt{1-\beta_t}}{1-\alpha_t}z_t+\frac{\sqrt{\alpha_{t-1}\beta_t}}{1-\alpha_t}x,\frac{\beta_t(1-\alpha_{t-1})}{1-\alpha_t}I\right].$$

- **Decoder (reverse process)**
	> $$Pr(z_T)=\mathrm{Norm}_{z_T}[0,I]$$
	> $$Pr(z_{t-1}|z_t,\phi_t)=\mathrm{Norm}_{z_{t-1}}\left[f_t[z_t,\phi_t],\sigma_t^2 I\right]$$
	> $$Pr(x|z_1,\phi_1)=\mathrm{Norm}_{x}\left[f_1[z_1,\phi_1],\sigma_1^2 I\right].$$
	> where **$f_t[z_t,\phi_t]$ is a neural network that computes the mean of the normal distribution** in the estimated mapping from $z_t$ to the preceding latent variable $z_{t-1}$. The terms $\{\sigma_t^2\}$ are predetermined. If the hyperparameters $\beta_t$ in the diffusion process are close to zero (and the number of time steps $T$ is large), then this normal approximation will be reasonable.
	- Evidence lower bound (ELBO)
		Similar to VAE, the ELBO and its reconstruction interpretation are:
		$$\mathrm{ELBO}\left[\phi_{1\ldots T}\right]=\int q\left(\mathbf{z}_{1\ldots T}\mid\mathbf{x}\right)\log\left[\frac{\Pr\left(\mathbf{x},\mathbf{z}_{1\ldots T}\mid\phi_{1\ldots T}\right)}{q\left(\mathbf{z}_{1\ldots T}\mid\mathbf{x}\right)}\right]\,d\mathbf{z}_{1\ldots T}.$$
		$$= \mathbb{E}_{q(z_1\mid\mathbf{x})}\left[\log\left[\Pr(\mathbf{x}\mid z_1,\phi_1)\right]\right]-\sum_{t=2}^{T}\mathbb{E}_{q(z_t\mid\mathbf{x})}\left[D_{KL}\left[q(z_{t-1}\mid z_t,\mathbf{x})\mathbin{\|}\Pr(z_{t-1}\mid z_t,\phi_t)\right]\right],$$
	- Diffusion loss
		The first term measures the probability of reconstructing the original sample $x$; the second term measures how accurately each denoising step moves the distribution towards the true denoised distribution
		> To fit the model, we maximize the ELBO with respect to the parameters $\phi_{1\ldots T}$. We recast this as a minimization by multiplying with minus one and approximating the expectations with samples to give the loss function:
		> $$L[\phi_{1\ldots T}]
		> =\sum_{i=1}^{I}
		> (-\log\left[\operatorname{Norm}_{\mathbf{x}_i}\left[\mathbf{f}_1[\mathbf{z}_{i1},\phi_1],\sigma_1^2\mathbf{I}\right]\right]$$
		> $$+\sum_{t=2}^{T}\frac{1}{2\sigma_t^2}\left\|\frac{1-\alpha_{t-1}}{1-\alpha_t}\sqrt{1-\beta_t}\mathbf{z}_{it}+\frac{\sqrt{\alpha_{t-1}\beta_t}}{1-\alpha_t}\mathbf{x}_i-\mathbf{f}_t[\mathbf{z}_{it},\phi_t]\right\|^2), \tag{18.29}$$
		> where the first term is the **reconstruction term**, $\frac{1-\alpha_{t-1}}{1-\alpha_t}\sqrt{1-\beta_t}\mathbf{z}_{it}+\frac{\sqrt{\alpha_{t-1}\beta_t}}{1-\alpha_t}\mathbf{x}_i$ is the **target, mean of $q(\mathbf{z}_{t-1}\mid\mathbf{z}_t,\mathbf{x})$**, and $\mathbf{f}_t[\mathbf{z}_{it},\phi_t]$ is the **predicted $\mathbf{z}_{t-1}$**.
		- Target reparameterization
			$$\mathbf{z}_t=\sqrt{\alpha_t}\cdot\mathbf{x}+\sqrt{1-\alpha_t}\cdot\boldsymbol{\epsilon}
			\Rightarrow \mathbf{x}=\frac{1}{\sqrt{\alpha_t}}\cdot\mathbf{z}_t-\frac{\sqrt{1-\alpha_t}}{\sqrt{\alpha_t}}\cdot\boldsymbol{\epsilon}.$$
			Therefore, the target (mean of $q(\mathbf{z}_{t-1}\mid\mathbf{z}_t,\mathbf{x})$) can be expressed as:
			$$\frac{1-\alpha_{t-1}}{1-\alpha_t}\sqrt{1-\beta_t}\mathbf{z}_{it}+\frac{\sqrt{\alpha_{t-1}\beta_t}}{1-\alpha_t}\mathbf{x}_i = \frac{1}{\sqrt{1-\beta_t}}\mathbf{z}_{it}-\frac{\beta_t}{\sqrt{1-\alpha_t}\sqrt{1-\beta_t}}\boldsymbol{\epsilon}_{it}$$
		- Network reparameterization
			> The loss function is modified so that the model aims to predict the noise that was mixed with the original data example to create the current variable... Now we replace the model $\hat{\mathbf{z}}_{t-1} = \mathbf{f}_t[\mathbf{z}_t,\phi_t]$ with a new model $\hat{\boldsymbol{\epsilon}} = \mathbf{g}_t[\mathbf{z}_t,\phi_t]$, which predicts the noise $\boldsymbol{\epsilon}$ that was mixed with $\mathbf{x}$ to create $\mathbf{z}_t$:
			$$\mathbf{f}_t[\mathbf{z}_t,\phi_t]=\frac{1}{\sqrt{1-\beta_t}}\mathbf{z}_t-\frac{\beta_t}{\sqrt{1-\alpha_t}\sqrt{1-\beta_t}}\mathbf{g}_t[\mathbf{z}_t,\phi_t].$$
		- Final form
			Substituting the target and network reparameterizations into the loss function and combining the terms, we get:
			$$L[\phi_{1\ldots T}]=\sum_{i=1}^{I}\sum_{t=1}^{T}\frac{\beta_t^2}{(1-\alpha_t)(1-\beta_t)2\sigma_t^2}\left\|\mathbf{g}_t[\mathbf{z}_{it},\phi_t]-\boldsymbol{\epsilon}_{it}\right\|^2,$$
			In practice, the scaling factors are ignored:
			$$L[\phi_{1\ldots T}]=\sum_{i=1}^{I}\sum_{t=1}^{T}\left\|\mathbf{g}_t[\mathbf{z}_{it},\phi_t]-\boldsymbol{\epsilon}_{it}\right\|^2$$
			$$=\sum_{i=1}^{I}\sum_{t=1}^{T}\left\|\mathbf{g}_t\left[\sqrt{\alpha_t}\cdot\mathbf{x}_i+\sqrt{1-\alpha_t}\cdot\boldsymbol{\epsilon}_{it},\phi_t\right]-\boldsymbol{\epsilon}_{it}\right\|^2,$$

- Implementation
	- **Training**
		![img](/img/understanding-deep-learning-diffusion-models-training.png)
	- **Sampling**
		![img](/img/understanding-deep-learning-diffusion-models-sampling.png)
	- Applying to images
		> We need to construct models that can take a noisy image and predict the noise that was added at each step. The obvious architectural choice for this image-to-image mapping is the U-Net (figure 11.10). However, there may be a very large number of diffusion steps, and training and storing multiple U-Nets is ineﬀicient. The solution is to train **a single U-Net that also takes a predetermined vector representing the time step** as input.
		> ![img](/img/understanding-deep-learning-diffusion-models-U-Net.png)
	- Improving generation speed
		> The same loss function will be valid for any forward process with this relation, and there is a family of such compatible processes... Among this family are **denoising diffusion implicit models**, which are no longer stochastic after the first step from x to z1, and accelerated sampling models, where the forward process is defined only on a sub-sequence of time steps. This allows a reverse process that skips time steps and hence makes sampling much more eﬀicient; good sam- ples can be created with 50 time steps when the forward process is no longer stochastic.
	- Conditional generation
		![img](/img/understanding-deep-learning-cascaded-conditional-generation.png)
		- Classifier guidance
			Train a classifier model and use it to calculate the gradient of the log-likelihood of a class label with respect to intermediate code $z_{t}$. Add it as an additional term for generating $z_{t-1}$:
			$$\mathbf{z}_{t-1}=\hat{\mathbf{z}}_{t-1}+\sigma_t^2\frac{\partial \log\left[\Pr(c\mid\mathbf{z}_t)\right]}{\partial \mathbf{z}_t}+\sigma_t\boldsymbol{\epsilon}.$$
		- Classifier-free guidance
			> Avoids learning a separate classifier $Pr(c|\mathbf z_t)$ but instead incorporates class information into the main model $\mathbf g_t[\mathbf z_t,\phi_t,c]$. In practice, this usually takes the form of adding an embedding based on $c$ to the layers of the U-Net in a similar way to how the time step is added.

## Part IV. Reinforcement learning

- **Markov decision process (MDP)**
	- State $s_t$
		The state of time $t$
	- Action $a_t$
		The action of time $t$
		- Policy $\pi$
			> The rules that determine the agent’s action for each state are known as the policy... The environment and the agent form a loop (figure 19.6). The agent receives the state st and reward rt from the last time step. Based on this, it can modify the policy $\pi[a_t|s_t]$ if desired and choose the next action at. The environment then advances to the next state according to $Pr(s_{t+1}|s_t,a_t)$ and issues a reward according to $Pr(r_{t+1}|s_t,a_t)$.
		- Optimal policy
			If we know the state-action value (see below), we can draw the optimal policy as:
			$$\pi[a_t|s_t] \leftarrow \arg\max_{a_t}[q^*[s_t,a_t]]$$
			$$q^*[s_t,a_t] = \max_\pi [\mathbb E[G_t|s_t,a_t,\pi]]$$
			where $q^*[s_t,a_t]$ is the optimal state-action value.
			> Some reinforcement learning algorithms are based on alternately estimating the action values and the policy
	- Reward $r_t$
		The reward of time $t$ (received at time $t+1$)
		- Return $G_t$
			The return is the sum of the cumulative discounted future rewards:
			$$G_t = \sum_{k=0}^{\infty} \gamma^k r_{t+k+1}$$
		- State value $v(s_t|\pi)$
			State value characterize how “good” a state is under a given policy $\pi$ by considering the expected return:
			$$v(s_t|\pi) = \mathbb E [G_t|s_t,\pi]$$
		- Action value $q(s_t, a_t|\pi)$
			Similarly, action value characterize how "good" an action and state are under a given policy $\pi$ by considering the expected return:
			$$q(s_t, a_t|\pi) = \mathbb E [G_t|s_t,a_t,\pi]$$
		- Bellman equations
			$$v[s_t] = \sum_{a_t} \pi[a_t|s_t]q[s_t,a_t]$$
			$$q[s_t,a_t] = r[s_t,a_t] + \gamma \cdot \sum_{s_{t+1}} Pr(s_{t+1}|s_t,a_t)v[s_{t+1}]$$
			Therefore, the relation between the state/action value at time $t$ and $t+1$ is:
			$$v[s_t] = \sum_{a_t} \pi[a_t|s_t]\left(r[s_t,a_t] + \gamma \cdot \sum_{s_{t+1}} Pr(s_{t+1}|s_t,a_t)v[s_{t+1}]\right)$$
			$$q[s_t,a_t] = r[s_t,a_t] + \gamma \cdot \sum_{s_{t+1}} Pr(s_{t+1}|s_t,a_t)\left(\sum_{a_{t+1}} \pi[a_{t+1}|s_{t+1}]q[s_{t+1},a_{t+1}]\right)$$

- **Tabular reinforcement learning**
	Here we briefly overview the taxonomy of tabular reinforcement learning algorithms. In tabular reinforcement learning, the state and action spaces are discrete and small enough to allow for explicit representation of the value functions and policies in tables. _More details are documented in the following sections_
	- Model-based methods
		> Model-based methods$^4$ use the MDP structure explicitly and find the best policy from the transition matrix Pr(st+1|st,at) and reward structure r[s,a]. If these are known, this is a straightforward optimization problem that can be tackled using dynamic programming. If they are unknown, they can (in principle) be estimated from observed MDP trajectories.
	- Model-free methods
		> Model-free methods assume that the transition matrix and reward structure of the underlying MDP are unknown.
		- Value-estimation methods
			> Value estimation approaches estimate the optimal state-action value function and then assign the policy according to the action in each state with the greatest value.
		- Policy estimation methods
			> Policy estimation approaches directly estimate the optimal policy using a gradient descent technique without the intermediate steps of estimating the model or values.

### Model-based dynamic programming

> Dynamic programming algorithms assume we have perfect knowledge of the transition and reward structure... The state values $v[s]$ are initialized arbitrarily (usually to zero). The deterministic policy $\pi[a|s]$ is also initialized (e.g., by choosing a random action for each state). The algorithm then alternates between iteratively computing the state values for the current policy (*policy evaluation*) and improving that policy (*policy improvement*).
> 
> **Policy evaluation:** We sweep through the states $s_t$, updating their values:
> 
> $$
> v[s_t] \leftarrow \sum_{a_t} \pi[a_t|s_t]
> \left(
> r[s_t,a_t] + \gamma \cdot \sum_{s_{t+1}} Pr(s_{t+1}|s_t,a_t)v[s_{t+1}]
> \right),
> \tag{19.11}
> $$
> 
> where $s_{t+1}$ is the successor state and $Pr(s_{t+1}|s_t,a_t)$ is the state transition probability. Each update makes $v[s_t]$ consistent with the value at the successor state $s_{t+1}$ using the Bellman equation for state values (equation 19.9). This is termed *bootstrapping*.
> 
> **Policy improvement:** To update the policy, we greedily choose the action that maximizes the value for each state:
> 
> $$
> \pi[a_t|s_t] \leftarrow \underset{a_t}{\operatorname{argmax}}
> \left[
> r[s_t,a_t] + \gamma \cdot \sum_{s_{t+1}} Pr(s_{t+1}|s_t,a_t)v[s_{t+1}]
> \right].
> \tag{19.12}
> $$
> 
> This is guaranteed to improve the policy according to the *policy improvement theorem*.

### Model-free value-estimation

- **Monte Carlo methods**
	> Monte Carlo methods simulate many trajectories through the MDP for a given policy to gather information about how to improve this policy... The action value for a given state-action pair under the current policy is estimated as the average of the empirical returns (i.e., cumulative sums of time-discounted rewards) that follow each time this pair occurs (figure 19.11b).
	- On policy method
		> Then the policy is updated by choosing the action with the maximum value at every state.
	- Off-policy method
		> In off-policy methods, the optimal policy π (the target policy) is learned based on episodes generated by a different behavior policy $\pi'$. Typically, the target policy is deterministic, and the behavior policy is stochastic (e.g., an epsilon-greedy policy).

- **Temporal-difference (TD) methods**
	> Temporal difference (TD) methods update the policy while the agent traverses the MDP.

	In both SARSA and Q-learning, the state-action value $q[s_t,a_t]$ is updated based on the difference between the current estimate and the estimate after taking a single step
	- SARSA (State-Action-Reward-State-Action)
		> *SARSA* (State-Action-Reward-State-Action) is an *on-policy* algorithm with update:
		> $$q[s_t,a_t] \leftarrow q[s_t,a_t] + \alpha\left(r[s_t,a_t] + \gamma \cdot q[s_{t+1},a_{t+1}] - q[s_t,a_t]\right),\tag{19.14}$$
		> where $\alpha \in \mathbb{R}^+$ is the learning rate. The bracketed term is called the *TD error* and measures the consistency between the estimated action value $q[s_t,a_t]$ and the estimate $r[s_t,a_t] + \gamma \cdot q[s_{t+1},a_{t+1}]$ after taking a single step.
	- Q-Learning
		> By contrast, *Q-Learning* is an *off-policy* algorithm with update (figure 19.12):
		> $$q[s_t,a_t] \leftarrow q[s_t,a_t] + \alpha\left(r[s_t,a_t] + \gamma \cdot \max_a \left[q[s_{t+1},a]\right] - q[s_t,a_t]\right),\tag{19.15}$$
		> where now the choice of action at each step is derived from a different behavior policy $\pi'$.
		- Deep Q-Networks (DQNs)
			> In *fitted Q-learning*, the discrete representation $q[s_t,a_t]$ of the action values is replaced by a machine learning model $q[s_t,a_t,\phi]$, where now the state is represented by a vector $s_t$ rather than just an index. We then define a least squares loss based on the consistency of adjacent action values (similar to the loss in Q-learning, see equation 19.15):
			> $$L[\phi]=\left(r[s_t,a_t]+\gamma \cdot \max_a \left[q[s_{t+1},a,\phi]\right]-q[s_t,a_t,\phi]\right)^2,\tag{19.16}$$
			> ![img](/img/understanding-deep-learning-DQNs.png)

		- Double DQNs
			The problem of DQNs is that the same network both selects the target (by the maximization operation) and updates the value: it only updates the action value of the action that is currently estimated to be the best, leading to a systematic bias that overestimates the action values. Double DQNs use two networks to decouple the selection and evaluation of the target action value: $q_1$ selects the action to update $q_2$, and vice versa
			$$q_1[s_t,a_t]\leftarrow q_1[s_t,a_t]+\alpha\left(r[s_t,a_t]+\gamma \cdot q_2\left[s_{t+1},\underset{a}{\operatorname{argmax}}\left[q_1[s_{t+1},a]\right]\right]-q_1[s_t,a_t]\right)$$
			$$q_2[s_t,a_t]\leftarrow q_2[s_t,a_t]+\alpha\left(r[s_t,a_t]+\gamma \cdot q_1\left[s_{t+1},\underset{a}{\operatorname{argmax}}\left[q_2[s_{t+1},a]\right]\right]-q_2[s_t,a_t]\right).$$

### Model-free policy-estimation

- **Monte-Carlo policy estimation**
	- Gradient-based policy estimation
		> Consider a trajectory $\tau = [s_1, a_1, s_2, a_2, \ldots, s_T, a_T]$ through an MDP. The probability of this trajectory $Pr(\tau|\theta)$ depends on both the state evolution function $Pr(s_{t+1}|s_t, a_t)$ and the current stochastic policy $\pi[a_t|s_t, \theta]$:
		> $$Pr(\tau|\theta)=Pr(s_1)\prod_{t=1}^{T}\pi[a_t|s_t,\theta]Pr(s_{t+1}|s_t,a_t).\tag{19.22}$$
		> Policy gradient algorithms aim to maximize the expected return $r[\tau]$ over many such trajectories:
		> $$\theta=\underset{\theta}{\arg\max}\left[\mathbb{E}_{\tau}[r[\tau]]\right]=\underset{\theta}{\arg\max}\left[\int Pr(\tau|\theta)r[\tau]d\tau\right],\tag{19.23}$$
		> where the return is the sum of all the rewards received along the trajectory. To maximize this quantity, we use the gradient ascent update:
		> $$\theta\leftarrow\theta+\alpha\cdot\frac{\partial}{\partial\theta}\int Pr(\tau|\theta)r[\tau]d\tau$$
		> $$=\theta+\alpha\cdot\int\frac{\partial Pr(\tau|\theta)}{\partial\theta}r[\tau]d\tau,\tag{19.24}$$
		where $\alpha$ is the learning rate.
		- Monte-Carlo approximation
			> We want to approximate this integral with a sum over empirically observed trajectories. These are drawn from the distribution $Pr(\tau|\theta)$, so to make progress, we multiply and divide the integrand by this distribution:
			> $$\theta\leftarrow\theta+\alpha \cdot\int\frac{\partial Pr(\tau|\theta)}{\partial\theta}r[\tau]d\tau$$
			> $$=\theta+\alpha \cdot\int Pr(\tau|\theta)\frac{1}{Pr(\tau|\theta)}\frac{\partial Pr(\tau|\theta)}{\partial\theta}r[\tau]d\tau$$
			> $$\approx\theta+\alpha \cdot\frac{1}{I}\sum_{i=1}^{I}\frac{1}{Pr(\tau_i|\theta)}\frac{\partial Pr(\tau_i|\theta)}{\partial\theta}r[\tau_i].\tag{19.25}$$
			> This equation has a simple interpretation (figure 19.15); the update changes the parameters $\theta$ to increase the likelihood $Pr(\tau_i|\theta)$ of an observed trajectory $\tau_i$ in proportion to the reward $r[\tau_i]$ from that trajectory. However, it also normalizes by the probability of observing that trajectory in the first place to compensate for the fact that some trajectories are observed more often than others. **If a trajectory is already common and yields high rewards, then we don’t need to change much. The biggest updates will come from trajectories that are uncommon but create large rewards**.
		- Final form
			The equation can be further simplified by the _likelihood ratio identity_ $\frac{\partial \log[f[z]]}{\partial z} = \frac{1}{f[z]}\frac{\partial f[z]}{\partial z}$:
			$$\theta\leftarrow\theta+\alpha \cdot\frac{1}{I}\sum_{i=1}^{I}\frac{\partial \log\left[Pr(\tau_i|\theta)\right]}{\partial\theta}r[\tau_i].$$
			$$\theta\leftarrow\theta+\alpha \cdot\frac{1}{I}\sum_{i=1}^{I}\sum_{t=1}^{T}\frac{\partial \log\left[\pi[a_{it}|s_{it},\theta]\right]}{\partial\theta}r[\tau_i],$$
			Combining with the (non-obvious but proven) fact that the rewards before time $t$ does not affect the update after time $t$:
			$$\theta\leftarrow\theta+\alpha \cdot\frac{1}{I}\sum_{i=1}^{I}\sum_{t=1}^{T}\frac{\partial \log\left[\pi[a_{it}|s_{it},\theta]\right]}{\partial\theta}\sum_{k=t}^{T} r_{i,k+1}.$$

	- **State-dependent baseline subtraction**
		Some actions have greater value simply because the state yields higher rewards, rather than being truly better than other actions. To avoid this bias, we can subtract a baseline $b[s_{it}]$ from the return:
		> $$\theta\leftarrow\theta+\alpha \cdot\frac{1}{I}\sum_{i=1}^{I}\sum_{t=1}^{T}\frac{\partial \log\left[\pi_{a_{it}}[s_{it},\theta]\right]}{\partial\theta}\left(r[\tau_{it}] - b[s_{it}]\right).\tag{19.38}$$
		> Here, we are compensating for variance introduced by some states having greater overall returns than others, whichever actions we take. A sensible choice is the expected future reward based on the current state, which is just the state value $v[s]$. In this case, the difference between the empirically observed rewards and the baseline is known as the *advantage estimate*. Since we are in a Monte Carlo context, this can be parameterized by a neural network $b[s] = v[s,\phi]$ with parameters $\phi$, which we can fit to the observed returns using least squares loss:
		> $$L[\phi]=\sum_{i=1}^{I}\sum_{t=1}^{T}\left(v[s_{it},\phi]-\sum_{j=t}^{T} r_{i,j+1}\right)^2.\tag{19.39}$$

- **Temporal difference policy estimation (actor-critic methods)**
	> Actor-critic algorithms are temporal difference (TD) policy gradient algorithms... Often the same network represents both actor and the critic, with two sets of outputs that predict the policy and the values, respectively... _The agent typically collects a batch of experience over many time steps before the policy is updated_.
	- Critic
		Similar to state-dependent baseline method, the critic is a neural network that estimates the state value $v[s,\phi]$, i.e. the critic. It's characterized by network parameters $\phi$ and is trained (or bootstrapped) with:
		$$L[\phi]=\sum_{i=1}^{I}\sum_{t=1}^{T}\left(r_{i,t+1}+\gamma \cdot v[s_{i,t+1},\phi]-v[s_{i,t},\phi]\right)^2.$$
	- Actor
		The policy network $\pi[s_t,\theta]$ that predicts $Pr(a|s_t)$ is termed the actor:
		> In the TD approach, we do not have access to the future rewards $r[\tau_t] = \sum_{k=t}^{T} r_k$ along this trajectory. Actor-critic algorithms approximate the sum over all the future rewards with the observed current reward plus the discounted value of the next state:
		> $$r[\tau_{it}] \approx r_{i,t+1} + \gamma \cdot v[s_{i,t+1},\phi].\tag{19.40}$$
		> Here the value $v[s_{i,t+1},\phi]$ is estimated by a second neural network with parameters $\phi$. Substituting this into equation 19.38 gives the update:
		> $$\theta\leftarrow\theta+\alpha \cdot\frac{1}{I}\sum_{i=1}^{I}\sum_{t=1}^{T}\frac{\partial \log\left[Pr(a_{it}|s_{it},\theta)\right]}{\partial\theta}\left(r_{i,t+1}+\gamma \cdot v[s_{i,t+1},\phi]-v[s_{i,t},\phi]\right).\tag{19.41}$$

