---
title: CVPR 2025 oral notes
tags:
  - Hinton/ConferenceReview
date: "2025-08-22"
update: 
link:
  link: https://cvpr.thecvf.com/Conferences/2025
  rednote: https://www.xiaohongshu.com/explore/68a7dfce000000001d01ec24?xsec_token=ABo-A2GKruEG4jNanb3mOLpPS4xK9SOGY4mv1BA1ndbUQ=&xsec_source=pc_user
---

# CVPR 2025 oral notes

_P.S. The paper descriptions are based on my personal understanding. Some text were extracted from the abstracts._

## Domain

### Vision-language models (VLMs)

- Dataset
	- Spatial reasoning
		- PixMo [MattDeitke2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Deitke_Molmo_and_PixMo_Open_Weights_and_Open_Data_for_State-of-the-Art_CVPR_2025_paper.html) provides a dataset of highly detailed image captions for pre-training, a free-form image Q&A dataset for fine-tuning, and an innovative 2D pointing dataset. It's used to train an fully open sourced 72B VLM from scratch, outperforming some proprietary models #🚀 
		- VSI-Bench [JihanYang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Yang_Thinking_in_Space_How_Multimodal_Large_Language_Models_See_Remember_CVPR_2025_paper.html) presents a video-based visual-spatial intelligence benchmark of over 5,000 question-answer pairs. It shows that spatial reasoning capabilities remain the primary bottleneck and prevailing linguistic reasoning techniques (e.g., chain-of-thought, self-consistency, tree-of-thoughts) fail to improve performance
	- OpenING [PengfeiZhou2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhou_OpenING_A_Comprehensive_Benchmark_for_Judging_Open-ended_Interleaved_Image-Text_Generation_CVPR_2025_paper.html) provides a dataset for _interleaved_ image-text generation and trains a judge model
	- Q-Eval-100K [ZichengZhang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Q-Eval-100K_Evaluating_Visual_Quality_and_Alignment_Level_for_Text-to-Vision_Content_CVPR_2025_paper.html) presents a large dataset focused on visual quality and alignment for 100K instances (60K images and 40K videos)
- Fine tuning
	- OPA-DPO [ZhiheYang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Yang_Mitigating_Hallucinations_in_Large_Vision-Language_Models_via_DPO_On-Policy_Data_CVPR_2025_paper.html) reveals that the benefits of DPO for mitigating _hallucination_ are largely contingent on whether the constructed data aligns on-policy. It therefore proposes an on-policy alignment DPO framework
- Inference
	- FarSight [FeilongTang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Tang_Seeing_Far_and_Clearly_Mitigating_Hallucinations_in_MLLMs_with_Attention_CVPR_2025_paper.html) proposes a decoding strategy that intervenes the outlier tokens in the token interaction process to enhance in-context inference, proving to mitigate hallucination in MLLM
- Application cases
	- EgoLM [FangzhouHong2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Hong_EgoLM_Multi-Modal_Language_Model_of_Egocentric_Motions_CVPR_2025_paper.html) integrates the rich contextual information from _egocentric videos_ and _motion sensors_ afforded by _wearable devices_. It models the joint distribution of _egocentric motions_ and natural language using LLMs and unifies a range of motion understanding tasks
	- M2F2-Det [XiaoGuo2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Guo_Rethinking_Vision-Language_Model_in_Face_Forensics_Multi-Modal_Interpretable_Forged_Face_CVPR_2025_paper.html) employs tailored face forgery prompt learning with CLIP to improve generalization to unseen forgeries. A LLM then provides a detailed textual explanations of its detection decisions
	- Agent
		- GEA [AndrewSzot2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Szot_From_Multimodal_LLMs_to_Generalist_Embodied_Agents_Methods_and_Lessons_CVPR_2025_paper.html) adapts MLLM to a generalist embodied agent capable of grounding itself across these varied domains through a multi-embodiment action tokenizer #🚀 
- Evaluation
	- SoFA [XinyuTian2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Tian_Identifying_and_Mitigating_Position_Bias_of_Multi-image_Vision-Language_Models_CVPR_2025_paper.html) reveals the _positional bias_ of multi-image VLMs and proposes a training-free approach, SoFt attention, that employs linear interpolation between inter-image causal attention and bidirectional counterparts to mitigate this bias

### 3D vision

- Foundational models
	- VGGT [JianyuanWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_VGGT_Visual_Geometry_Grounded_Transformer_CVPR_2025_paper.html)(visual geometry grounded transformer) infers all key 3D attributes of a scene, including camera parameters, point maps, depth maps, and 3D point tracks, from one, a few, or hundreds of its views
