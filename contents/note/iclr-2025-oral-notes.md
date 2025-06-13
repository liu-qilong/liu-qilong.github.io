---
title: ICLR 2025 oral notes
tags:
  - Hinton/ConferenceReview
date: "2025-06-13"
update: 
link:
  link: https://iclr.cc/Conferences/2025
---

# ICLR 2025 oral notes

_P.S. The paper descriptions are based on my personal understanding. Some text were extracted from the abstracts and reviews._

## Domain

### LLM

- Transfusion [ChuntingZhou2025ICLR](https://openreview.net/forum?id=SI2hI0frk6) combines _next-token prediction_ for text and _diffusion-based learning_ for images within a single transformer architecture, bridging the modality gap without quantizing images into discrete tokens #🧠 
- Embedding
	- [AlexIacob2025ICLR](https://openreview.net/forum?id=vf5aUZT0Fz) introduces a pre-training framework that decouples embedding layers from the transformer body, enabling robust training on heterogeneous data _(avoiding the curse of multi-linguality)_, improving generalization, and reducing memory footprint
	- [ZiyueLi2025ICLR+](https://openreview.net/forum?id=eFGQ97z5Cd) investigates the limitation of using decoder-only models for embedding and finds that a good embedding can be acquired from the MoE layer, by combining routing weights (RW) and hidden states (HS)
	  _They found that weighted sum of RW and HS outperforms concatenation, similar to [[AshishVaswani2017NeurIPS|Transformer]]'s positional embedding_
	- [KihoPark2025ICLR](https://openreview.net/forum?id=bVTM2QKYuA) extend the _linear representation hypothesis_ to general concepts and show that hierarchical relationships are encoded as orthogonality #🧠 
- Training
	- Analysis
		- [YiRen2025ICLR](https://openreview.net/forum?id=tPNHOoZFl9) proposes a novel _learning dynamics_ framework, i.e. how specific training examples influences the model's predictions on other examples, to understand LLM's behavior during fine-tuning (e.g., SFT, DPO, and other variants)
		  Some counter-intuitive behavior can be well explained by the proposed framework, e.g. specific types of hallucination are strengthened after fine-tuning #🧠
		- [JiyeonKim2025ICLR](https://openreview.net/forum?id=eHehzSDUFp) introduces the concept of _knowledge entropy_ to analyze how language models store and access knowledge and shows that knowledge entropy decreases as models are trained, correlating with a reduced ability to learn new information and an increased tendency to forget existing knowledge #🧠 
		- [YudaSong2025ICLR](https://openreview.net/forum?id=mtJSMcF3ek) conducts a comprehensive examination on LLM self-improvement capability and finds that the generation-verification gap grows with more training, with better or worse model verifying or generating
		- [SachinGoyal2025ICLR](https://openreview.net/forum?id=SPS6HzVzyt) identifies and thoroughly analyzes an important phenomenon called _context-parametric inversion_ in instruction-tuned large language models, where models counter-intuitively become less reliant on input context as training progresses
	- Pre-training
		- [ZiqingFan2025ICLR](https://openreview.net/forum?id=f4gF6AIHRy) addresses the _dimensional collapse_ issue when using selective domain-specific data for pre-training (file selection). In the core is a classical greedy algorithm to achieve more uniform eigenvalues in the feature covariance matrix of the selected texts
		- [YuxianGu2025ICLR+](https://openreview.net/forum?id=dhAL5fy8wS) leverages optimal control principles, specifically, Pontryagin's Maximum Principle (PMP), for data selection to enhance data efficiency
		- [ZitongYang2025ICLR](https://openreview.net/forum?id=07yvxWDSla) recognizes the data inefficiency problem of pre-training, i.e. to learn a fact models must be trained on hundreds to thousands of diverse examples, whereas a fact may only appears once in the corpus. It proposes to bridge this gap with _data augmentation_ on small domain-specific corpus with EntiGraph, which leverages entities and their relations
	- Alignment & fine-tuning
		- [YuhengZhang2025ICLR+](https://openreview.net/forum?id=Pujt3ADZgI)  proposes to conduct RLHF with a two-player game framework, namely the Nash learning problem with human preference, which is a generalization of the contemporary Bradley-Terry model
		- [AudreyHuang2025ICLR+](https://openreview.net/forum?id=WJaUkwci9o) observes that models are often better at evaluating responses than generating them, leading to the insight on how self-improvement shifts probability mass toward high-quality outputs, i.e. "sharpening". It proposes a framework to analyze this process on SFT and RLHF
		- [GangweiJiang2025ICLR](https://openreview.net/forum?id=gc8QAQfXv6) studies the phenomenon of _catastrophic forgetting_ using Function Vectors and found that task similarity is correlated with the amount of forgetting. It proposes two solution: (ii) intervening on the trained model using function vectors of previous tasks and (iii) training the model with additional regularization with the function vectors of previous tasks
		- Safety
			- [TianshengHuang2025ICLR](https://openreview.net/forum?id=tTPHgb0EtV) proposes an alignment-stage method to defend against _harmful fine-tuning attack_ by adding a loss regularizer in the alignment stage's optimization
			- [XinranWang2025ICLR](https://openreview.net/forum?id=NN6QHwgRrQ) aligns generative models with _multiple human values_ by framing value alignment as a optimization problem with user-set constraints
			- Backtracking [YimingZhang2025ICLR++](https://openreview.net/forum?id=Bo62NeU6VF) rethink about an fundamental limitation of generative LLM: the generation is unidirectional, thus unable to _backtrack_. By introducing a `RESET` token for backtracking during SFT or DPO, the author improves the safety without harming helpfulness #🧠 
			- [XiangyuQi2025ICLR+](https://openreview.net/forum?id=6Mxhg9PtDE) probs a fundamental vulnerability in current safety alignment approaches: _shallow safety alignment_, i.e. primarily adapting a model's generative distribution over only its very first few output tokens. It proposes "deep safety alignment" as a promising defense #🧠 
		- Reinforcement learning based
			- [HaoSun2025ICLR](https://openreview.net/forum?id=rfdblE10qm) investigates the use of the Bradley-Terry model for reward modeling in LLM alignment, establishing its theoretical foundations while questioning its necessity for downstream optimization. It introduce _order consistency_ as a central objective and propose a classification-based alternative
			  _The experiments are quite extensive: more than 12,000 experimental setups, using base LLMs_
			- [AviralKumar2025ICLR](https://openreview.net/forum?id=CjwERcAU7w) identifies key limitations of existing self-correction methods including distribution shift and behavior collapse and proposes a two-stage RL training approach with (i) self-generated correction traces under the model's own distribution and (ii) appropriate regularization
			  _The first approach to successfully enable reliable self-correction in LLMs without requiring external models or supervision_
			- [YantaoLiu2025ICLR](https://openreview.net/forum?id=QEHrmQPBdd)  presents a new benchmark dataset for the reward model in its sensitivity on subtlety and style, rather than reject answers generated by weak models - a bias that could be easily exploited
		- Data augmentation based
			- [XIANGYUPENG2025ICLR](https://openreview.net/forum?id=YUYJsHOf3c) proposes to _self-synthesize reasoning paths_ as post-training data of LLMs by progressing from general reasoning structures to task-specific reasoning paths, to improve LLMs' generalization capability in reasoning
			- [HaipengLuo2025ICLR](https://openreview.net/forum?id=mMPMHWOdOy) uses the Evol-Instruct method from WizardLM to create a strong math SFT dataset. It also integrates process reward models into the reinforcement training pipeline
			- [DongyoungKim2025ICLR](https://openreview.net/forum?id=BPgK5XW1Nb) proposes Spread Preference Annotation with direct preference judgment (SPA), aimed at reducing the high costs associated with collecting large preference datasets for alignment. It achieves superior alignment with only 3.3% of the ground-truth labels
			- [AlihanHuyuk2025ICLR](https://openreview.net/forum?id=VVixJ9QavY) proposes to improve reasoning in LLM via fine tuning with _counterfactual_ synthetic data
	- Quantization & compression
		- [TanishqKumar2025ICLR+](https://openreview.net/forum?id=wg1PCg3CUP) investigates the scaling law for post-training quantization. It finds that additional pre-training data actually degrades quantized models' performance. With 465 pre-training runs, it fits a formula that unifies the scaling laws for post and pre-training quantization to predict degradation
		- [ChiHengLin2025ICLR](https://openreview.net/forum?id=8EfxjTCg2k) proposes to compress Transformer-based models with a set of particular forms of low-rank matrix factorization for the weight matrices
- Inference
	- [NguyenNhatMinh2025ICLR](https://openreview.net/forum?id=FBkpCyujtS) proposes min-p sampling, a dynamic truncation sampler for LLMs, that improves text quality and diversity, comparing with traditional top-k sampling
	  _P.S. It's has been widely adopted in applications_
	- [YuFeng2025ICLR](https://openreview.net/forum?id=fAAaT826Vv) introduces a Bayesian inference framework that combines LLMs with structured Bayesian networks to produce more reliable probability estimations for better decision making
	- Test-time scaling
		- [ZhenruiYue2025ICLR](https://openreview.net/forum?id=FSjIrOm1vz) investigates into the inference scaling of RAG, exploring effective strategies beyond merely increasing its context length, including in-context learning and iterative prompting. It also proposes a model to predict the optimal computation allocation, presenting linear gains of performance VS computation
		- [JoaoLoula2025ICLR](https://openreview.net/forum?id=xoXn62FzD0) proposes an inference-time method for _controlled generation_, imposed as probabilistic conditioning, with Sequential Monte Carlo (SMC) techniques
		- [CharlieVictorSnell2025ICLR](https://openreview.net/forum?id=4FWAwZtd2n) investigates two primary test-time scaling mechanisms: (i) searching against dense verifier reward models and (ii) adaptively updating the model's response distribution based on the prompt. The authors then proposes a _compute-optimal_ strategy that dynamically allocates test-time computation based on the difficulty of the prompt and shows that test-time computation can outperform a 14x larger models
	- MoE
		- [NiklasMuennighoff2025ICLR+](https://openreview.net/forum?id=xXTkbTBmqq) introduces a 7B LLM leveraging a sparse Mixture-of-Experts (MoE) architecture with model weights, training data, code, and logs open-sourced
		- [PengJin2025ICLR](https://openreview.net/forum?id=t7P5BUKcYv) proposes a heterogeneous MoE framework that integrates FFN and zero-computation experts (zero, copy, and constant experts). It reduces computing overhead by dynamically assigning simpler tokens to zero-computation experts, improves performance by focusing FFNs on challenging tokens, and eliminates GPU communication overhead
		- [ZhengzhuoXu2025ICLR](https://openreview.net/forum?id=o5TsWTUSeF)  enhances complex chart understanding through a Mixture of Expert (MoE) architecture and the ChartMoE-Align dataset
	- Speculative decoding
		- [GregorBachmann2025ICLR](https://openreview.net/forum?id=mtSSFiqW6y) uses LLM-as-a-judge, i.e. asking the LLM itself to verify the drafted content, for speculative decoding. It's motivated by the limitation of standard distribution-preserving methods
		- [HarikrishnaNarasimhan2025ICLR](https://openreview.net/forum?id=vo9t20wsmd) proposes speculative cascading, an integration of _cascading_ and _speculative decoding_ methods to improve language model inference, with good balance of speed and quality
	- Model editing
		- [HongkangLi2025ICLR+](https://openreview.net/forum?id=vRvVVb0NAz) provide the first theoretical characterization of the generalization guarantees of task vector methods on nonlinear Transformers. Task vector is widely used for model editing, e.g. multi-task learning, unlearning, and out-of-distribution generalization
		- [JunfengFang2025ICLR](https://openreview.net/forum?id=HvSytvg3Jh) projects the editing perturbations onto the null space of preserved knowledge before applying them to the model parameters, ensuring that the edited LLM’s output remains unchanged for queries related to preserved knowledge, to minimize disruption to existing information
	- Copyright
		- [JavierAbad2025ICLR](https://openreview.net/forum?id=kRoWeLTpL4) adaptively aggregates the model outputs to minimize the reproduction of copyrighted content, based on models trained on disjoint sets of copyrighted material
- Evaluation
	- [YanScholten2025ICLR+](https://openreview.net/forum?id=51WraMid8K) discusses the limitation of deterministic evaluations in capturing the whole output distribution. It proposes a formal probabilistic evaluation framework for LLMs with high-probability guarantees. It presents a solid case in unlearning #🧠 
	- Evaluation pitfalls
		- [XiaosenZheng2025ICLR](https://openreview.net/forum?id=syThiTmWWm) show that _null models_ that always return the same cheating responses can achieve high win rates on automatic LLM benchmarks, advocating for anti-cheat mechanisms
		- [RicardoDominguezOlmedo2025ICLR+](https://openreview.net/forum?id=jOmk0uS1hl)defines _training on the test task_ as a potential problem for evaluating LLMs, which could be common practice and strictly speaking not data contamination. It proposes fine-tuning on a small, common set of task-related data to put all the methods on equal footing
	- Capability evaluation
		- [XimingLu2025ICLR](https://openreview.net/forum?id=ilOEOIqolQ) proposed `CREATIVITY INDEX`, a metric that quantifies the creativity of a text by reconstructing it from existing web snippets, supported by a novel dynamic programming algorithm, `DJ SEARCH`, for efficient computation
		- [ZheyuanZhang2025ICLR](https://openreview.net/forum?id=84pDoCD4lH) presents an evaluation protocol & benchmark to assess the _spatial reasoning capabilities_ of vision language models. The results shed light on the ambiguity and cross-cultural diversity of _frame of reference_ in spatial reasoning
		- Cybench [AndyKZhang2025ICLR](https://openreview.net/forum?id=tc90LV0yRL) provides a cybersecurity agent benchmark with 40 professional-level Capture the Flag tasks that are recent, meaningful, and difficult with subtasks
		- [DanielPaleka2025ICLR](https://openreview.net/forum?id=r5IXBlTCGc) evaluates LLM forecasters for future events on its prediction's logical consistency, where ground truth is inherently unavailable at the time of prediction
		- BigCodeBench [TerryYueZhuo2025ICLR](https://openreview.net/forum?id=YrycTjllL0) presents a new code generation benchmark for evaluating large language models, with focus of diverse function calls and complex instructions, making it more comprehensive and challenging
		- Spyder 2.0 [FangyuLei2025ICLR](https://openreview.net/forum?id=XmProj9cPs) provides a real-world enterprise text-to-SQL workflows benchmark, with 595 complex workflow problems involving databases often exceeding 1,000 columns and stored across diverse systems like BigQuery and Snowflake
		- PrefEval [SiyanZhao2025ICLR](https://openreview.net/forum?id=QWunLKbBGF) presents a dataset containing multi-turn conversational data to evaluate the ability of LLMs in adhering to these conversationally expressed preferences in context
		- MMQA [JianWu2025ICLR+](https://openreview.net/forum?id=GGlpykXDCa)  provides a benchmark designed to assess the capabilities of LLMs in handling complex multi-table data scenarios, which demand advanced understanding and reasoning across connected tables. It also proposes a multi-table retrieval method with SOTA performance on MMQA
	- Safety evaluation
		- DarkBench [EsbenKran2025ICLR](https://openreview.net/forum?id=odjMSBSWRt) evaluates dark patterns in LLMs with 660 adversarial prompts across six categories: brand bias, user retention, sycophancy, anthropomorphism, harmful generation, and sneaking
		- [AaronJiaxunLi2025ICLR](https://openreview.net/forum?id=FpiCLJrSW8) shows that RLHF does not simultaneously optimize LLMs for trustworthiness, in fact in the aspects of stereotypical bias, truthfulness and privacy it has the opposite effect
	- LLM as judge
		- [FlorianEDorner2025ICLR](https://openreview.net/forum?id=NO6Tv6QcDs) investigates the limits of using an LLM in lieu of a large set of ground truth labels for evaluating another LLM. Even if the judge LLM is debiased by a small set of ground truth data, the best we can expect is 2x sample efficiency, i.e. LLM as judge won’t beat twice the data
		- [JaehunJung2025ICLR](https://openreview.net/forum?id=UHPnqSTBPO) proposes a LLM-as-Judge framework that _dynamically selects_ when to trust different judge models to reduce evaluation overhead, while providing a provable guarantee of human-judge agreement
- Interpretability
	- Identify critical heads
		- [JunsolKim2025ICLR](https://openreview.net/forum?id=rwqShzb9li) probes & isolates the attention heads that are most highly influential over political bias. These heads can be used to monitor the LLM's stances. Interestingly, by applying linear interventions to these attention heads, the LLM can be _steered_ toward a more liberal or conservative stance #🧠 
		- [WenhaoWu2025ICLR](https://openreview.net/forum?id=EytBpUGB1Z) demonstrates how to detect _retrieval heads_, which extract relevant information from long context, and validates them with experiments. Specifically, under a Needle-in-a-Haystack Test (NIAH) setting, it searches for attention heads that consistently attends to the injected tokens from a long-context input
		- [ZhenhongZhou2025ICLR](https://openreview.net/forum?id=h0Ak8A5yqw) interprets the contribution of individual attention heads to LLM safety and identifies critical heads
	- Sparse auto-encoders (SAEs)
		- [LeoGao2025ICLR](https://openreview.net/forum?id=tcsZt9ZNKD) proposes scaled sparse auto-encoders with top-k activation to directly control the number of active latent variables and thereby improve interpretability and lead to significant benefits of reconstruction ability, non-dead latents and sparsity. It reveals clean scaling laws with respect to auto-encoder size and sparsity
		- [JavierFerrando2025ICLR](https://openreview.net/forum?id=WCRQFlji2q) begins with the observation that hallucination in LLMs is closely linked to their ability (or inability) to recall knowledge about entities. It then introduces a novel approach with SAEs to identify latent directions within the LLMs' representation space that are responsible for entity recognition
		- [SamuelMarks2025ICLR](https://openreview.net/forum?id=I4e82CIDxv) leverages SAEs to decompose models into mono-semantic features and constructs causal circuits from these interpretable features for discovering and editing interpretable _sparse feature circuits_. Previous work often focused on more coarse units (e.g., entire attention heads or neurons) that tend to be highly poly-semantic
	- Probing the model
		- [JieZhang2025ICLR+](https://openreview.net/forum?id=SnDmPkOJ0T) presents a training-free methods for fingerprinting LLMs to and identify whether another LLM is a subsequent development. It leverages kernel alignment similarity of feature representations, which is robustness to modifications e.g. fine-tuning & model pruning
		- [YaoTong2025ICLR](https://openreview.net/forum?id=EUSkm2sVJ6) proposes a method for quantifying how much has a dataset been used in the training of a given model

### AI agent

- Examples
	- [BoyuGou2025ICLR](https://openreview.net/forum?id=kxnoqaisCT) presents a vision-only GUI agents with visual grounding model (UGround) trained on a large synthetic dataset (Web-Hybrid)
	- Cybench [AndyKZhang2025ICLR](https://openreview.net/forum?id=tc90LV0yRL) builds examples of Capture the Flag (CTF) agents, besides providing a cybersecurity benchmark
	- PathGen-1.6M [YuxuanSun2025ICLR](https://openreview.net/forum?id=rFpZnn11gj) uses multi-agents collaborating with each other to construct a large-scale pathology dataset
- Tool calling
	- [ChangleQu2025ICLR](https://openreview.net/forum?id=QKBu1BOAwd) proposes to boost tool learning by dynamically adjusting/rewriting tool documentation based on the interaction feedback between LLMs and external tools
- Decision path
	- [JiayiZhang2025ICLR](https://openreview.net/forum?id=z5uVAKwmjf) reformulates automatic workflow optimization as a search problem over code-represented workflows and proposes a Monte Carlo Tree Search based approach with code modification, tree-structured experience, and execution feedback
- Evaluation
	- [MaojiaSong2025ICLR](https://openreview.net/forum?id=Iyrtb9EJBp) evaluates LLMs’ performance as a RAG component across three dimensions: trustworthiness, citation groundedness, and refusal groundedness. It proposes an alignment method to improve LLMs for the RAG task
	- [ZhiyuanWeng2025ICLR](https://openreview.net/forum?id=st77ShxP1K) takes inspiration from the famous Asch _conformity_ experiments and shows that a similar phenomenon occurs with LLM based multi-agent systems. It provides a benchmark and some tricks to mitigate it
	- MLE-bench [JunShernChan2025ICLR](https://openreview.net/forum?id=6s5uXNWGIh) provides a benchmark on LLM agent's ability to solve ML engineering tasks taken from Kaggle. It conducts comprehensive experiments and analysis

### Computer vision

- 2D
	- Generation
		- [EnzeXie2025ICLR](https://openreview.net/forum?id=N8Oj1XhtYZ) integrates high-compression-rate (32x) auto-encoder, linear attention, and a unique sampling solver to enable fast & high-resolution generation even on a laptop. It also shows the effective use of the LLM for text encoding
		- DSPO [HuaishengZhu2025ICLR](https://openreview.net/forum?id=xyfb9HHvMe) fine-tunes diffusion models on human preferences using score-matching, achieving better results than direct preference optimization (DPO)
	- Editing
		- [LvminZhang2025ICLR](https://openreview.net/forum?id=u1cQYxRI1H) presents an illumination control model for relighting foreground objects using image diffusion models. It proposes a physically-grounded light transport consistency loss & effective strategies for collecting paired illumination datasets
		  _The results were praised as impressive_
		- Style transfer
			- [LituRout2025ICLR+](https://openreview.net/forum?id=bnINPG5A32) proposes a plug-and-play test-time optimization method for training-free stylization & content-style composition of diffusion models based on stochastic optimal control
	- Segmentation
		- SAM2 [NikhilaRavi2025ICLR](https://openreview.net/forum?id=Ha6RTeWMd0)
		- [ShilinXu2025ICLR](https://openreview.net/forum?id=1pXzC30ry5) fills the gap in real-time multi-purpose segmentation
- Video
	- Generation
		- [HuayuChen2025ICLR](https://openreview.net/forum?id=kGvXIlIVLM) proposes Condition Contrastive Alignment (CCA), which directly fine-tunes pre-trained models to achieve guidance-free auto-regressive (AR) visual generation, to avoid the multi-modal inconsistencies induced by Classifier-Free Guidance (CFG)
		- [HanyuWang2025ICLR](https://openreview.net/forum?id=Wr3UuEx72f) presents a method for learning video tokenization with learned holistic queries that _goes beyond patch-level_ representations and demonstrates improvements in auto-regressive (AR) video generative
		- Conditioning
			- [HanLin2025ICLR+](https://openreview.net/forum?id=ny8T8OuNHe) adapts the pre-trained ControlNets to the new backbones in image and video generation, addressing the feature space mismatch problem. It provides a _computationally-efficient_ approach to integrate ControlNets for video generation
			- [JianwenJiang2025ICLR](https://openreview.net/forum?id=weM4YBicIP) presents an _audio-driven_ portrait animation pipeline that demonstrates natural talking-head motion
			- [GaojieLin2025ICLR](https://openreview.net/forum?id=vaEPihQsAA) proposes a Region Attention Module, uses Human-Prior-Guided Conditions to improve the quality of the local hand and face regions, and reduces the ambiguity of driving body motion with the _weaker audio signal_
			- [HaiyangLiu2025ICLR](https://openreview.net/forum?id=LbEWwJOufy) generates high-fidelity co-speech gesture videos using a motion graph-based retrieval approach. It addresses audio-motion misalignment and visual artifacts by introducing (i) a hierarchical audio-motion joint embedding and (ii) a diffusion-based interpolation network
- 3D
	- 3D segmentation
		- [XiuweiXu2025ICLR](https://openreview.net/forum?id=XFYUwIyTxQ) proposes a geometry-aware module that lifts 2D mask to 3D queries for using SAM, a 2D vision foundation models (VFM), in _real time_ 3D segmentation #🚀
		- Open-YOLO 3D [MohamedElAmineBoudjoghra2025ICLR](https://openreview.net/forum?id=CRmiX0v16e) presents an efficient approach to open-vocabulary 3D instance segmentation by leveraging 2D bounding box priors from a pre-trained open-vocabulary 2D object detector. Main contribution is the Multi-View Prompt Distribution (MVPDist) method, which effectively utilizes multi-view information while addressing potential misclassification from the 2D object detector #🚀 
	- 3D reconstruction
		- [BotaoYe2025ICLR](https://openreview.net/forum?id=P4o9akekdf) reconstructs 3DGS from sparse and unposed images, avoiding errors associated with per-frame Gaussians and pose estimation. It's trained solely on photometric constraints without the geometric ground truth, making a wider range of datasets available for training
		- TetSphere splatting [MinghaoGuo2025ICLR](https://openreview.net/forum?id=8enWnd6Gp3) represents 3D shapes by deforming a collection of tetrahedral spheres, with geometric regularizations and constraints that effectively resolve common mesh issues such as irregular triangles, non-manifoldness, and floating artifacts
		- NeuralPlane [HanqiaoYe2025ICLR](https://openreview.net/forum?id=5UKrnKuspb)  utilizes foundational models to provide prior (normal, segmentation, etc) and then employ neural fields to learn a plane field that is aware of both geometry and scene semantics
		- Grendel [HexuZhao2025ICLR](https://openreview.net/forum?id=pQqeQpMkE7) presents a parallel training method for 3DGS for 3D reconstruction, which significantly improves the training speed and working scene scale #🚀 
	- Novel view synthesis
		- LVSM [HaianJin2025ICLR](https://openreview.net/forum?id=QQBPWtvtcn)  uses purely transformer-based framework for scalable and generalizable novel view synthesis from sparse-view inputs. It bypasses the _3D inductive biases_ used in previous methods, from 3D representations (e.g., NeRF, 3DGS) to network designs (e.g., epipolar projections, plane sweeps), addressing novel view synthesis with a _fully data-driven approach_ #🚀
- Vision-language model
	- [SimonSchrodi2025ICLR](https://openreview.net/forum?id=uAFHCZRmXk) studies the phenomena of modality gap and object bias in contrastive VLMs, and shows that they stem from an _information imbalance_ between modalities, limiting alignment in the embedding space, with the modality gap driven by few dimensions
	  _Praised by the reviewers as intriguing by connecting the modality gap with entropy, an innovative perspective_
	- [AvikPal2025ICLR](https://openreview.net/forum?id=3i13Gev2hV) studies the hierarchical visual-text representation with _hyperbolic representations_ through unsupervised contrastive training. It leverages the hierarchical relation within the image (whole image and objects) and the text (whole sentence and nouns) to construct a _hierarchical embedding space_, where the more general terms (objects / nouns) are pushing towards the origin and the more specific terms (sentences and whole images) are pushing towards the boundary
	- [YongxianWei2025ICLR](https://openreview.net/forum?id=1aF2D2CPHi) fills the gap of applying Data-Free Knowledge Distillation (DFKD) for the CLIP model
	- Visual grounding
		- [XinGu2025ICLR+](https://openreview.net/forum?id=WOzffPgVjF) introduces target-aware object queries for spatio-temporal video grounding (STVG), which is a significant departure from traditional zero-initialized queries. It comprises text-guided temporal sampling (TTS) module and attribute-aware spatial activation (ASA), working in a cascade
	- Evaluation
		- [YueYang2025ICLR](https://openreview.net/forum?id=X1OfiRYCLn) reduces _data contamination_ and enabling _dynamic difficulty_ by using a multimodal bootstrapping module to dynamically generate new visual question-answering samples
		- MMIE [PengXia2025ICLR+](https://openreview.net/forum?id=HnhNRrLPwm) provides a benchmark on interleaved multimodal comprehension and generation abilities. It comprises 20K multimodal queries across 12 fields, supporting interleaved text, multi-image inputs, and outputs in multiple-choice/open-ended formats. The automated evaluation metric is based on a fine-tuned LLM
		- PhysBench [WeiChow2025ICLR](https://openreview.net/forum?id=Q6a9W6kzv5) provides a benchmark on VLMs' physical world understanding capability across a diverse set of tasks, contains 10,002 entries of interleaved video-image-text data. It also proposes a method to enhance VLMs' ability with specialized vision models

### Robotics

- [TaiHoang2025ICLR](https://openreview.net/forum?id=7BLXhmWvwF)  introduces Geometry-aware RL with heterogeneous SE(3) equi-variant back-bone policy for robotic manipulation, enabling effective manipulation of rigid and deformable objects with multiple actuators
- [YinanZheng2025ICLR](https://openreview.net/forum?id=wM2sfVgMDH) proposes a transformer-based Diffusion Planner for closed-loop planning, which can effectively model multi-modal driving behavior and ensure trajectory quality without any rule-based refinement
- [FanqiLin2025ICLR](https://openreview.net/forum?id=pISLZG7ktL) investigates whether scaling laws applies to imitation learning
- [YangTian2025ICLR](https://openreview.net/forum?id=meRCKuUpmc) presents an end-to-end paradigm that predicts actions using inverse dynamics models conditioned on the robot's forecasted visual states, named Predictive Inverse Dynamics Models (PIDM). The motivation is closing the loop between _vision_ and _action_ and make them work in synergy
- [VitalisVosylius2025ICLR](https://openreview.net/forum?id=je3GZissZc) achieves _few shots_ In-Context Imitation Learning (ICIL) by reformulates ICIL as a graph generation problem using a learned diffusion process, enabling structured reasoning over demonstrations, observations, and actions
- PhysAgent [WeiChow2025ICLR](https://openreview.net/forum?id=Q6a9W6kzv5) enhance embodied agents physical world understanding capabilities by combining the generalization strengths of VLMs with the specialized expertise of vision models. It also provides a benchmark on VLMs' physical world understanding capability across a diverse set of tasks, contains 10,002 entries of interleaved video-image-text data. It also proposes a method to 

### Recommendation

- [LehengSheng2025ICLR](https://openreview.net/forum?id=eIJfOIMN9z) demonstrates that linearly mapped advanced LM representations as item representations yield superior recommendation performance

### Human-AI cooperation

- [CuongCNguyen2025ICLR](https://openreview.net/forum?id=zl0HLZOJC9) uses a Expectation-Maximization approach to address the missing annotation problem for learning to defer (to human). It also enhance the workload distribution in the E-step

### AI4Science

- Physics & chemistry
	- [MarioLinoValencia2025ICLR](https://openreview.net/forum?id=uKZdlihDDn) proposes a graph-based latent diffusion model for computational fluid dynamics, which enables direct sampling of unsteady flow states from their _equilibrium distribution_ given a mesh discretization of the system and its physical parameters
	- [PinChen2025ICLR](https://openreview.net/forum?id=SBCMNc3Mq3) presents a dataset of electronic charge density in crystalline inorganic materials
	- Molecule modeling
		- [ShihHsinWang2025ICLR](https://openreview.net/forum?id=OIvg3MqWX2) proposes a 3D graph construction method for molecules modeling with sparsity, connectivity, and rigidity guarantees. The reviewer commented that this is an important yet somehow overlooked problem in the field of 3D GNNs
		- [GabrieleCorso2025ICLR](https://openreview.net/forum?id=gHLWTzKiZV) proposes unbalanced flow matching for molecular docking problem
	- Molecule design
		- [TomasGeffner2025ICLR](https://openreview.net/forum?id=TVQLu34bdw) introduces a flow-based generative model for protein backbone design, leveraging hierarchical fold class labels and a scalable non-equivariant transformer architecture
		- [JingjingGong2025ICLR](https://openreview.net/forum?id=PSiijdQjNU) extends Bayesian Flow Network (BFN) to ProfileBFN that enables MSA profile-based protein family design
		- [HannesStark2025ICLR](https://openreview.net/forum?id=0ctvBgKFgc) generates protein structures conditioned on 3D ellipsoids that encode spatial layout information. The ellipsoids could be hand-constructed, extracted from existing proteins, or from a statistical model, enabling a vast range of molecule design applications
- Biology
	- [ZiweiYang2025ICLR](https://openreview.net/forum?id=ja4rpheN2n) learns Gene interaction with (i) a deep generative model learns distinct disease subtypes from patient gene expression profiles and (ii) a graph neural network captures representations of prior gene networks from knowledge databases
	- [ZhenyiZhang2025ICLR](https://openreview.net/forum?id=gQlxd3Mtru) learns stochastic dynamics from discretely observed data, e.g. single-cell RNA data. It connects regularized unbalanced optimal transport (RUOT) to Schrödinger bridge novelly and in particular comes alongside a careful treatment of unbalanced effects
	- [XingyuSu2025ICLR](https://openreview.net/forum?id=Mfnh1Sqdwf) proposes a sequence-to-expression network explicitly designed to discover and extract _regulatory elements_ that drive target gene expression, enhancing the accuracy of the gene expression prediction
- Neuroscience
	- [DehongXu2025ICLR](https://openreview.net/forum?id=Xo0Q1N7CGk) investigates the conformal isometry hypothesis that leads to the emergence of hexagon periodic patterns in grid cells, showing that learning a maximally distance-preserving position embedding naturally leads to such patterns
	- [MohammadBashiri2025ICLR](https://openreview.net/forum?id=kbjJ9ZOakb) learns single-neuron invariance manifolds and aligns them with affine transformation, enabling population-level exploration of neural invariances
	- [AtsunobuKotani2025ICLR](https://openreview.net/forum?id=g3xuCtrG6H) proposes a computational framework to model the emergence of color vision in the human brain, with biologically realistic simulations of optic nerve signals and a self-supervised learning mechanism that infers the color dimensionality without predefined assumptions
	- [AminNejatbakhsh2025ICLR](https://openreview.net/forum?id=cNmu0hZ4CL) estimates the similarity between noisy neural trajectories with optimal transport distances
	- [GeelingChau2025ICLR](https://openreview.net/forum?id=FVuqJt3c4L) introduces a self-supervised model called Population Transformer to model brain-wide neural activity sparsely and variably measured across subjects and datasets. Representations generated by this pre-trained model can then be used to perform downstream decoding tasks, leading to superior accuracy compared to models only trained on one specific dataset
- Geoscience
	- [ZiyeWang2025ICLR](https://openreview.net/forum?id=Cjz9Xhm7sI) proposes a novel framework for 3D weather nowcasting, combining SpatioTemporal Coherent Gaussian Splatting (STC-GS) for dynamic radar representation and GauMamba, a memory-augmented predictive network
- Economics
	- [AliShirali2025ICLR](https://openreview.net/forum?id=A3YUPeJTNR) studies a resource allocation problem in a pool of individuals where waiting for more observations improves resource allocation, yet risking some individuals of leaving the pool if resources are not allocated on time

### AI4Math

- miniCTX [JiewenHu2025ICLR](https://openreview.net/forum?id=KIgaAqEFHW) presents a benchmark for evaluating LLM-based theorem-proving models in real-world, context-rich scenarios, sourcing from real Lean projects and textbooks. It also provides NTP-toolkit, an automated tool for data extraction and annotation
- [MaxenceFaldor2025ICLR+](https://openreview.net/forum?id=o2Igqm95SJ) proposes an open-source python library for cell automaton (CA) with GPU acceleration provided by the JAX library
- Equation discovery
	- [ParshinShojaee2025ICLR](https://openreview.net/forum?id=m2nmp8P5in) leverages large language models for symbolic regression by integrating program synthesis, numerical optimization, and evolutionary search to discover accurate and generalizable scientific equations
- Differential Equation
	- [TianxiangGao2025ICLR](https://openreview.net/forum?id=AoraWUmpLU) investigates the impact of activation functions on Neural ODE training. It shows that smoothness of the activations are essential for stabilizing training and guaranteeing a unique solution
	- [RicardoBuitrago2025ICLR](https://openreview.net/forum?id=o9kqa5K3tB) introduces a neural operator with memory for modeling time-dependent PDEs, extending beyond standard Markovian neural operators that only depend on the current state
	- [HonghuiWang2025ICLR](https://openreview.net/forum?id=Fur0DtynPX) proposes to replace global modulations with spatial ones for PDE modeling with neural fields
	- [JindouJia2025ICLR](https://openreview.net/forum?id=cmfyMV45XO) introduces _feedback mechanisms_ to correct prediction errors in learned latent dynamics, enhancing the generalization capabilities of Neural ODEs for continuous-time prediction tasks
- Causal inference
	- [HaoyueDai2025ICLR](https://openreview.net/forum?id=xByvdb3DCm) identifies limitations of existing causal discovery methods under pre-intervention _selection bias_ and proposes the interventional twin graph framework to explicitly model both observed and counterfactual worlds, defining Markov properties and sound algorithms for causal inference
	- [ZijianLi2025ICLR+](https://openreview.net/forum?id=2efNHgYRvM) proposes a framework to identify temporally causal relations with _instantaneous_ dependencies
	- [XiaoHan2025ICLR](https://openreview.net/forum?id=k38Th3x4d9) proposes AERCA, a novel method integrating Granger causal discovery and root cause analysis to identify anomalies in multivariate time series
- Game theory
	- [YanzhengChen2025ICLR](https://openreview.net/forum?id=t8FG4cJuL3) investigates in the last iterate convergence guarantees of Extra Gradient and Optimistic Gradient algorithms for _time varying games_ that converge to some smooth monotone game
	- [AlexandrosHollender2025ICLR](https://openreview.net/forum?id=9VGTk2NYjF)  investigates the computational complexity of computing a Nash equilibrium in two-team zero-sum poly-matrix games and proves it to be CLS-hard

### AI4Health

- PathGen-1.6M [YuxuanSun2025ICLR](https://openreview.net/forum?id=rFpZnn11gj) uses multi-agents collaborating with each other to extract representative WSI patches, leading to a large-scale pathology dataset with 1.6M high-quality image-caption pairs. It then trains a pathology-specific CLIP model, PathGen-CLIP
- Drug design
	- [KeirAdams2025ICLR](https://openreview.net/forum?id=KSLkFYHlYg) designs a diffusion model that jointly generates 3D molecules and explicit representations of their 3D shapes, electrostatics, and pharmacophores and demonstrate its utility in bioisosteric drug design
	- [ChenbinZhang2025ICLR](https://openreview.net/forum?id=j7cyANIAxV) proposes a similarity-aware evaluation (SAE) approach for splitting datasets in _drug-target affinity prediction_, aiming to produce test sets with controlled similarity distributions

### AI4Design

- [ZijieGeng2025ICLR+](https://openreview.net/forum?id=YLIsIzC74j) proposes to optimize macro placement in chip design by training an offline predictor to estimate _cross-stage metrics_ and generating a pixel-level placement mask

## Architecture

### Diffusion models

- Diffusion models
	- [ZijingOu2025ICLR](https://openreview.net/forum?id=fV0t65OBUu) directly regresses the optimal (diagonal) covariances to improve the sampling efficiency and accuracy
	- Analysis
		- [BrunoKacperMlodozeniec2025ICLR](https://openreview.net/forum?id=esYrEndGsr) extends influence functions for _data attribution_ to diffusion models, addressing the computational challenges of Hessian inversions with scalable approximations. It also provides theoretical insights that unifies prior works
	- Discrete diffusion model
		- [NetaShaul2025ICLR](https://openreview.net/forum?id=tcvMzR2NrP) makes a significant contribution to _discrete generative modeling_ by broadening the design space of flow matching methods, allowing the use of arbitrary probability paths with a strong theoretical foundation grounded in kinetic-optimal velocities
		- [YongxingZhang2025ICLR](https://openreview.net/forum?id=EO8xpnW7aX) extends diffusion model to learn distributions over the group of permutations $S_n$, which is essential in fields of combinatorics, physics, and chemistry, etc.
	- Flexible-length generation
		- Block Diffusion [MarianneArriola2025ICLR](https://openreview.net/forum?id=tyEyYT267x) proposes to decompose a sequence into blocks of tokens, within each discrete diffusion is used, for enabling flexible-length generation. It also improves inference efficiency with KV caching and parallel token sampling #🧠 
	- Few-step generation
		- [VinhTong2025ICLR](https://openreview.net/forum?id=xDrFWUmCne) improves the inference-time time-step schedule with a teacher/student framework to learn the _optimal time discretization_ based on minimizing the KL divergence between the teacher and student's output distribution
		  _It's validated on image, point cloud, & protein structure tasks_
		- [KevinFrans2025ICLR](https://openreview.net/forum?id=OlzB6LnXcS) proposes to distill diffusion model to a one/multiple steps generator with single phase training. It conditions the network on the number of desired steps -- a simple and intuitive idea
		  _Related: [TianweiYin2024NeurIPS](https://openreview.net/forum?id=tQukGCDaNT)_
		- [ChengLu2025ICLR](https://openreview.net/forum?id=LyJi5ugyJx) propose a simplified theoretical framework that unifies diffusion models and consistency models (CM), identifying the root causes of continuous-time CM's training instability, leading to significantly improvement of the SOTA CMs
		  _Praised by the reviewers as having strong theoretical, empirical, and engineering contributions_
	- Diffusion model as encoder
		- [SihyunYu2025ICLR](https://openreview.net/forum?id=DJSZGGZYVi) introduces a regularization term to align the diffusion models induced representations with pre-trained self-supervised visual encoders. It boosts the training speed by 17x in an experiment
		- [YiboYang2025ICLR](https://openreview.net/forum?id=CxXGvKRDnL) draws a connection between diffusion models and _compression_. It repurposes it for image compression and proposes to use uniform noise instead of Gaussian noise
- Flow matching
	- [PeterHolderrieth2025ICLR](https://openreview.net/forum?id=RuP17cJtZo) shows that the core principles of _flow matching_ can be vastly generalized to practically all continuous-time Markov processes using Markov generators, _unifying_ all previous methods including _diffusion model_ and opening the door to new generative models agnostic to data modality
	  _Praised by the reviewers as innovative and significant_
	- [PanagiotisTheodoropoulos2025ICLR](https://openreview.net/forum?id=k3tbMMW8rH) draws inspiration from guided optimal transport schemes and introduces Feedback Schrödinger Bridge Matching, a semi-supervised matching framework that uses a small set of aligned pairs to guide the transport map of non-coupled samples
	- [GabrieleCorso2025ICLR](https://openreview.net/forum?id=gHLWTzKiZV) proposes unbalanced flow matching to introduce a trade-off between the sampling efficiency from prior distribution and the error of the target distribution approximation, for molecular docking problem

### Transformer

- [JohannesVonOswald2025ICLR](https://openreview.net/forum?id=UV5p3JZMjC) gives transformers a random seed as input, which are used to learn randomized algorithms, which shown to be beneficial in adversarial situations, where it is known from standard computer science that the added randomness "breaks" the adversary attack
- [NeilRathi2025ICLR](https://openreview.net/forum?id=aWXnKanInf) modifies the standard autoregressive setting by adding a regularizing term that encourages nearby parts the model to behave similarly, with the motivation that this mimics known brain function
- Attention
	- [TianzhuYe2025ICLR](https://openreview.net/forum?id=OvoCm1gGhN) mitigates the problem in over-allocate attention weights to irrelevant context by using the difference between two separate softmax attention scores to cancel noise assigned to irrelevant contextual tokens
	- [SimonSchug2025ICLR](https://openreview.net/forum?id=V4K9h1qNxE) demonstrates a mathematical equivalence between multi-head attention and linear hyper-networks, which is then used to provide an explanation for why Transformers are able to compositionally generalize to some extent. Qualitative visualizations show that the heads are consistent with hypothesized compositional functions
	  _It may open new design space choices for improving attention schemes in general_
	- Long context
		- [XunhaoLai2025ICLR](https://openreview.net/forum?id=OfjIlbelrT) proposes a sparse attention mechanism for efficient long-sequence inference. The core idea is to dynamically adjust sparse attention with query-aware sparse pattern determination and cumulative-attention based index selection
- Training efficiency
	- Cut Cross-Entropy (CCE) [ErikWijmans2025ICLR](https://openreview.net/forum?id=E4Fk3YuG56) proposes to drastically reduce the memory consumption of the cross-entropy loss, by avoiding materializing the logits of all tokens in vocabulary and only computes the logits for the correct token and evaluates the log-sum-exp over on the fly
	  _As the vocabulary size grows, memory consumption increasingly shifts from weights and activations to the cross-entropy layer. Thus such technique could reduce memory footprint of loss computation from 24 GB to 1 MB in a 2B model_ #🧠 
- Theoretical analysis
	- [GiuseppeBruno2025ICLR](https://openreview.net/forum?id=eBS3dQQ8GV) studies a mean-field limit for a simplified model of transformers, with the framework Geshkovski et al. (2023) and extends it in various theoretical aspects
	- [JunoKim2025ICLR+](https://openreview.net/forum?id=n2NidsYDop) studies a simple setup of $k$-parity problem with 1-layer Transformer and provides a separation results for transformer (i) trained without intermediate supervision and (ii) trained with teacher forcing, thereby showing the importance of chain-of-thought

### RNN

- RNN
	- [RiccardoGrazzi2025ICLR](https://openreview.net/forum?id=UvTo3tVBk2) demonstrates that extending the eigenvalue range of Mamba and DeltaNet to include negative values not only enables them to solve parity but consistently improves their performance on state-tracking tasks
	- LinOSS [TKonstantinRusch2025ICLR](https://openreview.net/forum?id=GRMfXcAAFh)  is inspired by cortical dynamics of biological neural networks and uses forced harmonic oscillators to form the state space. It outperforms Mamba and LRU by nearly 2x on a sequence modeling task with sequences of length 50k #🚀 
- Time series pattern machine (TSPM)
	- [ShiyuWang2025ICLR](https://openreview.net/forum?id=1CLzLXSFNn) transforms time series data into multi-resolution images to capture complex _temporal and frequency-domain patterns_, achieving impressive results in various time series analytical tasks

### VAE

- [ChristopherFifty2025ICLR](https://openreview.net/forum?id=GMwRl2e9Y1) uses rotation and rescaling linear transformation to propagate gradients through vector quantization layer in the Vector Quantized Variational AutoEncoders (VQ-VAEs). In previous works, the gradients propagation simply skips it as it's non-differentiable

### GNN

- [JonasLinkerhagner2025ICLR](https://openreview.net/forum?id=zBbZ2vdLzH) jointly denoises feature data and rewiring the graph by aligning the singular vector subspaces of node features and the graph adjacency matrix to achieve _spectral resonance_
  _The reviewers praised it to be novel, interesting, and well-presented_
- [YairDavidson2025ICLR](https://openreview.net/forum?id=P7KIGdgW8S) investigates the separation power and stability of functions on graphs and multi-sets and provides explicit adversarial boundary cases. Based on the analysis, it proposes a pair-wise separation quality analysis framework based on an adaptation of Lipschitz and Hölder stability
- Expresiveness
	- [JingchuGai2025ICLR](https://openreview.net/forum?id=rdv6yeMFpn) analyzes the expressive power of spectral invariant graph neural networks from the perspective of graph homomorphisms
	  _The reviewers praised that the theoretical contributions are significant and it addresses several open questions_
	- [TuoXu2025ICLR](https://openreview.net/forum?id=pqOjj90Vwp) analyzes the logical expressiveness of arbitrary graph neural networks
	- [YamEitan2025ICLR](https://openreview.net/forum?id=EzjsoomYEb) investigates the expressivity limitations of Higher-Order Message Passing (HOMP) architectures in Topological Deep Learning, identifying "topological blindspots" such as diameter, orientability, planarity, and homology. It proposes two new architectures as remedies
- Safty
	- [ZhiweiZhang2025ICLR+](https://openreview.net/forum?id=trKNi4IUiP) presents a defense method against graph backdoor attacks, combining poisoned node detection and robust training

### Neuroscience inspired

- AKOrN [TakeruMiyato2025ICLR](https://openreview.net/forum?id=nwDRD4AMoN) takes on a long-standing idea from the computational neuroscience community, namely, that binding of different features in an input can be done using oscillations in unit activity that synchronize to indicate binding
- [MrinalMathur2025ICLR](https://openreview.net/forum?id=EjJGND0m1x) proposes to _dynamically allocate network compute_ based on the difficulty of the inputs. The proposed method consists of two networks: a) a prediction network and b) an introspection network that decides which layers to run. It shows strong results of a 3-layer network surpassing much larger ResNet-50 and EfficientNet on ImageNet

### Information theory inspired

- KAN (Kolmogorov-Arnold Networks) [ZimingLiu2025ICLR](https://openreview.net/forum?id=Ozo7qJ5vZi) has learnable activation functions on all edges ("weights'') -- every weight parameter is replaced by a univariate function parametrized as a spline. It's claimed to have better sample efficiency, parameter efficiency, & interpretability than [[DavidERumelhart1986Nature|MLP]], thus suitable for AI4Science tasks. However, it's much slower to train #🔥
- [AndreasChristianSchneider2025ICLR](https://openreview.net/forum?id=CLE09ESvul) proposes using Partial Information Decomposition as a local objective for neurons training and thus achieves neuron-level interpretability

### Probabilistic methods

- Bayesian optimization
	- [ZhitongXu2025ICLR](https://openreview.net/forum?id=kX8h23UG6v) demonstrates that, on some problems, Bayesian optimization with standard gaussian process can perform well on high-dimensional by simply using $\sqrt d$ length-scales
	- [SeunghunLee2025ICLR](https://openreview.net/forum?id=ZCOwwRAaEl) proposes to use (invertible) normalizing flows to solve the mismatch problem of latent Bayesian optimization arises from the reconstruction gap between input and latent spaces
	- [KacperWyrwal2025ICLR](https://openreview.net/forum?id=JWtrk7mprJ) proposes a technique for manifold-to-manifold Gaussian process regression. Similar in spirit to [[KaimingHe2016CVPR|ResNet]], it allows reverting to shallow models when additional complexity is unneeded
- Variational inference
	- [ByoungwooPark2025ICLR](https://openreview.net/forum?id=8zJRon6k5v) proposes a multi-marginal Doob's-transform for irregular time series and variational inference with stochastic optimal control to approximate it
- Sampling
	- [BadrMOUFAD2025ICLR](https://openreview.net/forum?id=6EUtjXAvmj) proposes a diffusion-based method for posterior sampling in diffusion models based on decomposition of the transitions which allows a trade-off between the complexity of the intractable guidance term and that of the prior transitions
- [SiyuChen2025ICLR](https://openreview.net/forum?id=is4nCVkSFA) proposes a unified gradient-based algorithm for feature learning in Gaussian single-index model with sample complexity matching the SQ lower bound

## Supervision

### Analysis

- Theoretic
	- [PatrikReizinger2025ICLR+](https://openreview.net/forum?id=hrqNOxpItr) proves that models trained with cross-entropy in supervised learning can recover latent factors of the data-generating process up to a linear transformation
	- [JingyangLi2025ICLR](https://openreview.net/forum?id=25kAzqzTrz) theoretically justifies why FixMatch-like self-supervised learning methods outperform supervised learning (SL) in generalization for deep networks, showing that FixMatch learns all class features while SL captures only a subset. It also proposes an enhanced version of FixMatch
	- [KrishnaBalasubramanian2025ICLR](https://openreview.net/forum?id=sbG8qhMjkZ) provides a convergence analysis of the Stein Variational Gradient Descent (SVGD) algorithm in its full formulation, i.e., using finitely many particles and in discrete time
	  _P.S. Praised by the reviewers as providing a long sought result_
	- [SungyoonKim2025ICLR](https://openreview.net/forum?id=4xWQS2z77v) studies the loss landscape of regularized ReLU networks based on convex duality, focusing on the structure of _stationary points_, the _connectivity_ of optimal solutions and the _non uniqueness_ of optimal solutions. The authors starts with a two-layer network with scalar output and considers extensions to minimal norm interpolation, vector-valued networks, and deep neural networks #🧠 
	  _Praised by reviewers as insightful, especially the "staircase of connectivity" phenomenon_
	- [ArthurJacot2025ICLR+](https://openreview.net/forum?id=1HCN4pjTb4) shows that _neural collapse_ provably holds in the end-to-end training of the model with weight decay, when low training error, balancedness of linear layers, and bounded conditioning of pre-linear features are meet
- Experimental
	- [JiachenTWang2025ICLR](https://openreview.net/forum?id=uHLgDEgiS5) addresses an important research gap of quantifying data influence in different stages via _trajectory-specific leave-one-out (LOO) influence_, which is approximated with _data value embedding_. It reveals that data points in the early and late stages of training exert a greater impact, leading to practicable data selection strategy
	- [ZhuangLiu2025ICLR](https://openreview.net/forum?id=SctfBCLmWo) demonstrates that despite the diversity and scale of current datasets, dataset bias persists, as evidenced by training neural networks to classify which dataset a sample belongs to
- Interpretability
	- Weight attribution
		- [ChingLamChoi2025ICLR](https://openreview.net/forum?id=PBjCTeDL6o)  identifies that gradient-based attribution methods with static baselines imposes unintended biases on attribution maps, leading to fragility and unfaithful interpretations. It proposes to compute baselines by perturbing inputs in an "unlearning" direction to erase salient features while maintaining model-specific properties
	- Data attribution
		- [JiachenTWang2025ICLR+](https://openreview.net/forum?id=HD6bWcj87Y) proposes In-run Data Shapley that requires _only one model training run_ to evaluate the contributions of the data samples to the model. It's of great interest for scientific, technical and legal concerns (privacy, copyright)

### Reinforcement learning

- [ChenJiang2025ICLR](https://openreview.net/forum?id=RWJX5F5I9g) uses a biologically-inspired stochastic continuous Hopfield network to address the exploration-exploitation dilemma. It can perform posterior sampling with tunable uncertainty bias, matching human and animal choice patterns in multi-armed bandit (MAB) tasks
- Data
	- [MichaelMatthews2025ICLR](https://openreview.net/forum?id=zCxGCdzreM) procedurally generates tens of millions of 2D physics-based tasks and using these to train a general reinforcement learning (RL) agent for physical control, mimicking the large scale pre-training that has prevailed in language/vision domains. It exhibits strong zero-shot physical reasoning capabilities in 2D space
- Skill learning
	- [MartinKlissarov2025ICLR+](https://openreview.net/forum?id=or8mMhmyRV) feeds natural language description of a skill to LLM to automatically design rewards, generate code, and then learn the skill via reinforcement learning
	- [ChongyiZheng2025ICLR](https://openreview.net/forum?id=xoIeVdFO7U) proposes a new method (contrastive successor features), which works within the paradigm of mutual information skill learning. The new method matches the performance of METRA, a method based on optimal transport, which achieves state of the art performance
	- [PoWeiHuang2025ICLR](https://openreview.net/forum?id=3IFRygQKGL) integrates an option network into the MuZero algorithm, which autonomously discovers options through self-play games and utilizes options during hierarchical planning
	  _It makes options really work at scale for RL_
	- [RenhaoWang2025ICLR](https://openreview.net/forum?id=5IkDAfabuo) uses conditional diffusion models to generate samples for experience replay in RL and pushes these generations towards more useful parts of an agent's acquired history with relevance functions
- Decision
	- [DixantMittal2025ICLR](https://openreview.net/forum?id=v593OaNePQ) introduces a new differentiable neural tree search architecture that learns directly from data trajectories, effectively embedding a search-like inductive bias into the neural network weights. It can be trained from just demonstration sequences, where search & exploration behavior are missing
	- [JuanAgustinDuque2025ICLR](https://openreview.net/forum?id=QFO1asgas2) introduces Advantage Alignment, a new family of algorithms for opponent shaping in general-sum games, designed to promote cooperation and avoid suboptimal outcomes. It unifies the existing opponent shaping methods and simplifies the mathematical formulation
	- [MathiasJackermeier2025ICLR](https://openreview.net/forum?id=9pW2J49flQ) presents a method to perform multi-task RL with linear temporal logic (LTL) specifications, leveraging two recent innovations: eventual-discounting and goal-conditioned RL, to create RL agents that can _zero-shot generalize_ to wide range of specifications
	- [JiajianLi2025ICLR](https://openreview.net/forum?id=vzItLaEoDa)  introduces LS-Image, a model-based RL method that uses hierarchical imagination to solve MineDojo tasks. The key idea is to use a short-term model for step-by-step transitions and a long-term one for multi-step transitions guided by learned affordance maps, which are computed using the MineCLIP reward model to identify task-specific spatial regions in the pixel space and then to guide intrinsic rewards and long-horizon state predictions
	- [KaustubhSridhar2025ICLR](https://openreview.net/forum?id=NxyfSW6mLK) constructs generalist agents that can adapt to new environments via retrieval-augmented policy that retrieves nearby states from demonstrations.  It introduces advancements in LLM to RL, such as RAG and in-context learning
	- [EricMazumdar2025ICLR](https://openreview.net/forum?id=stUKwWBuBm)  incorporates _risk aversion_ and _bounded rationality_ from behavioral economics into multi-agent reinforcement learning (MARL). It defines a class of risk-averse quantal response equilibria (RQE) which, under certain adjustments, are no-regret learnable in both $n$ -player matrix games and finite-horizon Markov games. Importantly, the _tractability_ of RQE is determined by the agents' degree of risk aversion and bounded rationality rather than the underlying game structure
- Theoretical
	- [SaketTiwari2025ICLR](https://openreview.net/forum?id=AP0ndQloqR) proposes a new regularizer for actor-critic methods that work in _continuous action spaces_. The regularizer works by constraining the state to be in a low-dimensional manifold, backed by theoretical & empirical proofs
	- [RunzheWu2025ICLR+](https://openreview.net/forum?id=hyfe5q5TD0) provides a computationally _tractable_ algorithm for the linear Bellman complete setting, which remains an open question for years. The key gradient is randomization which ensures optimism while circumventing a subtle error amplification issue
	- [HyunKyuLee2025ICLR](https://openreview.net/forum?id=4OaO3GjP7k) investigates the relationship between flat minima and robustness in RL, finding that flatter minima correspond to more robust policies
	  _Great visuals_
- Analysis
	- [ThomasBush2025ICLR](https://openreview.net/forum?id=DzGe40glxs) uses concept-based interpretability to provide the first non-behavioural evidence that model-free agents can learn to plan over a set of concepts that are implicitly encoded in the learnt internal representation

### Post-training learning

- LoRA
	- HiRA [QiushiHuang2025ICLR+](https://openreview.net/forum?id=TwJrTz9cRS) address the expressiveness issue of LoRA by using a Hadamard product to retain high-rank update parameters
	- LoRA-RITE [JuiNanYen2025ICLR](https://openreview.net/forum?id=VpWki1v2P8) proposes an adaptive matrix preconditioning method for LoRA optimization to achieve _transformation invariance_, which can mitigate the dependence on how LoRA factors are scaled and rotated to avoid sub-optimal solutions and improve the representation capability
	- SD-LoRA [YichenWu2025ICLR](https://openreview.net/forum?id=5U1rlpX68A) continually separates the learning of the magnitude and direction of LoRA components, enabling incremental learning of task-specific LoRA while maintaining the optimization directions of previous tasks
- Distillation
	- [AbhishekPanigrahi2025ICLR+](https://openreview.net/forum?id=wPMRwmytZe) investigates why progressive distillation can mitigate the challenge of better teacher doesn't always lead to a better student. It identifies that its benefits stems from an "implicit curriculum" embedded within these intermediate teacher checkpoints, which accelerates the optimization process of the student
- Continuous learning
	- [GangweiJiang2025ICLR](https://openreview.net/forum?id=gc8QAQfXv6) studies the phenomenon of _catastrophic forgetting_ using Function Vectors and found that task similarity is correlated with the amount of forgetting. It proposes two solution: (ii) intervening on the trained model using function vectors of previous tasks and (iii) training the model with additional regularization with the function vectors of previous tasks
	- [ZhuoxiaoChen2025ICLR](https://openreview.net/forum?id=Y6aHdDNQYD) proposes a test-time adaptation framework for LiDAR-based 3D object detection. The main idea is to dynamically select and assemble historical checkpoints to build a composite "super model" that adapts to domain shifts #🧠 
	- [SongTang2025ICLR](https://openreview.net/forum?id=FIj9IEPCKr) uses vision-language models (VLMs) for source-free domain adaptation (SFDA). The major contribution is addressing the noise of VLMs' supervision with proxy denoising (ProDe) before target adaptation

### Federated learning

- [SungwonKim2025ICLR](https://openreview.net/forum?id=cH65nS5sOz)  uses synthetic global data generated from reliable node types to tackle challenges such as missing classes and mutable graph structures in federated graph learning
- [GuanchengWan2025ICLR](https://openreview.net/forum?id=5Jc7r5aqHJ) tackles the challenge of backdoor attacks in Federated Graph Learning with Topological Graph Energy. At the client level, it uses energy modeling to distinguish between benign and malicious samples, while at the server level, it creates a global energy graph for energy propagation to detect and filter out malicious clients
- [WenjingYan2025ICLR](https://openreview.net/forum?id=ZuazHmXTns) achieves _parameter-free_ FL through normalized gradient updates performed locally, which ensure that the step size and momentum parameters do not depend on problem-specific parameters like smoothness. It also incorporates control variate-based drift correction and momentum-based variance reduction

### Architecture search

- [ArminWThomas2025ICLR](https://openreview.net/forum?id=HsHxSN23rM) proposes an architecture search framework with hierarchical design spaces based on linear input-varying systems. It encodes architectures as genomes optimized via evolutionary algorithms to achieve superior trade-offs across model quality, size, and cache efficiency

### Optimization algorithm

- [LesiChen2025ICLR](https://openreview.net/forum?id=ijbA5swmoK) improves the complexity of second-order methods for convex-concave minimax problem by reusing the Hessian information
- [SiteBai2025ICLR](https://openreview.net/forum?id=fMTPkDEhLQ) provides a theoretical analysis on the oracle complexity of minimizing convex functions with varying degrees of high-order smoothness $p$ and degrees of uniform convexity $q$
- Highway-BP [ErwanFagnou2025ICLR](https://openreview.net/forum?id=JDm7oIcx4Y) speeds up training of sequential DNN models by parallelization of the gradient calculation. It approximates gradient by iterative computation from different residual paths in parallel while pruning some paths