import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


def random_data_frame(n: int = 50):
    return pd.DataFrame(data=np.random.randn(n, 2), columns=["Column 1", "Column 2"])


print(random_data_frame().head())