- Generation
	- DiT
		- CraftsMan3D [WeiyuLi2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Li_CraftsMan3D_High-fidelity_Mesh_Generation_with_3D_Native_Diffusion_and_Interactive_CVPR_2025_paper.html) proposes a 3D-native DiT that directly models the distribution of 3D data in latent space, generating _coarse geometries_ (inspired by craftsmanship) with regular mesh topology in seconds and then use a _normal-based geometry refiner_ to enhance local details (either automatically or interactively)
		- DNF [XinyiZhang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_DNF_Unconditional_4D_Generation_with_Dictionary-based_Neural_Fields_CVPR_2025_paper.html) uses dictionary learning to _disentangle 4D motion from shape_ as neural fields to generate high-fidelity 4D animations
		- [ChenGeng2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Geng_Birth_and_Death_of_a_Rose_CVPR_2025_paper.html) generates temporal object intrinsics with signals distilled from pretrained 2D diffusion models, including the evolving sequences of object geometry, reflectance, and texture, such as a blooming rose
	- Neural rendering
		- NeRF
			- DIFIX3D+ [JayZhangjieWu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wu_DIFIX3D_Improving_3D_Reconstructions_with_Single-Step_Diffusion_Models_CVPR_2025_paper.html) uses a single-step image diffusion model trained to _enhance and remove artifacts_ in rendered novel views caused by under-constrained regions of the 3D representation, boosting FID by 2x #🚀 
		- 3DGS
			- SSS [JialinZhu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhu_3D_Student_Splatting_and_Scooping_CVPR_2025_paper.html) proposes to replace the Gaussian mixture model of 3DGS with Student's t distribution, thus enabling both positive (splatting) and negative (scooping) densities, providing better expressivity #🧠 
			- [RunfengLi2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Li_Time_of_the_Flight_of_the_Gaussians_Optimizing_Depth_Indirectly_CVPR_2025_paper.html) improves monocular view 3D Gaussian splatting optimization, which is commonly multi-view, for dynamic scenes reconstruction from C-ToF cameras
			- 3DGUT [QiWu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wu_3DGUT_Enabling_Distorted_Cameras_and_Secondary_Rays_in_Gaussian_Splatting_CVPR_2025_paper.html) supports _distorted cameras_, beyond the simple pinhole model, with time dependent effects such as rolling shutter, by replacing the EWA splatting formulation with the Unscented Transform that approximates the particles through sigma points
	- Human scene interaction (HSI)
		- TokenHSI [LiangPan2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Pan_TokenHSI_Unified_Synthesis_of_Physical_Human-Scene_Interactions_through_Task_Tokenization_CVPR_2025_paper.html) proposes a _unified_ transformer-based policy capable of multi-skill unification and flexible adaptation. The key insight is to model the humanoid proprioception as a separate shared token and combine it with distinct task tokens via a masking mechanism
- Segmentation
	- Point clouds
		- GRC [LongyuYang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Yang_Towards_Explicit_Geometry-Reflectance_Collaboration_for_Generalized_LiDAR_Segmentation_in_Adverse_CVPR_2025_paper.html) explicitly separates feature extraction for _geometry_ and _reflectance_ to address the decreased accuracy when LiDAR semantic segmentation models are exposed to adverse weather conditions
