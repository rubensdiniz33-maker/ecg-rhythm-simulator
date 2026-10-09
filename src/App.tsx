import { useEffect, useState } from "react";

const parts = [
  "ecg-html-part-01.txt",
  "ecg-html-part-02.txt",
  "ecg-html-part-03.txt",
  "ecg-html-part-04.txt",
  "ecg-html-part-05.txt",
  "ecg-html-part-06.txt",
  "ecg-html-part-07.txt",
  "ecg-html-part-08.txt",
];

export default function App() {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSimulator() {
      try {
        const responses = await Promise.all(
          parts.map((part) => fetch(`/${part}`, { cache: "no-cache" }))
        );

        const failed = responses.find((response) => !response.ok);
        if (failed) {
          throw new Error(
            `Não foi possível carregar uma parte do simulador (HTTP ${failed.status}).`
          );
        }

        const chunks = await Promise.all(responses.map((response) => response.text()));
        const completeHtml = chunks.join("");

        if (!completeHtml.toLowerCase().includes("<html") ||
            !completeHtml.toLowerCase().includes("</html>")) {
          throw new Error("O arquivo do simulador parece estar incompleto.");
        }

        if (!cancelled) setHtml(completeHtml);
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Erro desconhecido ao carregar o simulador.");
        }
      }
    }

    loadSimulator();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <main className="status-screen">
        <section className="status-card">
          <div className="status-mark">!</div>
          <h1>Não foi possível abrir o simulador</h1>
          <p>{error}</p>
          <p className="status-help">Confira se o projeto está sincronizado com o GitHub e tente atualizar a pré-visualização.</p>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </section>
      </main>
    );
  }

  if (!html) {
    return (
      <main className="status-screen">
        <section className="loading-card">
          <div className="pulse" />
          <p>Carregando o simulador de ECG…</p>
        </section>
      </main>
    );
  }

  return (
    <iframe
      className="simulator-frame"
      title="Simulador de ECG"
      srcDoc={html}
      allow="fullscreen"
    />
  );
}