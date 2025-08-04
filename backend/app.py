from flask import Flask, jsonify, request
from flask_cors import CORS
from simulation import run_sim

app = Flask(__name__)
CORS(app)

@app.route('/api/metrics')
def metrics():
    p = float(request.args.get('percentile', 95))
    d = int(request.args.get('day', 10))
    collateral = float(request.args.get('collateral', 1e6))
    haircut = float(request.args.get('haircut', 0.05))
    notional = float(request.args.get('notional', 1e6))

    sf = run_sim(collateral, haircut, notional)
    pct = sf.quantile(p/100.0, axis=1).tolist()
    dist = sf.iloc[d].tolist()

    return jsonify({'daily_pct': pct, 'dist': dist})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