- Reconstruction
	- [ShoichiroTakeda2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Takeda_Gromov-Wasserstein_Problem_with_Cyclic_Symmetry_CVPR_2025_paper.html) exploits the cyclic symmetry property for faster solution of the Gromov-Wasserstein problem (GW), which underlies various real-world computer vision applications, e.g., image registration, point cloud registration, stereo matching, and 3D reconstruction
	- Image sensors
		- CUT3R [QianqianWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Continuous_3D_Perception_Model_with_Persistent_State_CVPR_2025_paper.html) uses transformer to construct a _stateful recurrent model_ that continuously updates its state representation with each new observation for 3D/4D reconstruction, admitting highly flexible inputs like video streams or unordered photo collections
		- Monocular 3D reconstruction
			- MoGe [RuichengWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_MoGe_Unlocking_Accurate_Monocular_Geometry_Estimation_for_Open-Domain_Images_with_CVPR_2025_paper.html) proposes an _affine-invariant representation_, which is agnostic to true global scale and shift, for geometry learning. With a robust & and efficient _point cloud alignment solver_, a set of global and local geometry supervision are introduced. Eventually, it outperforms SOTA monocular geometry estimation methods #🧠 
		- Multi-view 3D reconstruction
			- Murre [HaoyuGuo2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Guo_Multi-view_Reconstruction_via_SfM-guided_Monocular_Depth_Estimation_CVPR_2025_paper.html) first estimates SfM and uses it to conditioned the diffusion model to generate multi-view metric depth maps, providing an effective way to leverage the foundational vision models for 3D reconstruction
			- MV-DUSt3R+ [ZhenggangTang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Tang_MV-DUSt3R_Single-Stage_Scene_Reconstruction_from_Sparse_Views_In_2_Seconds_CVPR_2025_paper.html) introduces the multi-view decoder blocks to deal with the _combinatorial pairwise reconstructions number_ and expensive global optimization in DUSt3R/MASt3R alike single-stage scene reconstruction methods, boosting inference time to 2 seconds #🚀
			- FoundationStereo [BowenWen2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wen_FoundationStereo_Zero-Shot_Stereo_Matching_CVPR_2025_paper.html) constructs a large scale (1M pairs) _synthetic_ training dataset, with automatic scheme to remove ambiguous samples. On network design, it uses a _vision foundation models_ as a side-tuning feature backbone, mitigating the sim-to-real gap and enabling long-range context reasoning
		- Dynamic 3D scene reconstruction (spatial-temporal)
			- Stereo4D [LinyiJin2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Jin_Stereo4D_Learning_How_Things_Move_in_3D_from_Internet_Stereo_CVPR_2025_paper.html) fuses and filters the output of camera pose estimation, stereo depth estimation, and temporal tracking to achieve high-quality 4D reconstructions from internet stereoscopic, wide-angle videos
			- [YiqingLiang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Liang_Zero-Shot_Monocular_Scene_Flow_Estimation_in_the_Wild_CVPR_2025_paper.html) trains a _generalized model_ for scene flow estimation, by introducing new method for (i) geometry-motion joint estimation and (ii) a new data recipe to obtain 1M annotated data samples
			- Generate multi-view from single-view
				- CAT4D [RundiWu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wu_CAT4D_Create_Anything_in_4D_with_Multi-View_Video_Diffusion_Models_CVPR_2025_paper.html) uses a video diffusion model to transform a single monocular video into a multi-view video, enabling robust 4D reconstruction via optimization of a deformable 3D Gaussian representation
				- FluidNexus [YueGao2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Gao_FluidNexus_3D_Fluid_Reconstruction_and_Prediction_from_a_Single_Video_CVPR_2025_paper.html) reconstructs 3D fluid from monocular video with (i) a novel-view video synthesizer and (ii) a physics-integrated differentiable particle simulator
		- SLAM
			- MegaSaM [KaiyuLi2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Li_SegEarth-OV_Towards_Training-Free_Open-Vocabulary_Segmentation_for_Remote_Sensing_Images_CVPR_2025_paper.html) presents a deep visual SLAM framework robust to real-world videos of complex dynamic scenes with unconstrained camera paths and contains little camera parallax
		- Vanishing point estimation
			- GlobustVP [BangyanLiao2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Liao_Convex_Relaxation_for_Robust_Vanishing_Point_Estimation_in_Manhattan_World_CVPR_2025_paper.html) introduces _convex relaxation_ techniques to solve the vanishing points problem
		- Camera pose estimation
			- [JuanCDibene2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Dibene_Camera_Resection_from_Known_Line_Pencils_and_a_Radially_Distorted_CVPR_2025_paper.html) presents a marker-based geometric estimation framework for the absolute pose of a camera by analyzing the 1D observations in a single radially distorted pixel scanline
	- Depth sensors
		- TacoDepth [YiranWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_TacoDepth_Towards_Efficient_Radar-Camera_Depth_Estimation_with_One-stage_Fusion_CVPR_2025_paper.html) fuses Radar & image data for depth estimation with one-stage fusion. The graph-based Radar structure extractor and the pyramid-based Radar fusion module are used to capture and integrate the _graph structures_ of Radar point clouds
		- [AnaghMalik2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Malik_Neural_Inverse_Rendering_from_Propagating_Light_CVPR_2025_paper.html) presents a system for physically based, neural inverse rendering from multi-viewpoint videos of propagating light (flash lidar)
		- DORNet [ZhengxueWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_DORNet_A_Degradation_Oriented_and_Regularized_Network_for_Blind_Depth_CVPR_2025_paper.html) proposes a RGB-guided depth super-resolution method augmented with self-supervised _real-world degradation_ learning
		- [YuhuiLiu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Liu_Learned_Binocular-Encoding_Optics_for_RGBD_Imaging_Using_Joint_Stereo_and_CVPR_2025_paper.html) presents a _hardware-software co-designed_ RGBD imaging framework that leverages _both stereo and focus cues_ to reconstruct texture-rich color images along with detailed depth maps
		- [SotirisNousias2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Nousias_Opportunistic_Single-Photon_Time_of_Flight_CVPR_2025_paper.html) explores on how to detect and leverage _"ambient"_ laser pulses from other devices for passive 3D vision #🧠 
	- Object-specific priors
		- Human reconstruction
			- MEGA [GuenoleFiche2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Fiche_MEGA_Masked_Generative_Autoencoder_for_Human_Mesh_Recovery_CVPR_2025_paper.html)  tokenizes the human pose and shape and formulates the human mesh reconstruction (HMR) task as generating a sequence of discrete tokens conditioned on an input image. It models the 2D -> 3D _ambiguity_ with the generative paradigm #🧠 
			- Pose estimation
				- [YanXia2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Xia_Reconstructing_Humans_with_a_Biomechanically_Accurate_Skeleton_CVPR_2025_paper.html) reconstructs 3D humans _with a biomechanically accurate skeleton_ from a single image. It addresses the lack of training data with pseudo ground truth labels that are iteratively refined
			- Avatar
				- CAP4D [FelixTaubner2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Taubner_CAP4D_Creating_Animatable_4D_Portrait_Avatars_with_Morphable_Multi-View_Diffusion_CVPR_2025_paper.html) uses a morphable multi-view diffusion model to reconstruct photo-real 4D (dynamic 3D) portrait avatars from any number of reference images (i.e., one to 100) and animate and render them in real time
				  _Key contribution: transfer the advantage of multi-view approach (multi-view stereo & neural rendering) to single-view approach_

