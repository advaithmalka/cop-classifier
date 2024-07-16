# Cop Car Image Classification

## Overview

This project provides a machine learning model for binary image classification to detect whether an image contains a cop car. The model uses a pre-trained ResNet-50 architecture fine-tuned for this specific task. The model is deployed as an API using Flask, and the frontend is built using React with TailwindCSS for styling.

## How It Works

### Model Architecture

The model uses ResNet-50, a state-of-the-art convolutional neural network architecture, pre-trained on ImageNet. The final layer is modified to output a single value, which is passed through a sigmoid function to produce a probability between 0 and 1. This probability indicates whether the input image is likely to contain a cop car.

### Data Augmentation

The training pipeline includes data augmentation techniques such as TrivialAugment, which helps the model generalize better by applying random transformations to the training images.

### Training

The model is trained using Binary Cross-Entropy with Logits Loss (BCEWithLogitsLoss) and optimized with the Adam optimizer. The learning rate scheduler is also used to adjust the learning rate based on the validation loss.

## Applications

### Traffic Surveillance

One of the primary applications of this model is in traffic surveillance systems. The model can be used by traffic cameras to detect cop cars in real-time. This can help in monitoring and managing traffic during high-speed chases, ensuring that law enforcement vehicles are given priority on the roads.

### Automated Alert Systems

The model can be integrated into automated alert systems to notify relevant authorities when a cop car is detected. This can enhance the efficiency of emergency response systems and improve public safety.

### Research and Analysis

Researchers and traffic analysts can use the model to study the movement patterns of cop cars and understand their behavior during different times of the day or in various scenarios. This can provide valuable insights for improving traffic management and law enforcement strategies.

## Usage

### API Deployment

The model is deployed as an API using Flask. The API accepts image files (JPG, JPEG, PNG) and returns the prediction result.

### Frontend Interface

The frontend interface is built using React and TailwindCSS. Users can upload images from their computer or enter an image URL. Sample images are also provided for testing the model.

## Conclusion

This project demonstrates the application of deep learning for binary image classification, specifically for detecting cop cars. The use of ResNet-50 provides a robust and accurate model, and the combination of Flask and React makes it easy to deploy and use. This system can be a valuable tool for enhancing traffic surveillance, automated alert systems, and research analysis.
