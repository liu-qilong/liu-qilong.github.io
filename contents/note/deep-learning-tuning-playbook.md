---
title: Deep Learning Tuning Playbook | Google Research
tags:
  - Hinton/ML
date: "2024-08-16"
update: 
link:
  github: https://github.com/google-research/tuning_playbook
  xiaohongshu: https://www.xiaohongshu.com/explore/66bed0820000000009015668?xsec_token=ABgXo5zAH7tHnJjGUBSodsiLwmuHXwyrfU2jQO2Yi8dyM=&xsec_source=pc_user
---

# Deep Learning Tuning Playbook | Google Research

> [GitHub - google-research/tuning\_playbook: A playbook for systematically maximizing the performance of deep learning models.](https://github.com/google-research/tuning_playbook)

## Guide for starting a new project

- Guides on choosing the model architecture, the optimizer, and the batch size.
- The goal of tuning batch size is to saturate the GPUs, which can be monitored by:
    - `training throughput = (# examples processed per second)`
    - `time per step = (batch size) / (training throughput)`
    - _P.S. When batch size is tuned, most hyper-parameters need to be tuned. Among them, the learning rate and the regularization term are the most important._

## A scientific approach to improving model performance

- Design the experiment
    - Scientific hyper-parameters
        The experiment is aimed at explore the effect of the scientific hyper-parameters.
    - Nuisance hyper-parameters
        To compare different approach, nuisance hyper-parameters are needed to be tuned and the best trails are to be compared.
    - Fixed hyper-parameters
        The hyper-parameters to be fixed to reduce the number of trails needed.
- The exploration of parameters search space
    Bayesian optimization / quasi-random search. Considering the search boundary carefully.
- Automate the plotting to ensure we plot enough graphics.

## Determining the number of steps for each training run

- Deciding how long to train when training is not compute-bound
- Deciding how long to train when training is compute-bound
    - "Round 1: Shorter runs to find good model and optimizer hyperparameters."
    - "Round 2: Very few long runs on good hyperparameter points to get the final model."

## Additional guidance for the training pipeline

- Optimizing the input pipeline
- Saving checkpoints and _retrospectively_ selecting the best checkpoint
    Keep the best $k$ checkpoints along training.

## FAQs

- How should Adam’s hyper-parameters be tuned?
- Why use quasi-random search instead of more sophisticated black box optimization algorithms during the exploration phase of tuning?
- Unstable training
    - Learning rate warmup
        "Our goal is to find the shortest number of `warmup_steps` that allows us to access peak learning rates that are much higher than `unstable_base_learning_rate`." The default is 10x `unstable_base_learning_rate`.
    - Gradient clipping
        "Choose a gradient clipping threshold based on the 90th percentile of gradient norms." 
    - Issue with [Batch Normalization](): _Use `x + f(Norm(x))`. `Norm(x + f(x))` is known to cause issues._
- Update rules of popular optimizers
    - Stochastic gradient descent (SGD)
        $\theta_{t+1} = \theta_{t} - \eta_t \nabla \mathcal{l}(\theta_t)$
    - Momentum
        $v_0 = 0$
        $v_{t+1} = \gamma v_{t} + \nabla \mathcal{l}(\theta_t)$
        $\theta_{t+1} = \theta_{t} - \eta_t v_{t+1}$
    - Nesterov
        $v_0 = 0$
        $v_{t+1} = \gamma v_{t} + \nabla \mathcal{l}(\theta_t)$
        $\theta_{t+1} = \theta_{t} - \eta_t( \gamma v_{t+1} + \nabla \mathcal{l}(\theta_{t}))$
    - RMSProp
        $v_0 = 1 \text{,} m_0 = 0$
        $v_{t+1} = \rho v_{t} + (1 - \rho) \nabla \mathcal{l}(\theta_t)^2$
        $m_{t+1} = \gamma m_{t} + \frac{\eta_t}{\sqrt{v_{t+1} + \epsilon}}\nabla \mathcal{l}(\theta_t)$
        $\theta_{t+1} = \theta_{t} - m_{t+1}$
    - ADAM
        $m_0 = 0 \text{,} v_0 = 0$
        $m_{t+1} = \beta_1 m_{t} + (1 - \beta_1) \nabla \mathcal{l} (\theta_t)$
        $v_{t+1} = \beta_2 v_{t} + (1 - \beta_2) \nabla \mathcal{l}(\theta_t)^2$
        $b_{t+1} = \frac{\sqrt{1 - \beta_2^{t+1}}}{1 - \beta_1^{t+1}}$
        $\theta_{t+1} = \theta_{t} - \alpha_t \frac{m_{t+1}}{\sqrt{v_{t+1}} + \epsilon} b_{t+1}$
    - NADAM
        $m_0 = 0 \text{,} v_0 = 0$
        $m_{t+1} = \beta_1 m_{t} + (1 - \beta_1) \nabla \mathcal{l} (\theta_t)$
        $v_{t+1} = \beta_2 v_{t} + (1 - \beta_2) \nabla \mathcal{l} (\theta_t)^2$
        $b_{t+1} = \frac{\sqrt{1 - \beta_2^{t+1}}}{1 - \beta_1^{t+1}}$
        $\theta_{t+1} = \theta_{t} - \alpha_t \frac{\beta_1 m_{t+1} + (1 - \beta_1) \nabla \mathcal{l} (\theta_t)}{\sqrt{v_{t+1}} + \epsilon} b_{t+1}$