### 2D vision

- Generation
	- Auto-regressive generation
		- RandAR [ZiqiPang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Pang_RandAR_Decoder-only_Autoregressive_Visual_Generation_in_Random_Orders_CVPR_2025_paper.html) enables arbitrary image token generation order with the position instruction token accompanying each image token
		- Infinity [JianHan2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Han_Infinity_Scaling_Bitwise_AutoRegressive_Modeling_for_High-Resolution_Image_Synthesis_CVPR_2025_paper.html) expands the tokenizer vocabulary size to infinity by refactoring visual autoregressive model to a bitwise token prediction framework with an infinite-vocabulary classifier and bitwise self-correction mechanism #🧠 
		- [KaihangPan2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Pan_Generative_Multimodal_Pretraining_with_Discrete_Diffusion_Timestep_Tokens_CVPR_2025_paper.html) constructs a _proper visual language_ for LLM-diffusion combined models by leveraging diffusion timesteps to learn discrete, recursive visual tokens, replacing the _spatial token_ which lacks the recursive structure inherent to languages and thus forms an impossible language for LLM to master #🧠 
	- DiT
		- Visual token
			- VA-VAE [JingfengYao2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Yao_Reconstruction_vs._Generation_Taming_Optimization_Dilemma_in_Latent_Diffusion_Models_CVPR_2025_paper.html) speedups the latent diffusion models' training by 21x and achieves SoTA, when increasing the per-token feature dimension, by aligning the latent space with pre-trained vision foundation models when training the visual tokenizers #🚀 
			- TexTok [KaiwenZha2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zha_Language-Guided_Image_Tokenization_for_Generation_CVPR_2025_paper.html) conditions the tokenization process on descriptive text captions, allowing more learning capacity and token space to be allocated to capture fine-grained visual details #🧠 
		- Sample efficiency
			- [SoobinUm2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Um_Minority-Focused_Text-to-Image_Generation_via_Prompt_Optimization_CVPR_2025_paper.html) develops an online prompt optimization framework to promote learning of minority samples
		- Few-step generation
			- ARD [YeongminKim2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Kim_Autoregressive_Distillation_of_Diffusion_Transformers_CVPR_2025_paper.html) proposes a method to distill a DiT to a few-step generator which leverages the historical trajectory of the ODE to predict future steps. Key innovations are (i) adding token-wise time embedding to mark each input from the trajectory history and (ii) employing a block-wise causal attention mask for training
		- Scenario specific improment
			- DreamRelation [QingyuShi2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Shi_DreamRelation_Bridging_Customization_and_Relation_Generation_CVPR_2025_paper.html) addresses the gap of _relation_-aware image generation by (i) dataset with relation-specific images, (ii) keypoint matching loss for pose guides, and (iii) local features from the image prompts to better distinguish between objects
			- DesignDiffusion [ZhendongWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_DesignDiffusion_High-Quality_Text-to-Design_Image_Generation_with_Diffusion_Models_CVPR_2025_paper.html) improves text-to-poster generation by removing intricate components like position and layout modeling. Instead, it uses distinctive character embedding, character localization loss, and self-play DPO
			- CustAny [LingjieKong2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Kong_CustAny_Customizing_Anything_from_A_Single_Example_CVPR_2025_paper.html) extends SOTA zero-shot object customization from specific domains to the general domain by providing a large-scale general identity (preserving) dataset, MC-IDC
	- Flow
		- LookingGlass [PascalChang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Chang_LookingGlass_Generative_Anamorphoses_via_Laplacian_Pyramid_Warping_CVPR_2025_paper.html) uses latent rectified flow models to generate _anamorphic_ images that still retain a valid interpretation when viewed directly, while encodes hidden image(s) that need special device for viewing. The key is the introduction of Laplacian Pyramid Warping, a frequency-aware image warping technique
	- Safety
		- [AndreasMuller2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Muller_Black-Box_Forgery_Attacks_on_Semantic_Watermarks_for_Diffusion_Models_CVPR_2025_paper.html) reveals that attackers can easily forge or remove semantic watermarks of the generated images
		- Adv-CPG [JunyingWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Adv-CPG_A_Customized_Portrait_Generation_Framework_with_Facial_Adversarial_Attacks_CVPR_2025_paper.html) introduces facial adversarial attacks into Customized Portrait Generation (CPG) to prevent the generated images from being misused by malicious face recognition systems.
