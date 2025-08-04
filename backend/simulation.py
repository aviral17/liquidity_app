import numpy as np
import pandas as pd

def vasicek_paths(r0, a, b, sigma, T, steps, n_paths, seed=0):
    np.random.seed(seed)
    dt = T / steps
    R = np.zeros((steps + 1, n_paths))
    R[0] = r0
    for t in range(1, steps + 1):
        dW = np.random.randn(n_paths) * np.sqrt(dt)
        R[t] = R[t-1] + a*(b - R[t-1])*dt + sigma*dW
    return R

def simulate_shortfall(rates, collateral, haircut, notional):
    coll_val = collateral * (1 - haircut)
    funding = notional * (1 + rates)
    shortfall = np.maximum(funding - coll_val, 0)
    return pd.DataFrame(shortfall)

def run_sim(collateral, haircut, notional):
    r0, mu, sigma = 0.04, 0.04, 0.002
    a, b = 0.1, mu
    T, steps, n_paths = 1.0, 100, 1000
    rates = vasicek_paths(r0, a, b, sigma, T, steps, n_paths)
    return simulate_shortfall(rates, collateral, haircut, notional)
