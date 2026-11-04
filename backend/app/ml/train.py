import joblib
from sklearn.ensemble import RandomForestRegressor

# Skusobne udaje - neskor ich nahradime realnymi
# X = hodina dna, ci je vikend (1 = ano, 0 = nie)
X = [[8, 1], [12, 0], [18, 1], [22, 0]]

# y = obsadenost parkoviska od 0 do 1
y = [0.9, 0.6, 0.8, 0.3]

# Vytvorenie AI modelu
model = RandomForestRegressor(
    n_estimators=50,
    random_state=42
)
# Trenovanie modelu
model.fit(X, y)
# Ulozenie natrenovaneho modelu
joblib.dump(model, "app/ml/model.joblib")
print("Saved app/ml/model.joblib")