- Editing
	- [EricKee2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Kee_Removing_Reflections_from_RAW_Photos_CVPR_2025_paper.html) trains a reflections removal network using synthetic _RAW_ photos with reflection simulation, showing more significant improvement than architectural variations. Another insight is using the "selfie" camera to take an optional _contextual photo_ to disambiguates real reflection
	- [ShangquanSun2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Sun_Semi-Supervised_State-Space_Model_with_Dynamic_Stacking_Filter_for_Real-World_Video_CVPR_2025_paper.html) improves rain streak removal with dual-branch spatio-temporal state-space models
	- Dataset
		- AnyEdit [QifanYu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Yu_AnyEdit_Mastering_Unified_High-Quality_Image_Editing_for_Any_Idea_CVPR_2025_paper.html) presents a comprehensive multi-modal instruction editing dataset, comprising 2.5 million high-quality editing pairs spanning over 20 editing types and five domains
	- Super resolution
		- DiffFNO [XiaoyiLiu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Liu_DiffFNO_Diffusion_Fourier_Neural_Operator_CVPR_2025_paper.html) introduces the Weighted Fourier Neural Operator (WFNO), capturing critical frequency components from the spectral domain. It's accompanied by Attention-based Neural Operator (AttnNO) to capture spatial domain feature. An Adaptive Time-Step (ATS) ODE solver is also used for acceleration
- Tracking
	- Descriptor-In-Pixel [LaurieBose2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Bose_Descriptor-In-Pixel__Point-Feature_Tracking_For_Pixel_Processor_Arrays_CVPR_2025_paper.html) performs point-feature detection and tracking entirely _in-pixel_, with the Pixel Processor Array (PPA) hardware, achieving 1000x reduction in data transfer compared to raw image output. It tracks point-features reliably even under violent motion
- Detection
	- [KunyuWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_Efficient_Test-time_Adaptive_Object_Detection_via_Sensitivity-Guided_Pruning_CVPR_2025_paper.html) achieves efficient Continual test-time adaptive object detection (CTTA-OD) with _sensitivity-guided channel pruning_ strategy that quantifies each channel based on its sensitivity to domain discrepancies at both image and instance levels
