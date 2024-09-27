---
title: "Computing and Processing Correspondences with Functional Maps | Maks Ovsjanikov et. al"
date: "2024-09-27"
update: 
link:
---

> [Computing and processing correspondences with functional maps | ACM SIGGRAPH 2017 Courses](https://dl.acm.org/doi/10.1145/3084873.3084877)


## Part I: Functional Maps Basics

_P.S. Partition was added by me._

### What are Functional Maps?

- Shape correspondence can be represented as the transportation $T_F$ of _functions_ between shapes. If such functions are represented with _bases_ $\{\phi_i\}$ on different shapes, the formulation becomes: $T_F(f) = T_F(\sum_i a_i \phi_i^M) = \sum_i a_i T_F(\phi_i^M)$
    Here the core is $T_F(\phi_i^M) = \sum_j c_{ji} \phi_j^N$: $T_F(f) = \sum_j\sum_i a_i c_{ji} \phi_j^N$
    - Noted that here the matrix $C$ or $\{c_{ji}\}$ can fully encode the shape correspondence, in the form of transportation of basis functions between shapes.
    - If only consider the spectral embeddings $\{a_i\}$: $T_F(a) = Ca$
    - If $C$ is correct, the point-to-point map can be phrased as: $T \approx \Phi_N C \Phi_M^+$, i.e. a correspondence matrix constructed by the dot product between $\phi_i^N$ and the transported $C \phi_j^M$. Noted that $\phi_i$ is the spectral embedding of the indicator function of vertex $i$ on the shape.
        - Inversely $C = \Phi_N^T T^T \Phi_M$, if $\Phi^T\Phi = I$, which holds for any basis $\Phi$ derived from a symmetric matrix operator, e.g. LBO.
- Constraints & regularization
    - Function preservation
        Such kind the constraint can be constructed with point descriptors, landmark point correspondences, segment correspondences, etc. $\min \|CA - B\|^2$
    - Operator commutativity
        Apply a linear operator and then transport should be equivalent to first the transport and then apply the linear operator. One example is LBO: $\min \|\Lambda^N C - C\Lambda^M\|^2$, where $\Lambda$ is diagonal matrix of eigenvalues of LBO on the shape - the matrix form of LBO in the spectral domain.
        _P.S. For isometry, LBO commutativity should be hold._
- Conversion to point-to-point maps
    It can be proved that $\phi_i$ is the spectral embedding of the indicator function of vertex $i$ on the shape. Therefore, $C \Phi_M$ is the transported point indicator functions on $\mathcal M$ to $\mathcal N$. Finding the nearest $\phi_j^N$s from $\Phi_N$ provides the corresponding points.
    - Refinement
        For volume preserving deformation, $C$ should be orthonormal. In this case, aligning $C \Phi_M$ and $\Phi_N$ becomes [[BeslPJ1992|ICP]] algorithm and the $C$ itself can be iteratively refined.

## Part II: Functional Maps in Special Settings

_P.S. Partition was added by me._

### Partial Functional Maps

- Partial Functional Maps
    > Assume to be given a full shape $M$ and a partial shape $N$ that is approximately isometric to some (unknown) sub-region $M' \subset M$. The authors showed that for each “partial” eigenfunction $\phi^N_j$ of $N$ there exists a corresponding “full” eigenfunction $\phi^M_i$ of $M$ for some $i \geq j$, such that $C_{ij}= \langle T_F(\phi^M_i, \phi^N_j) \rangle_{L^2(N)} \approx \pm 1$, and zero otherwise.
    
    Therefore, $C$ will shows a slanted-diagonal structure and an angle can pre-computed to optimize for $C$.
- Deformable clutter
    Deals with the case that the shapes only partly overlap, rather than one is the subset of another. In this case, the overlapping parts itself is a variable to be optimized. 
    - Non-rigid puzzles

### Maps in Shape Collections

- Descriptor and subspace learning
    With a collections of shapes, we can evaluate which point descriptors performance the best and assign best weights to them for matching new shapes. It can even be further used to identify a stable functional subspaces for shape matching.
- Networks of Maps
    Adding pair-wise links between shapes in the shape collection forms a networks of functional maps. On natural constraint for optimizing the network of maps is _cycle consistency_, i.e. a cycle of maps show yields an identity map.
    - Latent spaces
        However, optimizing all pair-wise maps is computationally impractical. We therefore turn to construct a latent shape and define $Y_i$ as a map from shape $i$ to the latent shape. Then $C_{ij} = Y_j^{-1} Y_i$.
        When all $Y_i^T Y_i = I$, any cycle of maps will cancel out as $I$. Therefore $\forall i, Y_i^T Y_i = I$ is a strong constraint to facilitate cycle consistency.
- Metrics and Shape Differences
    > Comparing deformations is a fundamental operation in shape collection. For this purpose we introduce two difference operators acting on functions describing the deformation undergone by the metric ... the area-based and conformal shape difference operators $D_A$ and $D_C$.

### Functional Vector Fields

The idea of functional maps can be transferred to the vector fields domain.

## Part III: Advanced Computation & Conversion

_P.S. Partition was added by me._

### Computing Functional Maps

In this chapter, more advanced techniques for solving functional maps are discussed.

- Additional optimization variables
    - Joint diagonalization
        With near-isometric shapes, $C$ should be near-diagonal. However, this doesn't hold for non-isometric shapes. Joint diagonalization optimizes for new basis on $M, N$ that makes $C$ diagonal.
        - Manifold optimization
            Classical manifold optimization method includes ADMM.
            > The main idea of manifold optimization is to treat the objective as a function defined on the matrix manifold, and perform descent on the manifold itself rather than in the ambient Euclidean space.
    - Unknown input ordering
        The ordering of the point descriptor functions could be unstable. The ordering can be considered as a variable during functional map optimization.
- Coupled functional maps
    Simultaneously solving for functional maps $C_1$ from $M$ to $N$ and $C_2$ from $N$ to $M$ and imposing the constraint of $C_1 C_2 = I$.
- Correspondence by matrix completion
    > In classical matrix completion problem, one is given a sparse set of observations $a_{ij} \in \Omega$ of a matrix $A$ and tries to find the lowest rank matrix with elements equal to the given ones on the subset of indices $\Omega$ ... Matrix completion problems are widely used in recommender systems.

### Map Conversion

- Optimize the (soft)assignment matrix
    In [[#Part I Functional Maps Basics]], we have discussed how to convert functional map to point-to-point correspondence by nearest neighbor search on the spectral embeddings. It can be seen as performing point cloud registration on the embedding space. Here we introduce a (soft)assignment matrix to represent the _registration_ in the optimization framework.
    - Nearest Neighbors
        Equivalent to rigid ICP registration in embedding space.
    - Orthogonal refinement
        Equivalent to orthogonal Procrustes in embedding space.
    - Regularized Map Recovery
        Equivalent to nonrigid CPD registration in embedding space.
    - Product Manifold Filter for Bijective Map Recovery
        > The resulting pointwise map can be seen as a “denoised” version of the input, in analogy with classical KDE-based denoising of images.
    - Linear Assignment Problem
- Continuous Maps via Vector Field Flows
    > To represent the target point-to-point map as a composition of an arbitrary continuous map between the two surfaces and a flow associated with an unknown vector field on one of them
