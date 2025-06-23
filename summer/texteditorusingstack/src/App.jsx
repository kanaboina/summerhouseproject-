import React, { useState, useRef } from "react";

function levenshteinDistance(a, b) {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // delete
            dp[i][j - 1], // insert
            dp[i - 1][j - 1] // replace
          );
      }
    }
  }
  return dp[m][n];
}

function App() {
  const [text, setText] = useState("");
  const [target, setTarget] = useState("");
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const handleChange = (e) => {
    undoStack.current.push(text);
    setText(e.target.value);
    redoStack.current = [];
  };

  const handleUndo = () => {
    if (undoStack.current.length === 0) return;
    redoStack.current.push(text);
    setText(undoStack.current.pop());
  };

  const handleRedo = () => {
    if (redoStack.current.length === 0) return;
    undoStack.current.push(text);
    setText(redoStack.current.pop());
  };

  const minOps = levenshteinDistance(text, target);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, Arial, sans-serif",
        minWidth: "100vw",
        boxSizing: "border-box",
        color: "#333",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px 32px",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minWidth: "370px",
          maxWidth: "95vw",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "28px",
            color: "#2d3142",
            letterSpacing: "1px",
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          Stack Text Editor
        </h1>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "18px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleUndo}
            disabled={undoStack.current.length === 0}
            style={{
              padding: "10px 22px",
              borderRadius: "8px",
              border: "none",
              background:
                undoStack.current.length === 0 ? "#e0e0e0" : "#5f72bd",
              color: undoStack.current.length === 0 ? "#888" : "#fff",
              cursor:
                undoStack.current.length === 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 2px 8px rgba(95,114,189,0.08)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={redoStack.current.length === 0}
            style={{
              padding: "10px 22px",
              borderRadius: "8px",
              border: "none",
              background:
                redoStack.current.length === 0 ? "#e0e0e0" : "#ff6f61",
              color: redoStack.current.length === 0 ? "#888" : "#fff",
              cursor:
                redoStack.current.length === 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 2px 8px rgba(255,111,97,0.08)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            Redo
          </button>
        </div>
        <textarea
          style={{
            width: "100%",
            height: "160px",
            fontSize: "17px",
            borderRadius: "10px",
            border: "1.5px solid #bdbdbd",
            padding: "14px",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            background: "#f9fafc",
            color: "#22223b",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            marginBottom: "8px",
          }}
          placeholder="Start typing..."
          value={text}
          onChange={handleChange}
        />
        <div style={{ margin: "18px 0 8px 0" }}>
          <input
            type="text"
            style={{
              width: "100%",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1.5px solid #bdbdbd",
              padding: "10px",
              boxSizing: "border-box",
              background: "#f3f3fa",
              color: "#22223b",
              marginBottom: "6px",
            }}
            placeholder="Enter target string..."
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <div
            style={{ color: "#5f72bd", fontWeight: "bold", fontSize: "15px" }}
          >
            Minimum operations to convert: {minOps}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