- Segmentation
	- [JiaxinCai2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Cai_Keep_the_Balance_A_Parameter-Efficient_Symmetrical_Framework_for_RGBX_Semantic_CVPR_2025_paper.html) proposes a symmetric parameter-efficient fine-tuning framework for _multimodal segmentation_, featuring with a modality-aware prompting and adaptation scheme. It leverages the capabilities of pre-trained model on RGB, while at the same time making it not _reliant on RGB_ thus fully utilizes other modalities
	- [AishikKonwer2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Konwer_Enhancing_SAM_with_Efficient_Prompting_and_Preference_Optimization_for_Semi-supervised_CVPR_2025_paper.html) enhances Segment Anything Model (SAM) to enable the generation of high-fidelity segmentations. The core is a policy trained by DPO with simple ratings or rankings provided by a virtual annotator simulating the human annotation process
	- Effective SAM [MinhyeokLee2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Lee_Effective_SAM_Combination_for_Open-Vocabulary_Semantic_Segmentation_CVPR_2025_paper.html) replaces the 2 stage proposal-VLM SAM approach with a one-stage open-vocabulary approach. It refines the spatial aggregation for mask predictions by embedding pseudo prompts generated from image-text correlations into SAM's promptable segmentation framework

### Video vision

- Representation learning
	- [AnnaManasyan2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Manasyan_Temporally_Consistent_Object-Centric_Learning_by_Contrasting_Slots_CVPR_2025_paper.html) augments unsupervised object-centric representation learning from videos with _object-level temporal contrastive loss_, improving the temporally consistency & object discovery, outperforming even some weakly supervised methods
	- ViewpointRosetta [MiLuo2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Luo_Viewpoint_Rosetta_Stone_Unlocking_Unpaired_Ego-Exo_Videos_for_View-invariant_Representation_CVPR_2025_paper.html) uses diffusion-based Rosetta Stone Translator to align the _ego- and exo-viewpoint videos_ in feature space. It provides a new cross-view benchmark using Ego-Exo4D to illustrate the advantage of the learned feature
- Video understanding
	- SEAL [LanWang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Wang_SEAL_Semantic_Attention_Learning_for_Long_Video_Representation_CVPR_2025_paper.html) decomposes the video into three distinct types of semantic entities: scenes, objects, and actions, allowing models to operate on a compact set of entities rather than a large number of frames or pixels. It also proposes an attention learning module that balances token relevance with diversity
	- AVIGATE [BoseungJeong2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Jeong_Learning_Audio-guided_Video_Representation_with_Gated_Attention_for_Video-Text_Retrieval_CVPR_2025_paper.html) leverages audio cues through a gated attention mechanism that selectively filters out uninformative audio signals, instead of blindly utilizing the audio input
	- Tokenization
		- TEAM [SuBeenLee2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Lee_Temporal_Alignment-Free_Video_Matching_for_Few-shot_Action_Recognition_CVPR_2025_paper.html) discards pre-defined and length-dependent alignment units (e.g., frames or tuples) for few-shot action recognition. Instead, it represents videos with a fixed set of pattern tokens that capture globally discriminative clues for token-wise comparisons among videos
		- VST [YanShu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Shu_Video-XL_Extra-Long_Vision_Language_Model_for_Hour-Scale_Video_Understanding_CVPR_2025_paper.html) introduces Visual Summarization Token for hour-scale video understanding, with dynamic information compression which exploits MLLMs' inherent key-value (KV) _sparsification_ capacity to condense the visual input. This token is trained with instruction fine-tuning
	- Dataset
		- VideoEspresso [SonghaoHan2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Han_VideoEspresso_A_Large-Scale_Chain-of-Thought_Dataset_for_Fine-Grained_Video_Reasoning_via_CVPR_2025_paper.html) presents a dataset with video QA pairs preserving essential spatial details and temporal coherence, along with multimodal annotations of intermediate CoT reasoning steps generated with GPT-4o
		- PanAf-FGBG [OttoBrookes2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Brookes_The_PanAf-FGBG_Dataset_Understanding_the_Impact_of_Backgrounds_in_Wildlife_CVPR_2025_paper.html) presents a dataset featuring 21 hours of wild chimpanzee behaviors, which enables direct evaluation of _in-distribution_ and _out-of-distribution_ conditions, and for the impact of _backgrounds_ on behavior recognition models
- Generation
	- Diffusion Renderer [RuofanLiang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Liang_Diffusion_Renderer_Neural_Inverse_and_Forward_Rendering_with_Video_Diffusion_CVPR_2025_paper.html) uses video diffusion model for both inverse and forward rendering, enabling video editing like relighting, material editing, and realistic object insertion
	- Conditioning
		- Motion Prompting [DanielGeng2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Geng_Motion_Prompting_Controlling_Video_Generation_with_Motion_Trajectories_CVPR_2025_paper.html) uses spatio-temporally sparse or dense motion trajectories for motion conditioning, instead of text prompts. It also proposes motion prompt expansion to translate high-level user requests into detailed, semi-dense motion prompts
		- [RyanBurgert2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Burgert_Go-with-the-Flow_Motion-Controllable_Video_Diffusion_Models_Using_Real-Time_Warped_Noise_CVPR_2025_paper.html) enhances video diffusion models by allowing motion control via structured latent noise sampling, which is derived from the optical flow fields in data preprocessing stage. It is agnostic to diffusion model design and enables a wide range of user-friendly motion control: local object motion control, global camera movement control, and motion transfer

