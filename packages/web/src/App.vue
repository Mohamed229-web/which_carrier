<template>
  <main class="page">
    <section class="card">
      <header class="card__header">
        <div class="logo" aria-hidden="true">📦</div>
        <h1>which_carrier — Demo</h1>
        <p class="subtitle">
          Entrez un numéro de suivi et détectez automatiquement le transporteur.
        </p>
      </header>

      <form @submit.prevent="onSubmit" class="form">
        <label for="tracking" class="label">Numéro de suivi</label>
        <input
          id="tracking"
          v-model="tracking"
          type="text"
          inputmode="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="Ex. 1Z2869Y60397722027 ou RR123456785FR"
          class="input"
        />
        <button type="submit" class="btn">Détecter</button>
      </form>

      <section v-if="result" class="result" aria-live="polite">
        <div class="result__row">
          <span class="result__label">Transporteur principal</span>
          <span class="result__value">{{
            result.primary?.name || result.primary?.slug || "Non reconnu"
          }}</span>
        </div>
        <div class="result__row" v-if="result.primary">
          <span class="result__label">Slug</span>
          <span class="result__code">{{ result.primary.slug }}</span>
        </div>
        <div class="result__row" v-if="result.primary">
          <span class="result__label">Score</span>
          <span class="result__code">{{ result.primary.score }}</span>
        </div>

        <details v-if="result.candidates?.length > 1" class="details">
          <summary>Voir les autres candidats</summary>
          <ul class="candidates">
            <li v-for="c in result.candidates.slice(1)" :key="c.slug">
              <span>{{ c.name || c.slug }}</span>
              <code>score: {{ c.score }}</code>
            </li>
          </ul>
        </details>
      </section>

      <footer class="footer">
        <small
          >Propulsé par <code>which_carrier</code>. Aucune donnée n'est envoyée
          côté serveur.</small
        >
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { detect, load } from "which_carrier";
import { seedRules } from "which_carrier-data";

load(seedRules);

const tracking = ref("");
const result = ref<any | null>(null);

function onSubmit() {
  const v = tracking.value.trim();
  result.value = v ? detect(v) : null;
}
</script>

<style scoped>
.page {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(
      1200px 800px at 10% -10%,
      #e9f2ff 0%,
      transparent 60%
    ),
    radial-gradient(1200px 800px at 110% 110%, #ffe9f2 0%, transparent 60%),
    linear-gradient(180deg, #fafbff 0%, #f5f7fb 100%);
}

.card {
  width: min(620px, 92vw);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  border: 1px solid #eef1f6;
  padding: 28px;
  animation: lift-in 300ms ease-out;
}

@keyframes lift-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card__header {
  text-align: center;
  margin-bottom: 18px;
}
.logo {
  font-size: 32px;
  line-height: 1;
  margin-bottom: 8px;
}
.card__header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}
.subtitle {
  margin: 6px 0 0;
  color: #475569;
  font-size: 14px;
}

.form {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}
.label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}
.input {
  height: 44px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #dbe1ea;
  background: #fff;
  font-size: 15px;
  outline: none;
  transition: box-shadow 160ms ease, border-color 160ms ease;
}
.input:focus {
  border-color: #5b8def;
  box-shadow: 0 0 0 4px rgba(91, 141, 239, 0.15);
}

.btn {
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(180deg, #4377ff 0%, #2c5de6 100%);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: transform 80ms ease, filter 160ms ease;
}
.btn:hover {
  filter: brightness(1.05);
}
.btn:active {
  transform: translateY(1px);
}

.result {
  margin-top: 18px;
  border-top: 1px dashed #e5eaf1;
  padding-top: 14px;
}
.result__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  gap: 10px;
}
.result__label {
  color: #475569;
  font-size: 13px;
}
.result__value {
  color: #0f172a;
  font-weight: 600;
}
.result__code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  background: #f3f6fb;
  border: 1px solid #e7ecf5;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 12px;
  color: #0f172a;
}

.details {
  margin-top: 10px;
}
.details summary {
  cursor: pointer;
  color: #334155;
  font-weight: 600;
}
.candidates {
  margin: 8px 0 0;
  padding: 0 0 0 16px;
}
.candidates li {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 14px;
  color: #334155;
}

.footer {
  margin-top: 16px;
  text-align: center;
  color: #64748b;
  font-size: 12px;
}
</style>
