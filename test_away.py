import numpy as np
import torch
import pandas as pd
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import TensorDataset, DataLoader


data = pd.read_csv('footballdataEdited.csv')

# INPUTS
inputs = data.drop(["Div", "FTHG", "FTAG", "FTR", "Result", "HF", "AF", "HR", "AR", "HY", "AY"
                    ], axis=1)
inputs = np.array(inputs, dtype='float32')
inputs.shape

# TARGETS
targets = data.drop(["Div", "Result", "FTHG", "FTR", "HS", "AS", "HST", "AST", "HF",
                     "AF", "HC", "AC", "HY", "AY", "HR", "AR", "B365H", "B365D", "B365A"], axis=1)
targets = np.array(targets, dtype="float32")
targets.shape

inputs = torch.from_numpy(inputs)
targets = torch.from_numpy(targets)

train_ds = TensorDataset(inputs, targets)
train_ds[0:10]

batch_size = 36
train_dl = DataLoader(train_ds, batch_size, shuffle=True)
next(iter(train_dl))

model = nn.Linear(9, 1)
opt = torch.optim.SGD(model.parameters(), lr=1e-3)
loss_fn = F.mse_loss
loss = loss_fn(model(inputs), targets)


def fit(num_epochs, model, loss_fn, opt):
    for epoch in range(num_epochs):
        for xb, yb in train_dl:
            # Generate predictions
            pred = model(xb)
            loss = loss_fn(pred, yb)
            # Perform gradient descent
            loss.backward()
            opt.step()
            opt.zero_grad()
        if (epoch+1) % 10 == 0:
            print('Epoch [{}/{}], Loss: {:.4f}'.format(epoch +
                                                       1, num_epochs, loss.item()))
#             print('Training loss: ', loss_fn(model(inputs), targets))


fit(50, model, loss_fn, opt)

preds = model(inputs)
preds = torch.round(preds)

train_acc = torch.sum(preds == targets)


final_train_acc = train_acc/preds.shape[0]
final_train_acc