### Embodied intelligence

- Robotics
	- PDFactor [JingyiTian2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Tian_PDFactor_Learning_Tri-Perspective_View_Policy_Diffusion_Field_for_Multi-Task_Robotic_CVPR_2025_paper.html) decomposes 3D point cloud into three orthogonal feature planes and leverages a tri-perspective view transformer to produce dense cubic features as a latent diffusion field, representing 6-DoF action probability distribution. It then employs a small denoising network for feature & action inference #🧠 
	- Dataset
		- RoboSpatial [ChanHeeSong2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Song_RoboSpatial_Teaching_Spatial_Understanding_to_2D_and_3D_Vision-Language_Models_CVPR_2025_paper.html) presents a large-scale dataset for spatial understanding in robotics, consisting of real indoor and tabletop scenes, captured as 3D scans and egocentric images, and annotated with rich spatial information relevant to robotics
	- Reward
		- GROVE [JiemingCui2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Cui_GROVE_A_Generalized_Reward_for_Learning_Open-Vocabulary_Physical_Skill_CVPR_2025_paper.html) presents a generalized reward framework that enables _open-vocabulary physical skill learning without manual engineering or task-specific demonstrations_, with LLMs generating _physical constraints_ capturing task requirements and VLMs evaluating _motion semantics and naturalness_. For efficiency, Pose2CLIP is trained to project agent poses directly into semantic feature space without computationally expensive rendering #🚀 
	- Navigation
		- NWM [AmirBar2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Bar_Navigation_World_Models_CVPR_2025_paper.html) presents a controllable video generation model that predicts future visual observations based on past observations and navigation actions. It's used for simulate and plan navigation trajectories by evaluating whether they achieve the desired goal
- Autonomous vehicle
	- CAT-K [ZhejunZhang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Closed-Loop_Supervised_Fine-Tuning_of_Tokenized_Traffic_Models_CVPR_2025_paper.html) addresses the covariate shift of multi-agent traffic simulation with a fine-tuning strategy, when shifting from open-loop to closed-loop simulation

### Misc

- AI4Science
	- Neuroscience
		- BrainNRDS [JacobYeung2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Yeung_Reanimating_Images_using_Neural_Representations_of_Dynamic_Stimuli_CVPR_2025_paper.html) uses fMRI brain activity signals to condition image reanimation. It conducts a series of experiments based on video diffusion models: fMRI $\rightarrow$ optical flow, video encoder $\rightarrow$ brain activity, and fMRI $\rightarrow$ image reanimation/full video decoding
	- Geoscience
		- SegEarth-OV [KaiyuLi2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Li_SegEarth-OV_Towards_Training-Free_Open-Vocabulary_Segmentation_for_Remote_Sensing_Images_CVPR_2025_paper.html) presents a training-free _open-vocabulary_ semantic segmentation (OVSS) system for remote sensing, augmented by low-resolution features upsampler and a subtraction operation to alleviate the global bias in patch `CLS` tokens
		- IceDiff [JingyiXu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Xu_IceDiff_High_Resolution_and_High-Quality_Arctic_Sea_Ice_Forecasting_with_CVPR_2025_paper.html) uses a vision transformer to generate coarse Arctic sea ice forecasting. It then been used to generated fine-level forecasting with an unconditional diffusion model
- AI4Health
	- TopoCellGen [MeilongXu2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Xu_TopoCellGen_Generating_Histopathology_Cell_Topology_with_a_Diffusion_Model_CVPR_2025_paper.html) integrates topological constraints into a diffusion model to improve the generation of realistic, contextually accurate cell topologies. It also proposes Topological Frechet Distance (TopoFD) to access the fidelity of the generated samples, beyond the traditional FID score

## Architecture

- Diffusion model
	- AF-LDM [YifanZhou2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhou_Alias-Free_Latent_Diffusion_Models_Improving_Fractional_Shift_Equivariance_of_Diffusion_CVPR_2025_paper.html) makes latent diffusion models (LDMs) to be shift-equivariant for output consistency by redesigning the attention modules to be shift-equivariant and propose an equivariance loss that effectively suppresses the frequency bandwidth of the features in the continuous domain
	- Sampling steps
		- DAPS [BingliangZhang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhang_Improving_Diffusion_Inverse_Problem_Solving_with_Decoupled_Noise_Annealing_CVPR_2025_paper.html) decouples consecutive steps in a diffusion sampling trajectory, allowing them to vary considerably from one another while ensuring their time-marginals anneal to the true posterior. It's proved to be effective for complicated nonlinear inverse problems like image restoration
	- Use as feature extractor
		- [NickStracke2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Stracke_CleanDIFT_Diffusion_Features_without_Noise_CVPR_2025_paper.html) deals with the requirement of adding noise when using large-scale pre-trained diffusion models as a feature extractor. It shows that ensembling with different random noises can't remedy the consistency issue. Instead, it proposes an unsupervised fine-tuning framework to enable feature extraction without adding noise
- Transformer
	- Interpretability
		- LibraGrad [FaridounMehri2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Mehri_LibraGrad_Balancing_Gradient_Flow_for_Universally_Better_Vision_Transformer_Attributions_CVPR_2025_paper.html) digs into why gradient-based explanation, which works well with CNN, doesn't work for Transformer. It proposes a post-hoc approach that corrects gradient imbalances through pruning and scaling of backward paths
- CNN
	- OverLoCK [MengLou2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Lou_OverLoCK_An_Overview-first-Look-Closely-next_ConvNet_with_Context-Mixing_Dynamic_Kernels_CVPR_2025_paper.html) mimics the overview-first-look-closely-next pattern of human visual system by constructing a Base-Net to encode low/mid-level features, a Overview-Net to generate top-down attention, and a Focus-Net that performs finer-grained perception guided by top-down attention
	  _P.S. Kind of like introducing some hand-engineered attention mechanism to the CNN framework that mimics human vision system's behavior_
- Spiking Neural Network (SNN)
	- a-XNOR [YichenXiao2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Xiao_Rethinking_Spiking_Self-Attention_Mechanism_Implementing_a-XNOR_Similarity_Calculation_in_Spiking_CVPR_2025_paper.html) attributes the performance gap of spiking Transformer to the ineffectiveness of dot product in measuring similarity between spiking queries and keys. It then replaces it with a-XNOR similarity
- Activation function
	- [DamienTeney2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Teney_Do_We_Always_Need_the_Simplicity_Bias_Looking_for_Optimal_CVPR_2025_paper.html) proposes a method to meta-learn activation functions and shows that the simplicity bias, i.e. using the simple ReLU, doesn't always hold
	  _Interestingly, in tasks neural networks historically struggled, e.g. tabular data & regression tasks, more complex activation functions are learned; whereas in images the learned activation functions are similar to ReLU/GeLU_

## Supervision

- Infra
	- UniAP [HaoLin2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Lin_UniAP_Unifying_Inter-_and_Intra-Layer_Automatic_Parallelism_by_Mixed_Integer_CVPR_2025_paper.html) develops an automatic parallelism methods that jointly optimizes inter- & intra-layer parallelisms
- Dataset distillation
	- UniDD [DingQi2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Qi_Towards_Universal_Dataset_Distillation_via_Task-Driven_Diffusion_CVPR_2025_paper.html) extends dataset distillation beyond image classification to universal tasks with (i) Universal Task Knowledge Mining, which captures task-relevant information through task-specific proxy model training and (ii) Universal Task-Driven Diffusion, where these proxies guide the diffusion process to generate task-specific synthetic images
- Post-training learning
	- Quantization
		- [KaiZhao2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Zhao_Enhancing_Diversity_for_Data-free_Quantization_CVPR_2025_paper.html) uses multi-layer features mixer, normalization flow based attention, and losses to promote data diversity of model quantization data generator
	- LoRA
		- LoRASculpt [JianLiang2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Liang_LoRASculpt_Sculpting_LoRA_for_Harmonizing_General_and_Specialized_Knowledge_in_CVPR_2025_paper.html) mitigates the forgetting of generalized knowledge during LoRA by controlling the harmful parameter update redundancy #🧠 
- Federated learning
	- [YanbiaoMa2025CVPR](https://openaccess.thecvf.com/content/CVPR2025/html/Ma_Geometric_Knowledge-Guided_Localized_Global_Distribution_Alignment_for_Federated_Learning_CVPR_2025_paper.html) proposes a geometry-guided data generation method that centers on simulating the _global embedding distribution_ locally, to address the instability training with heterogeneous data distributions where label skew and domain skew coexist